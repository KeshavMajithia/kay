import { useStorage } from '@/hooks/useStorage';
import { DEFAULT_DATA } from '@/lib/defaultData';
import { ExternalLink, Github, Video } from 'lucide-react';

export const ProjectsSection = () => {
  const { data: projects } = useStorage('portfolio-projects', DEFAULT_DATA.projects);

  return (
    <section id="build" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8" style={{ background: '#1a1a1a' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="font-mono text-base sm:text-lg md:text-xl lg:text-2xl mb-12 sm:mb-16 text-left max-w-full mx-auto" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          <code>
            <span style={{ color: '#c586c0' }}>function</span> <span style={{ color: '#dcdcaa' }}>build</span>() {"{"}{'\n'}
            {"    "}<span style={{ color: '#6a9955' }}>// Turn learning into tangible output</span>{'\n'}
            {"    "}<span style={{ color: '#c586c0' }}>return</span> projects.<span style={{ color: '#dcdcaa' }}>map</span>(idea {"=>"} shipping);{'\n'}
            {"}"}
          </code>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-xl hover-lift transition-all relative"
              style={{
                background: '#242424',
                border: '1px solid rgba(0, 217, 255, 0.15)'
              }}
            >
              {/* Iteration Badge */}
              <div 
                className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-mono"
                style={{
                  background: 'rgba(124, 58, 237, 0.2)',
                  color: '#7c3aed',
                  border: '1px solid rgba(124, 58, 237, 0.3)'
                }}
              >
                Iteration {project.iteration}
              </div>

              {/* Content */}
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-3" style={{ color: '#e2e8f0' }}>
                  {project.title}
                </h3>
                <p className="text-sm mb-4" style={{ color: '#94a3b8' }}>
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded text-xs font-mono"
                      style={{
                        background: 'rgba(0, 217, 255, 0.08)',
                        color: '#00d9ff',
                        border: '1px solid rgba(0, 217, 255, 0.2)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 mt-4">
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm transition-all hover:scale-105"
                      style={{ color: '#00d9ff' }}
                    >
                      <ExternalLink size={16} />
                      Demo
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm transition-all hover:scale-105"
                      style={{ color: '#00d9ff' }}
                    >
                      <Github size={16} />
                      GitHub
                    </a>
                  )}
                  {project.videoLink && (
                    <a
                      href={project.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm transition-all hover:scale-105"
                      style={{ color: '#00d9ff' }}
                    >
                      <Video size={16} />
                      Video
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
