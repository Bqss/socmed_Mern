import React, { useEffect, useState } from 'react'

const useLocalStorage = (name: string) => {
  const [data, setData] = useState<string| null>();
  useEffect(() => {
    const result = localStorage.getItem(name);
    setData(result);
  },[])

  return data;
}

export default useLocalStorage