import { useState, useEffect } from 'react';
import { getConfig, updateConfig } from '../services/config';

export const useConfig = () => {
  const [configData, setConfigData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const data = await getConfig();
        setConfigData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  const saveConfig = async (newConfig) => {
    setLoading(true);
    try {
      const updatedConfig = await updateConfig(newConfig);
      setConfigData(updatedConfig);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { configData, loading, error, saveConfig };
};
