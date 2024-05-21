import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-color-markers';
import { HealthUnitEntity } from '../entities/HealthUnitEntity';
import useIconTransition from '../hooks/useIconTransition'; 
import '../styles/HealthUnitMarker.css';

const originalIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

interface HealthUnitMarkerProps {
  unit: HealthUnitEntity;
  quantity: number | 'N/A';
  prevQuantity: number | 'N/A';
}

const HealthUnitMarker: React.FC<HealthUnitMarkerProps> = ({ unit, quantity, prevQuantity }) => {
  const { icon, fadeClass } = useIconTransition(quantity, prevQuantity, unit.Name, originalIcon, greenIcon);

  return (
    <div className={fadeClass}>
      <Marker position={unit.Coordinates} icon={icon}>
        <Popup>
          UBS {unit.Name}<br />
          Atendimentos farmacêuticos hoje: {quantity}
        </Popup>
      </Marker>
    </div>
  );
};

export default HealthUnitMarker;
