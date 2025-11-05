import { useStorage } from '@/hooks/useStorage';
import { DEFAULT_DATA } from '@/lib/defaultData';
import { Mail, Linkedin, Github, Code2, Download } from 'lucide-react';
import { useState, useEffect } from 'react';

export const ContactSection = () => {
  const { data: contact } = useStorage('portfolio-contact', DEFAULT_DATA.contact);
  const { data: personal } = useStorage('portfolio-personal', DEFAULT_DATA.personal);
  const [statusIndex, setStatusIndex] = useState(0);
  
  const statusCycle = ['Learning', 'Building', 'Shipping', 'Learning'];

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statusCycle.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    { icon: Mail, href: `mailto:${contact.email}`, label: 'Email' },
    { icon: Linkedin, href: contact.linkedIn, label: 'LinkedIn' },
    { icon: Github, href: contact.github, label: 'GitHub' },
    { icon: Code2, href: contact.devpost, label: 'Devpost' }
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8" style={{ background: '#1a1a1a' }}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="font-mono text-base sm:text-lg md:text-xl lg:text-2xl mb-12 sm:mb-16 text-left max-w-full mx-auto" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          <code>
            <span style={{ color: '#c586c0' }}>function</span> <span style={{ color: '#dcdcaa' }}>runtime_info</span>() {"{"}{'\n'}
            {"    "}<span style={{ color: '#6a9955' }}>// Current state and future iterations</span>{'\n'}
            {"}"}
          </code>
        </div>

        {/* Social Icons */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-12">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:scale-110"
              style={{ color: '#94a3b8' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#00d9ff';
                e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(0, 217, 255, 0.6))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94a3b8';
                e.currentTarget.style.filter = 'none';
              }}
              aria-label={link.label}
            >
              <link.icon size={40} className="sm:w-12 sm:h-12" />
            </a>
          ))}
        </div>

        {/* Status */}
        <div className="mb-8">
          <p className="font-mono text-lg sm:text-xl" style={{ color: '#00d9ff' }}>
            Status: {statusCycle.map((status, index) => (
              <span key={status}>
                <span className={index === statusIndex ? 'opacity-100' : 'opacity-30'}>
                  {status}
                </span>
                {index < statusCycle.length - 1 && ' → '}
              </span>
            ))}
          </p>
        </div>

        {/* Resume Button */}
        {contact.resumeUrl && (
          <a
            href={contact.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-mono text-lg transition-all hover:scale-105"
            style={{
              background: 'rgba(0, 217, 255, 0.1)',
              border: '2px solid #00d9ff',
              color: '#00d9ff'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#00d9ff';
              e.currentTarget.style.color = '#1a1a1a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 217, 255, 0.1)';
              e.currentTarget.style.color = '#00d9ff';
            }}
          >
            <Download size={24} />
            download('resume.pdf')
          </a>
        )}

        {/* Footer */}
        <footer 
          className="mt-24 pt-8 border-t"
          style={{
            borderColor: 'rgba(0, 217, 255, 0.2)',
            background: 'rgba(36, 36, 36, 0.8)'
          }}
        >
          <div className="font-mono text-sm space-y-2" style={{ color: '#64748b' }}>
            <p>&gt; Currently learning: {personal.currentlyLearning}</p>
            <p>&gt; Last deployed: {personal.lastDeployed}</p>
            <p>&gt; Next iteration: {personal.nextIteration}</p>
          </div>
          <div className="mt-6 font-mono" style={{ color: '#64748b' }}>
            © 2024 {personal.name} | Built with ♾️
          </div>
        </footer>
      </div>
    </section>
  );
};
