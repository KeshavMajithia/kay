import { useState, useEffect } from 'react';

declare global {
  interface Window {
    storage: {
      get: (key: string, isPublic: boolean) => Promise<{ value: string } | null>;
      set: (key: string, value: string, isPublic: boolean) => Promise<void>;
    };
  }
}

export const useStorage = <T,>(key: string, defaultValue: T) => {
  const [data, setData] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();

    // Listen for storage update events
    const handleStorageUpdate = (e: CustomEvent) => {
      if (e.detail.key === key) {
        loadData();
      }
    };

    window.addEventListener('storage-updated' as any, handleStorageUpdate as any);
    return () => {
      window.removeEventListener('storage-updated' as any, handleStorageUpdate as any);
    };
  }, [key]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (typeof window.storage === 'undefined') {
        console.warn('window.storage not available, using default data');
        setData(defaultValue);
        setLoading(false);
        return;
      }

      const result = await window.storage.get(key, false);
      if (result && result.value) {
        const parsed = JSON.parse(result.value);
        setData(parsed);
      } else {
        setData(defaultValue);
      }
    } catch (err) {
      console.error(`Error loading ${key}:`, err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
      setData(defaultValue);
    } finally {
      setLoading(false);
    }
  };

  const saveData = async (newData: T) => {
    try {
      setError(null);
      
      if (typeof window.storage === 'undefined') {
        console.warn('window.storage not available');
        setData(newData);
        return;
      }

      await window.storage.set(key, JSON.stringify(newData), false);
      setData(newData);
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('storage-updated', { detail: { key } }));
    } catch (err) {
      console.error(`Error saving ${key}:`, err);
      setError(err instanceof Error ? err.message : 'Failed to save data');
      throw err;
    }
  };

  return { data, loading, error, saveData, reload: loadData };
};
