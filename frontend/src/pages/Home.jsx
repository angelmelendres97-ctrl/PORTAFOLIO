import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero.jsx';
import ProjectGrid from '../components/ProjectGrid.jsx';
import ContactChat from '../components/ContactChat.jsx';
import AboutSection from '../components/AboutSection.jsx';
import ProjectDetail from '../pages/ProjectDetail.jsx';
import PublicLayout from '../layout/PublicLayout.jsx';
import { fetchProjects, fetchSiteConfig } from '../services/portfolioService.js';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [configResponse, projectsResponse] = await Promise.all([
          fetchSiteConfig(),
          fetchProjects()
        ]);
        setConfig(configResponse);
        setProjects(projectsResponse);
      } catch (error) {
        console.error('Error cargando datos públicos', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading || !config) {
    return (
      <PublicLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <Hero config={config} />
      <ProjectGrid projects={projects} onProjectClick={setSelectedProject} />
      <AboutSection config={config} />
      <ContactChat config={config} />
      {selectedProject && (
        <ProjectDetail 
          projectId={selectedProject.id} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </PublicLayout>
  );
};

export default Home;
