import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Save, Plus, Edit2, Trash2, X, ExternalLink } from 'lucide-react';
import { useStorage } from '@/hooks/useStorage';
import { DEFAULT_DATA } from '@/lib/defaultData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const ADMIN_PASSWORD = 'loop2024';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setShowPasswordModal(false);
      setPasswordError('');
      toast.success('Access granted!');
    } else {
      setPasswordError('Incorrect password. Try again.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowPasswordModal(true);
    setPassword('');
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div 
        className="fixed inset-0 flex items-center justify-center z-50"
        style={{ background: 'rgba(26, 26, 26, 0.98)' }}
      >
        <div 
          className="w-full max-w-md p-12 rounded-2xl"
          style={{
            background: '#242424',
            border: '1px solid rgba(0, 217, 255, 0.3)',
            boxShadow: '0 0 60px rgba(0, 217, 255, 0.2)'
          }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#00d9ff' }}>
            Admin Access
          </h2>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="text-lg py-6"
              style={{
                background: '#1a1a1a',
                border: '1px solid #2d2d2d',
                color: '#e2e8f0'
              }}
            />
            {passwordError && (
              <p className="text-sm" style={{ color: '#ef4444' }}>
                {passwordError}
              </p>
            )}
            <Button
              onClick={handleLogin}
              className="w-full py-6 text-lg"
              style={{
                background: '#00d9ff',
                color: '#1a1a1a'
              }}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#1a1a1a', minHeight: '100vh' }}>
      {/* Header */}
      <header 
        className="sticky top-0 z-50 backdrop-blur-glass"
        style={{
          background: 'rgba(36, 36, 36, 0.9)',
          borderBottom: '1px solid rgba(0, 217, 255, 0.2)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold font-mono" style={{ color: '#00d9ff' }}>
            Portfolio Admin Panel
          </h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </header>

      {/* Admin Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <PersonalInfoSection />
        <EducationSection />
        <CertificationsSection />
        <SkillsSection />
        <ProjectsSection />
        <AchievementsSection />
        <ExperienceSection />
        <StatsSection />
        <ContactSection />
      </div>
    </div>
  );
}

// Personal Info Section
function PersonalInfoSection() {
  const { data, saveData } = useStorage('portfolio-personal', DEFAULT_DATA.personal);
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleSave = async () => {
    try {
      await saveData(formData);
      toast.success('Personal info saved!');
    } catch (error) {
      toast.error('Failed to save personal info');
    }
  };

  return (
    <AdminCard title="Personal Information">
      <div className="grid sm:grid-cols-2 gap-4">
        <AdminInput
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <AdminInput
          label="Tagline"
          value={formData.tagline}
          onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
        />
        <AdminInput
          label="Current Status"
          value={formData.currentStatus}
          onChange={(e) => setFormData({ ...formData, currentStatus: e.target.value })}
        />
        <AdminInput
          label="Iteration Start Year"
          type="number"
          value={formData.iterationStartYear.toString()}
          onChange={(e) => setFormData({ ...formData, iterationStartYear: parseInt(e.target.value) })}
        />
        <AdminInput
          label="Currently Learning"
          value={formData.currentlyLearning}
          onChange={(e) => setFormData({ ...formData, currentlyLearning: e.target.value })}
        />
        <AdminInput
          label="Last Deployed"
          value={formData.lastDeployed}
          onChange={(e) => setFormData({ ...formData, lastDeployed: e.target.value })}
        />
        <AdminInput
          label="Next Iteration"
          value={formData.nextIteration}
          onChange={(e) => setFormData({ ...formData, nextIteration: e.target.value })}
          className="sm:col-span-2"
        />
      </div>
      <Button onClick={handleSave} className="mt-4">
        <Save size={18} className="mr-2" />
        Save Personal Info
      </Button>
    </AdminCard>
  );
}

// Education Section
function EducationSection() {
  const { data, saveData } = useStorage('portfolio-education', DEFAULT_DATA.education);
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleSave = async () => {
    try {
      await saveData(formData);
      toast.success('Education saved!');
    } catch (error) {
      toast.error('Failed to save education');
    }
  };

  return (
    <AdminCard title="Education">
      <div className="space-y-4">
        <AdminInput
          label="Institution"
          value={formData.institution}
          onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
        />
        <AdminInput
          label="Degree"
          value={formData.degree}
          onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
        />
        <AdminInput
          label="Duration"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
        />
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#94a3b8' }}>
            Coursework (comma-separated)
          </label>
          <Textarea
            value={formData.coursework}
            onChange={(e) => setFormData({ ...formData, coursework: e.target.value })}
            rows={3}
            style={{
              background: '#1a1a1a',
              border: '1px solid #2d2d2d',
              color: '#e2e8f0'
            }}
          />
        </div>
      </div>
      <Button onClick={handleSave} className="mt-4">
        <Save size={18} className="mr-2" />
        Save Education
      </Button>
    </AdminCard>
  );
}

// Certifications Section (CRUD)
function CertificationsSection() {
  const { data: certifications, saveData } = useStorage('portfolio-certifications', DEFAULT_DATA.certifications);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', credentialId: '', url: '' });

  const handleAdd = async () => {
    if (!formData.title || !formData.credentialId) {
      toast.error('Please fill all fields');
      return;
    }
    try {
      const newCert = {
        id: Date.now().toString(),
        ...formData
      };
      await saveData([...certifications, newCert]);
      setFormData({ title: '', credentialId: '', url: '' });
      toast.success('Certification added!');
    } catch (error) {
      toast.error('Failed to add certification');
    }
  };

  const handleUpdate = async (id: string) => {
    if (!formData.title || !formData.credentialId) {
      toast.error('Please fill all fields');
      return;
    }
    try {
      const updated = certifications.map(cert =>
        cert.id === id ? { ...cert, ...formData } : cert
      );
      await saveData(updated);
      setEditing(null);
      setFormData({ title: '', credentialId: '', url: '' });
      toast.success('Certification updated!');
    } catch (error) {
      toast.error('Failed to update certification');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this certification?')) return;
    try {
      const updated = certifications.filter(cert => cert.id !== id);
      await saveData(updated);
      toast.success('Certification deleted!');
    } catch (error) {
      toast.error('Failed to delete certification');
    }
  };

  const startEdit = (cert: any) => {
    setEditing(cert.id);
    setFormData({ title: cert.title, credentialId: cert.credentialId, url: cert.url || '' });
  };

  return (
    <AdminCard title="Certifications">
      {/* List */}
      <div className="space-y-3 mb-6">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="p-4 rounded-lg flex justify-between items-center"
            style={{ background: '#1a1a1a', border: '1px solid #2d2d2d' }}
          >
            {editing === cert.id ? (
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    style={{ background: '#242424', border: '1px solid #2d2d2d', color: '#e2e8f0' }}
                  />
                  <Input
                    placeholder="Credential ID"
                    value={formData.credentialId}
                    onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                    style={{ background: '#242424', border: '1px solid #2d2d2d', color: '#e2e8f0' }}
                  />
                  <Input
                    placeholder="Certificate URL (optional)"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="col-span-2"
                    style={{ background: '#242424', border: '1px solid #2d2d2d', color: '#e2e8f0' }}
                  />
                </div>
            ) : (
              <div>
                <p className="font-medium" style={{ color: '#e2e8f0' }}>{cert.title}</p>
                <p className="text-sm" style={{ color: '#64748b' }}>{cert.credentialId}</p>
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs mt-1"
                    style={{ color: '#00d9ff' }}
                  >
                    <ExternalLink size={14} />
                    Verify certificate
                  </a>
                )}
              </div>
            )}
            <div className="flex gap-2 ml-4">
              {editing === cert.id ? (
                <>
                  <Button size="sm" onClick={() => handleUpdate(cert.id)}>
                    <Save size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditing(null);
                      setFormData({ title: '', credentialId: '', url: '' });
                    }}
                  >
                    <X size={16} />
                  </Button>
                </>
              ) : (
                <>
                  <Button size="sm" variant="outline" onClick={() => startEdit(cert)}>
                    <Edit2 size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(cert.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Form */}
      {!editing && (
        <div className="grid grid-cols-2 gap-3">
          <Input
            placeholder="Certification Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            style={{ background: '#1a1a1a', border: '1px solid #2d2d2d', color: '#e2e8f0' }}
          />
          <Input
            placeholder="Credential ID"
            value={formData.credentialId}
            onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
            style={{ background: '#1a1a1a', border: '1px solid #2d2d2d', color: '#e2e8f0' }}
          />
          <Input
            placeholder="Certificate URL (optional)"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            className="col-span-2"
            style={{ background: '#1a1a1a', border: '1px solid #2d2d2d', color: '#e2e8f0' }}
          />
          <Button onClick={handleAdd} className="col-span-2">
            <Plus size={18} className="mr-2" />
            Add Certification
          </Button>
        </div>
      )}
    </AdminCard>
  );
}

// Skills Section - similar CRUD pattern
function SkillsSection() {
  const { data: skills, saveData } = useStorage('portfolio-skills', DEFAULT_DATA.skills);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', category: 'Languages' });

  const categories = ['Languages', 'Frameworks', 'Cloud', 'Databases', 'Tools'];

  const handleAdd = async () => {
    if (!formData.name) {
      toast.error('Please enter a skill name');
      return;
    }
    try {
      const newSkill = {
        id: Date.now().toString(),
        ...formData
      };
      await saveData([...skills, newSkill]);
      setFormData({ name: '', category: 'Languages' });
      toast.success('Skill added!');
    } catch (error) {
      toast.error('Failed to add skill');
    }
  };

  const handleUpdate = async (id: string) => {
    if (!formData.name) {
      toast.error('Please enter a skill name');
      return;
    }
    try {
      const updated = skills.map(skill =>
        skill.id === id ? { ...skill, ...formData } : skill
      );
      await saveData(updated);
      setEditing(null);
      setFormData({ name: '', category: 'Languages' });
      toast.success('Skill updated!');
    } catch (error) {
      toast.error('Failed to update skill');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill?')) return;
    try {
      const updated = skills.filter(skill => skill.id !== id);
      await saveData(updated);
      toast.success('Skill deleted!');
    } catch (error) {
      toast.error('Failed to delete skill');
    }
  };

  const startEdit = (skill: any) => {
    setEditing(skill.id);
    setFormData({ name: skill.name, category: skill.category });
  };

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <AdminCard title="Skills">
      {/* List by Category */}
      <div className="space-y-4 mb-6">
        {categories.map((category) => (
          <div key={category}>
            <h4 className="font-mono text-sm mb-2" style={{ color: '#00d9ff' }}>
              {category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {skillsByCategory[category]?.map((skill) => (
                <div
                  key={skill.id}
                  className="px-3 py-1 rounded-full flex items-center gap-2"
                  style={{
                    background: 'rgba(0, 217, 255, 0.1)',
                    border: '1px solid rgba(0, 217, 255, 0.3)',
                    color: '#00d9ff'
                  }}
                >
                  {editing === skill.id ? (
                    <>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-32 h-6"
                        style={{ background: '#1a1a1a', fontSize: '0.875rem' }}
                      />
                      <button onClick={() => handleUpdate(skill.id)}>
                        <Save size={14} />
                      </button>
                      <button onClick={() => setEditing(null)}>
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <>
                      <span>{skill.name}</span>
                      <button onClick={() => startEdit(skill)}>
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(skill.id)}>
                        <Trash2 size={14} />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Form */}
      {!editing && (
        <div className="grid grid-cols-3 gap-3">
          <Input
            placeholder="Skill Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="col-span-2"
            style={{ background: '#1a1a1a', border: '1px solid #2d2d2d', color: '#e2e8f0' }}
          />
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="px-3 py-2 rounded-md"
            style={{ background: '#1a1a1a', border: '1px solid #2d2d2d', color: '#e2e8f0' }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <Button onClick={handleAdd} className="col-span-3">
            <Plus size={18} className="mr-2" />
            Add Skill
          </Button>
        </div>
      )}
    </AdminCard>
  );
}

// Similar CRUD sections for Projects, Achievements, Experience
function ProjectsSection() {
  const { data: projects, saveData } = useStorage('portfolio-projects', DEFAULT_DATA.projects);
  const [editing, setEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    demoLink: '',
    githubLink: '',
    videoLink: '',
    featured: false,
    iteration: 1
  });

  const handleAdd = async () => {
    if (!formData.title || !formData.description) {
      toast.error('Please fill required fields');
      return;
    }
    try {
      const newProject = {
        id: Date.now().toString(),
        ...formData,
        techStack: formData.techStack.split(',').map(t => t.trim()).filter(Boolean)
      };
      await saveData([...projects, newProject]);
      setFormData({
        title: '',
        description: '',
        techStack: '',
        demoLink: '',
        githubLink: '',
        videoLink: '',
        featured: false,
        iteration: 1
      });
      setIsAdding(false);
      toast.success('Project added!');
    } catch (error) {
      toast.error('Failed to add project');
    }
  };

  const handleUpdate = async (id: string) => {
    if (!formData.title || !formData.description) {
      toast.error('Please fill required fields');
      return;
    }
    try {
      const updated = projects.map(project =>
        project.id === id ? {
          ...project,
          ...formData,
          techStack: formData.techStack.split(',').map(t => t.trim()).filter(Boolean)
        } : project
      );
      await saveData(updated);
      setEditing(null);
      toast.success('Project updated!');
    } catch (error) {
      toast.error('Failed to update project');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    try {
      const updated = projects.filter(project => project.id !== id);
      await saveData(updated);
      toast.success('Project deleted!');
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  const startEdit = (project: any) => {
    setEditing(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      techStack: project.techStack.join(', '),
      demoLink: project.demoLink || '',
      githubLink: project.githubLink || '',
      videoLink: project.videoLink || '',
      featured: project.featured || false,
      iteration: project.iteration || 1
    });
  };

  return (
    <AdminCard title="Projects">
      {/* List */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-4 rounded-lg"
            style={{ background: '#1a1a1a', border: '1px solid #2d2d2d' }}
          >
            <h3 className="font-bold mb-2" style={{ color: '#e2e8f0' }}>{project.title}</h3>
            <p className="text-sm mb-2" style={{ color: '#94a3b8' }}>{project.description}</p>
            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="outline" onClick={() => startEdit(project)}>
                <Edit2 size={16} className="mr-1" /> Edit
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(project.id)}>
                <Trash2 size={16} className="mr-1" /> Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editing) && (
        <div className="space-y-4 p-6 rounded-lg mb-4" style={{ background: '#1a1a1a', border: '1px solid rgba(0, 217, 255, 0.2)' }}>
          <AdminInput label="Title *" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#94a3b8' }}>Description *</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              style={{ background: '#242424', border: '1px solid #2d2d2d', color: '#e2e8f0' }}
            />
          </div>
          <AdminInput label="Tech Stack (comma-separated)" value={formData.techStack} onChange={(e) => setFormData({ ...formData, techStack: e.target.value })} />
          <div className="grid sm:grid-cols-2 gap-4">
            <AdminInput label="Demo Link" value={formData.demoLink} onChange={(e) => setFormData({ ...formData, demoLink: e.target.value })} />
            <AdminInput label="GitHub Link" value={formData.githubLink} onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })} />
          </div>
          <AdminInput label="Video Link" value={formData.videoLink} onChange={(e) => setFormData({ ...formData, videoLink: e.target.value })} />
          <div className="grid sm:grid-cols-2 gap-4">
            <AdminInput label="Iteration" type="number" value={formData.iteration.toString()} onChange={(e) => setFormData({ ...formData, iteration: parseInt(e.target.value) || 1 })} />
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4"
              />
              <label style={{ color: '#94a3b8' }}>Featured</label>
            </div>
          </div>
          <div className="flex gap-2">
            {editing ? (
              <>
                <Button onClick={() => handleUpdate(editing)}><Save size={16} className="mr-2" /> Update</Button>
                <Button variant="outline" onClick={() => { setEditing(null); setFormData({ title: '', description: '', techStack: '', demoLink: '', githubLink: '', videoLink: '', featured: false, iteration: 1 }); }}><X size={16} className="mr-2" /> Cancel</Button>
              </>
            ) : (
              <>
                <Button onClick={handleAdd}><Save size={16} className="mr-2" /> Add Project</Button>
                <Button variant="outline" onClick={() => { setIsAdding(false); setFormData({ title: '', description: '', techStack: '', demoLink: '', githubLink: '', videoLink: '', featured: false, iteration: 1 }); }}><X size={16} className="mr-2" /> Cancel</Button>
              </>
            )}
          </div>
        </div>
      )}

      {!isAdding && !editing && (
        <Button onClick={() => setIsAdding(true)}>
          <Plus size={18} className="mr-2" />
          Add New Project
        </Button>
      )}
    </AdminCard>
  );
}

function AchievementsSection() {
  const { data: achievements, saveData } = useStorage('portfolio-achievements', DEFAULT_DATA.achievements);
  const [editing, setEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    award: '',
    event: '',
    organizer: '',
    project: '',
    year: new Date().getFullYear().toString(),
    projectLink: ''
  });

  const handleAdd = async () => {
    if (!formData.award || !formData.event) {
      toast.error('Please fill required fields');
      return;
    }
    try {
      const newAchievement = {
        id: Date.now().toString(),
        ...formData
      };
      await saveData([...achievements, newAchievement]);
      setFormData({ award: '', event: '', organizer: '', project: '', year: new Date().getFullYear().toString(), projectLink: '' });
      setIsAdding(false);
      toast.success('Achievement added!');
    } catch (error) {
      toast.error('Failed to add achievement');
    }
  };

  const handleUpdate = async (id: string) => {
    if (!formData.award || !formData.event) {
      toast.error('Please fill required fields');
      return;
    }
    try {
      const updated = achievements.map(achievement =>
        achievement.id === id ? { ...achievement, ...formData } : achievement
      );
      await saveData(updated);
      setEditing(null);
      toast.success('Achievement updated!');
    } catch (error) {
      toast.error('Failed to update achievement');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this achievement?')) return;
    try {
      const updated = achievements.filter(achievement => achievement.id !== id);
      await saveData(updated);
      toast.success('Achievement deleted!');
    } catch (error) {
      toast.error('Failed to delete achievement');
    }
  };

  const startEdit = (achievement: any) => {
    setEditing(achievement.id);
    setFormData({
      award: achievement.award,
      event: achievement.event,
      organizer: achievement.organizer,
      project: achievement.project,
      year: achievement.year,
      projectLink: achievement.projectLink || ''
    });
  };

  return (
    <AdminCard title="Achievements">
      {/* List */}
      <div className="space-y-3 mb-6">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="p-4 rounded-lg"
            style={{ background: '#1a1a1a', border: '1px solid #2d2d2d' }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold" style={{ color: '#00d9ff' }}>{achievement.award}</h3>
                <p className="text-sm" style={{ color: '#e2e8f0' }}>{achievement.event}</p>
                <p className="text-xs" style={{ color: '#64748b' }}>{achievement.organizer} | {achievement.year}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => startEdit(achievement)}>
                  <Edit2 size={16} />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(achievement.id)}>
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editing) && (
        <div className="space-y-4 p-6 rounded-lg mb-4" style={{ background: '#1a1a1a', border: '1px solid rgba(0, 217, 255, 0.2)' }}>
          <AdminInput label="Award *" value={formData.award} onChange={(e) => setFormData({ ...formData, award: e.target.value })} />
          <AdminInput label="Event *" value={formData.event} onChange={(e) => setFormData({ ...formData, event: e.target.value })} />
          <div className="grid sm:grid-cols-2 gap-4">
            <AdminInput label="Organizer" value={formData.organizer} onChange={(e) => setFormData({ ...formData, organizer: e.target.value })} />
            <AdminInput label="Year" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} />
          </div>
          <AdminInput label="Project Name" value={formData.project} onChange={(e) => setFormData({ ...formData, project: e.target.value })} />
          <AdminInput label="Project Link" value={formData.projectLink} onChange={(e) => setFormData({ ...formData, projectLink: e.target.value })} />
          <div className="flex gap-2">
            {editing ? (
              <>
                <Button onClick={() => handleUpdate(editing)}><Save size={16} className="mr-2" /> Update</Button>
                <Button variant="outline" onClick={() => { setEditing(null); setFormData({ award: '', event: '', organizer: '', project: '', year: new Date().getFullYear().toString(), projectLink: '' }); }}><X size={16} className="mr-2" /> Cancel</Button>
              </>
            ) : (
              <>
                <Button onClick={handleAdd}><Save size={16} className="mr-2" /> Add Achievement</Button>
                <Button variant="outline" onClick={() => { setIsAdding(false); setFormData({ award: '', event: '', organizer: '', project: '', year: new Date().getFullYear().toString(), projectLink: '' }); }}><X size={16} className="mr-2" /> Cancel</Button>
              </>
            )}
          </div>
        </div>
      )}

      {!isAdding && !editing && (
        <Button onClick={() => setIsAdding(true)}>
          <Plus size={18} className="mr-2" />
          Add New Achievement
        </Button>
      )}
    </AdminCard>
  );
}

function ExperienceSection() {
  const { data: experience, saveData } = useStorage('portfolio-experience', DEFAULT_DATA.experience);
  const [editing, setEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    role: '',
    organization: '',
    description: '',
    startDate: '',
    endDate: '',
    isPresent: false
  });

  const handleAdd = async () => {
    if (!formData.role || !formData.organization) {
      toast.error('Please fill required fields');
      return;
    }
    try {
      const newExp = {
        id: Date.now().toString(),
        ...formData,
        description: formData.description.split('\n').filter(Boolean)
      };
      await saveData([...experience, newExp]);
      setFormData({ role: '', organization: '', description: '', startDate: '', endDate: '', isPresent: false });
      setIsAdding(false);
      toast.success('Experience added!');
    } catch (error) {
      toast.error('Failed to add experience');
    }
  };

  const handleUpdate = async (id: string) => {
    if (!formData.role || !formData.organization) {
      toast.error('Please fill required fields');
      return;
    }
    try {
      const updated = experience.map(exp =>
        exp.id === id ? {
          ...exp,
          ...formData,
          description: formData.description.split('\n').filter(Boolean)
        } : exp
      );
      await saveData(updated);
      setEditing(null);
      toast.success('Experience updated!');
    } catch (error) {
      toast.error('Failed to update experience');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this experience?')) return;
    try {
      const updated = experience.filter(exp => exp.id !== id);
      await saveData(updated);
      toast.success('Experience deleted!');
    } catch (error) {
      toast.error('Failed to delete experience');
    }
  };

  const startEdit = (exp: any) => {
    setEditing(exp.id);
    setFormData({
      role: exp.role,
      organization: exp.organization,
      description: exp.description.join('\n'),
      startDate: exp.startDate,
      endDate: exp.endDate,
      isPresent: exp.isPresent || false
    });
  };

  return (
    <AdminCard title="Experience">
      {/* List */}
      <div className="space-y-4 mb-6">
        {experience.map((exp) => (
          <div
            key={exp.id}
            className="p-4 rounded-lg"
            style={{ background: '#1a1a1a', border: '1px solid #2d2d2d' }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold" style={{ color: '#00d9ff' }}>{exp.role}</h3>
                <p className="text-sm" style={{ color: '#e2e8f0' }}>{exp.organization}</p>
                <p className="text-xs" style={{ color: '#64748b' }}>{exp.startDate} - {exp.isPresent ? 'Present' : exp.endDate}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => startEdit(exp)}>
                  <Edit2 size={16} />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(exp.id)}>
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editing) && (
        <div className="space-y-4 p-6 rounded-lg mb-4" style={{ background: '#1a1a1a', border: '1px solid rgba(0, 217, 255, 0.2)' }}>
          <AdminInput label="Role *" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
          <AdminInput label="Organization *" value={formData.organization} onChange={(e) => setFormData({ ...formData, organization: e.target.value })} />
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#94a3b8' }}>
              Description (one point per line)
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={5}
              placeholder="Led team of 8 developers&#10;Implemented CI/CD pipelines&#10;Reduced deployment time by 60%"
              style={{ background: '#242424', border: '1px solid #2d2d2d', color: '#e2e8f0' }}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <AdminInput label="Start Date" placeholder="Jan 2023" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
            <AdminInput label="End Date" placeholder="Dec 2023" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} disabled={formData.isPresent} />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isPresent}
              onChange={(e) => setFormData({ ...formData, isPresent: e.target.checked, endDate: e.target.checked ? '' : formData.endDate })}
              className="w-4 h-4"
            />
            <label style={{ color: '#94a3b8' }}>Currently working here</label>
          </div>
          <div className="flex gap-2">
            {editing ? (
              <>
                <Button onClick={() => handleUpdate(editing)}><Save size={16} className="mr-2" /> Update</Button>
                <Button variant="outline" onClick={() => { setEditing(null); setFormData({ role: '', organization: '', description: '', startDate: '', endDate: '', isPresent: false }); }}><X size={16} className="mr-2" /> Cancel</Button>
              </>
            ) : (
              <>
                <Button onClick={handleAdd}><Save size={16} className="mr-2" /> Add Experience</Button>
                <Button variant="outline" onClick={() => { setIsAdding(false); setFormData({ role: '', organization: '', description: '', startDate: '', endDate: '', isPresent: false }); }}><X size={16} className="mr-2" /> Cancel</Button>
              </>
            )}
          </div>
        </div>
      )}

      {!isAdding && !editing && (
        <Button onClick={() => setIsAdding(true)}>
          <Plus size={18} className="mr-2" />
          Add New Experience
        </Button>
      )}
    </AdminCard>
  );
}

