import Helmet from '../components/Helmet';
import { LoginView } from './sections/login';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet title="Login"/>
      <LoginView />
    </>
  );
}
