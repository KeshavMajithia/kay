import { useStorage } from '@/hooks/useStorage';
import { DEFAULT_DATA } from '@/lib/defaultData';

export const ExperienceSection = () => {
  const { data: experience } = useStorage('portfolio-experience', DEFAULT_DATA.experience);

  return (
    <section id="impact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8" style={{ background: '#1a1a1a' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="font-mono text-base sm:text-lg md:text-xl lg:text-2xl mb-12 sm:mb-16 text-left max-w-full mx-auto" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          <code>
            <span style={{ color: '#c586c0' }}>function</span> <span style={{ color: '#dcdcaa' }}>impact</span>() {"{"}{'\n'}
            {"    "}<span style={{ color: '#6a9955' }}>// Give back to the loop - help others iterate</span>{'\n'}
            {"}"}
          </code>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {experience.map((exp) => (
            <div
              key={exp.id}
              className="p-6 sm:p-8 rounded-xl hover-lift transition-all"
              style={{
                background: '#242424',
                borderLeft: '4px solid #00d9ff',
                paddingLeft: '2rem'
              }}
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2" style={{ color: '#00d9ff' }}>
                {exp.role}
              </h3>
              <p className="text-base sm:text-lg mb-2" style={{ color: '#e2e8f0' }}>
                {exp.organization}
              </p>
              <p className="text-xs sm:text-sm italic mb-4" style={{ color: '#64748b' }}>
                {exp.startDate} – {exp.isPresent ? 'Present' : exp.endDate}
              </p>
              <ul className="space-y-2">
                {exp.description.map((item, index) => (
                  <li 
                    key={index}
                    className="text-base flex items-start gap-3"
                    style={{ 
                      color: '#94a3b8',
                      lineHeight: '1.7'
                    }}
                  >
                    <span style={{ color: '#00d9ff' }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
