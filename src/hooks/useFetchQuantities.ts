import { useState, useEffect } from 'react';
import healthUnitData from '../data/healthUnitData.json';

interface QuantityData {
  id: number;
  quantity: number;
}

interface ChangeData {
  time: string;
  unitName: string;
  oldQuantity: number;
  newQuantity: number;
}

const useFetchQuantities = () => {
  const [quantities, setQuantities] = useState<QuantityData[]>([]);
  const [prevQuantities, setPrevQuantities] = useState<QuantityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [changes, setChanges] = useState<ChangeData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/attendances/recent');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Calculate changes
        const newChanges: ChangeData[] = [];
        data.forEach((newQuantity: QuantityData) => {
          const prevQuantity = quantities.find(q => q.id === newQuantity.id);
          if (prevQuantity && newQuantity.quantity !== prevQuantity.quantity) {
            const time = new Date().toLocaleTimeString();
            newChanges.push({
              time,
              unitName: healthUnitData.find(unit => unit.Id === newQuantity.id)?.Name || 'Unknown',
              oldQuantity: prevQuantity.quantity,
              newQuantity: newQuantity.quantity
            });
          }
        });

        setChanges(prev => [...newChanges, ...prev]); // Append new changes
        setPrevQuantities(quantities); // Update previous quantities before setting new ones
        setQuantities(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 30000); // Fetch every minute

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [quantities]);

  return { quantities, prevQuantities, loading, error, changes };
};

export default useFetchQuantities;