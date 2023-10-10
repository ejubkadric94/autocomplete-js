import { useEffect } from "react";
import { getItemsFromAPI } from "../api/api";

const useFetchItems = (
  inputValue,
  setSuggestions,
  setIsLoading,
  setShowSuggestions,
  selectedItems,
  multipleSelections
) => {
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

    fetchSuggestions();
  }, [inputValue, setSuggestions, setIsLoading, setShowSuggestions, selectedItems, multipleSelections]);
};

export default useFetchItems;
