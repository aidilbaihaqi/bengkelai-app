import { useState, useEffect } from 'react';
import { Link, useLocation } from '@remix-run/react';

export default function Header({ title }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateSize = () => {
      try {
        setIsMobile(window.innerWidth < 768);
      } catch {}
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    window.addEventListener('orientationchange', updateSize);
    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('orientationchange', updateSize);
    };
  }, []);

  const location = useLocation();
  const isRoot = location.pathname === '/';
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isWorkshopDashboard = location.pathname.startsWith('/workshop-dashboard');

  const navItems = isDashboard
    ? [
        { href: '/dashboard?tab=overview', label: 'Overview' },
        { href: '/dashboard?tab=workshop-finder', label: 'Workshop Finder' },
        { href: '/dashboard?tab=spare-parts', label: 'Spare Parts' },
        { href: '/chat', label: 'AI Diagnosa' },
        { href: '/', label: 'Landing' }
      ]
    : isWorkshopDashboard
    ? [
        { href: '/workshop-dashboard', label: 'Dashboard Bengkel' },
        { href: '/workshop-logs', label: 'Log Bengkel' },
        { href: '/workshop-inventory', label: 'Stok Barang' },
        { href: '/spare-parts', label: 'Marketplace' },
        { href: '/', label: 'Landing' }
      ]
    : (
        isMobile
          ? [
              { href: '/chat', label: 'AI Diagnosa' },
              { href: '/call-mechanic', label: 'Panggil Montir' },
              { href: '/booking', label: 'Booking' },
              { href: '/dashboard', label: 'Dashboard' }
            ]
          : [
              { href: isRoot ? '#home' : '/#home', label: 'Home' },
              { href: isRoot ? '#fitur' : '/#fitur', label: 'Fitur' },
              { href: isRoot ? '#cara-kerja' : '/#cara-kerja', label: 'Cara Kerja' },
              { href: isRoot ? '#demo' : '/#demo', label: 'Demo' },
              { href: '/call-mechanic', label: 'Panggil Montir' },
              { href: '/booking', label: 'Booking' },
              { href: isRoot ? '#faq' : '/#faq', label: 'FAQ' },
              { href: '/dashboard', label: 'Dashboard' }
            ]
      );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-[0_20px_40px_-10px_rgb(0_0_0/0.7)]' 
        : 'backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-[0_10px_30px_-10px_rgb(0_0_0/0.5)]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-2 rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-purple-500/50">
              <img 
                src="/32x32.svg" 
                alt="BengkelAI Logo" 
                className="w-6 h-6 group-hover:animate-pulse filter brightness-0 invert"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-400 transition-all duration-300 group-hover:scale-105">
                {title || "BengkelAI"}
              </h1>
              <p className="text-xs text-cyan-300 font-medium group-hover:text-cyan-200 transition-colors duration-300">
                Asisten AI untuk Motor Anda
              </p>
            </div>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <Link 
                key={item.href}
                to={item.href}
                prefetch="intent"
                className="relative text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:ring-1 hover:ring-cyan-300/40 group"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span className="relative z-10 transform group-hover:scale-105 transition-transform duration-200">
                  {item.label}
                </span>
                <div className={`absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transform origin-left transition-all duration-300 ${
                  hoveredItem === index ? 'scale-x-100' : 'scale-x-0'
                }`} />
              </Link>
            ))}
          </nav>
          
          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Link to="/chat" className="relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-2 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] ring-1 ring-white/20 overflow-hidden group">
              <span className="relative z-10">Mulai Konsultasi</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 active:scale-95"
            >
              <div className="relative w-5 h-5">
                <svg className={`w-5 h-5 text-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Glass highlight effect */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 transition-all duration-500 ease-in-out ${
        isMobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="backdrop-blur-xl bg-slate-900/95 border-b border-white/10 shadow-lg overflow-y-auto">
          <nav className="px-4 py-4 space-y-2">
            {navItems.map((item, index) => (
              <Link 
                key={item.href}
                to={item.href}
                className={`block text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 transform hover:translate-x-2 ${
                  isMobileMenuOpen ? 'animate-slideInLeft' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-white/10">
              <Link 
                to="/chat"
                className={`block text-center w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-3 rounded-lg font-semibold text-sm shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25 ${
                  isMobileMenuOpen ? 'animate-slideInLeft' : ''
                }`}
                style={{ animationDelay: '500ms' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Mulai Konsultasi
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}