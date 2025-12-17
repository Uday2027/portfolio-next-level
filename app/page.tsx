
"use client";

import TypewriterText from "@/components/TypewriterText";
import Link from "next/link";
import { ArrowRight, Download, Mail, Phone, MapPin, Github, Linkedin, Loader2, GraduationCap, Briefcase, Code2, ChevronDown, User, Hash } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

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

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    // Cache busting with timestamp
    fetch(`/api/profile?t=${new Date().getTime()}`, { headers: { 'Cache-Control': 'no-store' }})
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setProfile(data.data);
        } else {
             // Fallback
             setProfile({
                 name: "Zubayer Hossain Uday",
                 title: "BSc (Eng) in Computer Science And Engineering",
                 university: "Shahjalal University of Science and Technology (SUST)",
                 bio: "Full Stack Developer with a passion for building scalable applications and DevSecOps practices.",
                 email: "zubayerhossain1009@gmail.com",
                 phone: "01876375141",
                 location: "Sylhet, Bangladesh",
                 github: "#",
                 linkedin: "https://www.linkedin.com/in/zubayerhossainuday",
                 education: [],
                 experience: [],
                 skills: []
             });
        }
        setLoading(false);
      })
      .catch((err) => {
          console.error(err);
          setLoading(false);
      });

    // Scroll spy
    const handleScroll = () => {
        const sections = ["hero", "experience", "skills", "education"];
        for (const section of sections) {
            const el = document.getElementById(section);
            if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top >= -300 && rect.top <= 300) {
                    setActiveSection(section);
                    break;
                }
            }
        }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
     return <div className="flex h-[calc(100vh-64px)] items-center justify-center text-white"><Loader2 className="animate-spin w-8 h-8" /></div>
  }

  if (!profile) return null;

  // Group skills by category
  const skillsByCategory = (profile.skills || []).reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill.name);
      return acc;
  }, {} as Record<string, string[]>);

  const categories = ["Frontend", "Backend", "DevOps", "Tools", "Other"];

  const scrollTo = (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center min-h-screen relative">
      
      {/* Page Overview Sidebar (Left) */}
      <div className="hidden xl:flex fixed left-12 top-1/2 -translate-y-1/2 z-50 flex-col gap-6">
         {[
             { id: "hero", label: "Intro", icon: User },
             { id: "experience", label: "Experience", icon: Briefcase },
             { id: "skills", label: "Skills", icon: Code2 },
             { id: "education", label: "Education", icon: GraduationCap },
         ].map((item) => (
             <button 
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={cn(
                    "group flex items-center gap-3 transition-all duration-300",
                    activeSection === item.id ? "text-[#2563eb] translate-x-2" : "text-gray-500 hover:text-gray-300"
                )}
             >
                 <div className={cn(
                     "w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300",
                     activeSection === item.id ? "border-[#2563eb] bg-[#2563eb]/10" : "border-gray-800 bg-[#0a0a0a] group-hover:border-gray-600"
                 )}>
                     <item.icon className="w-4 h-4" />
                 </div>
                 <span className={cn(
                     "text-sm font-medium tracking-wide opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none",
                     activeSection === item.id && "opacity-100 translate-x-0"
                 )}>
                     {item.label}
                 </span>
             </button>
         ))}
         <div className="absolute left-[19px] top-4 bottom-4 w-[1px] bg-gray-800 -z-10" />
      </div>

      {/* Hero Section */}
      <section id="hero" className="relative flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl text-[#2563eb] font-semibold tracking-wide uppercase">
                Portfolio
            </h2>
            <TypewriterText
                text={profile.name}
                className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-4"
            />
            <p className="text-xl sm:text-2xl text-gray-400 font-light max-w-2xl mx-auto">
                {profile.title}
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-500 mt-2">
                <MapPin className="w-5 h-5 text-[#2563eb]" />
                <span className="text-lg">{profile.university}</span>
            </div>
            </div>

            <p className="text-gray-300 text-lg max-w-xl mx-auto leading-relaxed">
                {profile.bio}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link
                href="/projects"
                className="btn-primary"
            >
                View Projects <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
                href="/contact"
                className="btn-secondary"
            >
                Contact Me <Mail className="ml-2 w-5 h-5" />
            </Link>
            <div className="flex gap-4 items-center justify-center sm:ml-4">
                    {profile.linkedin && <Link href={profile.linkedin} target="_blank" className="social-icon"><Linkedin className="w-6 h-6" /></Link>}
                    {profile.github && <Link href={profile.github} target="_blank" className="social-icon"><Github className="w-6 h-6" /></Link>}
            </div>
            </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 flex flex-col items-center gap-3 opacity-0 animate-fade-in-up" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
            <div className="flex gap-3 text-sm text-gray-500 font-mono tracking-wide">
                <span>Experience</span>
                <span className="text-[#2563eb]">•</span>
                <span>Skills</span>
                <span className="text-[#2563eb]">•</span>
                <span>Education</span>
            </div>
            <button onClick={() => scrollTo("experience")} className="animate-bounce mt-2 text-[#2563eb] hover:text-blue-400 transition-colors cursor-pointer">
                <ChevronDown className="w-6 h-6" />
            </button>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out;
        }
      `}</style>

      {/* Experience Section */}
      {profile.experience?.length > 0 && (
          <section id="experience" className="w-full py-24 px-4 sm:px-6 bg-[#0a0a0a] border-t border-[#262626]">
              <div className="max-w-5xl mx-auto">
                  <h2 className="section-title"><Briefcase className="w-8 h-8 text-[#2563eb]" /> Experience</h2>
                  <div className="space-y-8 mt-12 border-l-2 border-[#262626] pl-8 ml-4">
                      {profile.experience.map((exp, idx) => (
                          <div key={idx} className="relative group">
                              <div className="absolute -left-[45px] top-1 w-6 h-6 rounded-full bg-[#1a1a1a] border-4 border-[#2563eb] group-hover:scale-125 transition-transform duration-300" />
                              <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#262626] hover:border-[#2563eb] transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10">
                                <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                                <div className="flex flex-wrap gap-2 items-center mb-4">
                                     <span className="text-[#2563eb] font-semibold text-lg">{exp.company}</span>
                                     <span className="text-gray-600">•</span>
                                     <span className="text-gray-400 text-sm font-mono">{exp.duration}</span>
                                </div>
                                <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </section>
      )}

       {/* Skills Section */}
       {profile.skills?.length > 0 && (
          <section id="skills" className="w-full py-24 px-4 sm:px-6 bg-[#050505] border-t border-[#262626]">
              <div className="max-w-5xl mx-auto">
                  <h2 className="section-title"><Code2 className="w-8 h-8 text-[#2563eb]" /> Technical Skills</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                      {categories.map((cat) => {
                          const skills = skillsByCategory[cat];
                          if (!skills || skills.length === 0) return null;
                          return (
                              <div key={cat} className="group bg-[#1a1a1a]/50 p-8 rounded-[2rem] border border-[#262626] hover:border-[#2563eb]/50 transition-all duration-300 hover:bg-[#1a1a1a]">
                                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                      <span className="w-2 h-8 rounded-full bg-[#2563eb]"></span> {cat}
                                  </h3>
                                  <div className="flex flex-wrap gap-3">
                                      {skills.map((skill, i) => (
                                          <span key={i} className="px-4 py-2 bg-[#050505] text-gray-300 rounded-full text-sm font-medium border border-[#333] group-hover:border-[#2563eb]/30 group-hover:text-white transition-all duration-300 hover:scale-105 hover:bg-[#2563eb] hover:border-[#2563eb] cursor-default shadow-lg shadow-black/50">
                                              {skill}
                                          </span>
                                      ))}
                                  </div>
                              </div>
                          )
                      })}
                  </div>
              </div>
          </section>
      )}

      {/* Education Section */}
      {profile.education?.length > 0 && (
          <section id="education" className="w-full py-24 px-4 sm:px-6 bg-[#0a0a0a] border-t border-[#262626]">
              <div className="max-w-5xl mx-auto">
                  <h2 className="section-title"><GraduationCap className="w-8 h-8 text-[#2563eb]" /> Education</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                      {profile.education.map((edu, idx) => {
                          // Logic for Present
                          let endDisplay = edu.endDate;
                          const entDateObj = new Date(edu.endDate);
                          const now = new Date();
                          // If valid date and in future, or explicitly "Present"
                          if (!isNaN(entDateObj.getTime()) && entDateObj > now) {
                              endDisplay = "Present";
                          } else if (edu.endDate.toLowerCase() === 'present') {
                              endDisplay = "Present";
                          }

                          return (
                            <div key={idx} className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#262626] hover:border-[#2563eb] transition-all group duration-300 hover:shadow-2xl hover:shadow-blue-900/10">
                                <div className="flex justify-between items-start mb-4">
                                     <div className="p-3 bg-[#2563eb]/10 rounded-xl text-[#2563eb] group-hover:bg-[#2563eb] group-hover:text-white transition-colors duration-300">
                                         <GraduationCap className="w-8 h-8" />
                                     </div>
                                     <span className="px-3 py-1 rounded-full bg-[#262626] text-xs font-mono text-gray-400 border border-[#333]">
                                         {edu.startDate} - {endDisplay}
                                     </span>
                                </div>
                                <h3 className="text-2xl font-bold text-white group-hover:text-[#2563eb] transition-colors">{edu.institution}</h3>
                                <p className="text-lg text-gray-300 mt-2">{edu.degree}</p>
                            </div>
                          );
                      })}
                  </div>
              </div>
          </section>
      )}

      {/* Global Styles for this page */}
      <style jsx global>{`
        html {
            scroll-behavior: smooth;
        }
        .btn-primary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.75rem 2rem;
            border-radius: 0.375rem;
            background-color: #2563eb;
            color: white;
            font-weight: 500;
            transition: all 0.2s;
        }
        .btn-primary:hover {
            background-color: #1d4ed8;
            box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.2);
        }
        .btn-secondary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.75rem 2rem;
            border-radius: 0.375rem;
            background-color: #1a1a1a;
            color: #d1d5db;
            border: 1px solid #262626;
            font-weight: 500;
            transition: all 0.2s;
        }
        .btn-secondary:hover {
            background-color: #262626;
            color: white;
        }
        .social-icon {
            color: #9ca3af;
            transition: color 0.2s;
        }
        .social-icon:hover {
            color: white;
        }
        .section-title {
            font-size: 2.25rem;
            font-weight: 700;
            color: white;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
      `}</style>
    </div>
  );
}
