import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';
import theme from './theme/index';
import routes from './routes';
import gstyles from './theme/gstyles';

// Redux
// import { Provider } from 'react-redux';
// import store from './store/store';
const inputGlobalStyles = <GlobalStyles styles={gstyles} />;

const App = () => {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      {inputGlobalStyles}
      {routing}
    </ThemeProvider>
  );
};

export default App;
