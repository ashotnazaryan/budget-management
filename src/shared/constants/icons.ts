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
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import HistoryIcon from '@mui/icons-material/History';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import WestIcon from '@mui/icons-material/West';
import { IconType, IconTypes, Icon } from 'shared/models';

export const CATEGORY_ICONS: IconTypes = {
  [IconType.salary]: PaidIcon,
  [IconType.otherIncome]: CardGiftcardIcon,
  [IconType.rent]: ApartmentIcon,
  [IconType.groceries]: LocalGroceryStoreIcon,
  [IconType.media]: ElectricBoltIcon,
  [IconType.transportation]: SubwayIcon,
  [IconType.otherExpense]: HelpIcon,
  [IconType.default]: QuestionMarkIcon,
  [IconType.shopping]: AddShoppingCartIcon,
  [IconType.business]: AddBusinessIcon,
};

export const ACCOUNT_ICONS: IconTypes = {
  [IconType.wallet]: AccountBalanceWalletIcon,
  [IconType.dollar]: AttachMoneyIcon,
  [IconType.euro]: EuroIcon,
  [IconType.pound]: CurrencyPoundIcon,
  [IconType.currencyExchange]: CurrencyExchangeIcon,
  [IconType.sell]: SellIcon,
  [IconType.house]: AccountBalanceIcon,
  [IconType.mall]: LocalMallIcon,
  [IconType.savings]: SavingsIcon,
  [IconType.history]: HistoryIcon
};

export const OTHER_ICONS: IconTypes = {
  [IconType.plus]: AddIcon,
  [IconType.google]: GoogleIcon,
  [IconType.facebook]: FacebookIcon,
  [IconType.arrowBack]: ArrowBackIcon,
  [IconType.edit]: EditIcon,
  [IconType.delete]: DeleteIcon,
  [IconType.cancel]: CloseIcon,
  [IconType.west]: WestIcon,
};

export const ALL_ICONS: IconTypes = {
  ...CATEGORY_ICONS,
  ...ACCOUNT_ICONS,
  ...OTHER_ICONS
};

export const CATEGORY_ICONS_LIST: Icon[] = Object.keys(CATEGORY_ICONS)
  .reduce<Icon[]>((acc, curr) => {
    return [...acc, { name: curr as IconType, icon: CATEGORY_ICONS[curr] }];
  }, []);

export const ACCOUNT_ICONS_LIST: Icon[] = Object.keys(ACCOUNT_ICONS)
  .reduce<Icon[]>((acc, curr) => {
    return [...acc, { name: curr as IconType, icon: ACCOUNT_ICONS[curr] }];
  }, []);

export const OTHER_ICONS_LIST: Icon[] = Object.keys(OTHER_ICONS)
  .reduce<Icon[]>((acc, curr) => {
    return [...acc, { name: curr as IconType, icon: OTHER_ICONS[curr] }];
  }, []);

export const ALL_ICONS_LIST: Icon[] = [...CATEGORY_ICONS_LIST, ...ACCOUNT_ICONS_LIST, ...OTHER_ICONS_LIST];
