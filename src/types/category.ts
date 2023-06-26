export interface CategoryInTree {
  categoryId: number;
  title: string;
  children?: CategoryInTree[];
}
