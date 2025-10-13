import { useState, useRef, useEffect } from "react";
import { Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import Button from "../components/Button";
import OpenStreetMap from "../components/OpenStreetMap";

// CSS untuk animasi
const fadeInStyle = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;

// Inject CSS ke head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = fadeInStyle;
  document.head.appendChild(styleElement);
}

// Dummy data montir
const dummyMechanics = [
  {
    id: 1,
    name: "Ahmad Rizki",
    workshop: "Bengkel Maju Jaya",
    rating: 4.8,
    experience: "5 tahun",
    specialization: "Mesin & Transmisi",
    distance: "2.3 km",
    estimatedTime: "15-20 menit",
    price: "Rp 75.000",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    isAvailable: true,
    completedJobs: 127
  },
  {
    id: 2,
    name: "Budi Santoso",
    workshop: "Bengkel Motor Sejahtera",
    rating: 4.6,
    experience: "8 tahun",
    specialization: "Kelistrikan & AC",
    distance: "3.1 km",
    estimatedTime: "20-25 menit",
    price: "Rp 85.000",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    isAvailable: true,
    completedJobs: 203
  },
  {
    id: 3,
    name: "Sari Indah",
    workshop: "Bengkel Wanita Mandiri",
    rating: 4.9,
    experience: "6 tahun",
    specialization: "Service Rutin & Tune Up",
    distance: "4.2 km",
    estimatedTime: "25-30 menit",
    price: "Rp 70.000",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    isAvailable: false,
    completedJobs: 156
  }
];

export const loader = async () => {
  return json({
    pageConfig: {
      title: 'BengkelAI - Panggil Montir',
      description: 'Panggil montir profesional ke lokasi Anda'
    }
  });
};

export const meta = () => {
  return [
    { title: "BengkelAI - Panggil Montir" },
    { name: "description", content: "Panggil montir profesional ke lokasi Anda dengan mudah dan cepat" },
  ];
};

