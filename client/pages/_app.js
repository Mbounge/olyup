import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/ui/theme';
import buildClient from '../api/build-client';
//import Header from '../components/header';
import Header from '../components/Appbar';
import ClientOnly from './ClientOnly';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  //#D8F2FF

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Header currentUser={currentUser}>
          <ClientOnly>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* This becomes the child of Header */}
            <Component currentUser={currentUser} {...pageProps} />
          </ClientOnly>
        </Header>
      </ThemeProvider>
    </React.Fragment>
  );
};

AppComponent.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

// Just a friendly reminder that this is a custom app component
// these are different from your standard page components - they have ctx prop with req, and res, which we want
AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  // for invoking getInitialProps from the child component and passing it along to AppComponent to send it back to child
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
