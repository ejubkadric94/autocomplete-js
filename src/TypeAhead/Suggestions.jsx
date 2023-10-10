import { Box } from "@mui/material";
import { useCallback, useMemo } from "react";

const Suggestions = ({ suggestions, onHandleSelect, setSuggestions, setInputValue, isLoading }) => {
  const suggestionRefs = useMemo(() => [], [suggestions]); // eslint-disable-line

  const handleKeyDown = useCallback((e, suggestion) => {
    const currentIndex = suggestionRefs.indexOf(e.target);

    if ((e.key === 'ArrowDown' || e.key === 'ArrowRight') && currentIndex < suggestionRefs.length - 1) {
      e.preventDefault();
      suggestionRefs[currentIndex + 1].focus();
    } else if ((e.key === 'ArrowUp' || e.key === 'ArrowLeft') && currentIndex > 0) {
      e.preventDefault();
      suggestionRefs[currentIndex - 1].focus();
    } else if (e.key === 'Enter') {
      onHandleSelect(suggestion);
      setSuggestions([]);
      setInputValue('');
    }
  }, [suggestionRefs, onHandleSelect, setSuggestions, setInputValue]);

  let content;
  if (isLoading || !suggestions.length) {
    content = <div>Loading...</div>
  } else {
    content = suggestions.map((suggestion) => (
      <Box
        key={suggestion.id}
        ref={(element) => suggestionRefs.push(element)}
        role="option"
        onClick={() => onHandleSelect(suggestion)}
        onKeyDown={(e) => handleKeyDown(e, suggestion)}
        tabIndex={0}
        component="li"
        sx={styles.listItem}
      >
        {suggestion.name}
      </Box>
    ));
  }

  return (
    <Box component="ul" id="suggestion-list" role="listbox" sx={styles.listContainer}>
      {content}
    </Box> 
  )
};

const styles = {
  listContainer: {
    maxHeight: '100px',
    overflowY: 'auto',
    margin: 0,
    padding: 0,
    border: 'solid 1px lightgrey'
  },
  listItem: {
    cursor: 'pointer',
    padding: '2px 0 2px 4px',
    '&:hover': {
      background: 'lightgrey'
    }
  }
}

export default Suggestions;
