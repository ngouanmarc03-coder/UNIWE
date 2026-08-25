import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

const FRANCE_CENTER = [46.6, 2.5];

function ClickCatcher({ onPick }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function LocationPicker({ lat, lng, onPick }) {
  const center = lat && lng ? [lat, lng] : FRANCE_CENTER;

  return (
    <div className="h-64 rounded-none overflow-hidden border border-ink/10">
      <MapContainer center={center} zoom={lat ? 13 : 5} className="w-full h-full">
        <TileLayer
          attribution='Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          maxZoom={19}
        />
        <TileLayer
          attribution='&copy; OpenStreetMap contributors, &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />
        <ClickCatcher onPick={onPick} />
        {lat && lng && <Marker position={[lat, lng]} />}
      </MapContainer>
    </div>
  );
}
