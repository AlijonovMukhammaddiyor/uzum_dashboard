export interface CategoryInTree {
  categoryId: number;
  title: string;
  children?: CategoryInTree[];
}

export interface CategoryProductType {
  title: string;
  available_amount: number;
  orders_amount: number;
  photos: string;
  product_id: number;
  shop_title: string;
  sku_count: number;
  reviews_amount: number;
  skus: {
    [key: number]: {
      purchase_price: number;
      full_price: number;
    };
  }[];
}
