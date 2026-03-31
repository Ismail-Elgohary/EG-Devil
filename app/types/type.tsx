type Tpost = {
  id: number | string;
  title?: string;
  name?: string;
  description?: string;
  image: string;
  price: number;
  category?: string;
  rating?: { rate: number; count: number };
};

export type { Tpost};
