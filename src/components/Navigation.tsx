import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { id: 'learn', label: 'learn()' },
  { id: 'build', label: 'build()' },
  { id: 'iterate', label: 'iterate()' },
  { id: 'impact', label: 'impact()' },
  { id: 'contact', label: 'contact()' }
];

export const Navigation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after 80% of viewport height
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight * 0.8;
      setIsVisible(scrollPosition > heroHeight);

      // Detect active section
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  if (!isVisible) return null;

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-glass"
      style={{
        background: 'rgba(26, 26, 26, 0.9)',
        borderBottom: '1px solid rgba(0, 217, 255, 0.2)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span 
              className="font-mono text-xl font-bold cursor-pointer"
              style={{ color: '#00d9ff' }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {"{ KM }"}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="font-mono text-sm transition-colors relative group"
                  style={{ 
                    color: activeSection === item.id ? '#00d9ff' : '#94a3b8'
                  }}
                >
                  {item.label}
                  <span 
                    className={`absolute -bottom-1 left-0 h-0.5 bg-current transition-all ${
                      activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                    style={{ backgroundColor: '#00d9ff' }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
              style={{ color: '#00d9ff' }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden"
          style={{
            background: 'rgba(26, 26, 26, 0.98)',
            borderTop: '1px solid rgba(0, 217, 255, 0.2)'
          }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-3 py-2 font-mono text-base transition-colors"
                style={{ 
                  color: activeSection === item.id ? '#00d9ff' : '#94a3b8'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
