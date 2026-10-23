import type { ApiProduct, Product } from '../types/product';
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

function isApiProduct(value: unknown): value is ApiProduct {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }

  const product = value as Record<string, unknown>;

  return (
    typeof product.productName === 'string' &&
    product.productName.trim().length > 0 &&
    typeof product.descriptionShort === 'string' &&
    typeof product.photo === 'string' &&
    product.photo.trim().length > 0 &&
    typeof product.price === 'number' &&
    Number.isFinite(product.price) &&
    Number.isInteger(product.price) &&
    product.price >= 0
  );
}

// A API não fornece id nem categoria; ambos são definidos localmente.
function toProduct(api: ApiProduct, id: string): Product {
  const categoryId = slugify(api.productName);

  return {
    id,
    name: api.productName,
    description: api.descriptionShort,
    photo: api.photo,
    price: api.price,
    category: categoryById[categoryId] ?? 'outros',
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

  let data: unknown;

  try {
    data = await response.json();
  } catch {
    throw new Error('A resposta do servidor de produtos não contém um JSON válido.');
  }

  if (
    typeof data !== 'object' ||
    data === null ||
    !('success' in data) ||
    data.success !== true ||
    !('products' in data) ||
    !Array.isArray(data.products)
  ) {
    throw new Error('A resposta da API de produtos veio em um formato inesperado.');
  }

  const validProducts = data.products.filter(isApiProduct);

  if (data.products.length > 0 && validProducts.length === 0) {
    throw new Error('A resposta da API de produtos veio em um formato inesperado.');
  }

  const idOccurrences = new Map<string, number>();

  return validProducts.map((api) => {
    const baseId = slugify(api.productName) || 'produto';
    const occurrence = (idOccurrences.get(baseId) ?? 0) + 1;
    idOccurrences.set(baseId, occurrence);

    const id = occurrence === 1 ? baseId : `${baseId}-${occurrence}`;
    return toProduct(api, id);
  });
}
