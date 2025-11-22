import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

const OpenStreetMap = ({ workshops = [], onMarkerClick, onLocationSelect, className = "", center, zoom = 13 }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const userLocationMarkerRef = useRef(null);

  const onResizeRef = useRef(null);
  const onVisibilityRef = useRef(null);
  const roRef = useRef(null);

  useEffect(() => {
    const initMap = async () => {
      if (typeof window === 'undefined') return;
      
      try {
        const Leaflet = await import('leaflet');
        const L = Leaflet.default || Leaflet;
        
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjUgMEMxOS40MDM2IDAgMjUgNS41OTY0NCAyNSAxMi41QzI1IDE5LjQwMzYgMTkuNDAzNiAyNSAxMi41IDI1QzUuNTk2NDQgMjUgMCAxOS40MDM2IDAgMTIuNUMwIDUuNTk2NDQgNS41OTY0NCAwIDEyLjUgMFoiIGZpbGw9IiNGRjQ0NDQiLz4KPHBhdGggZD0iTTEyLjUgNEM5LjQ2MjQ0IDQgNyA2LjQ2MjQ0IDcgOS41QzcgMTIuNTM3NiA5LjQ2MjQ0IDE1IDEyLjUgMTVDMTUuNTM3NiAxNSAxOCAxMi41Mzc2IDE4IDkuNUMxOCA2LjQ2MjQ0IDE1LjUzNzYgNCAxMi41IDRaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTIuNSAyNUwxMi41IDQxIiBzdHJva2U9IiNGRjQ0NDQiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K',
          iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjUgMEMxOS40MDM2IDAgMjUgNS41OTY0NCAyNSAxMi41QzI1IDE5LjQwMzYgMTkuNDAzNiAyNSAxMi41IDI1QzUuNTk2NDQgMjUgMCAxOS40MDM2IDAgMTIuNUMwIDUuNTk2NDQgNS41OTY0NCAwIDEyLjUgMFoiIGZpbGw9IiNGRjQ0NDQiLz4KPHBhdGggZD0iTTEyLjUgNEM5LjQ2MjQ0IDQgNyA2LjQ2MjQ0IDcgOS41QzcgMTIuNTM3NiA5LjQ2MjQ0IDE1IDEyLjUgMTVDMTUuNTM3NiAxNSAxOCAxMi41Mzc2IDE4IDkuNUMxOCA2LjQ2MjQ0IDE1LjUzNzYgNCAxMi41IDRaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTIuNSAyNUwxMi41IDQxIiBzdHJva2U9IiNGRjQ0NDQiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K',
          shadowUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDEiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MSA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGVsbGlwc2UgY3g9IjIwLjUiIGN5PSIyMC41IiByeD0iMjAuNSIgcnk9IjIwLjUiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuMyIvPgo8L3N2Zz4K',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });

        // Hapus map yang sudah ada jika ada
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
        }

        // Buat map baru
        const map = L.map(mapRef.current, {
          center: center ? [center.lat, center.lng] : [-6.2088, 106.8456],
          zoom: zoom,
          zoomControl: true,
          scrollWheelZoom: true,
          doubleClickZoom: true,
          dragging: true
        });

        // Tambahkan tile layer OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19
        }).addTo(map);

        mapInstanceRef.current = map;
        requestAnimationFrame(() => {
          try { map.invalidateSize(); } catch {}
        });
        setTimeout(() => {
          try { map.invalidateSize(); } catch {}
        }, 300);

        const onResize = () => {
          try { map.invalidateSize(); } catch {}
        };
        onResizeRef.current = onResize;
        window.addEventListener('resize', onResize);
        window.addEventListener('orientationchange', onResize);

        const onVisibility = () => {
          if (!document.hidden) {
            try { map.invalidateSize(); } catch {}
          }
        };
        onVisibilityRef.current = onVisibility;
        document.addEventListener('visibilitychange', onVisibility);

        let ro;
        try {
          ro = new ResizeObserver(() => {
            try { map.invalidateSize(); } catch {}
          });
          roRef.current = ro;
          if (mapRef.current) ro.observe(mapRef.current);
        } catch {}

        // Tambahkan event listener untuk klik pada peta (untuk memilih lokasi)
        if (onLocationSelect) {
          map.on('click', (e) => {
            const { lat, lng } = e.latlng;
            
            // Hapus marker lokasi user sebelumnya jika ada
            if (userLocationMarkerRef.current) {
              map.removeLayer(userLocationMarkerRef.current);
            }
            
            // Buat marker untuk lokasi yang dipilih user
            const userIcon = L.divIcon({
              html: `
                <div style="
                  background-color: #10b981;
                  width: 35px;
                  height: 35px;
                  border-radius: 50%;
                  border: 4px solid white;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 18px;
                  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
                  animation: pulse 2s infinite;
                ">📍</div>
                <style>
                  @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                  }
                </style>
              `,
              className: 'custom-user-location-marker',
              iconSize: [35, 35],
              iconAnchor: [17.5, 17.5]
            });
            
            // Tambahkan marker lokasi user
            userLocationMarkerRef.current = L.marker([lat, lng], { icon: userIcon }).addTo(map);
            
            // Tambahkan popup untuk konfirmasi lokasi
            userLocationMarkerRef.current.bindPopup(`
              <div class="p-3 text-center">
                <h3 class="font-bold text-gray-900 mb-2">📍 Lokasi Anda</h3>
                <p class="text-sm text-gray-600 mb-3">Lat: ${lat.toFixed(6)}<br>Lng: ${lng.toFixed(6)}</p>
                <button 
                  onclick="window.confirmLocation(${lat}, ${lng})" 
                  class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Konfirmasi Lokasi
                </button>
              </div>
            `).openPopup();
            
            // Buat fungsi global untuk konfirmasi lokasi
            window.confirmLocation = (lat, lng) => {
              onLocationSelect({
                lat: lat,
                lng: lng,
                address: `Lokasi: ${lat.toFixed(6)}, ${lng.toFixed(6)}`
              });
            };
          });
        }

        markersRef.current.forEach(marker => {
          map.removeLayer(marker);
        });
        markersRef.current = [];

        // Tambahkan marker untuk setiap workshop
        workshops.forEach((workshop, index) => {
          const fallbackLat = (center?.lat ?? -6.2088) + (Math.random() - 0.5) * 0.05;
          const fallbackLng = (center?.lng ?? 106.8456) + (Math.random() - 0.5) * 0.05;
          const lat = workshop.lat ?? fallbackLat;
          const lng = workshop.lng ?? fallbackLng;

          // Buat custom icon berdasarkan warna workshop
          const customIcon = L.divIcon({
            html: `
              <div style="
                background-color: ${workshop.color || '#ef4444'};
                width: 30px;
                height: 30px;
                border-radius: 50%;
                border: 3px solid white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              ">🏪</div>
            `,
            className: 'custom-workshop-marker',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          });

          const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

          // Buat popup content
          const popupContent = `
            <div class="p-3 max-w-xs">
              <h3 class="font-bold text-gray-900 mb-1">${workshop.name}</h3>
              <p class="text-sm text-gray-600 mb-2">${workshop.address || 'Alamat tidak tersedia'}</p>
              <div class="flex items-center gap-2 mb-2">
                <span class="text-yellow-500">⭐</span>
                <span class="text-sm font-medium">${workshop.rating || 'N/A'}</span>
                <span class="text-sm text-gray-500">• ${workshop.distance || 'N/A'}</span>
              </div>
              <div class="mb-2">
                <p class="text-sm font-medium text-gray-700 mb-1">Layanan:</p>
                <div class="flex flex-wrap gap-1">
                  ${(workshop.services || ['Service Umum']).map(service => 
                    `<span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">${service}</span>`
                  ).join('')}
                </div>
              </div>
              <p class="text-sm text-gray-600">📞 ${workshop.phone || 'Tidak tersedia'}</p>
              <p class="text-sm text-gray-600">💰 ${workshop.price || 'Hubungi untuk harga'}</p>
            </div>
          `;

          marker.bindPopup(popupContent);

          // Event listener untuk klik marker
          marker.on('click', () => {
            if (onMarkerClick) {
              onMarkerClick(workshop);
            }
          });

          markersRef.current.push(marker);
        });

        if (markersRef.current.length > 0) {
          const group = new L.featureGroup(markersRef.current);
          map.fitBounds(group.getBounds().pad(0.1));
          requestAnimationFrame(() => {
            try { map.invalidateSize(); } catch {}
          });
          setTimeout(() => {
            try { map.invalidateSize(); } catch {}
          }, 300);
        }

      } catch (error) {
        console.error('Error initializing OpenStreetMap:', error);
      }
    };

    initMap();

    return () => {
      try {
        if (onResizeRef.current) {
          window.removeEventListener('resize', onResizeRef.current);
          window.removeEventListener('orientationchange', onResizeRef.current);
        }
        if (onVisibilityRef.current) {
          document.removeEventListener('visibilitychange', onVisibilityRef.current);
        }
        if (roRef.current) roRef.current.disconnect();
      } catch {}
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      if (userLocationMarkerRef.current) {
        userLocationMarkerRef.current = null;
      }
    };
  }, [workshops, onMarkerClick, onLocationSelect, center, zoom]);

  return (
    <div 
      ref={mapRef} 
      className={`w-full h-full ${className}`}
      style={{ height: '100%' }}
    />
  );
};

export default OpenStreetMap;