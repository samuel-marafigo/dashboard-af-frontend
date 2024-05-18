import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import '../styles/App.css';
import healthUnitData from '../data/healthUnitData.json';
import { HealthUnitEntity } from '../entities/HealthUnitEntity';

function App() {
  const healthUnitEstablishments: HealthUnitEntity[] = healthUnitData.map(unit => ({
    Id: unit.Id,
    Name: unit.Name,
    Coordinates: unit.Coordinates as [number, number]
  }));

  return (
    <MapContainer center={[-25.5394, -49.1997]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {healthUnitEstablishments.map((unit) => (
        <Marker key={unit.Id} position={unit.Coordinates}>
          <Popup>
            {unit.Name}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default App;