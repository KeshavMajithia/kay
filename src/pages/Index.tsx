import { Hero } from '@/components/Hero';
import { Navigation } from '@/components/Navigation';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { AchievementsSection } from '@/components/AchievementsSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ContactSection } from '@/components/ContactSection';
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    // Console easter egg
    console.log('%cwhile(true) { keepBuilding(); }', 'color: #00d9ff; font-size: 16px; font-family: monospace;');
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <SkillsSection />
      <ProjectsSection />
      <AchievementsSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  );
};

export default Index;
