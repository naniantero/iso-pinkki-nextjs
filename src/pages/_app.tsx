import '@fontsource/fjalla-one';
import '@fontsource/libre-baskerville';

import { FallbackError } from '@components/Modals';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Settings } from 'luxon';
import { NextIntlProvider } from 'next-intl';
import type { AppProps } from 'next/app';
import NextApp from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'theme-ui';
import '../styles/globals.scss';
import theme, { colors } from '../styles/theme';

interface PinkkiAppProps extends AppProps {
  messages: any;
  dehydratedState: any;
  locale: string;
  pageProps: {
    dehydratedState: any;
  };
}

/**
 * Data hydration etc. based on
 * https://dev.to/arianhamdi/react-query-v4-ssr-in-next-js-2ojj
 */
function PinkkiApp({ Component, pageProps, messages, locale }: PinkkiAppProps) {
  // This ensures that data is not shared
  // between different users and requests
  const [queryClient] = useState(() => new QueryClient());
  Settings.defaultLocale = locale;

  return (
    <NextIntlProvider messages={messages}>
      <ThemeProvider theme={theme}>
        <ErrorBoundary
          onError={(error) => {
            console.error('This happened', error);
          }}
          fallbackRender={() => {
            return <FallbackError />;
          }}
        >
          <QueryClientProvider client={queryClient}>
            {/* Hydrate query cache */}
            <Hydrate state={pageProps.dehydratedState}>
              <NextNProgress color={colors.pinkki} />
              <Component {...pageProps} />
            </Hydrate>
            {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
          </QueryClientProvider>
          <ToastContainer />
        </ErrorBoundary>
      </ThemeProvider>
    </NextIntlProvider>
  );
}

export default PinkkiApp;

PinkkiApp.getInitialProps = async function getInitialProps(context: any) {
  return {
    ...(await NextApp.getInitialProps(context)),
    messages: require(`../locales/${context.router.locale}.json`),
    locale: context.router.locale,
  };
};
