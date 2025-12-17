
"use client";

import { useState, useEffect } from "react";
import { 
  User, Briefcase, Award, Loader2, Plus, Trash2, Edit2, Save, X, 
  AlertTriangle, GraduationCap, Code2, Globe, MapPin, Mail, Phone, 
  Github, Linkedin, ChevronDown, ChevronUp, LayoutGrid 
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---
interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}

interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
}

interface Skill {
  name: string;
  category: string;
}

interface Profile {
  name: string;
  title: string;
  university: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
}

interface Project {
  _id?: string;
  title: string;
  description: string;
  technologies: string[];
  liveLink: string;
  githubLink: string;
  order: number;
}

interface Achievement {
  _id?: string;
  title: string;
  description: string;
  date: string;
  organization: string;
}

// --- Reusable Components ---

const SectionHeader = ({ icon: Icon, title, action }: { icon: any, title: string, action?: React.ReactNode }) => (
  <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#262626]">
    <div className="flex items-center gap-3 text-white">
      <div className="p-2 bg-[#2563eb]/10 rounded-lg">
        <Icon className="w-5 h-5 text-[#2563eb]" />
      </div>
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
    {action}
  </div>
);

const InputGroup = ({ label, children }: { label: string, children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">{label}</label>
    {children}
  </div>
);

// --- Profile Tab ---

function ProfileTab() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/profile")
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data) => {
        if (data.success && data.data) {
             const p = data.data;
             // Ensure arrays exist
             setProfile({
                 ...p,
                 education: p.education || [],
                 experience: p.experience || [],
                 skills: p.skills || []
             });
        }
        else setProfile({
            name: "", title: "", university: "", bio: "", email: "", phone: "", location: "", github: "", linkedin: "",
            education: [], experience: [], skills: []
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    try {
        await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
        });
        alert("Profile saved successfully!");
    } catch(e) {
        alert("Failed to save profile.");
    }
    setSaving(false);
  };

  // Helper to update profile fields
  const updateProfile = (field: keyof Profile, value: any) => {
    if (profile) setProfile({ ...profile, [field]: value });
  };

  // Array helpers
  const addItem = <T,>(field: keyof Profile, item: T) => {
     if (profile) setProfile({ ...profile, [field]: [...(profile[field] as T[]), item] });
  };
  
  const removeItem = (field: keyof Profile, index: number) => {
      if (!profile) return;
      const arr = [...(profile[field] as any[])];
      arr.splice(index, 1);
      setProfile({ ...profile, [field]: arr });
  };

  const updateItem = (field: keyof Profile, index: number, subField: string, value: string) => {
      if (!profile) return;
      const arr = [...(profile[field] as any[])];
      arr[index] = { ...arr[index], [subField]: value };
      setProfile({ ...profile, [field]: arr });
  };

  if (loading) return <div className="flex h-64 items-center justify-center text-white"><Loader2 className="animate-spin w-8 h-8 text-[#2563eb]" /></div>;
  if (!profile) return <div className="text-red-500">Failed to load profile.</div>;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-24">
      
      {/* Identity Section */}
      <div className="card">
        <SectionHeader icon={User} title="Identity" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <InputGroup label="Full Name">
             <input className="input-field" value={profile.name} onChange={e => updateProfile("name", e.target.value)} />
           </InputGroup>
           <InputGroup label="Job Title">
             <input className="input-field" value={profile.title} onChange={e => updateProfile("title", e.target.value)} />
           </InputGroup>
           <div className="md:col-span-2">
            <InputGroup label="Bio">
                <textarea className="input-field h-24 resize-none" value={profile.bio} onChange={e => updateProfile("bio", e.target.value)} />
            </InputGroup>
           </div>
        </div>
      </div>

      {/* Contact & Socials */}
      <div className="card">
          <SectionHeader icon={Globe} title="Contact & Socials" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup label="Email">
                <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    <input className="input-field pl-10" value={profile.email} onChange={e => updateProfile("email", e.target.value)} />
                </div>
            </InputGroup>
            <InputGroup label="Phone">
                <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    <input className="input-field pl-10" value={profile.phone} onChange={e => updateProfile("phone", e.target.value)} />
                </div>
            </InputGroup>
             <InputGroup label="Location">
                <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    <input className="input-field pl-10" value={profile.location} onChange={e => updateProfile("location", e.target.value)} />
                </div>
            </InputGroup>
             <InputGroup label="University">
                <div className="relative">
                    <GraduationCap className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    <input className="input-field pl-10" value={profile.university} onChange={e => updateProfile("university", e.target.value)} />
                </div>
            </InputGroup>
            <InputGroup label="GitHub">
                <div className="relative">
                    <Github className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    <input className="input-field pl-10" value={profile.github} onChange={e => updateProfile("github", e.target.value)} />
                </div>
            </InputGroup>
            <InputGroup label="LinkedIn">
                <div className="relative">
                    <Linkedin className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    <input className="input-field pl-10" value={profile.linkedin} onChange={e => updateProfile("linkedin", e.target.value)} />
                </div>
            </InputGroup>
          </div>
      </div>

      {/* Education */}
      <div className="card">
        <SectionHeader 
            icon={GraduationCap} 
            title="Education" 
            action={<button onClick={() => addItem("education", { institution: "", degree: "", startDate: "", endDate: "" })} className="btn-sm"><Plus className="w-4 h-4" /> Add</button>}
        />
        <div className="space-y-4">
            {profile.education.map((edu, idx) => (
                <div key={idx} className="group relative bg-[#0a0a0a] p-4 rounded-lg border border-[#333] hover:border-[#2563eb] transition-colors">
                    <button onClick={() => removeItem("education", idx)} className="absolute top-2 right-2 p-2 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-4 h-4" /></button>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="lg:col-span-2"><input className="input-field-sm" placeholder="Institution" value={edu.institution} onChange={e => updateItem("education", idx, "institution", e.target.value)} /></div>
                        <div className="lg:col-span-2"><input className="input-field-sm" placeholder="Degree" value={edu.degree} onChange={e => updateItem("education", idx, "degree", e.target.value)} /></div>
                        <div><input className="input-field-sm" type="text" placeholder="Start Date (e.g. 2020)" value={edu.startDate} onChange={e => updateItem("education", idx, "startDate", e.target.value)} /></div>
                        <div><input className="input-field-sm" type="text" placeholder="End Date (e.g. 2024)" value={edu.endDate} onChange={e => updateItem("education", idx, "endDate", e.target.value)} /></div>
                    </div>
                </div>
            ))}
            {profile.education.length === 0 && <div className="text-gray-500 text-center py-4 italic">No education added yet.</div>}
        </div>
      </div>

      {/* Experience */}
      <div className="card">
        <SectionHeader 
            icon={Briefcase} 
            title="Experience" 
            action={<button onClick={() => addItem("experience", { company: "", role: "", duration: "", description: "" })} className="btn-sm"><Plus className="w-4 h-4" /> Add</button>}
        />
        <div className="space-y-4">
            {profile.experience.map((exp, idx) => (
                <div key={idx} className="group relative bg-[#0a0a0a] p-4 rounded-lg border border-[#333] hover:border-[#2563eb] transition-colors">
                    <button onClick={() => removeItem("experience", idx)} className="absolute top-2 right-2 p-2 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-4 h-4" /></button>
                    <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input className="input-field-sm" placeholder="Company" value={exp.company} onChange={e => updateItem("experience", idx, "company", e.target.value)} />
                            <input className="input-field-sm" placeholder="Role" value={exp.role} onChange={e => updateItem("experience", idx, "role", e.target.value)} />
                            <input className="input-field-sm" placeholder="Duration" value={exp.duration} onChange={e => updateItem("experience", idx, "duration", e.target.value)} />
                        </div>
                        <textarea className="input-field-sm h-20 resize-none" placeholder="Description" value={exp.description} onChange={e => updateItem("experience", idx, "description", e.target.value)} />
                    </div>
                </div>
            ))}
             {profile.experience.length === 0 && <div className="text-gray-500 text-center py-4 italic">No experience added yet.</div>}
        </div>
      </div>

      {/* Skills */}
      <div className="card">
        <SectionHeader 
            icon={Code2} 
            title="Skills" 
            action={<button onClick={() => addItem("skills", { name: "", category: "Frontend" })} className="btn-sm"><Plus className="w-4 h-4" /> Add</button>}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {profile.skills.map((skill, idx) => (
                <div key={idx} className="group flex items-center gap-2 bg-[#0a0a0a] p-2 rounded border border-[#333] hover:border-[#2563eb] transition-colors">
                     <input className="bg-transparent text-white text-sm w-full outline-none px-2" placeholder="Skill Name" value={skill.name} onChange={e => updateItem("skills", idx, "name", e.target.value)} />
                     <select 
                        className="bg-[#1a1a1a] text-gray-400 text-xs border border-[#333] rounded px-1 py-1 outline-none"
                        value={skill.category}
                        onChange={e => updateItem("skills", idx, "category", e.target.value)}
                     >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="DevOps">DevOps</option>
                        <option value="Tools">Tools</option>
                        <option value="Other">Other</option>
                    </select>
                    <button onClick={() => removeItem("skills", idx)} className="text-gray-500 hover:text-red-500 p-1 rounded opacity-0 group-hover:opacity-100"><Trash2 className="w-3 h-3" /></button>
                </div>
            ))}
        </div>
        {profile.skills.length === 0 && <div className="text-gray-500 text-center py-4 italic">No skills added yet.</div>}
      </div>

       {/* Floating Save Button */}
       <div className="fixed bottom-8 right-8 z-50">
        <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-[#2563eb] text-white px-6 py-3 rounded-full shadow-xl hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all font-semibold"
        >
            {saving ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
            Save Changes
        </button>
      </div>
    </div>
  );
}

