import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Suggestions from './Suggestions';

describe('Suggestions', () => {
  it('should render loading message when isLoading is true', () => {
    const { getByText } = render(<Suggestions suggestions={[]} isLoading={true} />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('should render suggestions when not loading and suggestions are provided', () => {
    const suggestions = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];

    const { getByText } = render(<Suggestions suggestions={suggestions} isLoading={false} />);

    suggestions.forEach((suggestion) => {
      expect(getByText(suggestion.name)).toBeInTheDocument();
    });
  });

  it('should handle arrow keys and Enter key correctly', () => {
    const suggestions = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ];

    const onHandleSelect = jest.fn();
    const setSuggestions = jest.fn();
    const setInputValue = jest.fn();

    const { getByText } = render(
      <Suggestions suggestions={suggestions} isLoading={false} onHandleSelect={onHandleSelect} setSuggestions={setSuggestions} setInputValue={setInputValue} />
    );

    const suggestion1 = getByText('Item 1');
    const suggestion2 = getByText('Item 2');
    const suggestion3 = getByText('Item 3');

    fireEvent.focus(suggestion1);

    fireEvent.keyDown(suggestion1, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(suggestion2);

    fireEvent.keyDown(suggestion2, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(suggestion1);

    fireEvent.keyDown(suggestion1, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(suggestion2);

    fireEvent.keyDown(suggestion2, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(suggestion3);

    fireEvent.keyDown(suggestion3, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(suggestion3);

    fireEvent.keyDown(suggestion3, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(suggestion2);

    fireEvent.keyDown(suggestion2, { key: 'Enter' });
    expect(onHandleSelect).toHaveBeenCalledWith(suggestions[1]);
    expect(setSuggestions).toHaveBeenCalledWith([]);
    expect(setInputValue).toHaveBeenCalledWith('');
  });
});
