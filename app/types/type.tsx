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

export type { Tpost, Tslider};
