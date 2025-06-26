
import { Jornal, Pagina, Operador, LogMudanca } from '@/types';

export const mockJornais: Jornal[] = [
  {
    id: '1',
    nome: 'Trivela',
    slug: 'trivela',
    numeroPaginas: 22,
    numeroOperadores: 134,
    receitaTotal: 47000,
    createdAt: '2024-02-20T08:30:00Z',
    logoUrl: '/lovable-uploads/46ae41cd-01d1-4c47-8333-9bb8c65a61f6.png',
    corPrimaria: '#006633'
  },
  {
    id: '2',
    nome: 'Gazeta do Povo',
    slug: 'gazeta-do-povo',
    numeroPaginas: 28,
    numeroOperadores: 156,
    receitaTotal: 52000,
    createdAt: '2024-02-15T11:20:00Z',
    logoUrl: '/lovable-uploads/8ddca8c2-7ea4-4f2b-bb6b-7a90d64fe838.png',
    corPrimaria: '#003763'
  },
  {
    id: '3',
    nome: 'Placar',
    slug: 'placar',
    numeroPaginas: 24,
    numeroOperadores: 142,
    receitaTotal: 39000,
    createdAt: '2024-02-10T16:45:00Z',
    logoUrl: '/lovable-uploads/1e8ad685-b8ed-49f9-891f-fe0a0882f140.png',
    corPrimaria: '#E8312D'
  },
  {
    id: '4',
    nome: 'Um Dois Esportes',
    slug: 'um-dois-esportes',
    numeroPaginas: 26,
    numeroOperadores: 167,
    receitaTotal: 52000,
    createdAt: '2024-03-05T10:45:00Z',
    logoUrl: '/lovable-uploads/999097ff-454a-4213-881a-cc6cbfa458ba.png',
    corPrimaria: '#009739'
  },
  {
    id: '5',
    nome: 'Lakers Brasil',
    slug: 'lakers-brasil',
    numeroPaginas: 12,
    numeroOperadores: 67,
    receitaTotal: 22000,
    createdAt: '2024-04-10T09:55:00Z',
    logoUrl: '/lovable-uploads/73834f04-f5e8-458e-a465-94f40ed8f5f2.png',
    corPrimaria: '#552583'
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
    nome: 'Bet365 BR',
    status: 'vendido',
    valor: 15000,
    ordem: 1,
    vendidoEm: '2024-01-15T10:00:00Z',
    logoUrl: '/placeholder.svg'
  },
  {
    id: '2',
    paginaId: '1',
    nome: 'Betano BR',
    status: 'livre',
    valor: 12000,
    ordem: 2,
    logoUrl: '/placeholder.svg'
  },
  {
    id: '3',
    paginaId: '1',
    nome: 'Sportingbet',
    status: 'livre',
    valor: 10000,
    ordem: 3,
    logoUrl: '/placeholder.svg'
  }
];

export const mockLogs: LogMudanca[] = [
  {
    id: '1',
    acao: 'adicionar',
    entidade: 'operador',
    operador: 'Bet365 BR',
    valorNovo: 'Posição #1 - R$ 15.000',
    timestamp: '2024-01-15T10:00:00Z',
    usuario: 'Admin',
    pagina: 'Primeira Página',
    jornal: 'Trivela'
  },
  {
    id: '2',
    acao: 'status',
    entidade: 'operador',
    operador: 'Betano BR',
    valorAntigo: 'Livre',
    valorNovo: 'Vendido',
    timestamp: '2024-01-16T14:30:00Z',
    usuario: 'Admin',
    pagina: 'Primeira Página',
    jornal: 'Trivela'
  }
];

// Lista completa de operadores disponíveis (50 operadores ordenados alfabeticamente)
export const operadoresDisponiveis = [
  '4WIN',
  'Alfabet',
  'Aposta Online',
  'B2X',
  'Bacana Play BR',
  'Bateubet',
  'Bet Aki',
  'Bet.bet',
  'Bet365 BR',
  'Betano BR',
  'Betboom',
  'Betboo',
  'BetdaSorte',
  'Betesporte',
  'Betfair BR',
  'BetMGM BR',
  'Betnacional',
  'Betsson BR',
  'Betsul',
  'Betwarrior',
  'Blaze',
  'BR4Bet',
  'BRBET',
  'Brazino 777',
  'Casadeapostas',
  'Donald bet',
  'Esportes da Sorte',
  'Esportiva Bet',
  'Estrela Bet',
  'F12 Bet',
  'GeralBet',
  'Hanzbet',
  'Hiperbet',
  'Jogo de Ouro',
  'Jonbet',
  'KTO',
  'Lotogreen',
  'Lottoland BR',
  'Luva Bet',
  'MC Games',
  'Multibet',
  'Novibet BR',
  'Onabet',
  'Pagol',
  'Rivalo BR',
  'Segurobet',
  'Seubet',
  'Sportingbet',
  'Stake BR',
  'Superbet',
  'Upbet',
  'Vbet BR'
].map((nome, index) => ({
  nome,
  valor: Math.floor(Math.random() * 15000) + 5000, // Valor aleatório entre 5000 e 20000
  logoUrl: '/placeholder.svg'
}));
