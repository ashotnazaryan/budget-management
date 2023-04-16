import { CategoryType } from 'shared/models';
import { Tab } from 'shared/components/Tabs';
import { RadioOption } from 'shared/components/FormRadioGroup';

// TODO: merge these constants
export const TABS: Tab[] = [
  { value: CategoryType.expense, label: 'COMMON.EXPENSE' },
  { value: CategoryType.income, label: 'COMMON.INCOME' }
];

export const CATEGORY_TABS: RadioOption[] = [
  { value: String(CategoryType.expense), label: 'COMMON.EXPENSE' },
  { value: String(CategoryType.income), label: 'COMMON.INCOME' }
];
