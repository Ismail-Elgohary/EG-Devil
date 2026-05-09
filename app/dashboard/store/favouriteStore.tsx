import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FavoriteItem = {
 id: number;
 name: string;
 price: number;
 image: string;
};

type FavoriteStore = {
 favourites: FavoriteItem[];

 addToFavourite: (
  product: FavoriteItem
 ) => void;

 removeFromFavourite: (
  id: number
 ) => void;

 toggleFavourite: (
  product: FavoriteItem
 ) => void;

 clearFavourites: () => void;

 isFavourite: (
  id: number
 ) => boolean;
};

export const useFavouriteStore =
 create<FavoriteStore>()(
  persist(

   (set, get) => ({

    favourites: [],

    addToFavourite: (product) =>
     set((state) => {

      const exists = state.favourites.some(
       (item) => item.id === product.id
      );

      if (exists) return state;

      return {
       favourites: [
        ...state.favourites,
        product,
       ],
      };
     }),

    removeFromFavourite: (id) =>
     set((state) => ({
      favourites: state.favourites.filter(
       (item) => item.id !== id
      ),
     })),

    toggleFavourite: (product) => {

     const exists = get().favourites.some(
      (item) => item.id === product.id
     );

     if (exists) {
      get().removeFromFavourite(product.id);
     } else {
      get().addToFavourite(product);
     }
    },

    clearFavourites: () =>
     set({
      favourites: [],
     }),

    isFavourite: (id) => {
     return get().favourites.some(
      (item) => item.id === id
     );
    },
   }),
   {
    name: "favouriteStore",
   }
  )
 );
