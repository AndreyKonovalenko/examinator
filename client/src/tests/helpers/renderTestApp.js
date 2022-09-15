// render with Router and Redux
import { MemoryRouter, Routes } from 'react-router';
import { Provider, createReduxStore } from 'react-redux';

export const renderTestApp = (component, options) => {
  const store = createReduxStore(options.initialState);

  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<Header />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};
