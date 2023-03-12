import PaidIcon from '@mui/icons-material/Paid';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import SubwayIcon from '@mui/icons-material/Subway';
import HelpIcon from '@mui/icons-material/Help';
import { IconType, IconTypes } from 'shared/models';

export const ICONS: IconTypes = {
  [IconType.salary]: PaidIcon,
  [IconType.otherIncome]: CardGiftcardIcon,
  [IconType.rent]: ApartmentIcon,
  [IconType.groceries]: LocalGroceryStoreIcon,
  [IconType.media]: ElectricBoltIcon,
  [IconType.transportation]: SubwayIcon,
  [IconType.otherExpense]: HelpIcon,
  [IconType.default]: HelpIcon,
};
