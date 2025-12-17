
"use client";

import TypewriterText from "@/components/TypewriterText";
import Link from "next/link";
import { ArrowRight, Download, Mail, Phone, MapPin, Github, Linkedin, Loader2, GraduationCap, Briefcase, Code2, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

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

  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 sm:px-6 lg:px-8 w-full">
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
        <div className="absolute bottom-10 animate-bounce flex flex-col items-center gap-2 opacity-60">
            <span className="text-xs text-gray-500 uppercase tracking-[0.3em]">Scroll</span>
            <ChevronDown className="w-6 h-6 text-[#2563eb]" />
        </div>
      </section>

      {/* Experience Section */}
      {profile.experience?.length > 0 && (
          <section className="w-full py-20 px-4 sm:px-6 bg-[#0a0a0a] border-t border-[#262626]">
              <div className="max-w-5xl mx-auto">
                  <h2 className="section-title"><Briefcase className="w-8 h-8 text-[#2563eb]" /> Experience</h2>
                  <div className="space-y-8 mt-12 border-l-2 border-[#262626] pl-8 ml-4">
                      {profile.experience.map((exp, idx) => (
                          <div key={idx} className="relative">
                              <div className="absolute -left-[41px] w-5 h-5 rounded-full bg-[#2563eb] border-4 border-[#0a0a0a]" />
                              <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                              <p className="text-[#2563eb] font-medium text-lg">{exp.company}</p>
                              <p className="text-gray-500 text-sm mb-4">{exp.duration}</p>
                              <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                          </div>
                      ))}
                  </div>
              </div>
          </section>
      )}

       {/* Skills Section */}
       {profile.skills?.length > 0 && (
          <section className="w-full py-20 px-4 sm:px-6 bg-[#050505] border-t border-[#262626]">
              <div className="max-w-5xl mx-auto">
                  <h2 className="section-title"><Code2 className="w-8 h-8 text-[#2563eb]" /> Technical Skills</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                      {categories.map((cat) => {
                          const skills = skillsByCategory[cat];
                          if (!skills || skills.length === 0) return null;
                          return (
                              <div key={cat} className="bg-[#1a1a1a] p-6 rounded-xl border border-[#262626] hover:border-[#2563eb] transition-colors">
                                  <h3 className="text-xl font-bold text-white mb-4">{cat}</h3>
                                  <div className="flex flex-wrap gap-2">
                                      {skills.map((skill, i) => (
                                          <span key={i} className="px-3 py-1 bg-[#262626] text-gray-300 rounded-md text-sm border border-[#333]">
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
          <section className="w-full py-20 px-4 sm:px-6 bg-[#0a0a0a] border-t border-[#262626]">
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
                            <div key={idx} className="bg-[#1a1a1a] p-8 rounded-xl border border-[#262626] hover:border-[#2563eb] transition-all group">
                                <h3 className="text-xl font-bold text-white group-hover:text-[#2563eb] transition-colors">{edu.institution}</h3>
                                <p className="text-lg text-gray-300 mt-2">{edu.degree}</p>
                                <p className="text-gray-500 mt-4 font-mono text-sm">{edu.startDate} - {endDisplay}</p>
                            </div>
                          );
                      })}
                  </div>
              </div>
          </section>
      )}

      {/* Global Styles for this page */}
      <style jsx global>{`
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
