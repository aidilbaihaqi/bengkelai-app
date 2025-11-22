import { useState, useEffect, useRef } from 'react';

export default function MVPFeaturesSection() {
  const [visibleFeatures, setVisibleFeatures] = useState(new Set());
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const sectionRef = useRef(null);
  const featureRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = featureRefs.current.indexOf(entry.target);
            if (index !== -1) {
              setTimeout(() => {
                setVisibleFeatures(prev => new Set([...prev, index]));
              }, index * 300);
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

  const mvpFeatures = [
    {
      id: "ai-diagnosis",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "AI Diagnosa Cerdas",
      description: "Analisis gejala motor dengan AI yang terlatih dari ribuan kasus. Dapatkan diagnosis akurat dalam hitungan detik.",
      features: ["Analisis gejala real-time", "Database 10,000+ kasus", "Akurasi 95%", "Rekomendasi solusi"],
      status: "available",
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderGradient: "from-blue-300/40 to-cyan-300/40",
      iconBg: "from-blue-400 to-cyan-500",
      emoji: "🤖",
      demo: {
        input: "Motor susah hidup pagi hari",
        output: "Kemungkinan aki lemah (70%) atau karburator kotor (25%). Estimasi biaya: Rp 150-300k"
      }
    },
    {
      id: "bengkel-finder",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Finder Bengkel Terdekat",
      description: "Temukan bengkel terpercaya di sekitar Anda dengan rating, review, dan estimasi jarak tempuh.",
      features: ["Maps terintegrasi", "Rating & review", "Estimasi jarak", "Booking online"],
      status: "beta",
      gradient: "from-green-500/20 to-emerald-500/20",
      borderGradient: "from-green-300/40 to-emerald-300/40",
      iconBg: "from-green-400 to-emerald-500",
      emoji: "📍",
      demo: {
        input: "Cari bengkel di Jakarta Selatan",
        output: "5 bengkel ditemukan dalam radius 3km. Rating tertinggi: Bengkel Jaya (4.8★)"
      }
    },
    {
      id: "cost-estimation",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: "Estimasi Biaya Akurat",
      description: "Perkiraan biaya perbaikan berdasarkan harga pasar terkini dan katalog spare part lengkap.",
      features: ["Katalog 50,000+ part", "Harga real-time", "Breakdown detail", "Perbandingan bengkel"],
      status: "available",
      gradient: "from-orange-500/20 to-red-500/20",
      borderGradient: "from-orange-300/40 to-red-300/40",
      iconBg: "from-orange-400 to-red-500",
      emoji: "💰",
      demo: {
        input: "Ganti oli + filter udara",
        output: "Estimasi: Rp 85-120k (oli: 60k, filter: 25k, jasa: 35k)"
      }
    },
    {
      id: "service-reminder",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Service Reminder Pintar",
      description: "Pengingat otomatis untuk service berkala berdasarkan kilometer, waktu, dan kondisi motor Anda.",
      features: ["Notifikasi push", "Jadwal custom", "Tracking KM", "History lengkap"],
      status: "coming-soon",
      gradient: "from-purple-500/20 to-pink-500/20",
      borderGradient: "from-purple-300/40 to-pink-300/40",
      iconBg: "from-purple-400 to-pink-500",
      emoji: "⏰",
      demo: {
        input: "Motor terakhir service 3 bulan lalu",
        output: "Reminder: Service rutin dalam 2 minggu (berdasarkan 5000km)"
      }
    },
    {
      id: "user-auth",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      title: "Akun Personal & Sync",
      description: "Simpan riwayat konsultasi, data motor, dan preferensi Anda dengan sinkronisasi multi-device.",
      features: ["Profile motor", "Riwayat konsultasi", "Sync multi-device", "Data backup"],
      status: "beta",
      gradient: "from-indigo-500/20 to-purple-500/20",
      borderGradient: "from-indigo-300/40 to-purple-300/40",
      iconBg: "from-indigo-400 to-purple-500",
      emoji: "👤",
      demo: {
        input: "Login dengan Google/Email",
        output: "Selamat datang! 3 konsultasi tersimpan, motor: Honda Beat 2020"
      }
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'available':
        return { text: 'Tersedia', color: 'from-green-400 to-emerald-500', textColor: 'text-green-100' };
      case 'beta':
        return { text: 'Beta', color: 'from-yellow-400 to-orange-500', textColor: 'text-yellow-100' };
      case 'coming-soon':
        return { text: 'Segera Hadir', color: 'from-gray-400 to-gray-500', textColor: 'text-gray-100' };
      default:
        return { text: 'Unknown', color: 'from-gray-400 to-gray-500', textColor: 'text-gray-100' };
    }
  };

  return (
    <section id="demo" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-slate-950/50 to-slate-900/80" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.08),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 transform transition-all duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-300/20 mb-6 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 hover:border-blue-300/40 transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-300 text-sm font-medium tracking-wide">MVP FEATURES v1.0</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 hover:scale-105 transition-transform duration-500">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent hover:from-cyan-100 hover:via-blue-200 hover:to-purple-300 transition-all duration-500">
              Fitur Lengkap
            </span>
            <br />
            <span className="text-white/90 hover:text-white transition-colors duration-300">BengkelAI v1.0</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed transform transition-all duration-700 delay-300 hover:text-slate-200">
            Platform all-in-one untuk semua kebutuhan motor Anda. Dari diagnosis AI hingga booking bengkel, semuanya dalam satu aplikasi.
          </p>
        </div>

        {/* MVP Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {mvpFeatures.map((feature, index) => {
            const statusBadge = getStatusBadge(feature.status);
            
            return (
              <div
                key={feature.id}
                ref={el => featureRefs.current[index] = el}
                className={`group relative p-6 sm:p-8 rounded-3xl backdrop-blur-xl bg-gradient-to-br ${feature.gradient} border border-white/10 hover:border-white/20 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.4)] cursor-pointer transform hover:scale-[1.02] ${visibleFeatures.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                {/* Glass Effect Overlay */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Border Glow */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10`} />
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.iconBg} flex items-center justify-center text-white shadow-lg group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-xl`}>
                        <div className={`transition-all duration-300 ${hoveredFeature === index ? 'animate-bounce' : ''}`}>
                          {feature.icon}
                        </div>
                      </div>
                      <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {feature.emoji}
                      </span>
                    </div>
                    
                    {/* Status Badge */}
                    <div className={`px-3 py-1 bg-gradient-to-r ${statusBadge.color} ${statusBadge.textColor} text-xs font-semibold rounded-full backdrop-blur-sm border border-white/20 tracking-wide transform transition-all duration-300 group-hover:scale-110 ${hoveredFeature === index ? 'animate-pulse' : ''}`}>
                      {statusBadge.text}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-cyan-100 transition-all duration-300 group-hover:translate-x-2">
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 group-hover:text-slate-200 transition-all duration-300 group-hover:translate-x-1">
                    {feature.description}
                  </p>
                  
                  {/* Feature List */}
                  <div className="space-y-2 mb-6">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className={`flex items-center text-sm text-slate-400 group-hover:text-slate-300 transition-all duration-300 ${hoveredFeature === index ? 'transform translate-x-2' : ''}`} style={{transitionDelay: `${idx * 100}ms`}}>
                        <div className={`w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3 group-hover:bg-cyan-300 transition-all duration-300 group-hover:scale-150 ${hoveredFeature === index ? 'animate-pulse' : ''}`} />
                        {item}
                      </div>
                    ))}
                  </div>
                  
                  {/* Demo Preview */}
                  <div className={`bg-black/20 rounded-xl p-4 backdrop-blur-sm border border-white/10 transition-all duration-500 group-hover:bg-black/30 group-hover:border-white/20 ${hoveredFeature === index ? 'transform scale-[1.02]' : ''}`}>
                    <div className="text-xs text-slate-400 mb-2 font-medium group-hover:text-cyan-400 transition-colors duration-300">Demo:</div>
                    <div className="space-y-2">
                      <div className="text-xs text-cyan-300 bg-cyan-500/10 px-3 py-2 rounded-lg border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all duration-300">
                        <span className="font-medium">Input:</span> {feature.demo.input}
                      </div>
                      <div className="text-xs text-emerald-300 bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-all duration-300">
                        <span className="font-medium">Output:</span> {feature.demo.output}
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <button className={`w-full py-3 px-4 bg-gradient-to-r ${feature.borderGradient} text-white text-sm font-semibold rounded-xl backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 ${hoveredFeature === index ? 'animate-pulse' : ''}`}>
                      {feature.status === 'available' ? 'Coba Sekarang' : feature.status === 'beta' ? 'Join Beta' : 'Coming Soon'}
                    </button>
                  </div>
                  
                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/10 transition-all duration-500" />
                  
                  {/* Floating Particles Effect */}
                  {hoveredFeature === index && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
                          style={{
                            top: `${20 + i * 30}%`,
                            left: `${10 + i * 25}%`,
                            animationDelay: `${i * 200}ms`
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Bottom Stats & CTA */}
        <div className="text-center">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12 max-w-4xl mx-auto">
            {[
              { number: "5", label: "Fitur MVP", icon: "⚡" },
              { number: "3", label: "Tersedia", icon: "✅" },
              { number: "2", label: "Beta Testing", icon: "🧪" },
              { number: "1", label: "Coming Soon", icon: "🚀" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 sm:p-6 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className="text-xl sm:text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                <div className="text-lg sm:text-2xl font-bold text-white mb-1 group-hover:text-cyan-100 transition-colors duration-300">{stat.number}</div>
                <div className="text-xs sm:text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
          
          {/* CTA */}
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-300/20">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 border-2 border-white/20" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 border-2 border-white/20" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-red-500 border-2 border-white/20" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 border-2 border-white/20" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 border-2 border-white/20" />
            </div>
            <span className="text-white/90 font-medium">Roadmap MVP v1.0 - Launching Q1 2024</span>
          </div>
        </div>
      </div>
    </section>
  );
}