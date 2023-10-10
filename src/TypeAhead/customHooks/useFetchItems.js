import { useEffect } from "react";
import { getItemsFromAPI } from "../api/api";

const DEBOUNCE_WAIT_TIME = 500;

const useFetchItems = (
  inputValue,
  setSuggestions,
  setIsLoading,
  setShowSuggestions,
  selectedItems,
  multipleSelections
) => {
  let debounceTimer;

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
        const data = await getItemsFromAPI('https://test.com/', inputValue);

        const matchingItems = data.filter((suggestion) => !selectedItems.some(item => item.id === suggestion.id));
  
        setSuggestions(matchingItems);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(fetchSuggestions, DEBOUNCE_WAIT_TIME);

    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [inputValue, setSuggestions, setIsLoading, setShowSuggestions, selectedItems, multipleSelections]);
};

export default useFetchItems;
