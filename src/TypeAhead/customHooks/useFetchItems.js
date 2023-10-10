import { useEffect, useRef } from "react";
import { getItemsFromAPI } from "../api/api";

const DEBOUNCE_WAIT_TIME = 500;

const apiCache = {};

const getItemsFromAPIWithCache = async (apiUrl, inputValue) => {
  const cacheKey = `${apiUrl}${inputValue}`;
  
  if (apiCache[cacheKey]) {
    console.log('Cache found for key: ', cacheKey);
    return apiCache[cacheKey];
  }

  console.log('No cache found, making a request...');
  const data = await getItemsFromAPI(apiUrl, inputValue);

  apiCache[cacheKey] = data;

  return data;
};

const useFetchItems = (
  inputValue,
  setSuggestions,
  setIsLoading,
  setShowSuggestions,
  selectedItems,
  multipleSelections
) => {
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    if (!multipleSelections && selectedItems.length) {
      return;
    }

    const fetchSuggestions = async () => {
      if (!inputValue.trim().length) {
        setSuggestions([]);
        setIsLoading(false);
        setShowSuggestions(false);
        return;
      }

      setIsLoading(true);
      setShowSuggestions(true);

      try {
        const data = await getItemsFromAPIWithCache('https://test.com/name=', inputValue);

        const matchingItems = data.filter((suggestion) => !selectedItems.some(item => item.id === suggestion.id));
  
        setSuggestions(matchingItems);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(fetchSuggestions, DEBOUNCE_WAIT_TIME);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [inputValue, setSuggestions, setIsLoading, setShowSuggestions, selectedItems, multipleSelections]);
};

export default useFetchItems;
