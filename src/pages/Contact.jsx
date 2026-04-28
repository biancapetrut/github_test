import { useEffect, useState } from "react";
import Header from "../components/Header";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";

const normalIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -30],
});

const activeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
  iconSize: [48, 48],
  iconAnchor: [24, 44],
  popupAnchor: [0, -40],
});

const DEFAULT_VIEW = {
  position: [45.9432, 24.9668],
  zoom: 6,
};

function FixMapResize() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 0);
  }, [map]);
  return null;
}

function MapCenterer({ activeCity }) {
  const map = useMap();

  useEffect(() => {
    if (!activeCity) {
      map.flyTo(DEFAULT_VIEW.position, DEFAULT_VIEW.zoom, {
        animate: true,
        duration: 1,
      });
      return;
    }

    map.flyTo(activeCity.position, activeCity.zoom, {
      animate: true,
      duration: 1.25,
    });
  }, [activeCity, map]);

  return null;
}


const CARD_COLORS = [
  "bg-sunny-yellow",
  "bg-berry-pink",
  "bg-grass-green",
  "bg-sky-blue",
  "bg-berry-pink",
  "bg-sunny-yellow",
];

export default function Contact() {
  const [locations, setLocations] = useState([]);
  const [activeCity, setActiveCity] = useState(null);
  const [hoveredCity, setHoveredCity] = useState(null);

  useEffect(() => {
    fetch("/data/locations.json")
      .then((res) => res.json())
      .then((data) => setLocations(data));
  }, []);

  return (
    <div className="h-screen bg-sky-blue paper-texture flex flex-col">
      <Header />

      <div className="shrink-0 px-10 py-4">
        <h1 className="font-display font-black text-4xl mb-1">
          Contactează‑ne!
        </h1>
        <p className="font-handwriting text-lg opacity-70">
          Ne găsești în mai multe orașe din România:
        </p>
      </div>

      <div className="flex-grow grid grid-cols-2 gap-10 px-8 pb-4 min-h-0 overflow-hidden">
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 h-full min-h-0 pt-4">
          {locations.slice(0, 6).map((loc, index) => (
            <div
              key={loc.city}
              onMouseEnter={() => setHoveredCity(loc.city)}
              onMouseLeave={() => setHoveredCity(null)}
              onClick={() =>
                setActiveCity({
                  city: loc.city,
                  position: loc.position,
                  zoom: 11,
                })
              }
              className={`
                cursor-pointer
                max-h-[200px]
                max-w-[300px]
                rounded-wiggly
                sketch-border
                flex flex-col items-center justify-center
                text-center
                p-2
                transition
                hover:-translate-y-2
                hover:shadow-xl
                ${
                  hoveredCity === loc.city || activeCity?.city === loc.city
                    ? "ring-4 ring-black/30"
                    : ""
                }
                ${CARD_COLORS[index % CARD_COLORS.length]}
              `}
            >
              <div className="text-4xl mb-2">🏠</div>
              <h3 className="font-display font-black text-xl mb-1">
                {loc.city}
              </h3>
              <p className="font-sketch text-lg opacity-80 mb-2">
                {loc.address}
              </p>
              <div className="font-sketch text-sm space-y-1">
                <div>📞 {loc.phone}</div>
                <div>✉️ {loc.email}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-full min-h-0 rounded-wiggly overflow-hidden sketch-border relative">
          {activeCity && (
            <button
              onClick={() => setActiveCity(null)}
              className="
                absolute
                top-4
                right-4
                z-[1000]
                bg-white
                rounded-full
                px-4
                py-2
                text-sm
                font-bold
                font-sans
                shadow-lg
                hover:bg-gray-100
                transition
              "
            >
              Resetează harta
            </button>
          )}

          <MapContainer
            center={DEFAULT_VIEW.position}
            zoom={DEFAULT_VIEW.zoom}
            className="h-full w-full"
          >
            <FixMapResize />
            <MapCenterer activeCity={activeCity} />

            <TileLayer
              attribution="© OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {locations.map((loc) => (
              <Marker
                key={loc.city}
                position={loc.position}
                icon={
                  hoveredCity === loc.city || activeCity?.city === loc.city
                    ? activeIcon
                    : normalIcon
                }
                eventHandlers={{
                  click: () =>
                    setActiveCity({
                      city: loc.city,
                      position: loc.position,
                      zoom: 13,
                    }),
                  mouseover: () => setHoveredCity(loc.city),
                  mouseout: () => setHoveredCity(null),
                }}
              >
                <Popup>
                  <strong>{loc.city}</strong>
                  <br />
                  {loc.address}
                  <br />
                  📞 {loc.phone}
                  <br />
                  ✉️ {loc.email}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      <footer className="w-full text-center py-4 font-sketch text-sm opacity-60 border-t border-ink-black/10">
        © 2026 PawPort • Din suflet, pentru animale. 🐾
      </footer>
    </div>
  );
}