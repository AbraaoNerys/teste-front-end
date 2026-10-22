import { useEffect, useState } from 'react';
import type { Product } from '../types/product';
import { fetchProducts } from '../services/productService';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // O StrictMode refaz o efeito em desenvolvimento; a flag impede respostas antigas de atualizarem o estado.
    let cancelled = false;
    fetchProducts()
      .then((data) => { if (!cancelled) setProducts(data); })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : 'Ocorreu um erro inesperado ao carregar os produtos.',
          );
        }
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  // A lista vazia é derivada de products.length e não precisa de um estado próprio.
  return { products, loading, error };
}
