export default function ProblemSection() {
  const problems = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      ),
      title: "Bingung Gejala Motor",
      description: "Sulit tahu masalah sebenarnya ketika motor bermasalah",
      gradient: "from-orange-500/20 to-red-500/20",
      borderGradient: "from-orange-300/30 to-red-300/30",
      iconBg: "from-orange-400 to-red-500",
      emoji: "❓"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19A2 2 0 0 0 5 21H19A2 2 0 0 0 21 19V9M12 15C10.67 15 9.58 14.32 9.15 13.35C8.72 12.38 9.06 11.2 10.03 10.77C11 10.34 12.18 10.68 12.61 11.65C13.04 12.62 12.7 13.8 11.73 14.23C11.5 14.34 11.26 14.39 11 14.39C10.74 14.39 10.5 14.34 10.27 14.23C9.3 13.8 8.96 12.62 9.39 11.65C9.82 10.68 11 10.34 11.97 10.77C12.94 11.2 13.28 12.38 12.85 13.35C12.42 14.32 11.33 15 12 15Z" />
        </svg>
      ),
      title: "Takut Ditipu Bengkel",
      description: "Harga & diagnosa sering tidak transparan",
      gradient: "from-green-500/20 to-emerald-500/20",
      borderGradient: "from-green-300/30 to-emerald-300/30",
      iconBg: "from-green-400 to-emerald-500",
      emoji: "💰"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      ),
      title: "Buang Waktu",
      description: "Antri lama untuk cek masalah ringan",
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderGradient: "from-blue-300/30 to-cyan-300/30",
      iconBg: "from-blue-400 to-cyan-500",
      emoji: "⏰"
    }
  ];

  return (
    <section id="problem" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center backdrop-blur-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-300/30 rounded-full px-6 py-2 mb-6">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse mr-2" />
            <span className="text-red-300 font-semibold text-sm tracking-wide">MASALAH UMUM</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-red-100 to-orange-200 bg-clip-text text-transparent">
              Kenapa
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-400 via-orange-500 to-yellow-600 bg-clip-text text-transparent font-black">
              BengkelAI?
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
            Masalah yang sering dihadapi pemilik motor setiap hari
          </p>
        </div>
        
        {/* Problems Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="group relative h-full"
            >
              {/* Glass Card */}
              <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-red-500/25 transition-all duration-500 hover:-translate-y-2 overflow-hidden h-full flex flex-col">
                {/* Glass highlight effect */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${problem.gradient} opacity-50 rounded-3xl`} />
                
                {/* Border Glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${problem.borderGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
                
                {/* Content */}
                <div className="relative z-10 text-center flex flex-col h-full">
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${problem.iconBg} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {problem.icon}
                      </div>
                    </div>
                    
                    {/* Emoji Badge */}
                    <div className="absolute -top-2 -right-2 text-2xl">
                      {problem.emoji}
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-4 group-hover:text-white transition-colors duration-300">
                    {problem.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed group-hover:text-white/90 transition-colors duration-300 flex-grow">
                    {problem.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}