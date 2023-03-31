import PaidIcon from '@mui/icons-material/Paid';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import SubwayIcon from '@mui/icons-material/Subway';
import HelpIcon from '@mui/icons-material/Help';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddIcon from '@mui/icons-material/Add';
import { IconType, IconTypes, Icon } from 'shared/models';

export const ICONS: IconTypes = {
  // Category icons
  [IconType.salary]: PaidIcon,
  [IconType.otherIncome]: CardGiftcardIcon,
  [IconType.rent]: ApartmentIcon,
  [IconType.groceries]: LocalGroceryStoreIcon,
  [IconType.media]: ElectricBoltIcon,
  [IconType.transportation]: SubwayIcon,
  [IconType.otherExpense]: HelpIcon,
  [IconType.default]: HelpIcon,
  // Account icons
  [IconType.wallet]: AccountBalanceWalletIcon,
  // Other icons
  [IconType.plus]: AddIcon
};

export const ICONS_LIST: Icon[] = Object.keys(ICONS)
  .reduce<Icon[]>((acc, curr) => {
    return [...acc, { name: curr as IconType, icon: ICONS[curr] }];
  }, []);
