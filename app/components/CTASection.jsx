import Button from "./Button";
import { Link } from "@remix-run/react";
import { useState, useEffect, useRef } from 'react';

export default function CTASection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    if (sectionRef.current) {
      sectionRef.current.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (sectionRef.current) {
        sectionRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);
  return (
    <section 
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Interactive Background */}
      <div 
        className="absolute inset-0 opacity-30 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)`
        }}
      />
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
      </div>
      
      {/* Glass Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-24 h-24 border border-white/30 rounded-full backdrop-blur-sm" />
        <div className="absolute top-40 right-32 w-20 h-20 border border-cyan-300/30 rounded-full backdrop-blur-sm" />
        <div className="absolute bottom-32 left-40 w-16 h-16 border border-orange-300/30 rounded-full backdrop-blur-sm" />
        <div className="absolute bottom-40 right-20 w-28 h-28 border border-purple-300/30 rounded-full backdrop-blur-sm" />
      </div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Main CTA Content */}
        <div className={`mb-16 transform transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Badge */}
          <div className="inline-flex items-center backdrop-blur-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-300/30 rounded-full px-6 py-2 mb-8 hover:scale-105 transition-transform duration-300">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse mr-2" />
            <span className="text-orange-300 font-semibold text-sm tracking-wide">MULAI SEKARANG</span>
          </div>
          
          <h2 className={`text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight transform transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <span className="bg-gradient-to-r from-white via-orange-100 to-red-200 bg-clip-text text-transparent hover:from-orange-200 hover:via-red-300 hover:to-pink-400 transition-all duration-500">
              Siap mencoba
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 bg-clip-text text-transparent font-black hover:from-orange-300 hover:via-red-400 hover:to-pink-500 transition-all duration-500">
              BengkelAI?
            </span>
          </h2>
          
          <p className={`text-lg sm:text-xl lg:text-2xl text-white/80 mb-8 leading-relaxed max-w-3xl mx-auto px-4 transform transition-all duration-1000 delay-500 hover:text-white/90 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Dapatkan diagnosa motor yang akurat dan temukan solusi terbaik dalam hitungan menit
          </p>
        </div>
        
        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 px-4 transform transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <Link to="/chat">
            <Button 
              variant="primary" 
              className="group relative backdrop-blur-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl font-bold rounded-3xl shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:min-w-[320px] border border-orange-400/30 overflow-hidden"
              onMouseEnter={() => setHoveredButton('primary')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              {/* Glass highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              {hoveredButton === 'primary' && (
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-500/20 animate-pulse" />
              )}
              
              {/* Rocket SVG Icon */}
              <svg className="w-6 h-6 inline-block mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Coba Sekarang (Gratis)
            </Button>
          </Link>
          
          <Link to="/call-mechanic">
            <Button 
              variant="primary" 
              className="group relative backdrop-blur-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl font-bold rounded-3xl shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:min-w-[320px] border border-cyan-400/30 overflow-hidden"
              onMouseEnter={() => setHoveredButton('mechanic')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              {/* Glass highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              {hoveredButton === 'mechanic' && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 animate-pulse" />
              )}
              
              {/* Wrench SVG Icon */}
              <svg className="w-6 h-6 inline-block mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
              </svg>
              Panggil Montir
            </Button>
          </Link>
          
          <Link to="/chat">
            <Button 
              variant="secondary" 
              className="group relative backdrop-blur-xl bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/50 px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-semibold rounded-3xl transition-all duration-300 w-full sm:min-w-[240px] overflow-hidden transform hover:scale-105 active:scale-95"
              onMouseEnter={() => setHoveredButton('secondary')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              {/* Glass highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              {hoveredButton === 'secondary' && (
                <div className="absolute inset-0 border-2 border-white/30 rounded-3xl animate-pulse" />
              )}
              
              {/* Phone SVG Icon */}
              <svg className="w-5 h-5 inline-block mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              Lihat Demo
            </Button>
          </Link>
        </div>
        
        {/* Trust Indicators */}
        <div className={`space-y-6 mb-16 transform transition-all duration-1000 delay-900 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl px-6 py-4 inline-block hover:bg-white/10 hover:border-white/30 transition-all duration-300">
            <p className="text-white/90 text-base sm:text-lg flex items-center justify-center text-center">
              {/* Sparkles SVG Icon */}
              <svg className="w-6 h-6 mr-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0l1.09 3.09L16 4l-2.91 1.09L12 8l-1.09-2.91L8 4l2.91-1.09L12 0zM5 12l.69 1.96L8 14l-2.31.69L5 16l-.69-1.31L2 14l2.31-.69L5 12zm14 0l.69 1.96L22 14l-2.31.69L19 16l-.69-1.31L16 14l2.31-.69L19 12z"/>
              </svg>
              Tidak perlu download. Langsung gunakan di browser Anda.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto px-4">
            <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-3 sm:p-4 text-center hover:bg-white/10 hover:scale-105 hover:border-green-400/30 transition-all duration-300 cursor-pointer group">
              <svg className="w-8 h-8 mx-auto mb-2 text-green-400 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <p className="text-white font-semibold text-xs sm:text-sm group-hover:text-green-400 transition-colors duration-300">100% Gratis</p>
            </div>
            
            <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-4 text-center hover:bg-white/10 hover:scale-105 hover:border-blue-400/30 transition-all duration-300 cursor-pointer group">
              <svg className="w-8 h-8 mx-auto mb-2 text-blue-400 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
              <p className="text-white font-semibold text-sm group-hover:text-blue-400 transition-colors duration-300">Data Aman</p>
            </div>
            
            <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-4 text-center hover:bg-white/10 hover:scale-105 hover:border-purple-400/30 transition-all duration-300 cursor-pointer group">
              <svg className="w-8 h-8 mx-auto mb-2 text-purple-400 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <p className="text-white font-semibold text-sm group-hover:text-purple-400 transition-colors duration-300">AI Terpercaya</p>
            </div>
            
            <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-4 text-center hover:bg-white/10 hover:scale-105 hover:border-orange-400/30 transition-all duration-300 cursor-pointer group">
              <svg className="w-8 h-8 mx-auto mb-2 text-orange-400 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"/>
              </svg>
              <p className="text-white font-semibold text-sm group-hover:text-orange-400 transition-colors duration-300">24/7 Tersedia</p>
            </div>
          </div>
        </div>
        
        {/* Social Proof */}
        <div className={`relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto overflow-hidden hover:bg-white/15 hover:border-white/30 transition-all duration-500 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`} style={{ transitionDelay: '1100ms' }}>
          {/* Glass highlight effect */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          {/* Quote Icon */}
          <div className="absolute top-4 left-4 text-white/20">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
            </svg>
          </div>
          
          <p className="text-white/90 mb-6 font-medium text-base sm:text-lg leading-relaxed italic pl-6 sm:pl-8 hover:text-white transition-colors duration-300">
            "BengkelAI membantu saya menghemat waktu dan biaya. Sekarang saya tahu persis masalah motor sebelum ke bengkel!"
          </p>
          
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div className="text-left">
              <p className="font-bold text-white text-base sm:text-lg">Aidil Baihaqi</p>
              <p className="text-sm text-white/70">Pengguna Beta Tester</p>
            </div>
          </div>
        </div>
        
        {/* Bottom Note */}
        <div className={`mt-12 pt-8 border-t border-white/20 px-4 transform transition-all duration-1000 delay-1300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <p className="text-white/70 text-base sm:text-lg text-center hover:text-white/90 transition-colors duration-300">
            Bergabunglah dengan ribuan pemilik motor yang sudah merasakan kemudahan BengkelAI
          </p>
          
          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-orange-400/20 rounded-full animate-ping"
                style={{
                  top: `${10 + (i * 10)}%`,
                  left: `${5 + (i * 12)}%`,
                  animationDelay: `${i * 600}ms`,
                  animationDuration: '3s'
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Floating Action Elements */}
      <div className="absolute top-10 right-10 backdrop-blur-xl bg-gradient-to-r from-orange-500/80 to-red-600/80 border border-orange-400/30 text-white px-6 py-3 rounded-full text-sm font-bold animate-bounce hidden lg:block shadow-2xl">
        {/* Fire SVG Icon */}
        <svg className="w-4 h-4 inline-block mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
        </svg>
        Trending
      </div>
      
      <div className="absolute bottom-10 left-10 backdrop-blur-xl bg-gradient-to-r from-green-500/80 to-emerald-600/80 border border-green-400/30 text-white px-6 py-3 rounded-full text-sm font-bold animate-pulse hidden lg:block shadow-2xl">
        {/* Check SVG Icon */}
        <svg className="w-4 h-4 inline-block mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        Terpercaya
      </div>
    </section>
  );
}