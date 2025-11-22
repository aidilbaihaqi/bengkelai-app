import Button from "./Button";
import { Link } from "@remix-run/react";
import { useState, useEffect, useRef } from 'react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Asisten AI Motor Health';
  
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Typewriter effect
  useEffect(() => {
    if (isVisible) {
      let index = 0;
      const timer = setInterval(() => {
        if (index <= fullText.length) {
          setTypedText(fullText.slice(0, index));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 100);
      return () => clearInterval(timer);
    }
  }, [isVisible]);
  
  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Enhanced Animated Background Elements with Parallax */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
                opacity: 1
          }}
        />
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse transition-transform duration-1000 ease-out" 
          style={{ 
            animationDelay: '1s',
            transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
            opacity: 1
          }} 
        />
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl transition-all duration-1000 ease-out" 
          style={{ 
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px) scale(1)`,
            opacity: 1
          }} 
        />
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-cyan-400/30 rounded-full animate-bounce`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.3}s`,
              transform: `translate(${mousePosition.x * (5 + i * 2)}px, ${mousePosition.y * (5 + i * 2)}px)`,
              opacity: 0.6,
              transition: 'opacity 1s ease-out, transform 0.3s ease-out'
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Headline */}
            <div className="space-y-4">
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight transition-all duration-1000 ease-out transform translate-y-0 opacity-100`} style={{ transitionDelay: '200ms' }}>
                <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent">
                  {typedText.split(' ')[0] || 'Asisten'}
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent font-black">
                  {typedText.split(' ').slice(1, 3).join(' ') || 'AI Motor'}
                </span>
                <br />
                <span className="text-white/90 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                  {typedText.split(' ')[3] || 'Health'}
                  {typedText.length < fullText.length && <span className="animate-pulse">|</span>}
                </span>
              </h1>
              
              {/* AI Badge */}
              <div className="flex justify-center lg:justify-start">
                <div className={`backdrop-blur-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-300/30 rounded-full px-6 py-2 shadow-lg transition-all duration-1000 ease-out transform translate-y-0 opacity-100`}>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    <span className="text-cyan-300 font-semibold text-sm tracking-wide">AI POWERED DIAGNOSTICS</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Subheadline */}
            <p className={`text-lg sm:text-xl lg:text-2xl text-white/80 leading-relaxed max-w-2xl transition-all duration-1000 ease-out transform translate-y-0 opacity-100`} style={{ transitionDelay: '400ms' }}>
              Diagnosa gejala motor dengan teknologi AI, dapatkan solusi langkah demi langkah, dan temukan bengkel terdekat - semua dalam satu platform.
            </p>
            
            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-1000 ease-out transform translate-y-0 opacity-100`} style={{ transitionDelay: '600ms' }}>
              <Link to="/chat">
                <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] ring-1 ring-white/20 relative overflow-hidden">
                  <span className="flex items-center justify-center space-x-2 relative z-10">
                    <span>Mulai Konsultasi</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </button>
              </Link>
              
              <button className="backdrop-blur-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:scale-105 active:scale-95 group">
                <span className="group-hover:translate-x-1 transition-transform inline-block">Lihat Demo</span>
              </button>
            </div>
            
            {/* Trust Badge */}
            <div className="flex items-center justify-center lg:justify-start space-x-6 text-white/60">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Gratis & Tanpa Install</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Respons Instan</span>
              </div>
            </div>
          </div>
          
          {/* Right Content - Enhanced Interactive Demo */}
          <div className="relative">
            {/* Interactive Demo Panels */}
            <div className="space-y-6 mb-8">
              {[
                {
                  icon: "🔧",
                  title: "Diagnosa Cepat",
                  description: "AI menganalisis gejala motor dalam hitungan detik dengan akurasi tinggi"
                },
                {
                  icon: "📍",
                  title: "Bengkel Terdekat",
                  description: "Temukan bengkel terpercaya di sekitar lokasi Anda dengan rating terbaik"
                },
                {
                  icon: "💡",
                  title: "Solusi Langkah demi Langkah",
                  description: "Panduan detail untuk mengatasi masalah motor Anda sendiri"
                }
              ].map((demo, index) => (
                <div
                  key={index}
                  className={`group relative p-6 rounded-2xl backdrop-blur-xl transition-all duration-500 cursor-pointer transform hover:-translate-y-1 translate-y-0 opacity-100 ${
                    index === 0
                      ? 'bg-gradient-to-br from-slate-800/90 via-slate-700/80 to-slate-800/90 border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/20 scale-105'
                      : 'bg-gradient-to-br from-slate-800/60 via-slate-700/50 to-slate-800/60 border border-slate-600/50 hover:border-cyan-400/30 hover:bg-gradient-to-br hover:from-slate-800/80 hover:via-slate-700/70 hover:to-slate-800/80 hover:shadow-xl'
                  }`}
                  style={{ transitionDelay: `${800 + index * 200}ms` }}
                  onMouseEnter={() => {
                    if (navigator.vibrate) navigator.vibrate(10);
                  }}
                >
                  {/* Enhanced Glow effect for active demo */}
                  {index === 0 && (
                    <>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-xl -z-10 animate-pulse" />
                      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-blue-500/10 blur-2xl -z-20" />
                    </>
                  )}
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3 ${
                      index === 0
                        ? 'bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg animate-pulse' 
                        : 'bg-slate-700/50 text-slate-300 group-hover:bg-slate-600/70 group-hover:text-white'
                    }`}>
                      <span className={`text-xl transition-transform duration-300 ${
                        index === 0 ? 'scale-110' : 'group-hover:scale-110'
                      }`}>{demo.icon}</span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg mb-2 transition-all duration-300 transform ${
                        index === 0 ? 'text-cyan-100 translate-x-1' : 'text-white group-hover:text-cyan-100 group-hover:translate-x-1'
                      }`}>
                        {demo.title}
                        {index === 0 && (
                          <span className="ml-2 inline-block w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                        )}
                      </h3>
                      <p className={`text-sm leading-relaxed transition-all duration-300 transform ${
                        index === 0 ? 'text-slate-200 translate-x-1' : 'text-slate-400 group-hover:text-slate-300 group-hover:translate-x-1'
                      }`}>
                        {demo.description}
                      </p>
                      
                      {/* Progress indicator for active demo */}
                      {index === 0 && (
                        <div className="mt-3 w-full bg-slate-700/50 rounded-full h-1 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse" style={{ width: '75%' }} />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Enhanced Status indicator */}
                  <div className={`absolute top-4 right-4 transition-all duration-300 ${
                    index === 0
                      ? 'scale-110' 
                      : 'group-hover:scale-110'
                  }`}>
                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === 0
                        ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50 animate-pulse' 
                        : 'bg-slate-500 group-hover:bg-slate-400'
                    }`} />
                    {index === 0 && (
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
                    )}
                  </div>
                  
                  {/* Click ripple effect */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    <div className={`absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 transform scale-0 group-active:scale-100 transition-transform duration-200 rounded-2xl`} />
                  </div>
                </div>
              ))}
            </div>
            {/* Main Glass Demo Panel */}
            <div className={`backdrop-blur-xl bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-900/40 border border-cyan-500/20 rounded-3xl shadow-2xl p-8 max-w-lg mx-auto relative overflow-hidden ring-1 ring-white/10 transition-all duration-1000 ease-out transform translate-y-0 opacity-100 scale-100`} style={{ transitionDelay: '1200ms' }}>
              {/* Glass highlight effect */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 rounded-3xl" />
              
              {/* Chat Header */}
              <div className="flex items-center mb-6 pb-4 border-b border-white/20">
                <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-3 rounded-xl mr-4 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">BengkelAI Assistant</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-sm text-green-400 font-medium">Online & Ready</p>
                  </div>
                </div>
              </div>
              
              {/* Chat Messages */}
              <div className="space-y-4">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-3 rounded-2xl rounded-br-md max-w-xs shadow-lg">
                    <p className="text-sm font-medium">Motor gua geter banget pas di starter, knalpot keluar asap putih</p>
                  </div>
                </div>
                
                {/* Bot Message */}
                <div className="flex justify-start">
                  <div className="backdrop-blur-xl bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 border border-cyan-400/30 text-white px-5 py-4 rounded-2xl rounded-bl-md max-w-xs shadow-lg ring-1 ring-white/10">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">
                        <svg className="w-4 h-4 inline-block mr-1 text-cyan-300" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                        <span className="text-cyan-300">Analisis AI:</span> Kemungkinan ring piston aus (85% akurasi)
                      </p>
                      <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-cyan-500/20 rounded-lg p-3 space-y-1 ring-1 ring-white/5">
                        <p className="text-xs text-cyan-200 flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                          </svg>
                          Estimasi: Rp 200-300k
                        </p>
                        <p className="text-xs text-green-300 flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          Waktu: 2-3 jam
                        </p>
                        <p className="text-xs text-blue-300 flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                          </svg>
                          Prioritas: Menengah
                        </p>
                      </div>
                      <Link to="/dashboard?tab=workshop-finder">
                        <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-3 py-1 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
                          Cari Bengkel Terdekat
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Typing Indicator */}
                <div className="flex justify-start">
                  <div className="backdrop-blur-xl bg-gradient-to-br from-slate-800/50 via-slate-700/30 to-slate-800/50 border border-cyan-400/20 px-4 py-3 rounded-2xl rounded-bl-md shadow-lg ring-1 ring-white/10">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className="text-xs text-white/70">AI sedang menganalisis...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Stat Chips */}
            <div className="absolute -top-6 -right-6 backdrop-blur-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-300/30 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-float">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                <span>RPM: 850</span>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 backdrop-blur-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-300/30 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-float" style={{animationDelay: '0.5s'}}>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span>Temp: 85&deg;C</span>
              </div>
            </div>
            
            <div className="absolute top-1/2 -left-8 backdrop-blur-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-300/30 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-float" style={{animationDelay: '1s'}}>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>Oli: OK</span>
              </div>
            </div>
            
            {/* AI Powered Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 backdrop-blur-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/30 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                <span>AI POWERED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}