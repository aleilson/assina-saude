import { Header } from '../components/Header';
import { RegisterProvider } from '../context/RegisterContext';

import '../styles/global.scss';

function MyApp({ Component, pageProps }) {
  return (
    <main>
     <RegisterProvider>
        <Header />
        <Component {...pageProps} />
     </RegisterProvider>
    </main>
  );
}

export default MyApp