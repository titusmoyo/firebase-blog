import { AuthProvider } from '@contexts/auth';
import '@styles/global.scss';

const App = ({ Component, pageProps }) => (
  <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
);

export default App;

