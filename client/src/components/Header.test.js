import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

test('renders Examinator logo text', () => {
  const initialState = { ru: true };
  const mockStore = configureStore();
  render(
    <BrowserRouter>
      <Provider>
        <Header store={mockStore(initialState)} />
      </Provider>
    </BrowserRouter>
  );
  const text = screen.getByText(/examinator/i);
  expect(text).toBeInTheDocument();
});
