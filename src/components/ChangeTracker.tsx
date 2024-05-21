import React, { useState } from 'react';
import '../styles/ChangeTracker.css';

interface ChangeTrackerProps {
  changes: { time: string, unitName: string, oldQuantity: number, newQuantity: number }[];
}

const ChangeTracker: React.FC<ChangeTrackerProps> = ({ changes }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className={`change-tracker ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      <div className="toggle-button" onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? 'Mostrar registro de dispensações' : 'Esconder registro de dispensações'}
      </div>
      {!isCollapsed && (
        <div className="changes-list">
          {changes.map((change, index) => (
            <div key={index} className="change-item">
              {`${change.time}: ${change.unitName} teve novas dispensações -> Antes: ${change.oldQuantity} -> Agora: ${change.newQuantity}`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChangeTracker;
