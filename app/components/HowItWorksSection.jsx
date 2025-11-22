import { useState, useEffect, useRef } from 'react';

export default function HowItWorksSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(null);
  const [hoveredStep, setHoveredStep] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  const steps = [
    {
      number: "1",
      title: "Ketik Gejala Motor",
      description: "Ceritakan masalah yang dialami motor Anda dengan bahasa sehari-hari",
      gradient: "from-cyan-500/20 to-blue-500/20",
      borderGradient: "from-cyan-300/30 to-blue-300/30",
      iconBg: "from-cyan-400 to-blue-500",
      emoji: "💬",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
        </svg>
      )
    },
    {
      number: "2",
      title: "AI Menganalisa",
      description: "BengkelAI menganalisa gejala dan memberikan diagnosa serta estimasi biaya",
      gradient: "from-purple-500/20 to-pink-500/20",
      borderGradient: "from-purple-300/30 to-pink-300/30",
      iconBg: "from-purple-400 to-pink-500",
      emoji: "🤖",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      number: "3",
      title: "Booking Bengkel",
      description: "Pilih bengkel terdekat dan booking slot sesuai kebutuhan Anda",
      gradient: "from-green-500/20 to-emerald-500/20",
      borderGradient: "from-green-300/30 to-emerald-300/30",
      iconBg: "from-green-400 to-emerald-500",
      emoji: "📅",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
        </svg>
      )
    }
  ];

  return (
    <section id="cara-kerja" ref={sectionRef} className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/5 to-green-500/5 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center backdrop-blur-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-300/30 rounded-full px-6 py-2 mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse mr-2" />
            <span className="text-cyan-300 font-semibold text-sm tracking-wide">CARA KERJA</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 hover:text-cyan-300 transition-colors duration-500">
            <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent">
              Cara
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent font-black">
              Kerja
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
            Hanya 3 langkah mudah untuk mendapatkan solusi masalah motor Anda
          </p>
        </div>
        
        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent transform -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`text-center group cursor-pointer transform transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } hover:scale-105`}
                style={{ transitionDelay: `${index * 200 + 400}ms` }}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
                onClick={() => setActiveStep(activeStep === index ? null : index)}
              >
                {/* Step Number Circle */}
                <div className="relative mx-auto mb-6">
                  <div className={`w-24 h-24 backdrop-blur-xl bg-gradient-to-br ${step.iconBg} border border-white/20 rounded-full flex items-center justify-center mx-auto shadow-2xl transition-all duration-500 ${
                    hoveredStep === index ? 'scale-125 shadow-lg shadow-cyan-500/30' : 'group-hover:scale-110'
                  } ${activeStep === index ? 'animate-pulse' : ''}`}>
                    <span className="text-2xl font-bold text-white transition-all duration-300">{step.number}</span>
                    
                    {/* Glow effect */}
                    <div className={`absolute inset-0 rounded-full bg-cyan-400/20 transition-opacity duration-500 ${
                      hoveredStep === index ? 'opacity-100 animate-ping' : 'opacity-0'
                    }`} />
                  </div>
                  
                  {/* Icon Badge */}
                  <div className={`absolute -bottom-2 -right-2 backdrop-blur-xl bg-white/20 border border-white/30 text-white p-3 rounded-full shadow-lg transition-all duration-500 ${
                    hoveredStep === index ? 'scale-110 bg-white/30 border-cyan-400/50' : ''
                  } ${activeStep === index ? 'animate-bounce' : ''}`}>
                    <div className={`transition-all duration-500 ${
                      hoveredStep === index ? 'scale-125 text-cyan-300' : ''
                    } ${activeStep === index ? 'animate-pulse' : ''}`}>
                      {step.icon}
                    </div>
                    
                    {/* Floating particles */}
                    {hoveredStep === index && (
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-cyan-400/60 rounded-full animate-ping"
                            style={{
                              top: `${20 + (i * 20)}%`,
                              left: `${20 + (i * 20)}%`,
                              animationDelay: `${i * 200}ms`
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Emoji Badge */}
                  <div className="absolute -top-2 -left-2 text-2xl">
                    {step.emoji}
                  </div>
                </div>
                
                {/* Content Card */}
                <div className="group relative">
                  <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                    {/* Glass highlight effect */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                    
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-50 rounded-3xl`} />
                    
                    {/* Border Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${step.borderGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className={`text-lg sm:text-xl font-bold text-white mb-4 transition-all duration-300 ${
                        hoveredStep === index ? 'text-cyan-300 scale-105' : 'group-hover:text-white'
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm sm:text-base text-white/80 leading-relaxed transition-all duration-300 ${
                        hoveredStep === index ? 'text-white/90 transform translate-y-1' : 'group-hover:text-white/90'
                      }`}>
                        {step.description}
                      </p>
                      
                      {/* Expanded details */}
                      {activeStep === index && (
                        <div className="mt-4 p-4 bg-slate-800/30 backdrop-blur-sm border border-cyan-500/20 rounded-lg animate-fadeIn">
                          <p className="text-cyan-300 text-sm font-medium">
                            💡 Tips: Pastikan deskripsi masalah sejelas mungkin untuk hasil yang optimal!
                          </p>
                        </div>
                      )}
                      
                      {/* Hover glow effect */}
                      <div className={`absolute inset-0 bg-cyan-500/5 rounded-3xl transition-opacity duration-500 pointer-events-none ${
                        hoveredStep === index ? 'opacity-100' : 'opacity-0'
                      }`} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Demo Section */}
        <div className={`mt-16 text-center transform transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '1000ms' }}>
          <div className="backdrop-blur-xl bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 sm:p-8 shadow-xl max-w-2xl mx-auto hover:shadow-2xl hover:shadow-cyan-500/10 hover:bg-slate-700/30 hover:border-cyan-500/30 transition-all duration-500 hover:scale-[1.02]">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 hover:text-cyan-400 transition-colors duration-300">
              Demo Interaktif
            </h3>
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-cyan-500 text-white p-2 rounded-full mr-3 hover:bg-cyan-400 transition-colors duration-300">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <span className="font-semibold text-cyan-300">Contoh Percakapan:</span>
              </div>
              
              <div className="space-y-3 text-left">
                <div className="bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30 p-3 rounded-lg hover:bg-cyan-500/30 transition-colors duration-300">
                  <p className="text-sm text-white"><strong className="text-cyan-300">Anda:</strong> "Motor susah hidup pagi hari"</p>
                </div>
                <div className="bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 p-3 rounded-lg hover:bg-blue-500/30 transition-colors duration-300">
                  <p className="text-sm text-white"><strong className="text-blue-300">BengkelAI:</strong> "Kemungkinan aki lemah atau karburator kotor. Estimasi servis Rp 150-250 ribu. Mau cari bengkel terdekat?"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}