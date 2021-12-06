import { useState, useEffect } from "react";

function useDropdown(currentHeader, currentOptions) {
  const [header, setHeader] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setHeader(currentHeader);
    setOptions(currentOptions);
  }, [currentHeader, currentOptions]);

  return { header, options };
}

export default useDropdown;
