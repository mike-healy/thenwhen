import React from 'react';
import { it, expect, describe } from 'vitest';
import { render } from '@testing-library/react';
import Chain from './Chain'

describe('Chain', () => {
  it('shows message to add modifier to chain', () => {
		const { getByText } = render(<Chain />);

    expect(getByText('Add a time modifier')).toBeInTheDocument();
  });
});
