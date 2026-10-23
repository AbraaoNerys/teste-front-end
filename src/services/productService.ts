import type { ApiProduct, ApiResponse, Product } from '../types/product';
import { categoryById } from '../data/productCategories';

const OFFICIAL_URL =
  'https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json';

// Em desenvolvimento e no preview, o proxy consulta esta URL oficial sem expor o CORS ao navegador.
const DEFAULT_PRODUCTS_URL = OFFICIAL_URL.replace(
  'https://app.econverse.com.br',
  '/api-produtos',
);
const PRODUCTS_URL = import.meta.env.VITE_PRODUCTS_URL ?? DEFAULT_PRODUCTS_URL;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// A API não fornece id nem categoria; ambos são definidos localmente.
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
  let response: Response;

  try {
    response = await fetch(PRODUCTS_URL);
  } catch {
    throw new Error('Não foi possível conectar ao servidor de produtos.');
  }

  if (!response.ok) {
    throw new Error(`Não foi possível carregar os produtos (status ${response.status}).`);
  }

  let data: ApiResponse;

  try {
    // O tipo descreve o formato esperado, mas não valida a resposta em tempo de execução.
    data = (await response.json()) as ApiResponse;
  } catch {
    throw new Error('A resposta do servidor de produtos não contém um JSON válido.');
  }

  if (data?.success !== true || !Array.isArray(data?.products)) {
    throw new Error('A resposta da API de produtos veio em um formato inesperado.');
  }

  return data.products.map(toProduct);
}
