import { useState, useEffect } from 'react';

interface QuantityData {
  id: number;
  quantity: number;
}

const useFetchQuantities = () => {
  const [quantities, setQuantities] = useState<QuantityData[]>([]);
  const [prevQuantities, setPrevQuantities] = useState<QuantityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/attendances/recent');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
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

  return { quantities, prevQuantities, loading, error };
};

export default useFetchQuantities;
