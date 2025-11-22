import { useState, useEffect, useRef } from 'react';

export default function BenefitsSection() {
  const [visibleBenefits, setVisibleBenefits] = useState(new Set());
  const [visibleStats, setVisibleStats] = useState(new Set());
  const [hoveredBenefit, setHoveredBenefit] = useState(null);
  const sectionRef = useRef(null);
  const benefitRefs = useRef([]);
  const statRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const benefitIndex = benefitRefs.current.indexOf(entry.target);
            const statIndex = statRefs.current.indexOf(entry.target);
            
            if (benefitIndex !== -1) {
              setTimeout(() => {
                setVisibleBenefits(prev => new Set([...prev, benefitIndex]));
              }, benefitIndex * 200);
            }
            
            if (statIndex !== -1) {
              setTimeout(() => {
                setVisibleStats(prev => new Set([...prev, statIndex]));
              }, statIndex * 150);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    [...benefitRefs.current, ...statRefs.current].forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: "Hemat Waktu & Biaya",
      description: "Diagnosis cepat dan akurat tanpa perlu ke bengkel terlebih dahulu. Hemat biaya konsultasi hingga 70%",
      stat: "80%",
      statLabel: "lebih cepat",
      gradient: "from-emerald-500/20 to-green-500/20",
      borderGradient: "from-emerald-300/40 to-green-300/40",
      iconBg: "from-emerald-400 to-green-500",
      emoji: "⚡"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Akurasi Tinggi",
      description: "AI terlatih dari ribuan kasus motor dengan database komprehensif dari berbagai merek dan model",
      stat: "95%",
      statLabel: "akurasi",
      gradient: "from-cyan-500/20 to-blue-500/20",
      borderGradient: "from-cyan-300/40 to-blue-300/40",
      iconBg: "from-cyan-400 to-blue-500",
      emoji: "🎯"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "24/7 Tersedia",
      description: "Konsultasi kapan saja, dimana saja dengan response time kurang dari 30 detik",
      stat: "24/7",
      statLabel: "online",
      gradient: "from-orange-500/20 to-red-500/20",
      borderGradient: "from-orange-300/40 to-red-300/40",
      iconBg: "from-orange-400 to-red-500",
      emoji: "🌟"
    }
  ];

  return (
    <section id="benefits" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-slate-900/80 to-slate-950/50" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_30%,rgba(34,197,94,0.08),transparent_50%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.08),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 backdrop-blur-sm border border-emerald-300/20 mb-6">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-300 text-sm font-medium tracking-wide">KEUNGGULAN PLATFORM</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-emerald-100 to-cyan-200 bg-clip-text text-transparent">
              Mengapa Memilih
            </span>
            <br />
            <span className="text-white/90">AI Assistant Kami?</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Teknologi terdepan yang memberikan solusi cerdas, cepat, dan akurat untuk semua kebutuhan motor Anda
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              ref={el => benefitRefs.current[index] = el}
              className={`group relative p-6 sm:p-8 rounded-3xl backdrop-blur-xl bg-gradient-to-br ${benefit.gradient} border border-white/10 hover:border-white/20 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.4)] transform ${visibleBenefits.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              onMouseEnter={() => setHoveredBenefit(index)}
              onMouseLeave={() => setHoveredBenefit(null)}
            >
              {/* Glass Effect Overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Border Glow */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${benefit.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10`} />
              
              <div className="relative z-10 text-center">
                {/* Icon & Emoji */}
                <div className="flex items-center justify-center mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.iconBg} flex items-center justify-center text-white shadow-lg group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-xl`}>
                    {benefit.icon}
                  </div>
                  <span className={`text-4xl ml-4 group-hover:scale-125 transition-transform duration-500 ${hoveredBenefit === index ? 'animate-bounce' : ''}`}>
                    {benefit.emoji}
                  </span>
                </div>
                
                {/* Stats */}
                <div className="mb-6">
                  <div className="text-4xl font-bold text-white mb-2 group-hover:text-cyan-100 transition-colors duration-300">
                    {benefit.stat}
                  </div>
                  <div className="text-sm text-slate-400 uppercase tracking-wider font-medium">
                    {benefit.statLabel}
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-cyan-100 transition-all duration-300 group-hover:translate-x-2">
                  {benefit.title}
                </h3>
                
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed group-hover:text-slate-200 transition-all duration-300 group-hover:translate-x-1">
                  {benefit.description}
                </p>
                
                {/* Progress Bar */}
                <div className="mt-6 bg-white/10 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${benefit.borderGradient} rounded-full transition-all duration-1000 group-hover:w-full`}
                    style={{ width: benefit.stat === '24/7' ? '100%' : benefit.stat }}
                  />
                </div>
                
                {/* Floating Particles Effect */}
                {hoveredBenefit === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
                        style={{
                          top: `${20 + i * 30}%`,
                          right: `${10 + i * 15}%`,
                          animationDelay: `${i * 200}ms`
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {[
            { number: "10K+", label: "Pengguna Aktif", icon: "👥" },
            { number: "95%", label: "Tingkat Akurasi", icon: "🎯" },
            { number: "<30s", label: "Response Time", icon: "⚡" },
            { number: "24/7", label: "Dukungan", icon: "🌟" }
          ].map((stat, index) => (
            <div 
              key={index} 
              ref={el => statRefs.current[index] = el}
              className={`text-center p-4 sm:p-6 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-700 group cursor-pointer transform hover:scale-110 ${visibleStats.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="text-xl sm:text-2xl mb-2 group-hover:scale-125 group-hover:animate-bounce transition-all duration-500">{stat.icon}</div>
              <div className="text-lg sm:text-2xl font-bold text-white mb-1 group-hover:text-cyan-100 group-hover:animate-pulse transition-all duration-500">{stat.number}</div>
              <div className="text-xs sm:text-sm text-slate-400 group-hover:text-slate-200 group-hover:translate-y-1 transition-all duration-300">{stat.label}</div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}