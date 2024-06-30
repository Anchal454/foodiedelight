import Helmet from '../components/Helmet';
import { NotFoundView } from './sections/error';

// ----------------------------------------------------------------------

export default function NotFoundPage() {
  return (
    <>
      <Helmet title="404 Page Not Found"/>

      <NotFoundView />
    </>
  );
}
