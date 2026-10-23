import tecnologia from '../assets/categorias/tecnologia.svg';
import supermercado from '../assets/categorias/supermercado.svg';
import bebidas from '../assets/categorias/bebidas.svg';
import ferramentas from '../assets/categorias/ferramentas.svg';
import saude from '../assets/categorias/saude.svg';
import esportesEFitness from '../assets/categorias/esportes-e-fitness.svg';
import moda from '../assets/categorias/moda.svg';

export type DepartmentId =
  | 'tecnologia'
  | 'supermercado'
  | 'bebidas'
  | 'ferramentas'
  | 'saude'
  | 'esportes-e-fitness'
  | 'moda';

export interface Department {
  id: DepartmentId;
  label: string;
  icon: string;
}

export const departments: Department[] = [
  { id: 'tecnologia', label: 'Tecnologia', icon: tecnologia },
  { id: 'supermercado', label: 'Supermercado', icon: supermercado },
  { id: 'bebidas', label: 'Bebidas', icon: bebidas },
  { id: 'ferramentas', label: 'Ferramentas', icon: ferramentas },
  { id: 'saude', label: 'Saúde', icon: saude },
  { id: 'esportes-e-fitness', label: 'Esportes e Fitness', icon: esportesEFitness },
  { id: 'moda', label: 'Moda', icon: moda },
];
