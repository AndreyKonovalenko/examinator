import React from 'react'
import { useRoutes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './components/styles/GlobalStyles'
import theme from './theme/index'
import routes from './routes'

// Redux;
import { Provider } from 'react-redux'
import store from './app/store'

const App = () => {
  const routing = useRoutes(routes)

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {routing}
      </ThemeProvider>
    </Provider>
  )
}

export default App
