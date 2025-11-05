import { ParticleBackground } from './ParticleBackground';
import { ChevronDown } from 'lucide-react';
import { useStorage } from '@/hooks/useStorage';
import { DEFAULT_DATA } from '@/lib/defaultData';

export const Hero = () => {
  const { data: personal } = useStorage('portfolio-personal', DEFAULT_DATA.personal);

  const scrollToNext = () => {
    const heroHeight = window.innerHeight;
    window.scrollTo({ top: heroHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10 text-center px-4">
        {/* Animated Code Block */}
        <div 
          className="inline-block backdrop-blur-glass animate-pulse-glow mx-auto"
          style={{
            background: 'rgba(30, 30, 30, 0.9)',
            border: '2px solid rgba(0, 217, 255, 0.3)',
            padding: '1.5rem',
            borderRadius: '16px',
            boxShadow: '0 0 80px rgba(0, 217, 255, 0.2)',
            maxWidth: '90vw'
          }}
        >
          <pre className="text-left font-mono text-xs sm:text-sm md:text-base lg:text-lg" style={{ overflowX: 'auto' }}>
            <code>
              <span style={{ color: '#6a9955' }}>1</span>  <span style={{ color: '#c586c0' }}>while</span> (<span style={{ color: '#c586c0' }}>true</span>) {"{"}{'\n'}
              <span style={{ color: '#6a9955' }}>2</span>      <span style={{ color: '#dcdcaa' }}>learn</span>();{'\n'}
              <span style={{ color: '#6a9955' }}>3</span>      <span style={{ color: '#dcdcaa' }}>build</span>();{'\n'}
              <span style={{ color: '#6a9955' }}>4</span>      <span style={{ color: '#dcdcaa' }}>iterate</span>();{'\n'}
              <span style={{ color: '#6a9955' }}>5</span>  {"}"}
            </code>
          </pre>
        </div>

        {/* Name */}
        <h1 
          className="mt-12 font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ 
            color: '#e2e8f0',
            letterSpacing: '-0.03em'
          }}
        >
          {personal.name}
        </h1>

        {/* Tagline */}
        <p 
          className="mt-4 text-xl sm:text-2xl md:text-3xl"
          style={{ color: '#00d9ff' }}
        >
          {personal.tagline}
        </p>

        {/* Metadata */}
        <p 
          className="mt-6 font-mono text-sm sm:text-base"
          style={{ color: '#64748b' }}
        >
          // Iteration: ∞ | Running since {personal.iterationStartYear}
        </p>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle cursor-pointer z-10 hover:scale-110 transition-transform"
        aria-label="Scroll to next section"
      >
        <ChevronDown size={40} style={{ color: '#00d9ff' }} />
      </button>
    </section>
  );
};
