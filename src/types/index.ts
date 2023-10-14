export interface Ingredient {
  _id: string;
  type: "bun" | "main" | "sauce";
  name: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  constructorId?: string;
  uuid: string;
}

export interface IOrder {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}

export type TOrderState = {
  orderNumber: number | null;
  isLoading: boolean;
};
export type TGetOrder = {
  bun: Ingredient | null;
  card: Array<Ingredient> | null;
};

export interface UserData {
  email: string | null;
  name: string | null;
  password?: string;

}
export interface UserState {
  isAuthCheck: boolean;
  isLoading: boolean;
  data: UserData;
}
export interface IngredientState {
  data: Ingredient[];
  isLoading: boolean;
  error: Error | null;
}
export type TSocketState = {
  connected: boolean;
  orders: IOrder[];
  myOrders: IOrder[];
  total: number | null;
  totalToday: number | null;
  error: Error | null;
};
export interface ConstructorState {
  bun: Ingredient | null;
  ingredients: Ingredient[];
  counters: { [ingredientId: string]: number };
}

export interface StoreState {
  constructorList: ConstructorState;
  ingredients: IngredientState;
  ingredientDetails: { data: null | Ingredient }; // Make sure data is typed as null | Ingredient

  order: TOrderState;
  user: UserState;
  feed: TSocketState;
}
