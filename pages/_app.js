import "@fortawesome/fontawesome-free/css/all.min.css";
import { RouteGuard } from '../components/route-guard';
import '../styles/tailwind.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <RouteGuard>
        <Component {...pageProps} />
      </RouteGuard>
    </>
  )
}

export default MyApp
