import { useState, useEffect } from 'react';
import api, { userApi } from '../utils/api';
import { toast } from 'sonner';

const ConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState({
    api: 'Checking...',
    database: 'Checking...'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const testConnection = async () => {
      try {
        setIsLoading(true);
        // Create a health check endpoint if it doesn't exist
        const response = await api.get(`${userApi}/health`);
        
        if (response.data.success) {
          setConnectionStatus({
            api: 'Connected',
            database: response.data.database ? 'Connected' : 'Failed'
          });
          toast.success('Connection successful!');
        } else {
          setConnectionStatus({
            api: 'Connected',
            database: 'Failed'
          });
          toast.error('Database connection failed');
        }
      } catch (error) {
        console.error('Connection test failed:', error);
        setConnectionStatus({
          api: 'Failed',
          database: 'Unknown'
        });
        toast.error('API connection failed');
      } finally {
        setIsLoading(false);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span>API Connection:</span>
          <span className={`px-2 py-1 rounded text-sm ${
            connectionStatus.api === 'Connected' 
              ? 'bg-green-100 text-green-800' 
              : connectionStatus.api === 'Checking...' 
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
          }`}>
            {connectionStatus.api}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Database Connection:</span>
          <span className={`px-2 py-1 rounded text-sm ${
            connectionStatus.database === 'Connected' 
              ? 'bg-green-100 text-green-800' 
              : connectionStatus.database === 'Checking...' 
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
          }`}>
            {connectionStatus.database}
          </span>
        </div>
      </div>
      {isLoading && (
        <div className="mt-4 flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  );
};

export default ConnectionTest; 