// ... Projects and Achievements Tabs (Simplified for brevity but kept functional) ...

function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);

  const fetchProjects = () => fetch("/api/projects").then(r => r.json()).then(d => { if(d.success) setProjects(d.data); setLoading(false); });
  useEffect(() => { fetchProjects() }, []);

  const handleSave = async (p: Project) => {
    const method = p._id ? "PUT" : "POST";
    const url = p._id ? `/api/projects/${p._id}` : "/api/projects";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(p) });
    setEditing(null);
    fetchProjects();
  };
  const handleDelete = async (id: string) => { if (confirm("Delete?")) { await fetch(`/api/projects/${id}`, { method: "DELETE" }); fetchProjects(); } };

  if (loading) return <Loader2 className="animate-spin text-white" />;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
       <div className="flex justify-between items-center mb-6">
         <h2 className="text-2xl font-bold text-white">Projects</h2>
         <button onClick={() => setEditing({ title: "", description: "", technologies: [], liveLink: "", githubLink: "", order: 0 })} className="btn-primary"><Plus className="w-4 h-4" /> Add New</button>
       </div>
       
       {editing && (
         <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-[#1a1a1a] p-8 rounded-xl border border-[#333] w-full max-w-2xl space-y-6">
                <h3 className="text-2xl font-bold text-white mb-4">{editing._id ? "Edit Project" : "New Project"}</h3>
                <input className="input-field" placeholder="Title" value={editing.title} onChange={e => setEditing({...editing, title: e.target.value})} />
                <textarea className="input-field h-32" placeholder="Description" value={editing.description} onChange={e => setEditing({...editing, description: e.target.value})} />
                <input className="input-field" placeholder="Technologies (comma separated)" value={editing.technologies.join(", ")} onChange={e => setEditing({...editing, technologies: e.target.value.split(",").map(s=>s.trim())})} />
                <div className="grid grid-cols-2 gap-4">
                    <input className="input-field" placeholder="Live Link" value={editing.liveLink} onChange={e => setEditing({...editing, liveLink: e.target.value})} />
                    <input className="input-field" placeholder="GitHub Link" value={editing.githubLink} onChange={e => setEditing({...editing, githubLink: e.target.value})} />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                    <button onClick={() => setEditing(null)} className="btn-secondary">Cancel</button>
                    <button onClick={() => handleSave(editing)} className="btn-primary">Save Project</button>
                </div>
            </div>
         </div>
       )}

       <div className="grid gap-4">
          {projects.map(p => (
              <div key={p._id} className="bg-[#1a1a1a] p-6 rounded-lg border border-[#262626] flex justify-between items-start hover:border-[#2563eb] transition-colors">
                  <div>
                      <h4 className="text-xl font-bold text-white">{p.title}</h4>
                      <p className="text-gray-400 mt-1 line-clamp-2">{p.description}</p>
                      <div className="flex gap-2 mt-3">
                          {p.technologies.map(t => <span key={t} className="text-xs bg-[#262626] text-gray-300 px-2 py-1 rounded border border-[#333]">{t}</span>)}
                      </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                      <button onClick={() => setEditing(p)} className="p-2 text-blue-400 hover:bg-[#2563eb]/10 rounded"><Edit2 className="w-5 h-5" /></button>
                      <button onClick={() => handleDelete(p._id!)} className="p-2 text-red-400 hover:bg-red-500/10 rounded"><Trash2 className="w-5 h-5" /></button>
                  </div>
              </div>
          ))}
       </div>
    </div>
  );
}

