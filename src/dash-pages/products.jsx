import Helmet from '../components/Helmet';
import { ProductsView } from './sections/products/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet title="Products"/>
      <ProductsView />
    </>
  );
}
