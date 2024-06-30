import Helmet from '../components/Helmet';
import { RestaurantView } from './sections/restaurants/view';

// ----------------------------------------------------------------------

export default function RestaurantPage() {
  return (
    <>
      <Helmet title="Restaurants" />
      <RestaurantView />
    </>
  );
}
