// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/support-ticket.png`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Open tickets',
    path: '/dashboard/tickets/Open',
    icon: icon('ic_user'),
  },
  {
    title: 'Closed tickets',
    path: '/dashboard/tickets/Closed',
    icon: icon('ic_cart'),
  },
  {
    title: 'New tickets',
    path: '/dashboard/tickets/New',
    icon: icon('ic_cart'),
  },
  {
    title: 'Pending tickets',
    path: '/dashboard/tickets/Pending',
    icon: icon('ic_cart'),
  },
  {
    title: 'Solved tickets',
    path: '/dashboard/tickets/Solved',
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
