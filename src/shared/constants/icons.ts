import PaidIcon from '@mui/icons-material/Paid';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import SubwayIcon from '@mui/icons-material/Subway';
import HelpIcon from '@mui/icons-material/Help';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddIcon from '@mui/icons-material/Add';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EuroIcon from '@mui/icons-material/Euro';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import SellIcon from '@mui/icons-material/Sell';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import SavingsIcon from '@mui/icons-material/Savings';
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
  [IconType.default]: QuestionMarkIcon,
  // Account icons
  [IconType.wallet]: AccountBalanceWalletIcon,
  [IconType.dollar]: AttachMoneyIcon,
  [IconType.euro]: EuroIcon,
  [IconType.pound]: CurrencyPoundIcon,
  [IconType.currencyExchange]: CurrencyExchangeIcon,
  [IconType.business]: AddBusinessIcon,
  [IconType.sell]: SellIcon,
  [IconType.house]: AccountBalanceIcon,
  [IconType.mall]: LocalMallIcon,
  [IconType.savings]: SavingsIcon,
  // Other icons
  [IconType.plus]: AddIcon
};

export const ICONS_LIST: Icon[] = Object.keys(ICONS)
  .reduce<Icon[]>((acc, curr) => {
    return [...acc, { name: curr as IconType, icon: ICONS[curr] }];
  }, []);
