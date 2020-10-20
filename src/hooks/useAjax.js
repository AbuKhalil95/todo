import { useState, useEffect } from 'react';

const useAjax = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      fetch(todoAPI, 
        {
          method: 'get', 
          mode: 'cors',
        })
        .then(data => data.json())
        .then(data => setData(data));
      setIsLoading(false);
    }
    
    fetchData();
  }, [])

  return { data, isLoading }
}

export default useAjax;