function AchievementsTab() {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<Achievement | null>(null);
  
    const fetchAchievements = () => fetch("/api/achievements").then(r => r.json()).then(d => { if(d.success) setAchievements(d.data); setLoading(false); });
    useEffect(() => { fetchAchievements() }, []);
  
    const handleSave = async (a: Achievement) => {
        const method = a._id ? "PUT" : "POST";
        const url = a._id ? `/api/achievements/${a._id}` : "/api/achievements";
        await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(a) });
        setEditing(null);
        fetchAchievements();
    };
    const handleDelete = async (id: string) => { if (confirm("Delete?")) { await fetch(`/api/achievements/${id}`, { method: "DELETE" }); fetchAchievements(); } };
  
    if (loading) return <Loader2 className="animate-spin text-white" />;
  
    return (
      <div className="max-w-5xl mx-auto space-y-6">
         <div className="flex justify-between items-center mb-6">
           <h2 className="text-2xl font-bold text-white">Achievements</h2>
           <button onClick={() => setEditing({ title: "", description: "", date: "", organization: "" })} className="btn-primary"><Plus className="w-4 h-4" /> Add New</button>
         </div>
         
         {editing && (
           <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
              <div className="bg-[#1a1a1a] p-8 rounded-xl border border-[#333] w-full max-w-2xl space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-4">{editing._id ? "Edit Achievement" : "New Achievement"}</h3>
                  <input className="input-field" placeholder="Title" value={editing.title} onChange={e => setEditing({...editing, title: e.target.value})} />
                  <div className="grid grid-cols-2 gap-4">
                    <input className="input-field" placeholder="Organization" value={editing.organization} onChange={e => setEditing({...editing, organization: e.target.value})} />
                    <input className="input-field" placeholder="Date" value={editing.date} onChange={e => setEditing({...editing, date: e.target.value})} />
                  </div>
                  <textarea className="input-field h-32" placeholder="Description" value={editing.description} onChange={e => setEditing({...editing, description: e.target.value})} />
                  <div className="flex justify-end gap-3 pt-4">
                      <button onClick={() => setEditing(null)} className="btn-secondary">Cancel</button>
                      <button onClick={() => handleSave(editing)} className="btn-primary">Save Achievement</button>
                  </div>
              </div>
           </div>
         )}
  
         <div className="grid gap-4">
            {achievements.map(a => (
                <div key={a._id} className="bg-[#1a1a1a] p-6 rounded-lg border border-[#262626] flex justify-between items-start hover:border-[#2563eb] transition-colors">
                    <div>
                        <h4 className="text-xl font-bold text-white">{a.title}</h4>
                        <p className="text-[#2563eb] text-sm font-medium mt-1">{a.organization} • {a.date}</p>
                        <p className="text-gray-400 mt-2">{a.description}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                        <button onClick={() => setEditing(a)} className="p-2 text-blue-400 hover:bg-[#2563eb]/10 rounded"><Edit2 className="w-5 h-5" /></button>
                        <button onClick={() => handleDelete(a._id!)} className="p-2 text-red-400 hover:bg-red-500/10 rounded"><Trash2 className="w-5 h-5" /></button>
                    </div>
                </div>
            ))}
         </div>
      </div>
    );
}

