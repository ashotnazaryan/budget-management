import { CategoryType } from 'shared/models';
import { Tab } from 'shared/components/Tabs';

export const TABS: Tab[] = [
  { value: CategoryType.expense, label: 'Expense' },
  { value: CategoryType.income, label: 'Income' }
];
