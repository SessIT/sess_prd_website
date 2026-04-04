import React from 'react'
import { Link } from 'react-router-dom' // Add this import
import project1 from '../assets/Website_Gallery_img/img1.jpg';
import project2 from '../assets/Website_Gallery_img/img2.jpg';
import project3 from '../assets/Website_Gallery_img/img3.jpg'
import { motion } from 'framer-motion'

const NewsBlogs = () => {

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
        },
        {
            id: 3,
            title: "Enterprise HRMS System",
            description: "Comprehensive HR management platform for enterprises with 5000+ employees featuring automated payroll, compliance, and performance management.",
            tech: ["Java", "Spring Boot", "React", "MySQL", "Redis", "Docker"],
            image: project3,
            featured: true,
            metrics: [
                { label: "Users", value: "50,000+" },
                { label: "Accuracy", value: "99.9%" },
                { label: "Uptime", value: "99.95%" }
            ],
            client: "Fortune 500 Manufacturing Company",
            duration: "12 Months"
        },
        
    ];

    return (
        <div className="mx-auto px-4 py-16">
            {/* Featured Projects Grid */}
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-4 mb-16">
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
                                    className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.7 }}
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
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                                    <span className="text-sm font-medium text-slate-500">{project.duration}</span>
                                    <div className="flex flex-wrap items-center gap-2">
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
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Link
                                        to={`/projects/${project.id}`}
                                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-semibold text-sm tracking-wider uppercase hover:from-sky-500 hover:to-indigo-500 transition-all duration-300"
                                    >
                                        <span>Explore Project</span>
                                        <svg 
                                            className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" 
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
        </div>
    )
}

export default NewsBlogs