import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";

// Framework & Section components
import Hero from "../framework/Hero";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Projects from "./Projects";
import Contact from "./Contact";
import { HelmetProvider } from "react-helmet-async";
import SEO from "../framework/SEO";

// Import project images
import project1 from "../assets/images/project1.jpg";
import project2 from "../assets/images/project2.jpg";

const Home = () => {
  // Global Scroll Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // State for mouse position (for parallax effects)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Featured projects data (showing only 2)
  const featuredProjects = [
    {
      id: 1,
      title: "Enterprise HRMS System",
      description: "Comprehensive HR management platform for enterprises with 5000+ employees featuring automated payroll, compliance, and performance management.",
      tech: ["Java", "Spring Boot", "React", "MySQL", "Redis", "Docker"],
      image: project1,
      featured: true,
      metrics: [
        { label: "Users", value: "50,000+" },
        { label: "Accuracy", value: "99.9%" },
        { label: "Uptime", value: "99.95%" }
      ],
      client: "Fortune 500 Manufacturing Company",
      duration: "12 Months"
    },
    {
      id: 2,
      title: "IRAS Tax Compliance Platform",
      description: "Mission-critical tax submission system approved by IRAS Singapore with bank-level security and guaranteed delivery mechanisms.",
      tech: [".NET Core", "Microservices", "PostgreSQL", "Java", "OAuth 2.0"],
      image: project2,
      featured: true,
      metrics: [
        { label: "Submissions", value: "2M+/year" },
        { label: "Success Rate", value: "100%" },
        { label: "Accuracy", value: "99.99%" }
      ],
      client: "IRAS Singapore & Banks",
      duration: "8 Months"
    }
  ];

  // Handle mouse move for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Parallax transforms
  const backgroundX = useTransform(mouseX, [0, 1], [-30, 30]);
  const backgroundY = useTransform(mouseY, [0, 1], [-30, 30]);

  // Animation controls for entrance
  const controls = useAnimation();

  return (
    <HelmetProvider>
      <SEO />
      <main className="relative bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 selection:bg-sky-500/50 selection:text-sky-100 overflow-hidden">
        
        {/* Animated Background Elements */}
        <motion.div 
          style={{ x: backgroundX, y: backgroundY }}
          className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        >
          {/* Animated Gradient Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 -left-40 w-[800px] h-[800px] bg-gradient-to-r from-sky-500/10 via-indigo-500/5 to-transparent rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/4 -right-40 w-[700px] h-[700px] bg-gradient-to-l from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-[120px]"
          />
          
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:80px_80px] opacity-10" />
          
          {/* Subtle Noise Texture */}
          <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdHVidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9Ii4xIi8+PC9zdmc+')]"></div>
          </div>
        </motion.div>

        {/* 1. Global Interactive Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 z-[100] origin-left shadow-2xl shadow-sky-500/20"
          style={{ scaleX }}
        />

        {/* Floating Particles Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[1px] h-[1px] bg-white/10 rounded-full"
              animate={{
                y: [0, -100, 0],
                x: [0, Math.sin(i) * 50, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* 3. Section Wrapper with Staggered Entrance */}
        <div className="relative z-10">
          
          {/* Hero Section */}
          <section className="relative min-h-screen">
            <Hero />
          </section>

          {/* Main Content Sections */}
          <div className="space-y-0">
            
            {/* About Section */}
            <About />
            
            {/* Divider with Animation */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
              className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 origin-left"
            >
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-800/50 to-transparent" />
            </motion.div>

            {/* Skills Section */}
            <Skills />
            
            {/* Experience Section */}
            <Experience />

            {/* Divider with Glow Effect */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative py-4"
            >
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-sky-500/5 blur-3xl rounded-full" />
            </motion.div>

            {/* Featured Projects Section (Showing only 2) */}
            <section id="featured-projects" className="relative py-24 sm:py-32 overflow-hidden">
              {/* Section Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-transparent" />
              
              <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="text-center mb-16 sm:mb-24"
                >
                  {/* Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-sky-500/20 mb-6 backdrop-blur-sm"
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400 animate-pulse" />
                    <span className="text-sm font-bold text-sky-400 tracking-widest uppercase">
                      Featured Work
                    </span>
                  </motion.div>
                  
                  {/* Title */}
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-100 to-indigo-200">
                      Architectural
                    </span>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-indigo-400">
                      Showcase
                    </span>
                  </h2>
                  
                  {/* Description */}
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
                  >
                    Handpicked enterprise solutions demonstrating technical excellence, 
                    scalable architecture, and real-world impact.
                  </motion.p>
                </motion.div>

                {/* Featured Projects Grid */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
                  {featuredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      viewport={{ once: true, margin: "-50px" }}
                      whileHover={{ y: -10 }}
                      className="group"
                    >
                      {/* Project Card */}
                      <div className="relative h-full rounded-3xl overflow-hidden border border-slate-800/50 bg-gradient-to-br from-slate-900/60 to-slate-900/20 backdrop-blur-xl shadow-2xl shadow-sky-900/10 transition-all duration-500 group-hover:border-sky-500/30 group-hover:shadow-sky-900/30">
                        
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/0 via-transparent to-indigo-500/0 group-hover:from-sky-500/5 group-hover:to-indigo-500/5 transition-all duration-500" />
                        
                        {/* Image Container */}
                        <div className="relative aspect-video overflow-hidden">
                          <motion.img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                            whileHover={{ scale: 1.05 }}
                          />
                          
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                          
                          {/* Badges */}
                          <div className="absolute top-4 left-4 flex items-center gap-2">
                            <span className="px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-sm border border-slate-800/50">
                              <span className="text-xs font-semibold text-sky-300">Featured</span>
                            </span>
                            <span className="px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-sm border border-slate-800/50">
                              <span className="text-xs font-semibold text-white">#{index + 1}</span>
                            </span>
                          </div>
                          
                          {/* Client Badge */}
                          <div className="absolute top-4 right-4">
                            <div className="px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-sm border border-slate-800/50">
                              <span className="text-xs font-medium text-slate-300">{project.client}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-6 sm:p-8">
                          {/* Project Info */}
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-slate-500">{project.duration}</span>
                            <div className="flex items-center gap-2">
                              {project.metrics.slice(0, 2).map((metric, idx) => (
                                <div key={idx} className="px-2 py-1 rounded bg-slate-900/50 border border-slate-800/50">
                                  <span className="text-xs font-semibold text-sky-300">{metric.value}</span>
                                  <span className="text-xs text-slate-400 ml-1">{metric.label}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Title */}
                          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-sky-100 transition-colors">
                            {project.title}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-slate-300 text-base sm:text-lg mb-6 leading-relaxed">
                            {project.description}
                          </p>
                          
                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2 mb-8">
                            {project.tech.slice(0, 4).map((tech, idx) => (
                              <span 
                                key={idx}
                                className="px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-900/70 text-sky-300/90 border border-slate-800/50 group-hover:border-sky-500/30 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.tech.length > 4 && (
                              <span className="px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-900/50 text-slate-400">
                                +{project.tech.length - 4} more
                              </span>
                            )}
                          </div>
                          
                          {/* Action Button */}
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Link
                              to={`/projects/${project.id}`}
                              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-semibold text-sm tracking-wider uppercase group/btn"
                            >
                              <span>Explore Project</span>
                              <svg 
                                className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </Link>
                          </motion.div>
                        </div>
                        
                        {/* Bottom Glow */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* View All Projects CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="inline-block relative">
                    {/* Glow Effect */}
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -inset-4 bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl"
                    />
                    
                    {/* Main Button */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      <Link
                        to="/projects"
                        className="group/cta inline-flex items-center gap-4 px-8 sm:px-12 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-slate-900/80 to-slate-800/80 border border-slate-700/50 backdrop-blur-xl shadow-2xl"
                      >
                        {/* Icon Container */}
                        <div className="relative">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                          {/* Pulsing Dot */}
                          <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-sky-400 border-2 border-slate-900"
                          />
                        </div>
                        
                        {/* Text Content */}
                        <div className="text-left">
                          <div className="text-lg sm:text-xl font-bold text-white tracking-tight mb-1">
                            View Complete Portfolio
                          </div>
                          <div className="text-sm text-slate-400">
                            7+ Enterprise Projects • Detailed Case Studies
                          </div>
                        </div>
                        
                        {/* Arrow */}
                        <div className="ml-4">
                          <svg className="w-6 h-6 text-sky-400 group-hover/cta:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </Link>
                    </motion.div>
                  </div>
                  
                  {/* Subtext */}
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-8 text-slate-500 text-sm sm:text-base max-w-2xl mx-auto"
                  >
                    Explore detailed case studies, technical architecture diagrams, 
                    implementation challenges, and performance metrics for each project.
                  </motion.p>
                </motion.div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="hidden lg:block absolute top-1/4 left-10 w-6 h-6 rounded-full border border-sky-500/20"
              />
              <motion.div
                animate={{ y: [0, 20, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="hidden lg:block absolute bottom-1/3 right-20 w-4 h-4 rounded-full bg-indigo-500/10"
              />
            </section>

            {/* Contact Section */}
            <Contact />
          </div>
        </div>

        {/* Floating Contact Prompt */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 3, type: "spring" }}
          className="fixed bottom-8 right-8 z-50 hidden lg:block"
        >
          <a 
            href="mailto:ilamparithid01@gmail.com"
            className="group relative flex items-center gap-3 bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-3 pl-5 rounded-2xl hover:border-sky-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/20"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/0 to-indigo-500/0 group-hover:from-sky-500/10 group-hover:to-indigo-500/10 rounded-2xl transition-all duration-300" />
            
            {/* Text */}
            <div className="relative">
              <div className="text-xs font-bold text-slate-400 group-hover:text-white tracking-widest uppercase">
                Available for Hire
              </div>
              <div className="text-xs text-slate-500 group-hover:text-slate-300">
                Let's build something amazing
              </div>
            </div>
            
            {/* Icon */}
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/30 group-hover:shadow-sky-500/50 transition-shadow">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89-4.26a2 2 0 012.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              
              {/* Pulsing Effect */}
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full border-2 border-sky-400"
              />
            </div>
          </a>
        </motion.div>               
      </main>
    </HelmetProvider>
  );
};

export default Home;