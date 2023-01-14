import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StyledEngineProvider } from '@mui/material/styles';
import reportWebVitals from './reportWebVitals';
import { createTheme, CssBaseline } from '@mui/material';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/styles';

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({
  pallete: {
    primary: {
      main: 'rgb(34 197 94)'
    },
    secondary: '#678900'
  }
});
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
          <ToastContainer />
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
