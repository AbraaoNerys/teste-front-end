import type { ApiProduct, ApiResponse, Product } from '../types/product';
import { categoryById } from '../data/productCategories';

const OFFICIAL_URL =
  'https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json';

// Em desenvolvimento, passa pelo proxy do Vite para evitar o bloqueio de CORS
const PRODUCTS_URL = import.meta.env.DEV
  ? '/api-produtos/teste-front-end/junior/tecnologia/lista-produtos/produtos.json'
  : OFFICIAL_URL;


function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function toProduct(api: ApiProduct): Product {
  const id = slugify(api.productName);
  return {
    id,
    name: api.productName,
    description: api.descriptionShort,
    photo: api.photo,
    price: api.price,
    category: categoryById[id] ?? 'outros',
  };
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(PRODUCTS_URL);
  if (!response.ok) throw new Error(`Falha ao carregar produtos (${response.status})`);
  const data: ApiResponse = await response.json();
  if (!data.success) throw new Error('A API respondeu sem sucesso');
  return data.products.map(toProduct);
}