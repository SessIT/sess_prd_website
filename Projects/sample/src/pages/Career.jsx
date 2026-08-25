import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  ChevronUp, 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Upload,
  Send,
  Briefcase,
  BookOpen,
  Building2,
  BadgeCheck,
  FileText
} from "lucide-react";

const jobs = [
  {
    id: "01",
    title: "Accounts Executive",
    experience: "3 - 6 Year Experience – Accounts Executive",
    // Accounts-ku specialization qualification mattum thaan correct
    qualification: "B.Com / M.Com / BBA (Finance / Accounts)",
    skills: ["Tally Prime", "GST Filing", "TDS", "Financial Reporting", "Finalization of Accounts", "MS Excel"],
    description: "Seeking a detail-oriented Accounts Executive to manage day-to-day financial transactions, maintain the general ledger, and ensure compliance with tax regulations (GST/TDS). You will be responsible for preparing financial statements and reconciling bank statements.",
    location: `Sri Easwari Scientific Solution Pvt Ltd (SESS – Group Of company)
Door No 2/2 98, ANE Garden, Perumal kovil Street, Srinivasapuram,
Paraniputhur post, Iyyappanthangal, Chennai - 600 122.
Mob :- +91 87544 50625 Email:- info@sess.co.in`,
  },
  {
    id: "02",
    title: "PLC Programmer",
    experience: "Minimum 3 Year Experience",
    // PLC-ku specialization based on Engineering/Diploma
    qualification: "BE / B.Tech / Diploma (ECE / EEE / E&I / Mechatronics)",
    skills: ["Ladder Logic", "SCADA", "HMI Programming", "Industrial Automation", "Siemens/Delta PLC", "Troubleshooting"],
    description: "Looking for an experienced PLC Programmer to design, program, and commission automation systems. You will be responsible for developing logic for industrial machinery, integrating HMI/SCADA systems, and providing on-site technical support for automation projects.",
    location: `Sri Easwari Scientific Solution Pvt Ltd (SESS – Group Of company)...`,
  },
  {
    id: "03",
    title: "Electrical Engineer",
    experience: "0 - 2 years",
    qualification: "BE / B.Tech / Diploma / ITI (Electrical / EEE)",
    skills: ["Electrical Circuit Design", "Control Panels", "Wiring & Installation", "AutoCAD Electrical", "Power Distribution"],
    description: "Responsible for designing and maintaining electrical systems and control panels. As an Electrical Engineer, you will oversee installation projects, ensure safety standards are met, and perform diagnostic tests on industrial equipment.",
    location: `Sri Easwari Scientific Solution Pvt Ltd (SESS – Group Of company)...`,
  },
  {
    id: "04",
    title: "Mechanical Engineer",
    experience: "0 - 2 years",
    qualification: "BE / B.Tech / Diploma / ITI (Mechanical)",
    skills: ["Machine Design", "AutoCAD/SolidWorks", "Preventive Maintenance", "Fabrication", "Technical Documentation"],
    description: "Seeking a Mechanical Engineer to handle the design, assembly, and maintenance of mechanical components and systems. You will work on optimizing machinery performance and ensuring structural integrity of scientific solutions equipment.",
    location: `Sri Easwari Scientific Solution Pvt Ltd (SESS – Group Of company)...`,
  },
  {
    id: "05",
    title: "Refrigeration Engineer",
    experience: "0 - 2 years",
    qualification: "BE / B.Tech / Diploma / ITI (Refrigeration & Air Conditioning / Mechanical)",
    skills: ["HVAC Systems", "Compressor Maintenance", "Refrigerant Handling", "Cooling Cycle Analysis", "Leak Detection"],
    description: "Specialized role focused on installing and repairing refrigeration and cooling systems. You will be responsible for maintaining optimal temperature environments for scientific equipment and troubleshooting cooling cycle issues.",
    location: `Sri Easwari Scientific Solution Pvt Ltd (SESS – Group Of company)...`,
  },
  {
    id: "06",
    title: "Sales Engineer",
    experience: "0 - 2 years",
    qualification: "Any Degree / BE / B.Tech / Diploma (Technical Background Preferred)",
    skills: ["Technical Sales", "Lead Generation", "Client Relationship Management", "Product Demo", "Market Research"],
    description: "Bridge the gap between technical complexity and sales. You will identify potential clients, deliver technical presentations of our scientific solutions, and provide post-sales support to build long-term customer relationships.",
    location: `Sri Easwari Scientific Solution Pvt Ltd (SESS – Group Of company)...`,
  },
];

