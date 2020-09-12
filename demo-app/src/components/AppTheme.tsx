import React from 'react';
import WebFont from 'webfontloader';
import { useAsync } from 'react-async-hook';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';

// resolve on either success or failure
function loadFonts() {
  return new Promise((resolve) => {
    WebFont.load({
      classes: false,
      active: () => {
        resolve();
      },
      inactive: () => {
        resolve();
      },
      google: { families: ['Work Sans:200,300,400,400'] }
    });
  });
}

const appTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#F2CF1D'
    },
    secondary: {
      main: '#A68626'
    }
  },
  typography: {
    fontFamily: 'Work Sans',
    fontSize: 16,
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightMedium: 400,
    fontWeightBold: 400
  }
});

const useStyles = makeStyles((theme) => ({
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    paddingBottom: theme.spacing(8) // vertical nudge
  }
}));

const Loader: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.loader}>
      <CircularProgress size="6rem" color="inherit" thickness={1} />
    </div>
  );
};

export const AppTheme: React.FC = ({ children }) => {
  const fontsAsync = useAsync(() => {
    // use minimum wait to avoid flicker
    const minimumWait = new Promise((resolve) => setTimeout(resolve, 400));

    return Promise.all([loadFonts(), minimumWait]).catch((error) => {
      // ignore errors to make sure UI still shows
      console.error(error);
    });
  }, []);

  return (
    <MuiThemeProvider theme={appTheme}>
      <CssBaseline />

      {fontsAsync.loading ? <Loader /> : children}
    </MuiThemeProvider>
  );
};