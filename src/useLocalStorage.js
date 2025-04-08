import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  let storedValue;
  
  // Try to retrieve and parse the value from localStorage
  try {
    storedValue = localStorage.getItem(key);
    console.log('Stored value from localStorage:', storedValue); // Debug log for value in localStorage

    if (storedValue === 'undefined') {
      storedValue = null;
    }

    // If there is no value in localStorage, fall back to initialValue
    storedValue = storedValue ? JSON.parse(storedValue) : initialValue;

  } catch (e) {
    console.error('Error parsing localStorage data', e); // Log any error that occurs while parsing
    storedValue = initialValue;
  }

  // State hook to manage the value
  const [value, setValue] = useState(storedValue);

  const setStoredValue = (newValue) => {
    try {
      console.log('Saving to localStorage:', newValue); // Debug log before saving
      const serializableValue = JSON.stringify(newValue);
      localStorage.setItem(key, serializableValue); // Save the value to localStorage
      setValue(newValue); // Update the state
    } catch (e) {
      console.error('Error saving to localStorage:', e); // Log if there's an error saving to localStorage
    }
  };

  return [value, setStoredValue];
};

export default useLocalStorage;
