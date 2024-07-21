import { useState, useEffect, useCallback } from 'react';

const useFileChanges = () => {
  const [changes, setChanges] = useState([]);

  const handleFileChange = useCallback((data) => {
    if (Array.isArray(data)) {
      setChanges(prevChanges => [...prevChanges, ...data]);
    } else if (data.changes && Array.isArray(data.changes)) {
      setChanges(prevChanges => [...prevChanges, ...data.changes]);
    } else {
      console.error('Invalid data format in handleFileChange:', data);
    }
  }, []);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8001/ws');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      handleFileChange(data);
    };

    return () => {
      ws.close();
    };
  }, [handleFileChange]);

  return { changes, handleFileChange };
};

export default useFileChanges;