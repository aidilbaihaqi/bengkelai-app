import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "@remix-run/react";
import LoadingSpinner, { SkeletonLoader, CardSkeleton, ButtonLoading } from "../components/LoadingSpinner";
import ErrorBoundary from "../components/ErrorBoundary";
import OpenStreetMap from "../components/OpenStreetMap";

export const meta = () => {
  return [
    { title: "Dashboard - BengkelAI" },
    { name: "description", content: "Dashboard pengguna BengkelAI untuk monitoring motor dan layanan" },
  ];
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [userName, setUserName] = useState('Guest');
  const [showOilModal, setShowOilModal] = useState(false);
  const [motorCondition, setMotorCondition] = useState({
    oil: { status: 'critical', percentage: 25, lastCheck: '2024-01-05' }
  });

  // Data edukasi motor
  const motorEducation = [
    {
      title: "Tips Perawatan Harian",
      content: "Periksa tekanan ban, level oli, dan kondisi rem sebelum berkendara",
      icon: "🔧"
    },
    {
      title: "Ganti Oli Rutin",
      content: "Ganti oli setiap 2000-3000 km atau 3 bulan sekali untuk performa optimal",
      icon: "🛢️"
    },
    {
      title: "Pemanasan Mesin",
      content: "Panaskan mesin 2-3 menit sebelum berkendara, terutama di pagi hari",
      icon: "🌡️"
    }
  ];

  // Data rekomendasi oli dengan harga
  const oilRecommendations = [
    {
      brand: "Yamalube",
      type: "10W-40 Semi Synthetic",
      price: "Rp 45.000",
      volume: "800ml",
      rating: 4.8
    },
    {
      brand: "Shell Advance",
      type: "10W-40 Fully Synthetic",
      price: "Rp 65.000",
      volume: "1L",
      rating: 4.9
    },
    {
      brand: "Motul 3000",
      type: "20W-50 Mineral",
      price: "Rp 35.000",
      volume: "800ml",
      rating: 4.5
    }
  ];

  // Spare Parts state - moved to component level to avoid hooks rule violation
  const [selectedPart, setSelectedPart] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [cart, setCart] = useState([]);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Reminder state - moved to component level to avoid hooks rule violation
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [newReminder, setNewReminder] = useState({
    component: '',
    dueDate: '',
    urgency: 'medium',
    description: ''
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bengkelaiUserName');
      if (saved && saved.trim()) setUserName(saved.trim());
    } catch { }
  }, []);

  // Workshop Finder state - moved to component level to avoid hooks rule violation
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [motorProfile, setMotorProfile] = useState({ merk: '', model: '', tahun: '', imageUrl: '' });
  const [profileMessage, setProfileMessage] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Loading states
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isSavingReminder, setIsSavingReminder] = useState(false);
  useEffect(() => {
    try {
      const savedProfile = JSON.parse(localStorage.getItem('bengkelaiMotorProfile') || '{}');
      if (savedProfile && typeof savedProfile === 'object') {
        setMotorProfile({
          merk: savedProfile.merk || '',
          model: savedProfile.model || '',
          tahun: savedProfile.tahun || '',
          imageUrl: savedProfile.imageUrl || ''
        });
      }
    } catch {}
  }, []);

  const saveMotorProfile = () => {
    try {
      localStorage.setItem('bengkelaiMotorProfile', JSON.stringify(motorProfile));
      setProfileMessage('Profil motor disimpan');
      setTimeout(() => setProfileMessage(''), 2000);
    } catch {}
  };

  // Oil change modal focus management refs
  const oilModalRef = useRef(null);
  const oilModalTriggerRef = useRef(null);
  const oilModalFirstFocusableRef = useRef(null);
  const oilModalLastFocusableRef = useRef(null);

  // Add reminder modal focus management refs
  const addReminderModalRef = useRef(null);
  const addReminderTriggerRef = useRef(null);
  const addReminderFirstFocusableRef = useRef(null);
  const addReminderLastFocusableRef = useRef(null);

  // Product detail modal focus management refs
  const productDetailModalRef = useRef(null);
  const productDetailTriggerRef = useRef(null);
  const productDetailFirstFocusableRef = useRef(null);
  const productDetailLastFocusableRef = useRef(null);

  // Oil change modal focus management
  useEffect(() => {
    if (showOilModal && oilModalFirstFocusableRef.current) {
      oilModalFirstFocusableRef.current.focus();
    }
  }, [showOilModal]);

  // Add reminder modal focus management
  useEffect(() => {
    if (showAddReminder && addReminderFirstFocusableRef.current) {
      addReminderFirstFocusableRef.current.focus();
    }
  }, [showAddReminder]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showAddReminder) return;

      if (e.key === 'Escape') {
        setShowAddReminder(false);
        if (addReminderTriggerRef.current) {
          addReminderTriggerRef.current.focus();
        }
        return;
      }

      if (e.key === 'Tab') {
        const focusableElements = addReminderModalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      }
    };

    if (showAddReminder) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [showAddReminder]);

  // Product detail modal focus management
  useEffect(() => {
    if (showProductDetail && productDetailFirstFocusableRef.current) {
      productDetailFirstFocusableRef.current.focus();
    }
  }, [showProductDetail]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showProductDetail) return;

      if (e.key === 'Escape') {
        setShowProductDetail(false);
        if (productDetailTriggerRef.current) {
          productDetailTriggerRef.current.focus();
        }
        return;
      }

      if (e.key === 'Tab') {
        const focusableElements = productDetailModalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      }
    };

    if (showProductDetail) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [showProductDetail]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showOilModal) return;

      if (e.key === 'Escape') {
        setShowOilModal(false);
        if (oilModalTriggerRef.current) {
          oilModalTriggerRef.current.focus();
        }
        return;
      }

      if (e.key === 'Tab') {
        const focusableElements = oilModalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      }
    };

    if (showOilModal) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [showOilModal]);

  // Workshop data
  const workshops = [
    {
      id: 1,
      name: "Bengkel Jaya Motor Kolong Enam",
      address: "Kolong Enam, Kijang Kota, Bintan Timur",
      phone: "+62 771 1234567",
      rating: 4.5,
      services: ["Ganti Oli", "Servis Mesin", "Ganti Ban", "Tune Up"],
      openHours: "08:00 - 17:00",
      lat: 0.8501398062039124,
      lng: 104.59655237584875,
      distance: "0.3 km",
      specialties: ["Honda", "Yamaha", "Suzuki"]
    },
    {
      id: 2,
      name: "Motor Service Center Bintan",
      address: "Kolong Enam, Kijang Kota, Bintan Timur",
      phone: "+62 771 7654321",
      rating: 4.2,
      services: ["Ganti Oli", "Tune Up", "Rem", "Electrical"],
      openHours: "09:00 - 18:00",
      lat: 0.8481398062039124,
      lng: 104.59455237584875,
      distance: "0.6 km",
      specialties: ["Kawasaki", "Honda", "Yamaha"]
    },
    {
      id: 3,
      name: "Bengkel Mandiri Kijang",
      address: "Kolong Enam, Kijang Kota, Bintan Timur",
      phone: "+62 771 9876543",
      rating: 4.7,
      services: ["Ganti Oli", "AC Motor", "Electrical", "Body Repair"],
      openHours: "07:00 - 19:00",
      lat: 0.8491398062039124,
      lng: 104.60455237584875,
      distance: "0.9 km",
      specialties: ["Semua Merk", "Matic", "Sport"]
    },
    {
      id: 4,
      name: "Speed Motor Workshop",
      address: "Jl. Kuningan Raya No. 321, Jakarta Selatan",
      phone: "+62 21 5555123",
      rating: 4.3,
      services: ["Ganti Oli", "Performance Tuning", "Modifikasi"],
      openHours: "10:00 - 20:00",
      lat: -6.2382,
      lng: 106.8317,
      distance: "4.2 km",
      specialties: ["Sport Bike", "Racing", "Custom"]
    },
    {
      id: 5,
      name: "Bengkel Rakyat 24 Jam",
      address: "Jl. Casablanca No. 88, Jakarta Selatan",
      phone: "+62 21 7777888",
      rating: 4.0,
      services: ["Ganti Oli", "Emergency Service", "Towing"],
      openHours: "24 Jam",
      lat: -6.2241,
      lng: 106.8425,
      distance: "2.8 km",
      specialties: ["Emergency", "24 Hours", "Towing"]
    }
  ];

  // Get user location when workshop-finder tab is activated
  useEffect(() => {
    if (activeTab === 'workshop-finder' && !userLocation) {
      setIsLoadingLocation(true);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            setUserLocation(userPos);
            setIsLoadingLocation(false);
          },
          (error) => {
            console.error('Error getting location:', error);
            // Default to Jakarta if location access denied
            const defaultPos = { lat: -6.2088, lng: 106.8456 };
            setUserLocation(defaultPos);
            setIsLoadingLocation(false);
          },
          {
            timeout: 10000,
            enableHighAccuracy: true,
            maximumAge: 300000
          }
        );
      } else {
        // Default to Jakarta if geolocation not supported
        const defaultPos = { lat: -6.2088, lng: 106.8456 };
        setUserLocation(defaultPos);
        setIsLoadingLocation(false);
      }
    }
  }, [activeTab, userLocation]);

  // Simulate loading when spare-parts tab is activated
  useEffect(() => {
    if (activeTab === 'spare-parts') {
      setIsLoadingProducts(true);
      const timer = setTimeout(() => {
        setIsLoadingProducts(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  const [serviceReminders, setServiceReminders] = useState([
    {
      id: 1,
      component: 'Oli Mesin',
      dueDate: '2024-02-01',
      urgency: 'critical',
      mileage: 5000,
      description: 'Ganti oli mesin setiap 3000-5000 km'
    },
    {
      id: 2,
      component: 'Kampas Rem',
      dueDate: '2024-02-15',
      urgency: 'high',
      mileage: 8000,
      description: 'Periksa ketebalan kampas rem'
    },
    {
      id: 3,
      component: 'Rantai Motor',
      dueDate: '2024-03-01',
      urgency: 'medium',
      mileage: 10000,
      description: 'Pembersihan dan pelumasan rantai'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-green-400 bg-green-900/20 border-green-500/30';
      case 'warning': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      case 'critical': return 'text-red-400 bg-red-900/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-500/30';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-xl border border-cyan-500/20 ring-1 ring-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Halo, {userName} 👋</h2>
            <p className="text-cyan-300">Selamat datang di Dashboard BengkelAI</p>
          </div>
          <button onClick={()=>setActiveTab('workshop-finder')} className="hidden lg:inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20l6-6-6-6v12z" /></svg>
            <span>Cari Bengkel</span>
          </button>
        </div>
      </div>
      <div className="bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-xl border border-cyan-500/20 ring-1 ring-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Profil Motor Anda</h3>
          <div className="flex items-center gap-2">
            {profileMessage && (
              <span className="text-sm text-green-400">{profileMessage}</span>
            )}
            <button onClick={()=>setIsEditingProfile(!isEditingProfile)} className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm">{isEditingProfile ? 'Batal' : 'Edit Profil'}</button>
            {isEditingProfile && (
              <button onClick={()=>{saveMotorProfile(); setIsEditingProfile(false);}} className="px-3 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm">Simpan</button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            {motorProfile.imageUrl ? (
              <img src={motorProfile.imageUrl} alt="Motor" className="w-full h-48 object-cover rounded-lg border border-slate-600/50" />
            ) : (
              <div className="w-full h-48 rounded-lg border border-slate-600/50 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-4xl">🏍️</div>
            )}
            
          </div>
          <div className="md:col-span-2">
            <div className="mb-4">
              <div className="text-white text-2xl md:text-3xl font-bold">{motorProfile.merk || 'Merk'} {motorProfile.model || 'Model'}</div>
              <div className="text-cyan-300 text-lg">Tahun {motorProfile.tahun || '-'}</div>
            </div>
            <div className="space-y-2 mb-4">
              {(() => {
                const m = (motorProfile.model || '').toLowerCase();
                const isCRF150L = m.includes('crf 150l') || m.includes('crf150l') || m.includes('cef 150l');
                const tips = isCRF150L 
                  ? [
                      'Cek dan lumasi rantai lebih sering setelah off-road',
                      'Bersihkan filter udara rutin, terutama habis debu/lumpur',
                      'Periksa tekanan ban sesuai medan (on-road/off-road)',
                      'Setel suspensi sesuai beban dan rute',
                      'Gunakan oli 10W-40 berkualitas untuk suhu tropis'
                    ]
                  : [];
                return tips.map((t, i) => (
                  <div key={i} className="text-sm text-gray-200 flex items-center gap-2"><span>✅</span><span>{t}</span></div>
                ));
              })()}
            </div>
            {isEditingProfile && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input value={motorProfile.merk} onChange={(e)=>setMotorProfile({...motorProfile, merk:e.target.value})} placeholder="Merk" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
                <input value={motorProfile.model} onChange={(e)=>setMotorProfile({...motorProfile, model:e.target.value})} placeholder="Model" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
                <input value={motorProfile.tahun} onChange={(e)=>setMotorProfile({...motorProfile, tahun:e.target.value})} placeholder="Tahun Keluar" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
                <input value={motorProfile.imageUrl} onChange={(e)=>setMotorProfile({...motorProfile, imageUrl:e.target.value})} placeholder="URL Gambar Motor" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white md:col-span-2" />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Motor Condition Overview */}
      <div className="bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-xl border border-cyan-500/20 ring-1 ring-white/10 rounded-xl p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

          {/* Tips Perawatan Motor */}
          <div className="md:col-span-1 flex flex-col h-full">
            <h4 className="text-lg font-semibold text-white mb-3">Tips Perawatan Motor</h4>
            <div className="space-y-3">
              {motorEducation.map((tip, index) => (
                <div key={index} className="p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{tip.icon}</span>
                    <div>
                      <h5 className="font-medium text-white text-sm">{tip.title}</h5>
                      <p className="text-xs text-gray-300 mt-1">{tip.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rekomendasi Oli */}
          <div className="md:col-span-1 flex flex-col h-full">
            <h4 className="text-lg font-semibold text-white mb-3">Rekomendasi Oli</h4>
            <div className="space-y-3">
              {oilRecommendations.map((oil, index) => (
                <div key={index} className="p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-medium text-white text-sm">{oil.brand}</h5>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-xs">⭐</span>
                      <span className="text-xs text-gray-300">{oil.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 mb-1">{oil.type}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{oil.volume}</span>
                    <span className="text-sm font-semibold text-green-400">{oil.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => setActiveTab('workshop-finder')}
          className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-xl p-6 text-left hover:from-cyan-600/30 hover:to-blue-600/30 transition-all duration-200 group"
        >
          <div className="mb-2 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </div>
          <h4 className="font-semibold text-white mb-1">Cari Bengkel</h4>
          <p className="text-sm text-gray-300">Temukan bengkel terdekat</p>
        </button>

        <Link
          to="/spare-parts"
          className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-6 text-left hover:from-green-600/30 hover:to-emerald-600/30 transition-all duration-200 group"
        >
          <div className="mb-2 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
            </svg>
          </div>
          <h4 className="font-semibold text-white mb-1">Spare Parts</h4>
          <p className="text-sm text-gray-300">Estimasi harga suku cadang</p>
        </Link>

        <Link
          to="/workshop-dashboard"
          className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-xl p-6 text-left hover:from-orange-600/30 hover:to-red-600/30 transition-all duration-200 group"
        >
          <div className="mb-2 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.866 0-7 3.134-7 7h14c0-3.866-3.134-7-7-7z" />
            </svg>
          </div>
          <h4 className="font-semibold text-white mb-1">Dashboard Bengkel</h4>
          <p className="text-sm text-gray-300">Kelola log & stok bengkel</p>
        </Link>



        <Link
          to="/chat"
          className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6 text-left hover:from-purple-600/30 hover:to-pink-600/30 transition-all duration-200 group"
        >
          <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <h4 className="font-semibold text-white mb-1">AI Diagnosa</h4>
          <p className="text-sm text-gray-200">Chat dengan AI assistant</p>
        </Link>
      </div>

      {/* Recent Service Reminders */}
      <div className="hidden bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-xl border border-cyan-500/20 ring-1 ring-white/10 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 6c-.55 0-1 .45-1 1v3.5c0 .28.11.53.29.71l2.5 2.5c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13 11.59V9c0-.55-.45-1-1-1z" />
          </svg>
          Reminder Perawatan Mendatang
        </h3>
        <div className="space-y-3">
          {serviceReminders.slice(0, 3).map((reminder) => (
            <div key={reminder.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getUrgencyColor(reminder.urgency)}`}>
                    {reminder.urgency.toUpperCase()}
                  </span>
                  <h4 className="font-medium text-white">{reminder.component}</h4>
                </div>
                <p className="text-sm text-gray-300 mb-1">{reminder.description}</p>
                <p className="text-xs text-gray-400">Target: {reminder.dueDate} | {reminder.mileage} km</p>
              </div>
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Detail
              </button>
            </div>
          ))}
        </div>
      </div>


    </div>
  );



  const renderWorkshopFinder = () => {
    const kijangCenter = { lat: 0.9000, lng: 104.6333 };
    const kijangWorkshops = [
      { id: 1, name: "Bengkel Jaya Motor Kijang", address: "Kijang, Bintan", phone: "0771-111-222", rating: 4.5, services: ["Service Rutin", "Ganti Oli", "Tune Up"], price: "Rp 50-150k", lat: 0.8504461184169547, lng: 104.59379589182085, distance: "0.7 km" },
      { id: 2, name: "Honda AHASS Kijang", address: "Kijang, Bintan", phone: "0771-333-444", rating: 4.8, services: ["Service Resmi", "Spare Part Original"], price: "Rp 100-300k", lat:0.8487726040164576, lng: 104.59424113850531, distance: "1.2 km" },
      { id: 3, name: "Yamaha Service Center Bintan", address: "Kijang, Bintan", phone: "0771-555-666", rating: 4.6, services: ["Tune Up", "Injeksi Cleaning"], price: "Rp 75-250k", lat: 0.8471512478952484, lng: 104.59655423894058, distance: "1.6 km" },
      { id: 4, name: "Bengkel Om Heri", address: "Kijang, Bintan", phone: "081233243881", rating: 4.7, services: ["Servis Umum", "Ganti Oli"], price: "Rp 50-200k", lat: 0.8496279042671772, lng: 104.59551946388257, distance: "0.9 km", url: "https://maps.app.goo.gl/8M2oxCbcj142HQuG6" }
    ];
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-xl border border-cyan-500/20 ring-1 ring-white/10 rounded-xl p-6">
          <div className="flex flex-col lg:flex-row h-[500px] lg:h-[600px]">
            <div className="flex-1 relative overflow-hidden">
              <OpenStreetMap workshops={kijangWorkshops} onMarkerClick={() => { }} className="rounded-lg" center={kijangCenter} />
              <div className="absolute top-4 right-4 z-30 backdrop-blur-xl bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-800/80 rounded-lg shadow-lg p-3 border border-cyan-400/30 ring-1 ring-white/20">
                <div className="text-sm font-bold text-white mb-1">🗺️ Peta Kijang, Bintan</div>
                <div className="text-xs text-cyan-300/80">Klik marker untuk detail bengkel</div>
              </div>
            </div>
            <div className="w-full lg:w-96 border-l border-cyan-500/20 overflow-y-auto bg-slate-800/30">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">📋 Daftar Bengkel</h4>
                  <span className="text-xs text-cyan-300/80">{kijangWorkshops.length} bengkel</span>
                </div>
                {kijangWorkshops.map((b, i) => (
                  <div key={b.id} className="p-3 border rounded-lg mb-2 bg-slate-700/30 border-slate-600/50 hover:bg-slate-600/40 hover:border-cyan-500/30 transition-all duration-200">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-red-500' : i === 1 ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
                        <h5 className="font-medium text-sm text-white">{b.name}</h5>
                      </div>
                      <span className="text-xs text-cyan-300/80 font-medium">{b.distance}</span>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <span className="text-yellow-400 text-sm">⭐</span>
                        <span className="text-xs text-gray-300 ml-1 font-medium">{b.rating}</span>
                      </div>
                      <span className="text-xs text-green-400 font-medium">{b.price}</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-300">
                      <p className="flex items-start gap-2"><span>📍</span><span>{b.address}</span></p>
                      <p className="flex items-center gap-2"><span>📞</span><span>{b.phone || '-'}</span></p>
                      {b.url && (
                        <p className="mt-1"><a className="text-cyan-400 hover:text-cyan-300" href={b.url} target="_blank" rel="noreferrer">Buka di Maps</a></p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderWorkshopUser = () => {
    const [workshopLogs, setWorkshopLogs] = React.useState([]);
    const [inventoryItems, setInventoryItems] = React.useState([]);
    const [newLog, setNewLog] = React.useState({ tanggal: '', plat: '', merk: '', model: '', keluhan: '', status: 'Masuk' });
    const [newItem, setNewItem] = React.useState({ nama: '', stok: 0, harga: 0, satuan: 'pcs' });
    const addLog = () => {
      if (!newLog.plat || !newLog.merk) return;
      setWorkshopLogs([{ id: Date.now(), ...newLog }, ...workshopLogs]);
      setNewLog({ tanggal: '', plat: '', merk: '', model: '', keluhan: '', status: 'Masuk' });
    };
    const addItem = () => {
      if (!newItem.nama) return;
      setInventoryItems([{ id: Date.now(), ...newItem }, ...inventoryItems]);
      setNewItem({ nama: '', stok: 0, harga: 0, satuan: 'pcs' });
    };
    const removeItem = (id) => setInventoryItems(inventoryItems.filter((x) => x.id !== id));
    const updateLogStatus = (id, status) => setWorkshopLogs(workshopLogs.map(l => l.id === id ? { ...l, status } : l));
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-xl border border-cyan-500/20 ring-1 ring-white/10 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">🛠️ Log Motor Masuk</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <input value={newLog.tanggal} onChange={(e) => setNewLog({ ...newLog, tanggal: e.target.value })} type="date" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
            <input value={newLog.plat} onChange={(e) => setNewLog({ ...newLog, plat: e.target.value })} placeholder="Plat Nomor" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
            <input value={newLog.merk} onChange={(e) => setNewLog({ ...newLog, merk: e.target.value })} placeholder="Merk" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
            <input value={newLog.model} onChange={(e) => setNewLog({ ...newLog, model: e.target.value })} placeholder="Model" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
            <input value={newLog.keluhan} onChange={(e) => setNewLog({ ...newLog, keluhan: e.target.value })} placeholder="Keluhan" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white md:col-span-2" />
            <select value={newLog.status} onChange={(e) => setNewLog({ ...newLog, status: e.target.value })} className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white">
              <option>Masuk</option>
              <option>Proses</option>
              <option>Selesai</option>
            </select>
          </div>
          <button onClick={addLog} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg">Tambah Log</button>
          <div className="mt-4 space-y-2">
            {workshopLogs.length === 0 ? (
              <div className="text-gray-300">Belum ada log</div>
            ) : workshopLogs.map(l => (
              <div key={l.id} className="p-3 bg-slate-700/30 border border-slate-600/50 rounded-lg">
                <div className="flex justify-between text-sm text-white"><span>{l.tanggal} • {l.plat} • {l.merk} {l.model}</span><span className="text-cyan-300">{l.status}</span></div>
                <div className="text-xs text-gray-300">Keluhan: {l.keluhan}</div>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => updateLogStatus(l.id, 'Proses')} className="px-2 py-1 bg-yellow-500 text-white rounded">Proses</button>
                  <button onClick={() => updateLogStatus(l.id, 'Selesai')} className="px-2 py-1 bg-green-600 text-white rounded">Selesai</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-xl border border-cyan-500/20 ring-1 ring-white/10 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">📦 Pencatatan Barang</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
            <input value={newItem.nama} onChange={(e) => setNewItem({ ...newItem, nama: e.target.value })} placeholder="Nama Barang" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white md:col-span-2" />
            <input value={newItem.stok} onChange={(e) => setNewItem({ ...newItem, stok: parseInt(e.target.value || '0') })} type="number" placeholder="Stok" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
            <input value={newItem.harga} onChange={(e) => setNewItem({ ...newItem, harga: parseInt(e.target.value || '0') })} type="number" placeholder="Harga" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white" />
            <select value={newItem.satuan} onChange={(e) => setNewItem({ ...newItem, satuan: e.target.value })} className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white">
              <option>pcs</option>
              <option>liter</option>
              <option>set</option>
            </select>
          </div>
          <button onClick={addItem} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg">Tambah Barang</button>
          <div className="mt-4 space-y-2">
            {inventoryItems.length === 0 ? (
              <div className="text-gray-300">Belum ada barang</div>
            ) : inventoryItems.map(i => (
              <div key={i.id} className="p-3 bg-slate-700/30 border border-slate-600/50 rounded-lg flex justify-between items-center">
                <div className="text-sm text-white">{i.nama} • {i.stok} {i.satuan} • Rp {i.harga.toLocaleString()}</div>
                <button onClick={() => removeItem(i.id)} className="px-2 py-1 bg-red-500 text-white rounded">Hapus</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSparePartsMarketplace = () => {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-xl border border-cyan-500/20 ring-1 ring-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Spare Parts Marketplace</h2>
              <p className="text-cyan-400">Temukan spare parts berkualitas untuk motor Anda</p>
            </div>
            <Link
              to="/spare-parts"
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Lihat Semua
            </Link>
          </div>

          {/* Featured Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sparePartsData.slice(0, 6).map((product, index) => (
              <div key={index} className="bg-slate-800/40 border border-slate-700 rounded-lg p-4 hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{product.brand}</h3>
                    <p className="text-sm text-gray-400">{product.type}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyan-400 font-bold">{product.price}</p>
                    <p className="text-xs text-gray-500">{product.volume}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-sm text-gray-300">{product.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };



  const renderReminder = () => {

    const addReminder = async () => {
      if (newReminder.component && newReminder.dueDate) {
        setIsSavingReminder(true);
        try {
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 1000));

          const reminder = {
            id: Date.now(),
            ...newReminder,
            createdAt: new Date().toISOString().split('T')[0]
          };
          setServiceReminders([...serviceReminders, reminder]);
          setNewReminder({ component: '', dueDate: '', urgency: 'medium', description: '' });
          setShowAddReminder(false);
        } catch (error) {
          console.error('Error saving reminder:', error);
        } finally {
          setIsSavingReminder(false);
        }
      }
    };

    const deleteReminder = (id) => {
      setServiceReminders(serviceReminders.filter(reminder => reminder.id !== id));
    };

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-xl border border-cyan-500/20 ring-1 ring-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 6c-.55 0-1 .45-1 1v3.5c0 .28.11.53.29.71l2.5 2.5c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13 11.59V9c0-.55-.45-1-1-1z" />
              </svg>
              Reminder Perawatan
            </h3>
            <button
              onClick={() => setShowAddReminder(true)}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
              Tambah Reminder
            </button>
          </div>

          {/* Reminder List */}
          <div className="space-y-4">
            {serviceReminders.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <h4 className="text-lg font-semibold text-white mb-2">Belum ada reminder</h4>
                <p className="text-gray-400">Tambahkan reminder perawatan motor Anda</p>
              </div>
            ) : (
              serviceReminders.map((reminder) => (
                <div key={reminder.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/50 hover:bg-slate-700/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getUrgencyColor(reminder.urgency)}`}>
                        {reminder.urgency.toUpperCase()}
                      </span>
                      <h4 className="font-medium text-white">{reminder.component}</h4>
                    </div>
                    <p className="text-sm text-gray-200 mb-1">{reminder.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-300">
                      <span>Jatuh tempo: {new Date(reminder.dueDate).toLocaleDateString('id-ID')}</span>
                      <span>Dibuat: {new Date(reminder.createdAt).toLocaleDateString('id-ID')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedReminder(reminder)}
                      className="text-cyan-400 hover:text-cyan-300 p-2 rounded-lg hover:bg-slate-600/50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => deleteReminder(reminder.id)}
                      className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-slate-600/50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add Reminder Modal */}
        {showAddReminder && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div ref={addReminderModalRef} className="bg-slate-900 rounded-2xl border border-cyan-500/30 w-full max-w-md">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Tambah Reminder Baru</h3>
                  <button
                    ref={addReminderFirstFocusableRef}
                    onClick={() => setShowAddReminder(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setShowAddReminder(false);
                      }
                    }}
                    className="text-white/80 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded p-1 transition-colors"
                    aria-label="Close modal"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Komponen</label>
                  <input
                    type="text"
                    value={newReminder.component}
                    onChange={(e) => setNewReminder({ ...newReminder, component: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        e.target.blur();
                      }
                    }}
                    placeholder="Contoh: Ganti Oli Mesin"
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-gray-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tanggal Jatuh Tempo</label>
                  <input
                    type="date"
                    value={newReminder.dueDate}
                    onChange={(e) => setNewReminder({ ...newReminder, dueDate: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        e.target.blur();
                      }
                    }}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tingkat Urgensi</label>
                  <select
                    value={newReminder.urgency}
                    onChange={(e) => setNewReminder({ ...newReminder, urgency: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        e.target.blur();
                      }
                    }}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  >
                    <option value="low">Rendah</option>
                    <option value="medium">Sedang</option>
                    <option value="high">Tinggi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Deskripsi (Opsional)</label>
                  <textarea
                    value={newReminder.description}
                    onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        e.target.blur();
                      }
                    }}
                    placeholder="Deskripsi tambahan..."
                    rows={3}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-gray-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowAddReminder(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setShowAddReminder(false);
                      }
                    }}
                    className="flex-1 bg-slate-700 text-gray-300 py-2 rounded-lg hover:bg-slate-600 focus:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors"
                  >
                    Batal
                  </button>
                  <ButtonLoading
                    ref={addReminderLastFocusableRef}
                    onClick={addReminder}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        addReminder();
                      }
                    }}
                    loading={isSavingReminder}
                    disabled={isSavingReminder}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 rounded-lg hover:from-cyan-400 hover:to-blue-500 focus:from-cyan-400 focus:to-blue-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSavingReminder ? 'Menyimpan...' : 'Simpan'}
                  </ButtonLoading>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSpareParts = () => {

    const spareParts = [
      {
        id: 1,
        name: 'Oli Mesin Shell Advance AX7',
        category: 'Engine',
        price: 85000,
        originalPrice: 95000,
        brand: 'Shell',
        stock: 25,
        rating: 4.8,
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
        description: 'Oli mesin semi sintetik berkualitas tinggi untuk performa optimal motor Anda',
        specifications: ['SAE 10W-40', 'API SL/JASO MA2', 'Volume: 1 Liter', 'Cocok untuk motor 4-tak'],
        seller: 'Honda AHASS Pusat',
        location: 'Jakarta Selatan',
        warranty: '6 bulan'
      },
      {
        id: 2,
        name: 'Kampas Rem Brembo Premium',
        category: 'Brake System',
        price: 65000,
        originalPrice: 75000,
        brand: 'Brembo',
        stock: 18,
        rating: 4.9,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=300&fit=crop',
        description: 'Kampas rem premium untuk pengereman yang optimal dan aman',
        specifications: ['Material: Semi-metallic', 'Tahan panas tinggi', 'Low noise formula', 'Cocok untuk motor sport'],
        seller: 'Bengkel Jaya Motor',
        location: 'Jakarta Timur',
        warranty: '1 tahun'
      },
      {
        id: 3,
        name: 'Ban Michelin Pilot Street',
        category: 'Tires',
        price: 450000,
        originalPrice: 480000,
        brand: 'Michelin',
        stock: 12,
        rating: 4.9,
        reviews: 234,
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
        description: 'Ban motor premium untuk performa dan keamanan maksimal di segala cuaca',
        specifications: ['Ukuran: 110/70-17', 'Tubeless', 'Compound khusus', 'Grip optimal'],
        seller: 'Yamaha Service Center',
        location: 'Jakarta Barat',
        warranty: '2 tahun'
      },
      {
        id: 4,
        name: 'Aki GS Astra Premium GTZ7S',
        category: 'Electrical',
        price: 320000,
        originalPrice: 350000,
        brand: 'GS Astra',
        stock: 30,
        rating: 4.8,
        reviews: 178,
        image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=300&fit=crop',
        description: 'Aki motor maintenance free dengan teknologi terdepan',
        specifications: ['12V 6Ah', 'Maintenance Free', 'Cold Cranking Amps: 100A', 'Tahan getaran'],
        seller: 'Honda AHASS',
        location: 'Jakarta Pusat',
        warranty: '1 tahun'
      },
      {
        id: 5,
        name: 'Rantai DID 428HD Gold',
        category: 'Drive System',
        price: 150000,
        originalPrice: 165000,
        brand: 'DID',
        stock: 22,
        rating: 4.8,
        reviews: 145,
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
        description: 'Rantai motor berkualitas tinggi dengan lapisan emas anti karat',
        specifications: ['Size: 428H x 130L', 'Gold plated', 'Tensile strength: 2100kg', 'O-ring sealed'],
        seller: 'Bengkel Mandiri',
        location: 'Jakarta Utara',
        warranty: '6 bulan'
      },
      {
        id: 6,
        name: 'Busi NGK Iridium IX',
        category: 'Engine',
        price: 35000,
        originalPrice: 40000,
        brand: 'NGK',
        stock: 50,
        rating: 4.9,
        reviews: 267,
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
        description: 'Busi iridium premium untuk pembakaran sempurna dan hemat bahan bakar',
        specifications: ['Iridium electrode', 'Gap: 0.8mm', 'Heat range: 7', 'Long life: 20,000km'],
        seller: 'Suzuki Authorized',
        location: 'Jakarta Selatan',
        warranty: '1 tahun'
      },
      {
        id: 7,
        name: 'Filter Udara K&N Performance',
        category: 'Engine',
        price: 180000,
        originalPrice: 200000,
        brand: 'K&N',
        stock: 15,
        rating: 4.7,
        reviews: 98,
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
        description: 'Filter udara performa tinggi yang dapat dicuci dan digunakan kembali',
        specifications: ['Washable & reusable', 'High flow design', 'Cotton gauze media', 'Lifetime warranty'],
        seller: 'Motor Clinic',
        location: 'Jakarta Timur',
        warranty: 'Seumur hidup'
      },
      {
        id: 8,
        name: 'Kopling Set Honda Vario',
        category: 'Transmission',
        price: 250000,
        originalPrice: 280000,
        brand: 'Honda Genuine',
        stock: 8,
        rating: 4.8,
        reviews: 67,
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
        description: 'Set kopling original Honda untuk transmisi yang halus dan tahan lama',
        specifications: ['Original Honda parts', 'Complete set', 'High durability', 'Perfect fit'],
        seller: 'Honda AHASS',
        location: 'Jakarta Barat',
        warranty: '1 tahun'
      },
      {
        id: 9,
        name: 'Shock Breaker YSS G-Plus',
        category: 'Suspension',
        price: 850000,
        originalPrice: 950000,
        brand: 'YSS',
        stock: 6,
        rating: 4.9,
        reviews: 45,
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
        description: 'Shock breaker premium dengan teknologi gas untuk kenyamanan maksimal',
        specifications: ['Gas charged', 'Adjustable preload', 'Length: 340mm', 'Chrome finish'],
        seller: 'Bengkel Specialist',
        location: 'Jakarta Pusat',
        warranty: '2 tahun'
      },
      {
        id: 10,
        name: 'Lampu LED Philips Ultinon',
        category: 'Electrical',
        price: 120000,
        originalPrice: 140000,
        brand: 'Philips',
        stock: 35,
        rating: 4.7,
        reviews: 189,
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
        description: 'Lampu LED berkualitas tinggi dengan cahaya putih terang dan hemat energi',
        specifications: ['6000K color temperature', '12V 18W', 'Long life: 12 years', 'Plug & play'],
        seller: 'Auto Parts Store',
        location: 'Jakarta Selatan',
        warranty: '3 tahun'
      },
      {
        id: 11,
        name: 'Velg Racing Boy SP522',
        category: 'Wheels',
        price: 1200000,
        originalPrice: 1350000,
        brand: 'Racing Boy',
        stock: 4,
        rating: 4.8,
        reviews: 23,
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
        description: 'Velg racing premium dengan desain sporty dan material berkualitas tinggi',
        specifications: ['Aluminum alloy', 'Size: 17 inch', 'Lightweight design', 'Anodized finish'],
        seller: 'Racing Parts Shop',
        location: 'Jakarta Timur',
        warranty: '1 tahun'
      },
      {
        id: 12,
        name: 'Knalpot Yoshimura R77S',
        category: 'Exhaust',
        price: 2500000,
        originalPrice: 2800000,
        brand: 'Yoshimura',
        stock: 2,
        rating: 4.9,
        reviews: 34,
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
        description: 'Knalpot racing premium dengan suara khas dan performa tinggi',
        specifications: ['Stainless steel', 'Carbon fiber end cap', 'Slip-on type', 'Racing sound'],
        seller: 'Performance Shop',
        location: 'Jakarta Barat',
        warranty: '2 tahun'
      }
    ];

    // Filter and sort products
    const categories = ['All', ...new Set(spareParts.map(part => part.category))];

    const filteredProducts = spareParts.filter(part => {
      const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        part.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        part.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || part.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

    const addToCart = (product) => {
      const existingItem = cart.find(item => item.id === product.id);
      if (existingItem) {
        setCart(cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    };

    const removeFromCart = (productId) => {
      setCart(cart.filter(item => item.id !== productId));
    };

    const getTotalPrice = () => {
      return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const ProductDetailModal = () => (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 rounded-2xl border border-cyan-500/30 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <h3 className="text-xl font-bold text-white">Detail Produk</h3>
            <button
              onClick={() => setShowProductDetail(false)}
              className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {selectedProduct && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Spesifikasi</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      {selectedProduct.specifications.map((spec, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="text-cyan-400">•</span>
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedProduct.name}</h2>
                  <p className="text-gray-400 mb-4">{selectedProduct.brand}</p>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <div className="flex text-yellow-400">
                        {'★'.repeat(Math.floor(selectedProduct.rating))}
                      </div>
                      <span className="text-sm text-gray-300">({selectedProduct.rating})</span>
                    </div>
                    <span className="text-sm text-gray-300">{selectedProduct.reviews} ulasan</span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-green-400">Rp {selectedProduct.price.toLocaleString()}</span>
                      {selectedProduct.originalPrice > selectedProduct.price && (
                        <span className="text-lg text-gray-400 line-through">Rp {selectedProduct.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-300">Stok: {selectedProduct.stock} unit</p>
                  </div>

                  <p className="text-gray-300 mb-6">{selectedProduct.description}</p>

                  <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-white mb-2">Informasi Penjual</h4>
                    <div className="space-y-1 text-sm text-gray-300">
                      <p><span className="text-cyan-400">Toko:</span> {selectedProduct.seller}</p>
                      <p><span className="text-cyan-400">Lokasi:</span> {selectedProduct.location}</p>
                      <p><span className="text-cyan-400">Garansi:</span> {selectedProduct.warranty}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => addToCart(selectedProduct)}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-3 rounded-lg transition-all duration-200 font-medium"
                    >
                      <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 4V2C7 1.45 7.45 1 8 1h8c.55 0 1 .45 1 1v2h5c.55 0 1 .45 1 1s-.45 1-1 1h-1v11c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V6H2c-.55 0-1-.45-1-1s.45-1 1-1h5zM9 3v1h6V3H9zm0 8c0 .55.45 1 1 1s1-.45 1-1V9c0-.55-.45-1-1-1s-1 .45-1 1v2zm4 0c0 .55.45 1 1 1s1-.45 1-1V9c0-.55-.45-1-1-1s-1 .45-1 1v2z" />
                      </svg>
                      Tambah ke Keranjang
                    </button>
                    <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium">
                      <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44-2.83 3.76-5.14 6.67-6.27L11.93 3c-.59-.59-1.54-.59-2.12 0L8.34 4.46c-.59.59-.59 1.54 0 2.12l1.46 1.46c.59.59 1.54.59 2.12 0L13.38 6.58c2.83 1.44 5.14 3.76 6.27 6.67l1.52-1.36c.59-.59.59-1.54 0-2.12L19.71 8.31c-.59-.59-1.54-.59-2.12 0l-1.46 1.46c-.59.59-.59 1.54 0 2.12l1.46 1.46c.59.59 1.54.59 2.12 0l1.46-1.46c.59-.59.59-1.54 0-2.12z" />
                      </svg>
                      Hubungi Penjual
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );

    return (
      <div className="space-y-6">
        {showProductDetail && <ProductDetailModal />}

        {/* Shopping Cart Sidebar */}
        {cart.length > 0 && (
          <div className="fixed top-4 right-4 bg-slate-900 border border-cyan-500/30 rounded-xl p-4 w-80 z-40 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 4V2C7 1.45 7.45 1 8 1h8c.55 0 1 .45 1 1v2h5c.55 0 1 .45 1 1s-.45 1-1 1h-1v11c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V6H2c-.55 0-1-.45-1-1s.45-1 1-1h5z" />
                </svg>
                Keranjang ({cart.length})
              </h3>
              <button
                onClick={() => setCart([])}
                className="text-gray-300 hover:text-red-400 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                </svg>
              </button>
            </div>

            <div className="space-y-2 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-slate-800/50 rounded p-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white truncate">{item.name}</p>
                    <p className="text-xs text-gray-300">{item.quantity}x Rp {item.price.toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-300 ml-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-700 pt-4">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-white">Total:</span>
                <span className="font-bold text-green-400">Rp {getTotalPrice().toLocaleString()}</span>
              </div>
              <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white py-2 rounded-lg transition-all duration-200 font-medium">
                Checkout
              </button>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-xl border border-cyan-500/20 ring-1 ring-white/10 rounded-xl p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
              </svg>
              Spare Parts E-Commerce
            </h3>
            <div className="text-sm text-gray-400">
              {sortedProducts.length} produk tersedia
            </div>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="md:col-span-2">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Cari produk, brand, atau deskripsi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-300 focus:border-cyan-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
            >
              <option value="name">Urutkan: Nama</option>
              <option value="price-low">Harga: Rendah ke Tinggi</option>
              <option value="price-high">Harga: Tinggi ke Rendah</option>
              <option value="rating">Rating Tertinggi</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoadingProducts ? (
              Array.from({ length: 8 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))
            ) : (
              sortedProducts.map((product) => (
                <div key={product.id} className="bg-slate-700/30 rounded-lg border border-slate-600/50 overflow-hidden hover:border-cyan-500/30 transition-all duration-200 hover:transform hover:scale-105">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover cursor-pointer"
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowProductDetail(true);
                      }}
                    />
                    {product.originalPrice > product.price && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                      Stok: {product.stock}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="mb-2">
                      <h4 className="font-semibold text-white text-sm mb-1 line-clamp-2 cursor-pointer hover:text-cyan-400 transition-colors"
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowProductDetail(true);
                        }}>
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-400">{product.brand} • {product.category}</p>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex text-yellow-400 text-xs">
                        {'★'.repeat(Math.floor(product.rating))}
                      </div>
                      <span className="text-xs text-gray-300">({product.rating}) • {product.reviews} ulasan</span>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-green-400">Rp {product.price.toLocaleString()}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">Rp {product.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-300">{product.seller}</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-2 rounded text-sm transition-all duration-200 font-medium"
                      >
                        <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M7 4V2C7 1.45 7.45 1 8 1h8c.55 0 1 .45 1 1v2h5c.55 0 1 .45 1 1s-.45 1-1 1h-1v11c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V6H2c-.55 0-1-.45-1-1s.45-1 1-1h5z" />
                        </svg>
                        Keranjang
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowProductDetail(true);
                        }}
                        className="px-3 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded text-sm transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.5a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-300 mb-2">Tidak ada produk ditemukan</h3>
              <p className="text-gray-400">Coba ubah kata kunci pencarian atau filter kategori</p>
            </div>
          )}

          {/* Shopping Tips */}
          <div className="mt-8 bg-slate-800/30 rounded-lg p-4 border border-slate-700">
            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              Tips Belanja Spare Parts
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Bandingkan harga dan kualitas dari berbagai penjual</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Periksa rating dan ulasan produk sebelum membeli</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Pastikan garansi dan kebijakan retur tersedia</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Konsultasikan dengan mekanik untuk rekomendasi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col relative">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="backdrop-blur-xl bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-slate-900/80 border-b border-cyan-500/20 px-4 py-4 relative z-10 ring-1 ring-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center mr-6 hover:opacity-80 transition-opacity">
              <img
                src="/32x32.svg"
                alt="BengkelAI Logo"
                className="w-8 h-8 mr-3"
                width="32"
                height="32"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">BengkelAI</span>
            </Link>
            <h1 className="text-xl font-semibold text-white">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/chat"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 ring-1 ring-white/20 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v3c0 .6.4 1 1 1 .2 0 .5-.1.7-.3L14.4 18H20c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
              Chat AI
            </Link>
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              U
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto w-full px-4 py-6 relative z-10">
        <div className="flex flex-wrap gap-2 mb-6 bg-slate-800/30 backdrop-blur-sm rounded-xl p-2 border border-cyan-500/20">
          {[
            {
              id: 'overview',
              label: 'Overview',
              icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" /></svg>
            },

            {
              id: 'workshop-finder',
              label: 'Workshop Finder',
              icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
            },
            {
              id: 'spare-parts',
              label: 'Spare Parts',
              icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" /></svg>
            }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'spare-parts') {
                  navigate('/spare-parts');
                } else {
                  setActiveTab(tab.id);
                }
              }}
              className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg ring-1 ring-white/20'
                  : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                }`}
            >
              <span className="hidden sm:flex sm:items-center sm:gap-2">
                {tab.icon}
                {tab.label}
              </span>
              <span className="sm:hidden">{tab.icon}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="relative z-10">
          {activeTab === 'overview' && (
            <ErrorBoundary>
              {renderOverview()}
            </ErrorBoundary>
          )}

          {activeTab === 'workshop-finder' && (
            <ErrorBoundary>
              {renderWorkshopFinder()}
            </ErrorBoundary>
          )}



          {/* spare-parts tab now redirects to /spare-parts route */}
        </div>
      </div>
    </div>
  );
}