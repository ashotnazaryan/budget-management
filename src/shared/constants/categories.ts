import { Category, CategoryType } from 'shared/models';

export const INCOME_CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Salary',
    type: CategoryType.income
  },
  {
    id: '2',
    name: 'Other',
    type: CategoryType.income
  }
];

export const EXPENSE_CATEGORIES: Category[] = [
  {
    id: '3',
    name: 'Rent',
    type: CategoryType.expense
  },
  {
    id: '4',
    name: 'Groceries',
    type: CategoryType.expense
  },
  {
    id: '5',
    name: 'Media',
    type: CategoryType.expense
  },
  {
    id: '6',
    name: 'Transportation',
    type: CategoryType.expense
  },
  {
    id: '7',
    name: 'Other',
    type: CategoryType.expense
  }
];
