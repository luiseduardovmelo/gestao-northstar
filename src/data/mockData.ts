import { Jornal, Pagina, Operador, LogMudanca } from '@/types';

export const mockJornais: Jornal[] = [
  {
    id: '1',
    nome: 'Football Whispers',
    slug: 'football-whispers',
    numeroPaginas: 24,
    numeroOperadores: 156,
    receitaTotal: 45000,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    nome: 'Football Ground Guide',
    slug: 'football-ground-guide',
    numeroPaginas: 18,
    numeroOperadores: 98,
    receitaTotal: 32000,
    createdAt: '2024-01-20T14:30:00Z'
  },
  {
    id: '3',
    nome: 'Vringe',
    slug: 'vringe',
    numeroPaginas: 32,
    numeroOperadores: 203,
    receitaTotal: 58000,
    createdAt: '2024-02-01T09:15:00Z'
  },
  {
    id: '4',
    nome: 'Calcio d\'Angolo',
    slug: 'calcio-dangolo',
    numeroPaginas: 16,
    numeroOperadores: 87,
    receitaTotal: 28000,
    createdAt: '2024-02-10T16:45:00Z'
  },
  {
    id: '5',
    nome: 'SportsMole',
    slug: 'sportsmole',
    numeroPaginas: 28,
    numeroOperadores: 142,
    receitaTotal: 39000,
    createdAt: '2024-02-15T11:20:00Z'
  },
  {
    id: '6',
    nome: 'Trivela',
    slug: 'trivela',
    numeroPaginas: 22,
    numeroOperadores: 134,
    receitaTotal: 47000,
    createdAt: '2024-02-20T08:30:00Z'
  },
  {
    id: '7',
    nome: 'Premier League Brasil',
    slug: 'premier-league-brasil',
    numeroPaginas: 20,
    numeroOperadores: 108,
    receitaTotal: 35000,
    createdAt: '2024-03-01T13:15:00Z'
  },
  {
    id: '8',
    nome: 'Um Dois Esportes',
    slug: 'um-dois-esportes',
    numeroPaginas: 26,
    numeroOperadores: 167,
    receitaTotal: 52000,
    createdAt: '2024-03-05T10:45:00Z'
  },
  {
    id: '9',
    nome: 'Top Mercato',
    slug: 'top-mercato',
    numeroPaginas: 14,
    numeroOperadores: 79,
    receitaTotal: 24000,
    createdAt: '2024-03-10T15:20:00Z'
  },
  {
    id: '10',
    nome: 'WeSport',
    slug: 'wesport',
    numeroPaginas: 30,
    numeroOperadores: 189,
    receitaTotal: 61000,
    createdAt: '2024-03-15T09:30:00Z'
  },
  {
    id: '11',
    nome: 'Afrik Foot',
    slug: 'afrik-foot',
    numeroPaginas: 18,
    numeroOperadores: 95,
    receitaTotal: 31000,
    createdAt: '2024-03-20T12:10:00Z'
  },
  {
    id: '12',
    nome: 'Soccernet.ng',
    slug: 'soccernet-ng',
    numeroPaginas: 22,
    numeroOperadores: 118,
    receitaTotal: 38000,
    createdAt: '2024-03-25T14:50:00Z'
  },
  {
    id: '13',
    nome: 'Al Aire Libre',
    slug: 'al-aire-libre',
    numeroPaginas: 16,
    numeroOperadores: 84,
    receitaTotal: 27000,
    createdAt: '2024-04-01T11:40:00Z'
  },
  {
    id: '14',
    nome: 'SoloBasket',
    slug: 'solobasket',
    numeroPaginas: 20,
    numeroOperadores: 102,
    receitaTotal: 33000,
    createdAt: '2024-04-05T16:25:00Z'
  },
  {
    id: '15',
    nome: 'Lakers Brasil',
    slug: 'lakers-brasil',
    numeroPaginas: 12,
    numeroOperadores: 67,
    receitaTotal: 22000,
    createdAt: '2024-04-10T09:55:00Z'
  },
  {
    id: '16',
    nome: 'BasketUSA',
    slug: 'basketusa',
    numeroPaginas: 24,
    numeroOperadores: 145,
    receitaTotal: 44000,
    createdAt: '2024-04-15T13:35:00Z'
  },
  {
    id: '17',
    nome: 'BasketEurope',
    slug: 'basketeurope',
    numeroPaginas: 18,
    numeroOperadores: 91,
    receitaTotal: 29000,
    createdAt: '2024-04-20T10:15:00Z'
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
