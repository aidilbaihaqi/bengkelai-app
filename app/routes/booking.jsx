import { useState } from "react";
import { Link } from "@remix-run/react";
import Header from "../components/Header";

export default function Booking() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: "",
    motorBrand: "",
    motorModel: "",
    issue: "",
    phone: ""
  });

  // Dummy data bengkel terdekat
  const nearbyWorkshops = [
    {
      id: 1,
      name: "Bengkel Jaya Motor",
      address: "Jl. Sudirman No. 123, Jakarta Pusat",
      distance: "0.8 km",
      rating: 4.8,
      currentQueue: 3,
      estimatedWait: "45 menit",
      services: ["Service Rutin", "Ganti Oli", "Tune Up", "Perbaikan Mesin"],
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      name: "Motor Service Pro",
      address: "Jl. Gatot Subroto No. 456, Jakarta Selatan",
      distance: "1.2 km",
      rating: 4.6,
      currentQueue: 5,
      estimatedWait: "1 jam 15 menit",
      services: ["Service Rutin", "Ganti Ban", "Perbaikan Rem", "Tune Up"],
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      name: "Bengkel Maju Jaya",
      address: "Jl. Thamrin No. 789, Jakarta Pusat",
      distance: "1.5 km",
      rating: 4.7,
      currentQueue: 2,
      estimatedWait: "30 menit",
      services: ["Service Rutin", "Ganti Oli", "Perbaikan Elektrik", "Tune Up"],
      image: "/api/placeholder/300/200"
    }
  ];

  const handleWorkshopSelect = (workshop) => {
    setSelectedWorkshop(workshop);
    setCurrentStep(2);
  };

  const handleUserDetailsSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const handleInputChange = (field, value) => {
    setUserDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
            currentStep >= step 
              ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white' 
              : 'bg-gray-300 text-gray-600'
          }`}>
            {step}
          </div>
          {step < 3 && (
            <div className={`w-16 h-1 mx-2 ${
              currentStep > step ? 'bg-gradient-to-r from-orange-500 to-red-600' : 'bg-gray-300'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStepLabels = () => (
    <div className="flex justify-center mb-12">
      <div className="grid grid-cols-3 gap-8 text-center max-w-2xl">
        <div className={`${currentStep >= 1 ? 'text-orange-500' : 'text-gray-400'}`}>
          <p className="font-semibold">Pilih Bengkel</p>
          <p className="text-sm">Bengkel terdekat</p>
        </div>
        <div className={`${currentStep >= 2 ? 'text-orange-500' : 'text-gray-400'}`}>
          <p className="font-semibold">Data Diri</p>
          <p className="text-sm">Info motor & keperluan</p>
        </div>
        <div className={`${currentStep >= 3 ? 'text-orange-500' : 'text-gray-400'}`}>
          <p className="font-semibold">Konfirmasi</p>
          <p className="text-sm">Antrian & estimasi</p>
        </div>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
        Pilih Bengkel Terdekat
      </h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {nearbyWorkshops.map((workshop) => (
          <div 
            key={workshop.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105"
            onClick={() => handleWorkshopSelect(workshop)}
          >
            <div className="h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
              <svg className="w-16 h-16 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-800">{workshop.name}</h3>
                <div className="flex items-center bg-green-100 px-2 py-1 rounded-full">
                  <svg className="w-4 h-4 text-green-600 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-green-600 font-semibold text-sm">{workshop.rating}</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-3">{workshop.address}</p>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-orange-600 font-semibold">{workshop.distance}</span>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Antrian saat ini</p>
                  <p className="font-bold text-gray-800">{workshop.currentQueue} orang</p>
                </div>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-600 mb-1">Estimasi waktu tunggu:</p>
                <p className="font-bold text-orange-600">{workshop.estimatedWait}</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {workshop.services.slice(0, 3).map((service, index) => (
                  <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {service}
                  </span>
                ))}
                {workshop.services.length > 3 && (
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    +{workshop.services.length - 3} lainnya
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
        Lengkapi Data Diri
      </h2>
      
      {selectedWorkshop && (
        <div className="bg-orange-50 rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-gray-800 mb-2">Bengkel Terpilih:</h3>
          <p className="text-orange-600 font-semibold">{selectedWorkshop.name}</p>
          <p className="text-gray-600 text-sm">{selectedWorkshop.address}</p>
        </div>
      )}
      
      <form onSubmit={handleUserDetailsSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Nama Lengkap</label>
          <input
            type="text"
            value={userDetails.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Masukkan nama lengkap Anda"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Nomor Telepon</label>
          <input
            type="tel"
            value={userDetails.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Contoh: 08123456789"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Merk Motor</label>
            <select
              value={userDetails.motorBrand}
              onChange={(e) => handleInputChange('motorBrand', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            >
              <option value="">Pilih Merk</option>
              <option value="Honda">Honda</option>
              <option value="Yamaha">Yamaha</option>
              <option value="Suzuki">Suzuki</option>
              <option value="Kawasaki">Kawasaki</option>
              <option value="TVS">TVS</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Model Motor</label>
            <input
              type="text"
              value={userDetails.motorModel}
              onChange={(e) => handleInputChange('motorModel', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Contoh: Vario 150"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Keperluan / Keluhan</label>
          <textarea
            value={userDetails.issue}
            onChange={(e) => handleInputChange('issue', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent h-32"
            placeholder="Jelaskan masalah atau keperluan service motor Anda..."
            required
          />
        </div>
        
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-colors duration-300"
          >
            Kembali
          </button>
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300"
          >
            Lanjutkan
          </button>
        </div>
      </form>
    </div>
  );

  const renderStep3 = () => (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
        Konfirmasi Booking
      </h2>
      
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Booking Berhasil!</h3>
          <p className="text-gray-600">Booking ID: #BK{Date.now().toString().slice(-6)}</p>
        </div>
        
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h4 className="font-bold text-gray-800 mb-2">Detail Bengkel</h4>
            <p className="font-semibold text-orange-600">{selectedWorkshop?.name}</p>
            <p className="text-gray-600">{selectedWorkshop?.address}</p>
            <p className="text-sm text-gray-500">Jarak: {selectedWorkshop?.distance}</p>
          </div>
          
          <div className="border-b pb-4">
            <h4 className="font-bold text-gray-800 mb-2">Data Customer</h4>
            <p><span className="font-semibold">Nama:</span> {userDetails.name}</p>
            <p><span className="font-semibold">Telepon:</span> {userDetails.phone}</p>
            <p><span className="font-semibold">Motor:</span> {userDetails.motorBrand} {userDetails.motorModel}</p>
            <p><span className="font-semibold">Keperluan:</span> {userDetails.issue}</p>
          </div>
          
          <div className="bg-orange-50 rounded-xl p-6">
            <h4 className="font-bold text-gray-800 mb-4">Informasi Antrian</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{selectedWorkshop?.currentQueue + 1}</p>
                <p className="text-sm text-gray-600">Posisi Antrian</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{selectedWorkshop?.estimatedWait}</p>
                <p className="text-sm text-gray-600">Estimasi Tunggu</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-6">
            <h4 className="font-bold text-gray-800 mb-2">Saran Waktu Kedatangan</h4>
            <p className="text-blue-600 font-semibold">
              {new Date(Date.now() + (parseInt(selectedWorkshop?.estimatedWait) || 45) * 60000).toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit'
              })} - {new Date(Date.now() + ((parseInt(selectedWorkshop?.estimatedWait) || 45) + 15) * 60000).toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Datang pada waktu ini untuk menghindari antrian panjang
            </p>
          </div>
        </div>
        
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => {
              setCurrentStep(1);
              setSelectedWorkshop(null);
              setUserDetails({
                name: "",
                motorBrand: "",
                motorModel: "",
                issue: "",
                phone: ""
              });
            }}
            className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-colors duration-300"
          >
            Booking Lagi
          </button>
          <Link to="/" className="flex-1">
            <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300">
              Kembali ke Beranda
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-orange-100 to-red-200 bg-clip-text text-transparent">
                Booking
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 bg-clip-text text-transparent">
                Service Motor
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
              Pilih bengkel terdekat dan booking service motor Anda dengan mudah
            </p>
          </div>
          
          {renderStepIndicator()}
          {renderStepLabels()}
          
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </div>
        </div>
      </div>
    </div>
  );
}