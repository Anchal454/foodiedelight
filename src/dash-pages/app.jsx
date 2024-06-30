import Helmet from '../components/Helmet';
import { AppView } from './sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet title="Dashboard"/>
        <AppView />
      </>
      )
}