const Particle = ({ x, y, size, delay, color }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      background: color,
      opacity: 0.15
    }}
    animate={{
      y: [0, -30, 0],
      opacity: [0.1, 0.25, 0.1],
      scale: [1, 1.3, 1]
    }}
    transition={{
      duration: 4 + delay,
      repeat: Infinity,
      ease: 'easeInOut',
      delay
    }}
  />
);

export default function CareerPage() {
  const [activeJob, setActiveJob] = useState(jobs[0].id);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    file: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  
    useEffect(() => {
      const handle = (e) => {
        setMousePos({
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight
        });
      };
      window.addEventListener('mousemove', handle);
      return () => window.removeEventListener('mousemove', handle);
    }, []);
  
    const particles = [
      { x: 10, y: 20, size: 60, delay: 0, color: 'rgb(2 174 178)' },
      { x: 80, y: 10, size: 90, delay: 1.5, color: '#3b82f6' },
      { x: 50, y: 70, size: 50, delay: 0.8, color: 'rgb(2 174 178)' },
      { x: 90, y: 60, size: 70, delay: 2.2, color: '#60a5fa' },
      { x: 20, y: 85, size: 40, delay: 1, color: '#0ea5e9' },
      { x: 65, y: 40, size: 55, delay: 3, color: 'rgb(2 174 178)' }
    ];

  const toggleJob = (id) => {
    setActiveJob(activeJob === id ? null : id);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Valid email is required";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10)
      newErrors.phone = "Valid phone number is required";
    if (!form.qualification.trim())
      newErrors.qualification = "Qualification is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        qualification: "",
        file: null,
      });
      setTimeout(() => setSubmitSuccess(false), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
                         <section
                           ref={heroRef}
                           className="relative text-white overflow-hidden"
                           style={{ background: 'var(--gradient-brand)', minHeight: '340px', display: 'flex', alignItems: 'center' }}
                         >
                           {[
                             { color: '#0284c7', top: '-15%', right: '-10%', w: 420 },
                             { color: '#06b6d4', bottom: '-20%', left: '-8%', w: 380 },
                             { color: 'rgb(2,174,178)', top: '30%', left: '40%', w: 260 },
                           ].map((b, i) => (
                             <motion.div
                               key={i}
                               className="absolute rounded-full mix-blend-multiply filter blur-3xl"
                               style={{
                                 width: b.w, height: b.w,
                                 background: b.color,
                                 top: b.top, bottom: b.bottom, left: b.left, right: b.right,
                                 opacity: 0.18,
                               }}
                               animate={{
                                 x: (mousePos.x - 0.5) * (20 + i * 10),
                                 y: (mousePos.y - 0.5) * (15 + i * 8),
                                 scale: [1, 1.12, 1],
                               }}
                               transition={{
                                 x: { type: 'spring', stiffness: 30, damping: 20 },
                                 y: { type: 'spring', stiffness: 30, damping: 20 },
                                 scale: { duration: 6 + i * 2, repeat: Infinity, ease: 'easeInOut' },
                               }}
                             />
                           ))}
                   
                           {particles.map((p, i) => <Particle key={i} {...p} />)}
                   
                           <div
                             className="absolute inset-0 opacity-[0.04]"
                             style={{
                               backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                               backgroundSize: '48px 48px',
                             }}
                           />
                   
                           <div className="relative max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                             <motion.div
                               initial={{ opacity: 0, y: 40 }}
                               animate={{ opacity: 1, y: 0 }}
                               transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                               className="text-center max-w-3xl mx-auto"
                             >
                               <motion.div
                                 initial={{ scale: 0.8, opacity: 0 }}
                                 animate={{ scale: 1, opacity: 1 }}
                                 transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
                                 className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 text-sm font-medium mb-8 border border-white/25"
                                 style={{ letterSpacing: '0.03em' }}
                               >
                                 <span className="relative flex h-2 w-2">
                                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                   <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                                 </span>
                                 Build Your Future with Us.
                               </motion.div>
                   
                               <motion.h1
                                 initial={{ opacity: 0, y: 20 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                                 Career
                               </motion.h1>
                   
                               <motion.p
                                 initial={{ opacity: 0 }}
                                 animate={{ opacity: 1 }}
                                 transition={{ delay: 0.45, duration: 0.6 }}
                                 className="text-base sm:text-lg md:text-lg text-gray-200 leading-relaxed px-4">
                                 Explore career opportunities in engineering, manufacturing, and automation with a growing technology-driven company.                               </motion.p>
                             </motion.div>
                           </div>
                         </section>

      {/* Main Content */}
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* LEFT SIDE - Job Openings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-cyan-600 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-cyan-600" />
                Open Positions
              </h2>
              <p className="text-slate-500 mt-1">Select a role to view details</p>
            </div>

            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleJob(job.id)}
                  className={`w-full flex items-center justify-between px-6 py-5 transition-all duration-300 ${
                    activeJob === job.id
                      ? "bg-slate-800 text-white"
                      : "bg-white text-slate-800 hover:bg-slate-50 border border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-2xl font-bold ${
                      activeJob === job.id ? "text-white" : "text-slate-400"
                    }`}>
                      {job.id}
                    </span>
                    <h3 className={`text-lg font-semibold ${
                      activeJob === job.id ? "text-white" : "text-cyan-600"
                    }`}>
                      {job.title}
                    </h3>
                  </div>
                  {activeJob === job.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                {/* Accordion Content */}
                <AnimatePresence>
                  {activeJob === job.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white border border-t-0 border-slate-200 p-6 space-y-5">
                        {/* Experience */}
                        <div className="flex gap-3">
                          <Briefcase className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-slate-700 text-sm uppercase tracking-wide mb-1">
                              Experience
                            </h4>
                            <p className="text-slate-600">{job.experience}</p>
                          </div>
                        </div>

                        {/* Qualification */}
                        <div className="flex gap-3">
                          <GraduationCap className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-slate-700 text-sm uppercase tracking-wide mb-1">
                              Qualification
                            </h4>
                            <p className="text-slate-600 whitespace-pre-line">
                              {job.qualification}
                            </p>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="flex gap-3">
                          <BadgeCheck className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-slate-700 text-sm uppercase tracking-wide mb-2">
                              Skills
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {job.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="inline-flex items-center rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="flex gap-3">
                          <FileText className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-slate-700 text-sm uppercase tracking-wide mb-1">
                              Description
                            </h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                              {job.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* Admin Team Contact Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100 rounded-xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                <User className="w-5 h-5 text-cyan-600" />
                Contact Admin Team
              </h3>
              <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                Can't find the right role? Feel free to contact our admin team to collaborate and discuss future career opportunities at SESS.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    <Phone className="w-4 h-4 text-cyan-600" />
                  </div>
                  <a href="tel:+917548870106" className="font-medium hover:text-cyan-600 transition-colors">+91 75488 70106</a>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    <Mail className="w-4 h-4 text-cyan-600" />
                  </div>
                  <a href="mailto:admin@sess.co.in" className="font-medium hover:text-cyan-600 transition-colors">admin@sess.co.in</a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - Application Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden sticky top-8">
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-5">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Apply Now
                </h2>
                <p className="text-slate-300 text-sm mt-1">
                  Submit your application for the desired position
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Name Field */}
                <div>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.name
                          ? "border-red-400 focus:ring-red-200"
                          : "border-slate-200 focus:ring-blue-200 focus:border-blue-400"
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.email
                          ? "border-red-400 focus:ring-red-200"
                          : "border-slate-200 focus:ring-blue-200 focus:border-blue-400"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.phone
                          ? "border-red-400 focus:ring-red-200"
                          : "border-slate-200 focus:ring-blue-200 focus:border-blue-400"
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Qualification Field */}
                <div>
                  <div className="relative">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      name="qualification"
                      value={form.qualification}
                      onChange={handleChange}
                      placeholder="Qualification (ITI / Diploma / BE / B-Tech)"
                      className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.qualification
                          ? "border-red-400 focus:ring-red-200"
                          : "border-slate-200 focus:ring-blue-200 focus:border-blue-400"
                      }`}
                    />
                  </div>
                  {errors.qualification && (
                    <p className="text-red-500 text-xs mt-1">{errors.qualification}</p>
                  )}
                </div>

                {/* File Upload */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">
                    Upload Resume
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="file"
                      onChange={handleChange}
                      className="w-full py-2 px-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 transition-all cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Accepted formats: PDF, DOC, DOCX (Max 5MB)
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-slate-800 hover:bg-slate-700 hover:shadow-lg active:scale-[0.98]"
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Apply Now
                    </>
                  )}
                </button>

                {/* Success Message */}
                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-emerald-50 border border-emerald-200 rounded-lg p-3"
                    >
                      <p className="text-emerald-700 text-sm text-center">
                        ✓ Application submitted successfully! We'll get back to you soon.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              {/* Footer Info */}
              <div className="bg-slate-50 px-6 py-4 border-t border-slate-100">
                <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    SESS Group
                  </span>
                  <span>•</span>
                  <span>Privacy Protected</span>
                  <span>•</span>
                  <span>Response within 3 days</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
