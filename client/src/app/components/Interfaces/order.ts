export default interface Order {
  email: string;
  first_name: String;
  last_name: string;
  company: string;
  total_price: number;
  shipping_street: string;
  shipping_city: string;
  shipping_country: string;
  post_code: string;
  phone_number: string;
  credit_expiration_date: string;
  credit_card_verification: number;
  credit_card: number;
  shipping_date: string;
  order_date: string;
  _id: string;
}
