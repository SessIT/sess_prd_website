import React, { useState } from "react";
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
  MapPin,
  Briefcase,
  BookOpen,
  Building2
} from "lucide-react";

const jobs = [
  {
    id: "01",
    title: "Tech Support Engineer - Fresher",
    experience: "0 - 2 Year Experience – Post Tech Support junior",
    qualification:
      "ITI / Diploma / BE / B-Tech\nRefrigeration / Electrical / Mechanical / Fitter",
    location: `Sri Easwari Scientific Solution Pvt Ltd (SESS – Group Of company)
Door No 2/2 98, ANE Garden, Perumal kovil Street, Srinivasapuram,
Paraniputhur post, Iyyappanthangal, Chennai - 600 122.
Mob :- +91 87544 50625 Email:- info@sess.co.in`,
  },
  {
    id: "02",
    title: "Tech Support Engineer - Senior Engineer",
    experience: "2- 4 Year Experience Engineer – Post Tech Support Service Engineer",
    qualification:
      "ITI /Diploma/ BE/B-Tech\nRefrigeration /Electrical/ Mechanical/Fitter",
    location: `Sri Easwari Scientific Solution Pvt Ltd (SESS – Group Of company)
Door No 2/2 98, ANE Garden, Perumal kovil Street, Srinivasapuram,
Paraniputhur post, Iyyappanthangal, Chennai - 600 122.
Mob :- +91 87544 50625 Email:- info@sess.co.in`,
  },
  {
    id: "03",
    title: "Production line Refrigeration Technician",
    experience: "Minimum 6 Year experiences in machine Assembly experience",
    qualification:
      "ITI / Diploma / BE / B-Tech\nRefrigeration / Electrical / Mechanical / Fitter",
    location: `Sri Easwari Scientific Solution Pvt Ltd (SESS – Group Of company)
Door No 2/2 98, ANE Garden, Perumal kovil Street, Srinivasapuram,
Paraniputhur post, Iyyappanthangal, Chennai - 600 122.
Mob :- +91 87544 50625 Email:- info@sess.co.in`,
  },
];

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
      <section className="relative overflow-hidden " style={{ background: "var(--gradient-brand)" }}>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 -right-40 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl md:text-4xl font-bold tracking-tight mb-6">
                <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Build Your Career with SESS
                </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Join Sri Easwari Scientific Solution Pvt. Ltd., a trusted leader in environmental
            test solutions. Since 2010, we’ve been driven by innovation, precision, and a
            commitment to excellence — and we’re looking for passionate individuals to grow with us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* LEFT SIDE - Job Openings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-slate-600" />
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
                      activeJob === job.id ? "text-cyan-500" : "text-slate-400"
                    }`}>
                      {job.id}
                    </span>
                    <h3 className={`text-lg font-semibold ${
                      activeJob === job.id ? "text-cyan-500" : "text-neutral-800"
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

                        {/* Location */}
                        <div className="flex gap-3">
                          <MapPin className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-slate-700 text-sm uppercase tracking-wide mb-1">
                              Location
                            </h4>
                            <p className="text-slate-600 whitespace-pre-line text-sm">
                              {job.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
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