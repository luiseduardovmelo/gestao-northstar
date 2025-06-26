
import { Jornal, Pagina, Operador, LogMudanca } from '@/types';

export const mockJornais: Jornal[] = [
  {
    id: '1',
    nome: 'Trivela',
    slug: 'trivela',
    numeroPaginas: 32,
    numeroOperadores: 234,
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

// Páginas reais do Trivela
export const mockPaginas: Pagina[] = [
  {
    id: '1',
    jornalId: '1',
    nome: 'Palpites de hoje de futebol',
    status: 'ativa',
    numeroOperadores: 3,
    trafego: 39094,
    operadores: []
  },
  {
    id: '2',
    jornalId: '1',
    nome: 'Plataforma que mais paga',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 14801,
    operadores: []
  },
  {
    id: '3',
    jornalId: '1',
    nome: 'Palpites de amanhã de futebol',
    status: 'ativa',
    numeroOperadores: 3,
    trafego: 5984,
    operadores: []
  },
  {
    id: '4',
    jornalId: '1',
    nome: 'Casas de apostas',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 2630,
    operadores: []
  },
  {
    id: '5',
    jornalId: '1',
    nome: 'Palpites match - onde assistir',
    status: 'ativa',
    numeroOperadores: 3,
    trafego: 2074,
    operadores: []
  },
  {
    id: '6',
    jornalId: '1',
    nome: 'Casas de apostas legalizadas no Brasil',
    status: 'ativa',
    numeroOperadores: 15,
    trafego: 1853,
    operadores: []
  },
  {
    id: '7',
    jornalId: '1',
    nome: 'Casas de apostas com Pagamento Antecipado',
    status: 'ativa',
    numeroOperadores: 8,
    trafego: 1386,
    operadores: []
  },
  {
    id: '8',
    jornalId: '1',
    nome: 'Novas casas de apostas',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 892,
    operadores: []
  },
  {
    id: '9',
    jornalId: '1',
    nome: 'Apostas Gratis',
    status: 'ativa',
    numeroOperadores: 4,
    trafego: 573,
    operadores: []
  },
  {
    id: '10',
    jornalId: '1',
    nome: 'Apostas Mundial de Clubes FIFA 2025',
    status: 'ativa',
    numeroOperadores: 7,
    trafego: 274,
    operadores: []
  },
  {
    id: '11',
    jornalId: '1',
    nome: 'Palpites Copa do Brasil',
    status: 'ativa',
    numeroOperadores: 3,
    trafego: 183,
    operadores: []
  },
  {
    id: '12',
    jornalId: '1',
    nome: 'Casas de apostas para escanteios',
    status: 'ativa',
    numeroOperadores: 7,
    trafego: 146,
    operadores: []
  },
  {
    id: '13',
    jornalId: '1',
    nome: 'Casas de apostas com Criar Aposta',
    status: 'ativa',
    numeroOperadores: 8,
    trafego: 120,
    operadores: []
  },
  {
    id: '14',
    jornalId: '1',
    nome: 'Casas de apostas com cashback',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 110,
    operadores: []
  },
  {
    id: '15',
    jornalId: '1',
    nome: 'Apps de apostas',
    status: 'ativa',
    numeroOperadores: 12,
    trafego: 103,
    operadores: []
  },
  {
    id: '16',
    jornalId: '1',
    nome: 'Melhores bets',
    status: 'ativa',
    numeroOperadores: 7,
    trafego: 92,
    operadores: []
  },
  {
    id: '17',
    jornalId: '1',
    nome: 'Casas de apostas com depósito mínimo de 1 real',
    status: 'ativa',
    numeroOperadores: 8,
    trafego: 81,
    operadores: []
  },
  {
    id: '18',
    jornalId: '1',
    nome: 'Banca de apostas esportivas',
    status: 'ativa',
    numeroOperadores: 12,
    trafego: 60,
    operadores: []
  },
  {
    id: '19',
    jornalId: '1',
    nome: 'Sites de Apostas para iniciantes',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 60,
    operadores: []
  },
  {
    id: '20',
    jornalId: '1',
    nome: 'Plataformas de 5 reais',
    status: 'ativa',
    numeroOperadores: 9,
    trafego: 47,
    operadores: []
  },
  {
    id: '21',
    jornalId: '1',
    nome: 'Casas de apostas que aceitam Pix',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 44,
    operadores: []
  },
  {
    id: '22',
    jornalId: '1',
    nome: 'Casas de apostas com cash out',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 35,
    operadores: []
  },
  {
    id: '23',
    jornalId: '1',
    nome: 'Palpites Brasileiro',
    status: 'ativa',
    numeroOperadores: 3,
    trafego: 28,
    operadores: []
  },
  {
    id: '24',
    jornalId: '1',
    nome: 'Palpites Premier League',
    status: 'ativa',
    numeroOperadores: 3,
    trafego: 26,
    operadores: []
  },
  {
    id: '25',
    jornalId: '1',
    nome: 'Palpites Champions League',
    status: 'ativa',
    numeroOperadores: 3,
    trafego: 23,
    operadores: []
  },
  {
    id: '26',
    jornalId: '1',
    nome: 'Casas de apostas com saque rápido',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 21,
    operadores: []
  },
  {
    id: '27',
    jornalId: '1',
    nome: 'Apostas Brasileirão',
    status: 'ativa',
    numeroOperadores: 11,
    trafego: 19,
    operadores: []
  },
  {
    id: '28',
    jornalId: '1',
    nome: 'Sites de apostas confiáveis',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 19,
    operadores: []
  },
  {
    id: '29',
    jornalId: '1',
    nome: 'Casas de apostas com bônus',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 19,
    operadores: []
  },
  {
    id: '30',
    jornalId: '1',
    nome: 'Palpites Libertadores',
    status: 'ativa',
    numeroOperadores: 3,
    trafego: 16,
    operadores: []
  },
  {
    id: '31',
    jornalId: '1',
    nome: 'Casas de apostas da Libertadores',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 12,
    operadores: []
  },
  {
    id: '32',
    jornalId: '1',
    nome: 'Apostas Euro',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 2,
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
    pagina: 'Palpites de hoje de futebol',
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
    pagina: 'Palpites de hoje de futebol',
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
