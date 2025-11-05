import { useStorage } from '@/hooks/useStorage';
import { DEFAULT_DATA } from '@/lib/defaultData';
import { CheckCircle2, ExternalLink } from 'lucide-react';

export const SkillsSection = () => {
  const { data: education } = useStorage('portfolio-education', DEFAULT_DATA.education);
  const { data: certifications } = useStorage('portfolio-certifications', DEFAULT_DATA.certifications);
  const { data: skills } = useStorage('portfolio-skills', DEFAULT_DATA.skills);

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const categories = ['Languages', 'Frameworks', 'Cloud', 'Databases', 'Tools'];

  return (
    <section id="learn" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8" style={{ background: '#1a1a1a' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="font-mono text-base sm:text-lg md:text-xl lg:text-2xl mb-12 sm:mb-16 text-left max-w-full mx-auto" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          <code>
            <span style={{ color: '#c586c0' }}>function</span> <span style={{ color: '#dcdcaa' }}>learn</span>() {"{"}{'\n'}
            {"    "}<span style={{ color: '#6a9955' }}>// Knowledge compounds with every iteration</span>{'\n'}
            {"}"}
          </code>
        </div>

        {/* Education & Certifications Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Education Card */}
          <div 
            className="p-6 sm:p-8 rounded-xl hover-lift transition-all"
            style={{
              background: '#242424',
              border: '1px solid rgba(0, 217, 255, 0.2)'
            }}
          >
            <div className="text-3xl mb-4">🎓</div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: '#e2e8f0' }}>
              {education.institution}
            </h3>
            <p className="text-base sm:text-lg mb-2" style={{ color: '#94a3b8' }}>
              {education.degree}
            </p>
            <p className="text-sm italic mb-4" style={{ color: '#64748b' }}>
              {education.duration}
            </p>
            <div className="font-mono text-xs sm:text-sm" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              <code>
                <span style={{ color: '#c586c0' }}>import</span> {"{ "}
                <span style={{ color: '#9cdcfe' }}>{education.coursework}</span>
                {" }"} <span style={{ color: '#c586c0' }}>from</span> <span style={{ color: '#ce9178' }}>'coursework'</span>;
              </code>
            </div>
          </div>

          {/* Certifications Card */}
          <div 
            className="p-6 sm:p-8 rounded-xl hover-lift transition-all"
            style={{
              background: '#242424',
              border: '1px solid rgba(0, 217, 255, 0.2)'
            }}
          >
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 size={24} style={{ color: '#10b981' }} />
              <h3 className="text-xl sm:text-2xl font-bold" style={{ color: '#10b981' }}>
                Dependencies Installed
              </h3>
            </div>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div 
                  key={cert.id}
                  className="p-3 sm:p-4 rounded-lg transition-all hover:scale-105"
                  style={{
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}
                >
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0" style={{ color: '#10b981' }} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm sm:text-base" style={{ color: '#e2e8f0' }}>
                        {cert.title}
                      </p>
                      <p className="text-xs sm:text-sm font-mono mt-1" style={{ color: '#64748b' }}>
                        {cert.credentialId}
                      </p>
                      {cert.url && (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs sm:text-sm mt-1 transition-all hover:scale-105"
                          style={{ color: '#00d9ff' }}
                        >
                          <ExternalLink size={14} />
                          Verify
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: '#e2e8f0' }}>
            Tech Stack
          </h3>
          
          <div className="space-y-8">
            {categories.map((category) => (
              <div key={category}>
                <h4 className="font-mono text-sm uppercase tracking-wider mb-3" style={{ color: '#00d9ff' }}>
                  {category}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {skillsByCategory[category]?.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-4 py-2 rounded-full transition-all hover:scale-105"
                      style={{
                        background: 'rgba(0, 217, 255, 0.1)',
                        border: '1px solid rgba(0, 217, 255, 0.3)',
                        color: '#00d9ff',
                        boxShadow: '0 0 0 0 rgba(0, 217, 255, 0.4)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 0 0 rgba(0, 217, 255, 0.4)';
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
