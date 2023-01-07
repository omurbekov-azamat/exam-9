export interface Category {
  type: string;
  name: string;
}

export interface ApiCategory extends Category {
  id: string;
}

export interface ApiCategoryList {
  [id: string]: Category
}