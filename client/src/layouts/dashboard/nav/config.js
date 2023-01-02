// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/support-ticket.png`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'My tickets',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Open tickets',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Closed tickets',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
