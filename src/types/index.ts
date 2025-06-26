
export interface Jornal {
  id: string;
  nome: string;
  slug: string; // Para mapear as classes CSS das cores
  numeroPaginas: number;
  numeroOperadores: number;
  receitaTotal: number;
  createdAt: string;
  logoUrl: string;
  corPrimaria: string;
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
  status: 'vendido' | 'livre';
  valor: number;
  ordem: number;
  vendidoEm?: string;
  logoUrl?: string;
}

export interface RankingSlot {
  id: string;
  posicao: number;
  operador?: Operador;
  isEmpty: boolean;
}

export interface LogMudanca {
  id: string;
  acao: 'adicionar' | 'remover' | 'mover' | 'status';
  entidade: 'jornal' | 'pagina' | 'operador';
  operador?: string;
  valorAntigo?: string;
  valorNovo?: string;
  timestamp: string;
  usuario: string;
  pagina?: string;
  jornal?: string;
}

export type StatusFilter = 'todos' | 'ativa' | 'inativa' | 'manutencao';
