import 'tailwindcss/tailwind.css';
import { Provider } from 'next-auth/client';
import './styles/styles.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
