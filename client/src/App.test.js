import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store'

test('renders TickerList and Chart components', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const tickerListElement = getByText(/Set interval time in seconds/i);
  const chartElement = getByText(/Realtime Chart/i);
  expect(tickerListElement).toBeInTheDocument();
  expect(chartElement).toBeInTheDocument();
});