function StatsSection() {
  const { data, saveData } = useStorage('portfolio-stats', DEFAULT_DATA.stats);
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleSave = async () => {
    try {
      await saveData(formData);
      toast.success('Stats saved!');
    } catch (error) {
      toast.error('Failed to save stats');
    }
  };

  return (
    <AdminCard title="Statistics">
      <div className="grid sm:grid-cols-3 gap-4">
        <AdminInput
          label="Hackathons Won"
          type="number"
          value={formData.hackathonsWon.toString()}
          onChange={(e) => setFormData({ ...formData, hackathonsWon: parseInt(e.target.value) || 0 })}
        />
        <AdminInput
          label="Projects Shipped"
          type="number"
          value={formData.projectsShipped.toString()}
          onChange={(e) => setFormData({ ...formData, projectsShipped: parseInt(e.target.value) || 0 })}
        />
        <AdminInput
          label="Certifications Earned"
          type="number"
          value={formData.certificationsEarned.toString()}
          onChange={(e) => setFormData({ ...formData, certificationsEarned: parseInt(e.target.value) || 0 })}
        />
      </div>
      <Button onClick={handleSave} className="mt-4">
        <Save size={18} className="mr-2" />
        Save Stats
      </Button>
    </AdminCard>
  );
}

function ContactSection() {
  const { data, saveData } = useStorage('portfolio-contact', DEFAULT_DATA.contact);
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleSave = async () => {
    try {
      await saveData(formData);
      toast.success('Contact info saved!');
    } catch (error) {
      toast.error('Failed to save contact info');
    }
  };

  return (
    <AdminCard title="Contact Information">
      <div className="grid sm:grid-cols-2 gap-4">
        <AdminInput
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <AdminInput
          label="LinkedIn URL"
          value={formData.linkedIn}
          onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
        />
        <AdminInput
          label="GitHub URL"
          value={formData.github}
          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
        />
        <AdminInput
          label="Devpost URL"
          value={formData.devpost}
          onChange={(e) => setFormData({ ...formData, devpost: e.target.value })}
        />
        <AdminInput
          label="Resume PDF URL"
          value={formData.resumeUrl}
          onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
          className="sm:col-span-2"
        />
      </div>
      <Button onClick={handleSave} className="mt-4">
        <Save size={18} className="mr-2" />
        Save Contact Info
      </Button>
    </AdminCard>
  );
}

// Helper Components
function AdminCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div 
      className="p-6 sm:p-8 rounded-xl"
      style={{
        background: '#242424',
        border: '1px solid rgba(0, 217, 255, 0.2)'
      }}
    >
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#00d9ff' }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function AdminInput({ 
  label, 
  className = '',
  ...props 
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium mb-2" style={{ color: '#94a3b8' }}>
        {label}
      </label>
      <Input
        {...props}
        style={{
          background: '#1a1a1a',
          border: '1px solid #2d2d2d',
          color: '#e2e8f0'
        }}
      />
    </div>
  );
}
