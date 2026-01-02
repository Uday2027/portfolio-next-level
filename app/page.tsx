"use client";

import TypewriterText from "@/components/TypewriterText";
import SpotlightCard from "@/components/SpotlightCard";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  Loader2,
  GraduationCap,
  Briefcase,
  Code2,
  ChevronDown,
  User,
  Hash,
  ExternalLink,
  Code,
  Award,
  Calendar,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  FileText,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring } from "framer-motion";

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

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  liveLink: string;
  githubLink: string;
}

interface Achievement {
  _id: string;
  title: string;
  description: string;
  date: string;
  organization: string;
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
  photoUrl?: string;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
}

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [contactStatus, setContactStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Cache busting with timestamp
    fetch(`/api/profile?t=${new Date().getTime()}`, {
      headers: { "Cache-Control": "no-store" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success && data.data) {
          setProfile(data.data);
        } else {
          // Fallback
          setProfile({
            name: "Zubayer Hossain Uday",
            title: "Full Stack Developer",
            university: "Shahjalal University of Science and Technology (SUST)",
            bio: "Full Stack Developer with a passion for building scalable applications and DevSecOps practices.",
            email: "zubayerhossain1009@gmail.com",
            phone: "01876375141",
            location: "Sylhet, Bangladesh",
            github: "#",
            linkedin: "https://www.linkedin.com/in/zubayerhossainuday",
            education: [],
            experience: [],
            skills: [],
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    // Fetch projects
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProjects(data.data);
        }
      })
      .catch((err) => console.error(err));

    // Fetch achievements
    fetch("/api/achievements")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAchievements(data.data);
        }
      })
      .catch((err) => console.error(err));

    // Scroll spy
    const handleScroll = () => {
      const sections = [
        "hero",
        "experience",
        "skills",
        "education",
        "projects",
        "achievements",
        "contact",
      ];
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
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center text-white">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (!profile) return null;

  const skillsByCategory = (profile.skills || []).reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);

  const categories = [
    "Languages",
    "Frontend",
    "Backend",
    "Databases",
    "DevOps",
    "Tools",
    "Other",
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setContactStatus("success");
        setFormData({ name: "", email: "", mobile: "", message: "" });
      } else {
        setContactStatus("error");
        setErrorMessage(data.error || "Something went wrong.");
      }
    } catch (error) {
      setContactStatus("error");
      setErrorMessage("Failed to send message. Please try again.");
    }
  };

  const handleResumeClick = () => {
    // Open resume in new tab
    window.open("/assets/resume.pdf", "_blank");
    
    // Trigger download simultaneously
    const link = document.createElement("a");
    link.href = "/assets/resume.pdf";
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="flex flex-col items-center min-h-screen relative bg-background selection:bg-[var(--accent)] selection:text-white overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--accent)] origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Page Overview Sidebar (Left) */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="flex fixed left-2 xl:left-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-4 xl:gap-6 pointer-events-auto"
      >
        {[
          { id: "hero", label: "Intro", icon: User },
          { id: "experience", label: "Experience", icon: Briefcase },
          { id: "skills", label: "Skills", icon: Code2 },
          { id: "education", label: "Education", icon: GraduationCap },
          { id: "projects", label: "Projects", icon: Code },
          { id: "achievements", label: "Achievements", icon: Award },
          { id: "contact", label: "Contact", icon: Mail },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="group relative flex items-center justify-center w-10 h-10 xl:w-12 xl:h-12"
          >
            <div
              className={cn(
                "absolute inset-0 rounded-full border border-gray-800 bg-[#0a0a0a] transition-all duration-300",
                activeSection === item.id
                  ? "scale-100 border-[var(--accent)] shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)]"
                  : "scale-75 group-hover:scale-90 group-hover:border-gray-600"
              )}
            />
            <item.icon
              className={cn(
                "w-3 h-3 xl:w-4 xl:h-4 relative z-10 transition-colors duration-300",
                activeSection === item.id
                  ? "text-[var(--accent)]"
                  : "text-gray-500 group-hover:text-gray-300"
              )}
            />

            {/* Label Tooltip - Hidden on mobile, visible on XML */}
            <span className="hidden xl:block absolute left-14 px-3 py-1 rounded bg-muted border border-[#333] text-xs font-semibold tracking-wide text-gray-300 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap z-50 pointer-events-none">
              {item.label}
            </span>
          </button>
        ))}
        <div className="absolute left-[1.25rem] xl:left-6 top-6 bottom-6 w-[1px] bg-gradient-to-b from-transparent via-gray-800 to-transparent -z-10" />
      </motion.div>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative flex flex-col items-center justify-center min-h-[calc(100vh-64px)] pl-16 pr-4 sm:px-6 lg:px-8 w-full"
      >
        {/* Background Elements - Minimal Tech Vibe */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="text-left space-y-8 max-w-5xl mx-auto relative z-10 pb-16 w-full pt-8 sm:pt-12 md:pt-16"
        >
          {/* Hero Content Container - Flexbox for Photo + Text */}
          <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-12 items-center md:items-start">
            {/* Left: Text Content */}
            <div className="flex-1 space-y-8">
              <motion.div variants={fadeInUp} className="space-y-6">
                <div className="inline-block px-4 py-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/5 text-[var(--accent)] text-sm font-semibold tracking-wider uppercase backdrop-blur-sm">
                  Open to Work
                </div>

                <div className="relative block w-full">
                  <TypewriterText
                    text={profile.name}
                    className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter text-foreground break-words justify-start"
                  />
                  {/* Decorative Circuit Lines - Simulated with borders */}
                  <div className="hidden lg:block absolute -right-12 top-1/2 w-8 h-[1px] bg-[#333]" />
                  <div className="hidden lg:block absolute -right-12 top-1/2 h-16 w-[1px] bg-[#333]" />
                </div>

                <p className="text-xl sm:text-2xl md:text-3xl text-gray-400 font-light max-w-3xl leading-normal">
                  <span className="text-foreground font-normal">
                    {profile.title}
                  </span>
                </p>
              </motion.div>

              {profile.bio &&
                profile.bio.trim() !== '""' &&
                profile.bio.trim() !== "" && (
                  <motion.p
                    variants={fadeInUp}
                    className="text-gray-400 text-lg sm:text-xl max-w-2xl leading-relaxed border-l-2 border-[var(--accent)] pl-6 text-left italic bg-muted/30 p-4 rounded-r-lg backdrop-blur-sm"
                  >
                    "{profile.bio}"
                  </motion.p>
                )}

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-5 justify-start mt-12 text-sm sm:text-base"
              >
                <Link
                  href="/projects"
                  className="group relative px-6 py-4 bg-[var(--accent)] text-foreground font-bold rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)] w-fit"
                >
                  <span className="relative z-10 flex items-center gap-2 justify-center">
                    View Projects{" "}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full skew-y-12 group-hover:translate-y-0 transition-transform duration-500" />
                </Link>
                <button
                  onClick={handleResumeClick}
                  className="group px-6 py-4 bg-transparent border border-[var(--accent)] text-foreground font-bold rounded-lg hover:bg-[var(--accent)]/10 hover:border-[var(--accent)] transition-all flex items-center gap-2 justify-center w-fit"
                >
                  View Resume{" "}
                  <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
                <Link
                  href="/contact"
                  className="group px-6 py-4 bg-transparent border border-[#333] text-foreground font-bold rounded-lg hover:bg-muted hover:border-[var(--accent)] transition-all flex items-center gap-2 justify-center w-fit"
                >
                  Contact Me{" "}
                  <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </Link>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="flex gap-6 items-center justify-start pt-1 mb-16 sm:mb-0"
              >
                {profile.linkedin && (
                  <Link
                    href={profile.linkedin}
                    target="_blank"
                    className="p-3 rounded-full bg-muted border border-[#333] text-gray-400 hover:text-[#0a66c2] hover:border-[#0a66c2]"
                  >
                    <Linkedin className="w-6 h-6" />
                  </Link>
                )}
                {profile.github && (
                  <Link
                    href={profile.github}
                    target="_blank"
                    className="p-3 rounded-full bg-muted border border-[#333] text-gray-400 hover:text-foreground hover:border-white"
                  >
                    <Github className="w-6 h-6" />
                  </Link>
                )}
              </motion.div>
            </div>

            {/* Right: Profile Photo */}
            <motion.div
              variants={fadeInUp}
              className="flex-shrink-0"
            >
              <div className="relative group">
                {/* Glow Effect Background */}
                <div className="absolute -inset-4 bg-gradient-to-br from-[var(--accent)]/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Photo Container */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72">
                  {/* Border Ring with Animation */}
                  <div className="absolute inset-0 rounded-full border-4 border-[var(--accent)] opacity-50 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 rounded-full border-2 border-[var(--accent)]/30 animate-pulse" />
                  
                  {/* Image with Glassmorphism */}
                  <div className="absolute inset-2 rounded-full overflow-hidden bg-gradient-to-br from-muted to-background backdrop-blur-sm border border-[#333] shadow-2xl">
                    <img
                      src={profile.photoUrl || "/assets/ami.jpeg"}
                      alt={profile.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/assets/ami.jpeg";
                      }}
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* Decorative Corner Elements */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[var(--accent)] rounded-tr-lg opacity-60" />
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[var(--accent)] rounded-bl-lg opacity-60" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-4 z-20 pointer-events-none md:pointer-events-auto"
        >
          <div className="hidden sm:flex gap-4 text-xs font-mono text-gray-500 uppercase tracking-[0.2em] border-t border-b border-[#333] py-2 px-8 bg-[#0a0a0a]/80 backdrop-blur rounded-full">
            <span>Experience</span>
            <span className="text-[var(--accent)]">•</span>
            <span>Scroll</span>
            <span className="text-[var(--accent)]">•</span>
            <span>Skills</span>
          </div>
          {/* Mobile simplified scroll text */}
          <div className="sm:hidden text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-1">
            Scroll
          </div>
          <button
            onClick={() => scrollTo("experience")}
            className="animate-bounce cursor-pointer p-2 rounded-full hover:bg-muted transition-colors pointer-events-auto big-hit-area"
          >
            <ChevronDown className="w-6 h-6 text-[var(--accent)]" />
          </button>
        </motion.div>
      </section>

      {/* Experience Section */}
      {profile.experience?.length > 0 && (
        <section
          id="experience"
          className="w-full py-12 md:py-24 px-4 sm:px-6 relative"
        >
          <div className="max-w-6xl mx-auto pl-12 sm:pl-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-12 md:mb-16"
            >
              <div className="p-3 bg-[var(--accent)]/10 rounded-xl">
                <Briefcase className="w-8 h-8 text-[var(--accent)]" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                Professional <span className="text-[var(--accent)]">Exp.</span>
              </h2>
            </motion.div>

            <div className="relative space-y-12 md:space-y-16 pl-6 md:pl-0">
              {/* Central Line for Desktop */}
              <div className="hidden md:block absolute left-1/2 top-4 bottom-0 w-[1px] bg-[#262626] -translate-x-1/2" />
              {/* Left Line for Mobile */}
              <div className="md:hidden absolute left-0 top-4 bottom-0 w-[1px] bg-[#262626]" />

              {profile.experience.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={cn(
                    "relative md:flex items-center gap-12 group",
                    idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  {/* Connector Dot */}
                  <div className="absolute left-[-1.5rem] md:left-1/2 top-0 md:top-1/2 w-4 h-4 rounded-full bg-[#0a0a0a] border-4 border-[var(--accent)] -translate-x-1/2 md:-translate-y-1/2 z-10 group-hover:scale-150 transition-transform duration-300 shadow-[0_0_10px_var(--accent)] mt-1 md:mt-0" />
                  {/* Content Card */}
                  <div className="md:w-1/2">
                    <SpotlightCard className="p-6 md:p-8 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:-translate-y-2 border-0 bg-muted">
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                        <h3 className="text-xl md:text-2xl font-bold text-foreground">
                          {exp.role}
                        </h3>
                        <span className="text-xs font-mono text-[var(--accent)] bg-[var(--accent)]/10 px-3 py-1 rounded-full border border-[var(--accent)]/20 whitespace-nowrap">
                          {exp.duration}
                        </span>
                      </div>
                      <div className="text-base md:text-lg text-muted-foreground font-medium mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-[var(--accent)] rounded-full" />
                        {exp.company}
                      </div>
                      <p className="text-gray-400 leading-relaxed whitespace-pre-wrap text-sm">
                        {exp.description}
                      </p>
                    </SpotlightCard>
                  </div>
                  <div className="md:w-1/2" />{" "}
                  {/* Spacer for alternating layout */}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {profile.skills?.length > 0 && (
        <section
          id="skills"
          className="w-full py-12 md:py-24 px-4 sm:px-6 bg-background border-t border-border"
        >
          <div className="max-w-6xl mx-auto pl-12 sm:pl-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-12 md:mb-16"
            >
              <div className="p-3 bg-[var(--accent)]/10 rounded-xl">
                <Code2 className="w-8 h-8 text-[var(--accent)]" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                Technical <span className="text-[var(--accent)]">Arsenhal</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat, catIdx) => {
                const skills = skillsByCategory[cat];
                if (!skills || skills.length === 0) return null;

                return (
                  <motion.div
                    key={cat}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIdx * 0.1 }}
                    className="group relative bg-muted p-6 md:p-8 rounded-[2rem] border border-border hover:border-[var(--accent)] transition-all duration-300 hover:shadow-2xl overflow-hidden"
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3 relative z-10">
                      <Hash className="w-5 h-5 text-[var(--accent)]" /> {cat}
                    </h3>
                    <div className="flex flex-wrap gap-2 relative z-10">
                      {skills.map((skill, i) => (
                        <div
                          key={i}
                          className="px-3 py-1.5 bg-muted text-muted-foreground rounded-lg text-sm font-medium border border-border transition-all duration-300 group-hover:border-[var(--accent)]/30 group-hover:text-foreground hover:!bg-[var(--accent)] hover:!border-[var(--accent)] cursor-default"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {profile.education?.length > 0 && (
        <section
          id="education"
          className="w-full py-12 md:py-24 px-4 sm:px-6 relative overflow-hidden"
        >
          {/* Background Decoration */}
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

          <div className="max-w-6xl mx-auto relative z-10 pl-12 sm:pl-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-12 md:mb-16"
            >
              <div className="p-3 bg-[var(--accent)]/10 rounded-xl">
                <GraduationCap className="w-8 h-8 text-[var(--accent)]" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                Academic <span className="text-[var(--accent)]">Journey</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-6">
              {profile.education.map((edu, idx) => {
                // Logic for Present
                let endDisplay = edu.endDate;
                const entDateObj = new Date(edu.endDate);
                const now = new Date();
                if (!isNaN(entDateObj.getTime()) && entDateObj > now) {
                  endDisplay = "Present";
                } else if (edu.endDate.toLowerCase() === "present") {
                  endDisplay = "Present";
                }

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group relative bg-muted p-6 md:p-10 rounded-2xl border border-border hover:border-[var(--accent)] transition-all duration-500 overflow-hidden"
                  >
                    <div className="absolute right-0 top-0 h-full w-2 bg-[var(--accent)] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-2">
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-[var(--accent)] transition-colors">
                          {edu.institution}
                        </h3>
                        <div className="flex items-center gap-3 text-lg md:text-xl text-muted-foreground">
                          <GraduationCap className="w-5 h-5 text-muted-foreground" />
                          {edu.degree}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-muted px-6 py-3 rounded-full border border-border group-hover:border-[var(--accent)]/30 transition-colors w-fit">
                        <span className="text-[var(--accent)] font-bold whitespace-nowrap">
                          {edu.startDate}
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />

                        <span className="text-foreground font-bold whitespace-nowrap">
                          {endDisplay}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section
          id="projects"
          className="w-full py-12 md:py-24 px-4 sm:px-6 bg-background border-t border-border"
        >
          <div className="max-w-6xl mx-auto pl-12 sm:pl-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-12 md:mb-16"
            >
              <div className="p-3 bg-[var(--accent)]/10 rounded-xl">
                <Code className="w-8 h-8 text-[var(--accent)]" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                Notable <span className="text-[var(--accent)]">Projects</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 6).map((project, idx) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative bg-muted border border-border rounded-xl overflow-hidden hover:border-[var(--accent)] transition-all duration-300 flex flex-col"
                >
                  <div className="p-6 flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-background rounded-md border border-border group-hover:border-[var(--accent)] transition-colors">
                        <Code2 className="w-6 h-6 text-[var(--accent)]" />
                      </div>
                      <div className="flex gap-2">
                        {project.githubLink && (
                          <Link
                            href={project.githubLink}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            target="_blank"
                          >
                            <Github className="w-5 h-5" />
                          </Link>
                        )}
                        {project.liveLink && (
                          <Link
                            href={project.liveLink}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            target="_blank"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </Link>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-[var(--accent)] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="px-6 py-4 border-t border-border bg-background/50">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((t, i) => (
                        <span
                          key={i}
                          className="text-xs font-medium px-2 py-1 rounded bg-muted text-muted-foreground border border-border"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-[#333] text-foreground font-bold rounded-lg hover:bg-muted hover:border-[var(--accent)] transition-all"
              >
                View All Projects <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Achievements Section */}
      {achievements.length > 0 && (
        <section
          id="achievements"
          className="w-full py-12 md:py-24 px-4 sm:px-6 relative overflow-hidden"
        >
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

          <div className="max-w-6xl mx-auto relative z-10 pl-12 sm:pl-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-12 md:mb-16"
            >
              <div className="p-3 bg-[var(--accent)]/10 rounded-xl">
                <Award className="w-8 h-8 text-[var(--accent)]" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                Key <span className="text-[var(--accent)]">Achievements</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {achievements.slice(0, 4).map((achievement, idx) => (
                <motion.div
                  key={achievement._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-muted border border-border rounded-xl p-8 hover:border-[var(--accent)] transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Award className="w-24 h-24 text-[var(--accent)]" />
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-4 relative z-10">
                    {achievement.title}
                  </h3>

                  <div className="flex flex-col gap-2 mb-6 text-sm text-muted-foreground relative z-10">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[var(--accent)]" />
                      <span>{achievement.organization}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[var(--accent)]" />
                      <span>{achievement.date}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed relative z-10">
                    {achievement.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <Link
                href="/achievements"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-[#333] text-foreground font-bold rounded-lg hover:bg-muted hover:border-[var(--accent)] transition-all"
              >
                View All Achievements <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section
        id="contact"
        className="w-full py-12 md:py-24 px-4 sm:px-6 bg-background border-t border-border"
      >
        <div className="max-w-6xl mx-auto pl-12 sm:pl-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12 md:mb-16"
          >
            <div className="p-3 bg-[var(--accent)]/10 rounded-xl">
              <Mail className="w-8 h-8 text-[var(--accent)]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
              Get in <span className="text-[var(--accent)]">Touch</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-muted-foreground text-lg mb-8">
                Have a project in mind or want to discuss potential
                opportunities? I&apos;m currently available for freelance work
                and open to new challenges.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-muted p-3 rounded-lg border border-border">
                    <Mail className="w-6 h-6 text-[var(--accent)]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground">
                      Email
                    </h3>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-muted-foreground hover:text-[var(--accent)] transition-colors"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-muted p-3 rounded-lg border border-border">
                    <Phone className="w-6 h-6 text-[var(--accent)]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground">
                      Phone
                    </h3>
                    <a
                      href={`tel:${profile.phone}`}
                      className="text-muted-foreground hover:text-[var(--accent)] transition-colors"
                    >
                      {profile.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-muted p-3 rounded-lg border border-border">
                    <MapPin className="w-6 h-6 text-[var(--accent)]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground">
                      Location
                    </h3>
                    <p className="text-muted-foreground">{profile.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-muted p-8 rounded-xl border border-border"
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Send Message
              </h3>

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-muted-foreground mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full bg-background border border-border rounded-md px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="mobile"
                      className="block text-sm font-medium text-muted-foreground mb-2"
                    >
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleFormChange}
                      className="w-full bg-background border border-border rounded-md px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                      placeholder="018..."
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-muted-foreground mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full bg-background border border-border rounded-md px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-muted-foreground mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    rows={4}
                    className="w-full bg-background border border-border rounded-md px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                    placeholder="Your message here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={contactStatus === "loading"}
                  className="w-full flex items-center justify-center space-x-2 bg-[var(--accent)] hover:opacity-90 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {contactStatus === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {contactStatus === "success" && (
                  <div className="p-4 bg-green-900/20 border border-green-900 rounded-md flex items-center text-green-400">
                    <CheckCircle className="w-5 h-5 mr-2" /> Message sent
                    successfully!
                  </div>
                )}

                {contactStatus === "error" && (
                  <div className="p-4 bg-red-900/20 border border-red-900 rounded-md flex items-center text-red-400">
                    <AlertCircle className="w-5 h-5 mr-2" /> {errorMessage}
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Styles for this page */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        ::selection {
          background-color: var(--accent);
          color: white;
        }
      `}</style>
    </div>
  );
}