export default function CallMechanic() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(1); // 1: Location, 2: Select Mechanic, 3: Chat
  const [isLoading, setIsLoading] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setCurrentStep(2);
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocation = {
            lat: latitude,
            lng: longitude,
            address: `Lokasi Saat Ini: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          };
          
          setSelectedLocation(currentLocation);
          setCurrentStep(2);
          setIsGettingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Tidak dapat mengakses lokasi Anda. Pastikan Anda memberikan izin akses lokasi.');
          setIsGettingLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      alert('Geolocation tidak didukung oleh browser Anda.');
      setIsGettingLocation(false);
    }
  };

  const handleMechanicSelect = (mechanic) => {
    setSelectedMechanic(mechanic);
    setCurrentStep(3);
    // Initialize chat with welcome message
    setChatMessages([
      {
        id: 1,
        sender: 'mechanic',
        message: `Halo! Saya ${mechanic.name} dari ${mechanic.workshop}. Saya akan segera menuju lokasi Anda. Ada yang bisa saya bantu sementara menunggu?`,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: chatMessages.length + 1,
        sender: 'user',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      
      // Simulate mechanic response
      setTimeout(() => {
        const responses = [
          "Baik, saya catat. Saya akan bawa peralatan yang diperlukan.",
          "Terima kasih informasinya. Saya sedang dalam perjalanan.",
          "Oke, saya akan sampai dalam 15 menit lagi.",
          "Siap, saya akan periksa masalah tersebut setiba di lokasi."
        ];
        
        const mechanicResponse = {
          id: chatMessages.length + 2,
          sender: 'mechanic',
          message: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        };
        
        setChatMessages(prev => [...prev, mechanicResponse]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Panggil Montir ke 
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> Lokasi Anda</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Montir profesional siap membantu Anda kapan saja, di mana saja
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  currentStep >= step 
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg' 
                    : 'bg-gray-600 text-gray-300'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                    currentStep > step ? 'bg-gradient-to-r from-cyan-500 to-purple-500' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Labels */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-20 text-sm text-gray-400">
            <span className={currentStep >= 1 ? 'text-cyan-400 font-medium' : ''}>Pilih Lokasi</span>
            <span className={currentStep >= 2 ? 'text-cyan-400 font-medium' : ''}>Pilih Montir</span>
            <span className={currentStep >= 3 ? 'text-cyan-400 font-medium' : ''}>Chat & Koordinasi</span>
          </div>
        </div>

        {/* Content based on current step */}
        <div className="max-w-6xl mx-auto">
          {currentStep === 1 && (
            <div className="animate-fadeIn">
              <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Tentukan Lokasi Anda</h2>
                
                {/* Button Gunakan Lokasi Saat Ini */}
                <div className="flex justify-center mb-6">
                  <button
                    onClick={getCurrentLocation}
                    disabled={isGettingLocation}
                    className={`
                      px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform
                      ${isGettingLocation 
                        ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 hover:scale-105 shadow-lg hover:shadow-xl'
                      }
                    `}
                  >
                    {isGettingLocation ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Mendapatkan Lokasi...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>Gunakan Lokasi Saat Ini</span>
                      </div>
                    )}
                  </button>
                </div>

                <div className="relative">
                  <div className="h-96 rounded-2xl overflow-hidden border border-white/20">
                    <OpenStreetMap onLocationSelect={handleLocationSelect} />
                  </div>
                  
                  {/* Divider */}
                  <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                      <span className="text-white text-sm font-medium">atau</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 text-center mt-4">
                  Klik pada peta untuk menentukan lokasi Anda secara manual
                </p>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="animate-fadeIn">
              <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Pilih Montir Terdekat</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {dummyMechanics.map((mechanic) => (
                    <div
                      key={mechanic.id}
                      className={`backdrop-blur-xl bg-white/5 rounded-2xl border border-white/20 p-6 transition-all duration-300 cursor-pointer hover:scale-105 hover:bg-white/10 ${
                        !mechanic.isAvailable ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      onClick={() => mechanic.isAvailable && handleMechanicSelect(mechanic)}
                    >
                      <div className="flex items-center mb-4">
                        <img
                          src={mechanic.avatar}
                          alt={mechanic.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400"
                        />
                        <div className="ml-4">
                          <h3 className="text-lg font-bold text-white">{mechanic.name}</h3>
                          <p className="text-cyan-400 text-sm">{mechanic.workshop}</p>
                          <div className="flex items-center mt-1">
                            <span className="text-yellow-400">★</span>
                            <span className="text-white text-sm ml-1">{mechanic.rating}</span>
                            <span className="text-gray-400 text-sm ml-2">({mechanic.completedJobs} jobs)</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Pengalaman:</span>
                          <span className="text-white">{mechanic.experience}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Spesialisasi:</span>
                          <span className="text-white">{mechanic.specialization}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Jarak:</span>
                          <span className="text-white">{mechanic.distance}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Estimasi:</span>
                          <span className="text-white">{mechanic.estimatedTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Biaya:</span>
                          <span className="text-cyan-400 font-bold">{mechanic.price}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        {mechanic.isAvailable ? (
                          <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-center py-2 rounded-lg font-medium">
                            Tersedia Sekarang
                          </div>
                        ) : (
                          <div className="bg-gray-600 text-gray-300 text-center py-2 rounded-lg">
                            Sedang Tidak Tersedia
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && selectedMechanic && (
            <div className="animate-fadeIn">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Mechanic Info */}
                <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-6 shadow-2xl">
                  <h2 className="text-xl font-bold text-white mb-4">Montir Anda</h2>
                  <div className="flex items-center mb-4">
                    <img
                      src={selectedMechanic.avatar}
                      alt={selectedMechanic.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-cyan-400"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-white">{selectedMechanic.name}</h3>
                      <p className="text-cyan-400">{selectedMechanic.workshop}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-white text-sm ml-1">{selectedMechanic.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Status:</span>
                      <span className="text-green-400 font-medium">Dalam Perjalanan</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Estimasi Tiba:</span>
                      <span className="text-white">{selectedMechanic.estimatedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Biaya Service:</span>
                      <span className="text-cyan-400 font-bold">{selectedMechanic.price}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                    <p className="text-green-400 text-sm text-center">
                      ✓ Montir telah dikonfirmasi dan sedang menuju lokasi Anda
                    </p>
                  </div>
                </div>

                {/* Chat Interface */}
                <div className="lg:col-span-2 backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                  <div className="p-6 border-b border-white/20">
                    <h2 className="text-xl font-bold text-white">Chat dengan Montir</h2>
                    <p className="text-gray-300 text-sm">Koordinasi langsung dengan montir Anda</p>
                  </div>
                  
                  {/* Chat Messages */}
                  <div className="h-96 overflow-y-auto p-6 space-y-4 hide-scrollbar">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            message.sender === 'user'
                              ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                              : 'bg-white/20 text-white border border-white/30'
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'user' ? 'text-cyan-100' : 'text-gray-400'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                  
                  {/* Chat Input */}
                  <div className="p-6 border-t border-white/20">
                    <div className="flex space-x-4">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Ketik pesan Anda..."
                        className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                      <button
                        onClick={sendMessage}
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-xl font-medium hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        Kirim
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Back Button */}
        {currentStep > 1 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-all duration-200"
            >
              ← Kembali
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}