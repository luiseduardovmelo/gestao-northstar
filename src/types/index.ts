export interface Jornal {
  id: string;
  nome: string;
  slug: string; // Para mapear as classes CSS das cores
  numeroPaginas: number;
  numeroOperadores: number;
  receitaTotal: number;
  createdAt: string;
}

export interface Pagina {
  id: string;
  jornalId: string;
  nome: string;
  status: 'ativa' | 'inativa' | 'manutencao';
  numeroOperadores: number;
  operadores: Operador[];
}

export interface Operador {
  id: string;
  paginaId: string;
  nome: string;
  cargo: string;
  status: 'vendido' | 'livre';
  valor: number;
  ordem: number;
  vendidoEm?: string;
}

export interface LogMudanca {
  id: string;
  acao: 'criar' | 'editar' | 'deletar' | 'reordenar';
  entidade: 'jornal' | 'pagina' | 'operador';
  operador?: string;
  valorAntigo?: string;
  valorNovo?: string;
  timestamp: string;
  usuario: string;
}

export type StatusFilter = 'todos' | 'ativa' | 'inativa' | 'manutencao';
