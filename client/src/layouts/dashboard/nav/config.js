// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = () => <SvgColor src={`/assets/icons/navbar/support-ticket.png`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/',
    icon: icon(),
  },
  {
    title: 'New tickets',
    path: '/dashboard/tickets/New',
    icon: icon(),
  },
  {
    title: 'Open tickets',
    path: '/dashboard/tickets/Open',
    icon: icon(),
  },
  {
    title: 'Pending tickets',
    path: '/dashboard/tickets/Pending',
    icon: icon(),
  },
  {
    title: 'Solved tickets',
      path: '/dashboard/tickets/Solved',
      icon: icon(),
    },
    {
    title: 'Closed tickets',
    path: '/dashboard/tickets/Closed',
    icon: icon(),
  },
];

export default navConfig;
