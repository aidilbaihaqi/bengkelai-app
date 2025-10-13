import { useEffect, useRef, useState } from 'react';

const LeafletMap = ({ userLocation, onLocationUpdate }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mapRef.current || mapInstanceRef.current) return;

    const initializeMap = async () => {
      try {
        // Load Leaflet CSS dynamically
        if (!document.querySelector('link[href*="leaflet.css"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(link);
        }
        
        // Dynamic import Leaflet
        const L = (await import('leaflet')).default;
        
        // Fix for default markers in Leaflet
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        // Initialize map
        const map = L.map(mapRef.current).setView(
          [userLocation?.lat || -6.2088, userLocation?.lng || 106.8456], 
          13
        );

    // Add dark theme tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors © CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    mapInstanceRef.current = map;

    // Dark theme is handled by CSS file

    // Clear existing markers
    markersRef.current.forEach(marker => {
      map.removeLayer(marker);
    });
    markersRef.current = [];

    // Add user location marker
    const userIcon = L.divIcon({
      html: `
        <div style="
          width: 20px;
          height: 20px;
          background-color: #3b82f6;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        "></div>
      `,
      className: 'user-location-marker',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    const userMarker = L.marker(
      [userLocation?.lat || -6.2088, userLocation?.lng || 106.8456],
      { icon: userIcon }
    ).addTo(map);
    
    userMarker.bindPopup('Lokasi Anda');
    markersRef.current.push(userMarker);

    // Sample workshop data
    const workshops = [
      {
        id: 1,
        name: "Bengkel Motor Jaya",
        address: "Jl. Sudirman No. 123, Jakarta Pusat",
        rating: 4.5,
        distance: "0.8 km",
        phone: "021-12345678",
        services: ["Service Rutin", "Ganti Oli", "Tune Up"],
        position: { 
          lat: (userLocation?.lat || -6.2088) + 0.01, 
          lng: (userLocation?.lng || 106.8456) + 0.01 
        }
      },
      {
        id: 2,
        name: "Motor Service Pro",
        address: "Jl. Thamrin No. 456, Jakarta Pusat",
        rating: 4.8,
        distance: "1.2 km",
        phone: "021-87654321",
        services: ["Perbaikan Mesin", "Ganti Ban", "Service AC"],
        position: { 
          lat: (userLocation?.lat || -6.2088) - 0.01, 
          lng: (userLocation?.lng || 106.8456) + 0.015 
        }
      },
      {
        id: 3,
        name: "Bengkel Specialist",
        address: "Jl. Gatot Subroto No. 789, Jakarta Selatan",
        rating: 4.3,
        distance: "2.1 km",
        phone: "021-11223344",
        services: ["Modifikasi", "Cat Ulang", "Upgrade Performa"],
        position: { 
          lat: (userLocation?.lat || -6.2088) + 0.015, 
          lng: (userLocation?.lng || 106.8456) - 0.01 
        }
      }
    ];

    // Add workshop markers
    workshops.forEach(workshop => {
      const workshopIcon = L.divIcon({
        html: `
          <div style="
            width: 30px;
            height: 30px;
            background-color: #ef4444;
            border: 2px solid white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          ">
            <span style="color: white; font-size: 12px; font-weight: bold;">🔧</span>
          </div>
        `,
        className: 'workshop-marker',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const marker = L.marker([workshop.position.lat, workshop.position.lng], {
        icon: workshopIcon
      }).addTo(map);

      const popupContent = `
        <div style="color: white; min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; color: #3b82f6;">${workshop.name}</h3>
          <p style="margin: 4px 0; font-size: 12px;">${workshop.address}</p>
          <div style="display: flex; justify-content: space-between; margin: 8px 0;">
            <span style="color: #fbbf24;">⭐ ${workshop.rating}</span>
            <span style="color: #10b981;">${workshop.distance}</span>
          </div>
          <p style="margin: 4px 0; font-size: 12px;">📞 ${workshop.phone}</p>
          <div style="margin-top: 8px;">
            <strong style="font-size: 12px;">Layanan:</strong>
            <ul style="margin: 4px 0; padding-left: 16px; font-size: 11px;">
              ${workshop.services.map(service => `<li>${service}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      markersRef.current.push(marker);

      // Add click handler to update selected workshop
      marker.on('click', () => {
        if (onLocationUpdate) {
          onLocationUpdate(workshop);
        }
      });
    });

        setIsLoading(false);
      } catch (error) {
        console.error('Error loading map:', error);
        setIsLoading(false);
      }
    };

    initializeMap();

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isClient, userLocation, onLocationUpdate]);

  if (!isClient) {
    return (
      <div 
        style={{ 
          height: '400px', 
          width: '100%', 
          borderRadius: '8px',
          backgroundColor: '#1e293b'
        }}
        className="flex items-center justify-center"
      >
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto mb-2"></div>
          <p>Memuat peta...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div 
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: '400px', 
            width: '100%', 
            borderRadius: '8px',
            backgroundColor: '#1e293b',
            zIndex: 1000
          }}
          className="flex items-center justify-center"
        >
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto mb-2"></div>
            <p>Memuat peta...</p>
          </div>
        </div>
      )}
      <div 
        ref={mapRef} 
        style={{ 
          height: '400px', 
          width: '100%', 
          borderRadius: '8px',
          overflow: 'hidden'
        }}
        className="leaflet-map-container"
      />
    </div>
  );
};

export default LeafletMap;