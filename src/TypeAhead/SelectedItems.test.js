import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For custom matchers like toBeInTheDocument
import SelectedItems from './SelectedItems';

describe('SelectedItems', () => {
  it('should not render when no selected items', () => {
    const { queryByText } = render(<SelectedItems selectedItems={[]} />);

    expect(queryByText('Selected items:')).not.toBeInTheDocument();
  });

  it('should render selected items', () => {
    const selectedItems = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];

    const { getByText } = render(<SelectedItems selectedItems={selectedItems} />);

    expect(getByText('Selected items:')).toBeInTheDocument();
    expect(getByText('Item 1')).toBeInTheDocument();
    expect(getByText('Item 2')).toBeInTheDocument();
  });

  it('should render selected items as chips', () => {
    const selectedItems = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];

    const { getByText, getAllByRole } = render(<SelectedItems selectedItems={selectedItems} />);

    expect(getByText('Selected items:')).toBeInTheDocument();

    const chipElements = getAllByRole('listitem'); // Find all list items

    expect(chipElements.length).toBe(selectedItems.length);

    selectedItems.forEach((item, index) => {
      expect(chipElements[index]).toHaveTextContent(item.name);
    });
  });
});
