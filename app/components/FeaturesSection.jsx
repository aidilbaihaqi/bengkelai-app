import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from '@remix-run/react';

export default function FeaturesSection() {
  const [visibleFeatures, setVisibleFeatures] = useState(new Set());
  const sectionRef = useRef(null);
  const featureRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = featureRefs.current.indexOf(entry.target);
            if (index !== -1) {
              setTimeout(() => {
                setVisibleFeatures(prev => new Set([...prev, index]));
              }, index * 200);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    featureRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      emoji: "🤖",
      title: "Diagnosa Gejala",
      description: "AI menganalisis gejala motor dan memberikan diagnosis akurat dengan tingkat kepercayaan tinggi",
      badge: "AI Powered",
      gradient: "from-cyan-500/20 to-blue-500/20",
      borderGradient: "from-cyan-300/40 to-blue-300/40",
      iconBg: "from-cyan-400 to-blue-500",
      link: "/chat"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      emoji: "🛡️",
      title: "Solusi Langkah demi Langkah",
      description: "Panduan detail perbaikan dengan estimasi waktu, biaya, dan tingkat kesulitan",
      badge: "Step by Step",
      gradient: "from-emerald-500/20 to-green-500/20",
      borderGradient: "from-emerald-300/40 to-green-300/40",
      iconBg: "from-emerald-400 to-green-500",
      link: "/chat"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      emoji: "📍",
      title: "Estimasi & Bengkel",
      description: "Estimasi biaya perbaikan dan rekomendasi bengkel terdekat dengan rating terpercaya",
      badge: "Coming Soon",
      gradient: "from-orange-500/20 to-red-500/20",
      borderGradient: "from-orange-300/40 to-red-300/40",
      iconBg: "from-orange-400 to-red-500",
      link: "/dashboard?tab=workshop-finder"
    }
  ];

  return (
    <section id="fitur" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-slate-950/50 to-slate-900/80" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_80%,rgba(255,107,107,0.08),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-300/20 mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-300 text-sm font-medium tracking-wide">FITUR UNGGULAN</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent">
              Teknologi AI
            </span>
            <br />
            <span className="text-white/90">untuk Motor Anda</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Solusi cerdas berbasis kecerdasan buatan untuk diagnosis, perawatan, dan optimalisasi performa motor
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Link
              to={feature.link}
              prefetch="intent"
              key={index}
              ref={el => featureRefs.current[index] = el}
              className={`group relative p-8 rounded-3xl backdrop-blur-xl bg-gradient-to-br ${feature.gradient} border border-white/10 hover:border-white/20 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] transform hover:scale-105 ${visibleFeatures.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05) rotateY(5deg) translateY(-8px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotateY(0deg) translateY(0px)';
              }}
              onClick={() => navigate(feature.link)}
            >
              {/* Glass Effect Overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Border Glow */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10`} />
              
              <div className="relative z-10">
                {/* Icon & Badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.iconBg} flex items-center justify-center text-white shadow-lg group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50`}>
                    <div className="group-hover:animate-pulse">
                      {feature.icon}
                    </div>
                  </div>
                  <span className="text-3xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:animate-bounce">
                    {feature.emoji}
                  </span>
                </div>
                
                {/* Badge */}
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 bg-gradient-to-r ${feature.borderGradient} text-white text-xs font-semibold rounded-full backdrop-blur-sm border border-white/20 tracking-wide`}>
                    {feature.badge}
                  </span>
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-100 transition-all duration-300 group-hover:translate-x-2">
                  {feature.title}
                </h3>
                
                <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-all duration-300 group-hover:translate-x-1">
                  {feature.description}
                </p>
                
                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-blue-500/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-cyan-500/20 transition-all duration-500" />
                
                {/* Hover Arrow */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="flex items-center text-cyan-300 text-sm font-medium">
                    <span>Pelajari lebih lanjut</span>
                    <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-300/20">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 border-2 border-white/20" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 border-2 border-white/20" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-red-500 border-2 border-white/20" />
            </div>
            <span className="text-white/90 font-medium">Dipercaya oleh 10,000+ pengguna motor</span>
          </div>
        </div>
      </div>
    </section>
  );
}