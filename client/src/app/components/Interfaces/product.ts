export default interface Product {
  product_name: string;
  product_price: number;
  product_images: Array<object>;
  new: boolean;
  category: string;
  _id: string;
}
