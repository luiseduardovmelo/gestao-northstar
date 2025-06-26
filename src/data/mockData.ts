
import { Jornal, Pagina, Operador, LogMudanca } from '@/types';

export const mockJornais: Jornal[] = [
  {
    id: '1',
    nome: 'Jornal do Comércio',
    numeroPaginas: 24,
    numeroOperadores: 156,
    receitaTotal: 45000,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    nome: 'Diário da Manhã',
    numeroPaginas: 18,
    numeroOperadores: 98,
    receitaTotal: 32000,
    createdAt: '2024-01-20T14:30:00Z'
  },
  {
    id: '3',
    nome: 'Gazeta Regional',
    numeroPaginas: 32,
    numeroOperadores: 203,
    receitaTotal: 58000,
    createdAt: '2024-02-01T09:15:00Z'
  },
  {
    id: '4',
    nome: 'Folha Popular',
    numeroPaginas: 16,
    numeroOperadores: 87,
    receitaTotal: 28000,
    createdAt: '2024-02-10T16:45:00Z'
  }
];

export const mockPaginas: Pagina[] = [
  {
    id: '1',
    jornalId: '1',
    nome: 'Primeira Página',
    status: 'ativa',
    numeroOperadores: 12,
    operadores: []
  },
  {
    id: '2',
    jornalId: '1',
    nome: 'Economia',
    status: 'ativa',
    numeroOperadores: 8,
    operadores: []
  },
  {
    id: '3',
    jornalId: '1',
    nome: 'Esportes',
    status: 'manutencao',
    numeroOperadores: 6,
    operadores: []
  }
];

export const mockOperadores: Operador[] = [
  {
    id: '1',
    paginaId: '1',
    nome: 'João Silva',
    cargo: 'Editor Chefe',
    status: 'vendido',
    valor: 5000,
    ordem: 1,
    vendidoEm: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    paginaId: '1',
    nome: 'Maria Santos',
    cargo: 'Jornalista',
    status: 'livre',
    valor: 3500,
    ordem: 2
  }
];

export const mockLogs: LogMudanca[] = [
  {
    id: '1',
    acao: 'criar',
    entidade: 'operador',
    operador: 'João Silva',
    valorNovo: 'Editor Chefe - R$ 5.000',
    timestamp: '2024-01-15T10:00:00Z',
    usuario: 'Admin'
  },
  {
    id: '2',
    acao: 'editar',
    entidade: 'operador',
    operador: 'Maria Santos',
    valorAntigo: 'R$ 3.000',
    valorNovo: 'R$ 3.500',
    timestamp: '2024-01-16T14:30:00Z',
    usuario: 'Admin'
  }
];
