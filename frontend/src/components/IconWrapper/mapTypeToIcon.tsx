import { SvgIconProps, SxProps, Theme } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import EditIcon from '@mui/icons-material/Edit';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export interface IconWrapperProps extends SvgIconProps {
  type: keyof typeof mapTypeToIcon;
  isDark?: boolean;
  isDisabled?: boolean;
  text?: string;
  textSx?: SxProps<Theme>;
  buttonSx?: SxProps<Theme>;
}

export const mapTypeToIcon: Record<string, React.FC<SvgIconProps>> = {
  add: (props: SvgIconProps) => <AddCircleOutlineOutlinedIcon {...props} />,
  addDoc: (props: SvgIconProps) => <NoteAddIcon {...props} />,
  arrowRight: (props: SvgIconProps) => <EastOutlinedIcon {...props} />,
  arrowLeft: (props: SvgIconProps) => <WestOutlinedIcon {...props} />,
  analytics: (props: SvgIconProps) => <AnalyticsOutlinedIcon {...props} />,
  dashboard: (props: SvgIconProps) => <DashboardIcon {...props} />,
  delete: (props: SvgIconProps) => <DeleteForeverIcon {...props} />,
  doc: (props: SvgIconProps) => <DescriptionIcon {...props} />,
  edit: (props: SvgIconProps) => <EditIcon {...props} />,
  info: (props: SvgIconProps) => <InfoIcon {...props} />,
  products: (props: SvgIconProps) => <Inventory2OutlinedIcon {...props} />,
  searchDoc: (props: SvgIconProps) => <FindInPageIcon {...props} />,
  logout: (props: SvgIconProps) => <LogoutIcon {...props} />,
  login: (props: SvgIconProps) => <LoginIcon {...props} />,
  orders: (props: SvgIconProps) => <ListAltOutlinedIcon {...props} />,
  home: (props: SvgIconProps) => <HomeIcon {...props} />,
  menu: (props: SvgIconProps) => <MenuIcon {...props} />,
  more: (props: SvgIconProps) => <MoreVertIcon {...props} />,
  users: (props: SvgIconProps) => <PeopleOutlineIcon {...props} />,
  work: (props: SvgIconProps) => <WorkOutlineIcon {...props} />,
};
