import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Popover from './Popover';

describe('Popover', () => {
  it('should render when not hidden', () => {
    const { getByText } = render(
      <Popover parentRef={{ current: document.createElement('div') }} hide={false} onHide={() => {}}>
        <div>Popover Content</div>
      </Popover>
    );

    expect(getByText('Popover Content')).toBeInTheDocument();
  });

  it('should not render when hidden', () => {
    const { queryByText } = render(
      <Popover parentRef={{ current: document.createElement('div') }} hide={true} onHide={() => {}}>
        <div>Popover Content</div>
      </Popover>
    );

    expect(queryByText('Popover Content')).not.toBeInTheDocument();
  });

  it('should hide when Escape key is pressed', () => {
    let isHidden = false;
    const onHide = () => (isHidden = true);

    const { container } = render(
      <Popover parentRef={{ current: document.createElement('div') }} hide={false} onHide={onHide}>
        <div>Popover Content</div>
      </Popover>
    );

    expect(isHidden).toBe(false);

    fireEvent.keyDown(container, { key: 'Escape' });

    expect(isHidden).toBe(true);
  });
});
