import { Category, CategoryDTO, IconType } from 'shared/models';

export const mapCategories = (categories: CategoryDTO[]): Category[] => {
  return categories.map(mapCategory);
};

export const mapCategory = (category: CategoryDTO): Category => {
  return {
    ...category,
    icon: IconType[category.icon]
  };
};
