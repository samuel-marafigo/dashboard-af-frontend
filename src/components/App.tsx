import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import '../styles/App.css';
import healthUnitData from '../data/healthUnitData.json';
import { HealthUnitEntity } from '../entities/HealthUnitEntity';
import useFetchQuantities from '../hooks/useFetchQuantities';
import HealthUnitMarker from './HealthUnitMarker';

const App: React.FC = () => {
  const { quantities, prevQuantities, loading, error } = useFetchQuantities();

  const healthUnitEstablishments: HealthUnitEntity[] = healthUnitData.map(unit => ({
    Id: unit.Id,
    Name: unit.Name,
    Coordinates: unit.Coordinates as [number, number]
  }));

  const getQuantity = (id: number) => {
    const unit = quantities.find(q => q.id === id);
    return unit ? unit.quantity : 'N/A';
  };

  const getPrevQuantity = (id: number) => {
    const unit = prevQuantities.find(q => q.id === id);
    return unit ? unit.quantity : 'N/A';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <MapContainer center={[-25.5394, -49.1997]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {healthUnitEstablishments.map((unit) => (
        <HealthUnitMarker
          key={unit.Id}
          unit={unit}
          quantity={getQuantity(unit.Id)}
          prevQuantity={getPrevQuantity(unit.Id)}
        />
      ))}
    </MapContainer>
  );
};

export default App;