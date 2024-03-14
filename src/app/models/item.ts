export interface Item {
  id: string;
  name: string;
  price: number;
  type: string;
}

export interface CartItem {
  item: Item;
  quantity: number;
}