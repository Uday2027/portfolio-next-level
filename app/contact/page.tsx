
"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
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
        setStatus("success");
        setFormData({ name: "", email: "", mobile: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-white mb-6 border-l-4 border-[#2563eb] pl-4">
              Get in Touch
            </h1>
            <p className="text-gray-400 text-lg mb-12">
              Have a project in mind or want to discuss potential opportunities? 
              I&apos;m currently available for freelance work and open to new challenges.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-[#1a1a1a] p-3 rounded-lg border border-[#262626]">
                  <Mail className="w-6 h-6 text-[#2563eb]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Email</h3>
                  <a href="mailto:zubayerhossain1009@gmail.com" className="text-gray-400 hover:text-[#2563eb] transition-colors">
                    zubayerhossain1009@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-[#1a1a1a] p-3 rounded-lg border border-[#262626]">
                  <Phone className="w-6 h-6 text-[#2563eb]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Phone</h3>
                  <a href="tel:01876375141" className="text-gray-400 hover:text-[#2563eb] transition-colors">
                    01876375141
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-[#1a1a1a] p-3 rounded-lg border border-[#262626]">
                  <MapPin className="w-6 h-6 text-[#2563eb]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Location</h3>
                  <p className="text-gray-400">
                    Sylhet, Bangladesh (SUST)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#1a1a1a] p-8 rounded-xl border border-[#262626]"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Send Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#050505] border border-[#262626] rounded-md px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-400 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full bg-[#050505] border border-[#262626] rounded-md px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-colors"
                    placeholder="018..."
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#050505] border border-[#262626] rounded-md px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-[#050505] border border-[#262626] rounded-md px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-colors"
                  placeholder="Your message here..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center space-x-2 bg-[#2563eb] hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
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

              {status === "success" && (
                <div className="p-4 bg-green-900/20 border border-green-900 rounded-md flex items-center text-green-400">
                  <CheckCircle className="w-5 h-5 mr-2" /> Message sent successfully!
                </div>
              )}

              {status === "error" && (
                <div className="p-4 bg-red-900/20 border border-red-900 rounded-md flex items-center text-red-400">
                  <AlertCircle className="w-5 h-5 mr-2" /> {errorMessage}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
