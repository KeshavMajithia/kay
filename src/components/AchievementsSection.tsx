import { useStorage } from '@/hooks/useStorage';
import { DEFAULT_DATA } from '@/lib/defaultData';
import { Trophy, Rocket, Award, ExternalLink } from 'lucide-react';

export const AchievementsSection = () => {
  const { data: stats } = useStorage('portfolio-stats', DEFAULT_DATA.stats);
  const { data: achievements } = useStorage('portfolio-achievements', DEFAULT_DATA.achievements);

  return (
    <section id="iterate" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8" style={{ background: '#1a1a1a' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="font-mono text-base sm:text-lg md:text-xl lg:text-2xl mb-12 sm:mb-16 text-left max-w-full mx-auto" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          <code>
            <span style={{ color: '#c586c0' }}>function</span> <span style={{ color: '#dcdcaa' }}>iterate</span>() {"{"}{'\n'}
            {"    "}<span style={{ color: '#6a9955' }}>// Validate through challenges, refine through feedback</span>{'\n'}
            {"    "}achievements.<span style={{ color: '#dcdcaa' }}>push</span>(newWin);{'\n'}
            {"}"}
          </code>
        </div>

        {/* Stats Row */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <div 
            className="p-8 rounded-xl text-center hover-lift transition-all"
            style={{
              background: '#242424',
              border: '1px solid rgba(0, 217, 255, 0.2)'
            }}
          >
            <Trophy size={48} className="mx-auto mb-4" style={{ color: '#00d9ff' }} />
            <div className="text-4xl sm:text-5xl font-bold mb-2" style={{ color: '#00d9ff' }}>
              {stats.hackathonsWon}
            </div>
            <div className="text-sm" style={{ color: '#94a3b8' }}>
              Hackathons Won
            </div>
          </div>

          <div 
            className="p-8 rounded-xl text-center hover-lift transition-all"
            style={{
              background: '#242424',
              border: '1px solid rgba(0, 217, 255, 0.2)'
            }}
          >
            <Rocket size={48} className="mx-auto mb-4" style={{ color: '#00d9ff' }} />
            <div className="text-4xl sm:text-5xl font-bold mb-2" style={{ color: '#00d9ff' }}>
              {stats.projectsShipped}
            </div>
            <div className="text-sm" style={{ color: '#94a3b8' }}>
              Projects Shipped
            </div>
          </div>

          <div 
            className="p-8 rounded-xl text-center hover-lift transition-all"
            style={{
              background: '#242424',
              border: '1px solid rgba(0, 217, 255, 0.2)'
            }}
          >
            <Award size={48} className="mx-auto mb-4" style={{ color: '#00d9ff' }} />
            <div className="text-4xl sm:text-5xl font-bold mb-2" style={{ color: '#00d9ff' }}>
              {stats.certificationsEarned}
            </div>
            <div className="text-sm" style={{ color: '#94a3b8' }}>
              Certifications Earned
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="p-6 rounded-xl hover-lift transition-all relative"
              style={{
                background: '#242424',
                border: '1px solid rgba(0, 217, 255, 0.2)'
              }}
            >
              {/* Year Badge */}
              <div 
                className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-mono"
                style={{
                  background: 'rgba(0, 217, 255, 0.1)',
                  color: '#00d9ff',
                  border: '1px solid rgba(0, 217, 255, 0.3)'
                }}
              >
                {achievement.year}
              </div>

              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0">🏆</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: '#00d9ff' }}>
                    {achievement.award}
                  </h3>
                  <p className="text-base mb-1" style={{ color: '#e2e8f0' }}>
                    {achievement.event}
                  </p>
                  <p className="text-sm mb-2" style={{ color: '#94a3b8' }}>
                    {achievement.organizer}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm italic" style={{ color: '#7c3aed' }}>
                      Project: {achievement.project}
                    </p>
                    {achievement.projectLink && (
                      <a
                        href={achievement.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-all hover:scale-110"
                        style={{ color: '#00d9ff' }}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
