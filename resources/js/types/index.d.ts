import { Config } from 'ziggy-js';

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  stripe_account_active: boolean;
  vendor: {
    status: string;
    store_label: string;
    store_name: string;
    store_address: string;
    telegram_link: string;
    cover_image: string;
  }
}

export type Image = {
  id: number;
  thumb: string;
  small: string;
  large: string;
}

export type VariationTypeOption = {
  id: number;
  name: string;
  images: Image[];
  type: VariationType;
}

export type VariationType = {
  id: number;
  name: string;
  type: 'Select' | 'Radio' | 'Image';
  options: VariationTypeOption[];
};

export type Product = {
  id: number;
  title: string;
  slug: string;
  price: number;
  quantity: number;
  image: string;
  images: Image[];
  short_description: string;
  description: string;
  meta_title: string;
  meta_description: string;
  user: {
    id: number;
    name: string;
    store_name: string;
    telegram_link: string;
  };
  department: {
    id: number;
    name: string;
    slug: string;
  };
  variationTypes: VariationType[];
  variations: Array<{
    id: number;
    variation_type_option_ids: number[];
    quantity: number;
    price: number;
  }>
}

export type CartItem = {
  id: number;
  product_id: number;
  title: string;
  slug: string;
  price: number;
  quantity: number;
  image: string;
  option_ids: Record<string, number>;
  options: VariationTypeOption[]
}

// Updated PaginationProps to include Laravel pagination structure
export type PaginationProps<T> = {
  data: Array<T>;
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
}

export type GroupedCartItems = {
  user: User;
  items: CartItem[];
  totalPrice: number;
  totalQuantity: number;
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  appName: string;
  csrf_token: string;
  error:  string;
  success: {
    message: string;
    time: number;
  };
  auth: {
    user: User;
  };
  ziggy: Config & { location: string };
  totalQuantity: number;
  totalPrice: number;
  miniCartItems: CartItem[];
  departments: Department[];
  keyword: string;
};

export type OrderItem = {
  id: number;
  quantity: number;
  price: number;
  variation_type_option_ids: number[];
  product:{
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;

  }
}

export type Order = {
  id: number;
  total_price: number;
  status: string;
  created_at: string;
  vendorUser: {
    id: string;
    name: string;
    email: string;
    store_name: string;
    store_address: string;
    telegram_link: string;
  };
  delivery: {
    recipient_name: string;
    street: string;
    city: string;
    county: string;
    phone: string;
    delivery_fee: number;
    delivery_status: string;
    deliver_phone: string | null;
  };
  orderItems: OrderItem[];
}

export type Vendor = {
  id: number;
  store_name: string;
  store_address: string;
  telegram_link: string;
}

export type Category = {
  id: number;
  name: string;
}

export type Department = {
  id: number;
  name: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  categories: Category[];
}
