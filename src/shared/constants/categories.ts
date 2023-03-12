import { Category, CategoryType, IconType } from 'shared/models';

export const INCOME_CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Salary',
    type: CategoryType.income,
    icon: IconType.salary
  },
  {
    id: '2',
    name: 'Other',
    type: CategoryType.income,
    icon: IconType.otherIncome
  }
];

export const EXPENSE_CATEGORIES: Category[] = [
  {
    id: '3',
    name: 'Rent',
    type: CategoryType.expense,
    icon: IconType.rent
  },
  {
    id: '4',
    name: 'Groceries',
    type: CategoryType.expense,
    icon: IconType.groceries
  },
  {
    id: '5',
    name: 'Media',
    type: CategoryType.expense,
    icon: IconType.media
  },
  {
    id: '6',
    name: 'Transportation',
    type: CategoryType.expense,
    icon: IconType.transportation
  },
  {
    id: '7',
    name: 'Other',
    type: CategoryType.expense,
    icon: IconType.otherExpense
  }
];
