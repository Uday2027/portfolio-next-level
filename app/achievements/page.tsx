
"use client";

import { useEffect, useState } from "react";
import { Award, Calendar, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

interface Achievement {
  _id: string;
  title: string;
  description: string;
  date: string;
  organization: string;
}

export default function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/achievements")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAchievements(data.data);
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 border-l-4 border-[#2563eb] pl-4">
            Achievements
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            A reflection of my dedication, hard work, and passion for excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1a1a1a] border border-[#262626] rounded-xl p-8 hover:border-[#2563eb] transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Award className="w-24 h-24 text-[#2563eb]" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{achievement.title}</h3>
              
              <div className="flex flex-col gap-2 mb-6 text-sm text-gray-400 relative z-10">
                <div className="flex items-center gap-2">
                   <Briefcase className="w-4 h-4 text-[#2563eb]" />
                   <span>{achievement.organization}</span>
                </div>
                <div className="flex items-center gap-2">
                   <Calendar className="w-4 h-4 text-[#2563eb]" />
                   <span>{achievement.date}</span>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed relative z-10">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </div>

        {achievements.length === 0 && (
            <div className="text-center text-gray-500 mt-12">
                No achievements found.
            </div>
        )}
      </div>
    </div>
  );
}
