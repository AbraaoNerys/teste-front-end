export type Category =
  | 'celular' | 'acessorios' | 'tablets' | 'notebooks' | 'tvs' | 'outros';

// Formato oficial da API
export interface ApiProduct {
  productName: string;
  descriptionShort: string;
  photo: string;
  price: number; // em centavos
}
export interface ApiResponse {
  success: boolean;
  products: ApiProduct[];
}

// Formato usado pelo app
export interface Product {
  id: string;         // dado local
  name: string;
  description: string;
  photo: string;
  price: number;      // em centavos
  category: Category; // dado local
}