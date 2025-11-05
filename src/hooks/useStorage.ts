import { useState, useEffect } from 'react';

// API client for Redis operations
const storageApi = {
  async get(key: string) {
    try {
      const response = await fetch(`/api/storage?key=${encodeURIComponent(key)}`);
      
      if (response.status === 404) {
        return null;
      }
      
      if (!response.ok) {
        throw new Error(`Failed to get data: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.value;
    } catch (error) {
      console.error('Storage get error:', error);
      throw error;
    }
  },

  async set(key: string, value: any) {
    try {
      const response = await fetch('/api/storage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key, value }),
      });

      if (!response.ok) {
        throw new Error(`Failed to set data: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Storage set error:', error);
      throw error;
    }
  },

  async delete(key: string) {
    try {
      const response = await fetch(`/api/storage?key=${encodeURIComponent(key)}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete data: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Storage delete error:', error);
      throw error;
    }
  },

  async list(prefix?: string) {
    try {
      const url = prefix 
        ? `/api/storage?prefix=${encodeURIComponent(prefix)}`
        : '/api/storage';
      
      const response = await fetch(url, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error(`Failed to list keys: ${response.statusText}`);
      }

      const data = await response.json();
      return data.keys;
    } catch (error) {
      console.error('Storage list error:', error);
      throw error;
    }
  },
};

export const useStorage = <T,>(key: string, defaultValue: T) => {
  const [data, setData] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data function (can be called manually via reload)
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const value = await storageApi.get(key);
      
      if (value !== null) {
        // Data is already parsed by Redis, no need for JSON.parse
        setData(value);
      } else {
        // If no data exists, use default value
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

  // Load data on mount and when key changes
  useEffect(() => {
    loadData();

    // Listen for storage update events from other components
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

  // Save data function
  const saveData = async (newData: T) => {
    try {
      setError(null);
      
      // Redis handles JSON serialization automatically
      await storageApi.set(key, newData);
      setData(newData);
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('storage-updated', { detail: { key } }));
    } catch (err) {
      console.error(`Error saving ${key}:`, err);
      setError(err instanceof Error ? err.message : 'Failed to save data');
      throw err;
    }
  };

  return { 
    data, 
    loading, 
    error, 
    saveData, 
    reload: loadData  // Keep the same API as before
  };
};