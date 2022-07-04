import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Autocomplete } from '.';

const optionsList = ['abc', 'Vlad', 'Game', 'It Takes Two'];
describe('Autocomplete', () => {
  it('Should open list if user starts typing', async () => {
    const { getByTestId, getByText } = render(<Autocomplete options={optionsList} name="Games" />);
    const input = getByTestId('autocomplete');
    userEvent.type(input, '23');
    await waitFor(() => expect(input.value).toBe('23'));
    expect(getByText('Not found')).toBeInTheDocument();
  });

  it('Should open suggest options with right suggest', async () => {
    const { getByTestId } = render(<Autocomplete options={optionsList} name="Games" />);
    const input = getByTestId('autocomplete');
    userEvent.type(input, 'ab');
    await waitFor(() => expect(input.value).toBe('ab'));
    expect(getByTestId('suggest')).toHaveTextContent('abc');
  });
});
