import { Category, CategoryDTO, IconType } from 'shared/models';

export const mapCategories = (categories: CategoryDTO[]): Category[] => {
  return categories.map((category) => ({
    ...category,
    icon: IconType[category.icon]
  }));
};
