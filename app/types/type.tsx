type Tpost = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
};


type Tslider = {
  id: number;
  brandIcon: IconDefinition;
  subtitle: string;
  title: string;
  image: string;
  bgColor: string;
};


interface AddProducts {
    name: string;
    description: string;
    price: number;
    discount_price?: number | null;
    category: string;
    subcategory?: string;
    brand?: string;
    sku?: string;
    stock?: number;
    images?: string[];
    colors?: string[];
    sizes?: string[];
    tags?: string[];
}
export type { Tpost, Tslider, AddProducts};
