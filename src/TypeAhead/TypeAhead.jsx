import React, { useState, useRef } from 'react';
import { Box } from '@mui/material';

import Popover from './Popover';
import Suggestions from './Suggestions';
import SelectedItems from './SelectedItems';
import useFetchItems from './customHooks/useFetchItems';

import './TypeAhead.css';

const Typeahead = ({ placeholder = 'Search for ...', onSelect, multipleSelections = true, className, ...props }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  useFetchItems(inputValue, setSuggestions, setIsLoading, setShowSuggestions, selectedItems, multipleSelections);
  
  const onHandleSelect = (suggestion) => {
    setSelectedItems([...selectedItems, suggestion]);
    onSelect(suggestion);
    setInputValue('');
    setShowSuggestions(false);
    inputRef.current.focus();
  };

  return (
    <Box sx={styles.container} >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        role="combobox"
        aria-haspopup="listbox"
        aria-autocomplete="list"
        aria-controls="suggestion-list"
        aria-expanded={showSuggestions}
        ref={inputRef}
        disabled={!multipleSelections && selectedItems.length === 1}
        className={className}
        {...props}
      />
      <Popover parentRef={inputRef} hide={!showSuggestions} onHide={() => setShowSuggestions(false)}>
        <Suggestions
          suggestions={suggestions}
          onHandleSelect={onHandleSelect}
          setSuggestions={setSuggestions}
          setInputValue={setInputValue}
          isLoading={isLoading}
        />
      </Popover>
      <SelectedItems selectedItems={selectedItems} />
    </Box>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    width: '100%'
  }
};

export default Typeahead;
