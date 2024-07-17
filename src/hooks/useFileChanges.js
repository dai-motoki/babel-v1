import { useState, useEffect, useCallback } from 'react';

const useFileChanges = () => {
  const [changes, setChanges] = useState([]);

  const handleFileChange = useCallback((data) => {
    setChanges(prevChanges => [...prevChanges, ...data.changes]);
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