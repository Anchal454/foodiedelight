import SvgColor from "../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'restaurant',
    path: '/restaurants',
    icon: icon('ic_user'),
  },
  {
    title: 'Product',
    path: '/products',
    icon: icon('ic_cart'),
  },
];

export default navConfig;