// --- Main Layout ---

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"profile" | "projects" | "achievements">("profile");

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#2563eb] selection:text-white">
      <style jsx global>{`
        .input-field {
            background-color: #0f0f0f;
            border: 1px solid #333;
            color: white;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            width: 100%;
            transition: all 0.2s;
        }
        .input-field:focus {
            outline: none;
            border-color: #2563eb;
            background-color: #151515;
            box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
        }
        .input-field-sm {
            background-color: #151515;
            border: 1px solid #333;
            color: white;
            padding: 0.5rem 0.75rem;
            border-radius: 0.375rem;
            width: 100%;
            font-size: 0.875rem;
            transition: all 0.2s;
        }
        .input-field-sm:focus {
            outline: none;
            border-color: #2563eb;
        }
        .card {
            background-color: #1a1a1a;
            border: 1px solid #262626;
            border-radius: 1rem;
            padding: 2rem;
        }
        .btn-primary {
            background-color: #2563eb;
            color: white;
            padding: 0.6rem 1.25rem;
            border-radius: 0.5rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.2s;
        }
        .btn-primary:hover {
            background-color: #1d4ed8;
            transform: translateY(-1px);
        }
        .btn-secondary {
            background-color: #262626;
            color: white;
            padding: 0.6rem 1.25rem;
            border-radius: 0.5rem;
            font-weight: 500;
            transition: all 0.2s;
        }
        .btn-secondary:hover {
            background-color: #333;
        }
        .btn-sm {
            background-color: #2563eb;
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 0.25rem;
            font-size: 0.75rem;
            display: flex;
            align-items: center;
            gap: 0.25rem;
        }
      `}</style>

      {/* Navbar */}
      <nav className="border-b border-[#262626] bg-[#0a0a0a]/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
                <span className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <LayoutGrid className="text-[#2563eb]" /> Admin Dashboard
                </span>
                <div className="flex space-x-1">
                    {[
                        { id: "profile", label: "Profile", icon: User },
                        { id: "projects", label: "Projects", icon: Briefcase },
                        { id: "achievements", label: "Achievements", icon: Award },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={cn(
                                "px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                                activeTab === tab.id 
                                    ? "bg-[#2563eb] text-white shadow-lg shadow-blue-500/20" 
                                    : "text-gray-400 hover:text-white hover:bg-[#262626]"
                            )}
                        >
                            <tab.icon className="w-4 h-4" /> {tab.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-in fade-in duration-500">
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "projects" && <ProjectsTab />}
            {activeTab === "achievements" && <AchievementsTab />}
        </div>
      </main>
    </div>
  );
}
