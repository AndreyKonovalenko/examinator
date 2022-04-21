import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './components/styles/GlobalStyles';
import theme from './theme/index';
import routes from './routes';

//Redux;
// import { Provider } from 'react-redux';
// import store from './store/store';

const App = () => {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
