import { useEffect, useState } from 'react';

const useFetch = (url, option = { method: 'GET' }) => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetch(url, option)
      .then(res => res.json())
      .then(data => setInfo(data));
  }, []);

  return info;
};

export default useFetch;
