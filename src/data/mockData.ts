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
    numeroPaginas: 90,
    numeroOperadores: 673,
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
  },

  // Páginas reais da Gazeta do Povo
  {
    id: '102',
    jornalId: '2',
    nome: 'Plataformas legalizadas',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 1399,
    operadores: []
  },
  {
    id: '103',
    jornalId: '2',
    nome: 'Bonus sem deposito para cassino',
    status: 'ativa',
    numeroOperadores: 13,
    trafego: 1052,
    operadores: []
  },
  {
    id: '104',
    jornalId: '2',
    nome: 'Plataforma que mais paga',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 894,
    operadores: []
  },
  {
    id: '105',
    jornalId: '2',
    nome: 'Plataforma de 3 reais',
    status: 'ativa',
    numeroOperadores: 11,
    trafego: 668,
    operadores: []
  },
  {
    id: '106',
    jornalId: '2',
    nome: 'Plataforma de 5 reais',
    status: 'ativa',
    numeroOperadores: 11,
    trafego: 515,
    operadores: []
  },
  {
    id: '107',
    jornalId: '2',
    nome: 'Plataforma de 2 reais',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 234,
    operadores: []
  },
  {
    id: '108',
    jornalId: '2',
    nome: 'Cassinos legalizados no Brasil',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 200,
    operadores: []
  },
  {
    id: '109',
    jornalId: '2',
    nome: 'Plataforma de 1 real',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 165,
    operadores: []
  },
  {
    id: '110',
    jornalId: '2',
    nome: 'Fortune Tiger',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 149,
    operadores: []
  },
  {
    id: '111',
    jornalId: '2',
    nome: 'Plataforma de 10 reais',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 95,
    operadores: []
  },
  {
    id: '112',
    jornalId: '2',
    nome: 'Casas de apostas',
    status: 'ativa',
    numeroOperadores: 20,
    trafego: 79,
    operadores: []
  },
  {
    id: '113',
    jornalId: '2',
    nome: 'Bets 2025',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 44,
    operadores: []
  },
  {
    id: '114',
    jornalId: '2',
    nome: 'Jogos com RTP alto',
    status: 'ativa',
    numeroOperadores: 9,
    trafego: 41,
    operadores: []
  },
  {
    id: '115',
    jornalId: '2',
    nome: 'Novas Casas',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 38,
    operadores: []
  },
  {
    id: '116',
    jornalId: '2',
    nome: 'Casas de apostas que aceitam Pix',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 30,
    operadores: []
  },
  {
    id: '117',
    jornalId: '2',
    nome: 'Novos Cassinos Online',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 22,
    operadores: []
  },
  {
    id: '118',
    jornalId: '2',
    nome: 'Cassinos online',
    status: 'ativa',
    numeroOperadores: 20,
    trafego: 14,
    operadores: []
  },
  {
    id: '119',
    jornalId: '2',
    nome: 'Cassinos que pagam via Pix',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 11,
    operadores: []
  },
  {
    id: '120',
    jornalId: '2',
    nome: 'Apps de apostas',
    status: 'ativa',
    numeroOperadores: 15,
    trafego: 10,
    operadores: []
  },
  {
    id: '121',
    jornalId: '2',
    nome: 'Sites de apostas no Brasil',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 5,
    operadores: []
  },
  {
    id: '122',
    jornalId: '2',
    nome: 'Apostas Grátis',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 0,
    operadores: []
  },
  {
    id: '123',
    jornalId: '2',
    nome: 'Casas de Apostas com bonus',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 0,
    operadores: []
  },
  {
    id: '124',
    jornalId: '2',
    nome: 'Plataformas com bônus de cadastro',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 0,
    operadores: []
  },

  // Páginas reais do Lakers Brasil
  {
    id: '125',
    jornalId: '5',
    nome: 'Casas de Apostas',
    status: 'ativa',
    numeroOperadores: 17,
    trafego: 7717,
    operadores: []
  },
  {
    id: '126',
    jornalId: '5',
    nome: 'Palpites NBA de hoje',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 1108,
    operadores: []
  },
  {
    id: '127',
    jornalId: '5',
    nome: 'Como apostar em handicap',
    status: 'ativa',
    numeroOperadores: 4,
    trafego: 237,
    operadores: []
  },
  {
    id: '128',
    jornalId: '5',
    nome: 'Plataformas de apostas legalizadas',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 221,
    operadores: []
  },
  {
    id: '129',
    jornalId: '5',
    nome: 'Palpites Lakers match',
    status: 'ativa',
    numeroOperadores: 3,
    trafego: 216,
    operadores: []
  },
  {
    id: '130',
    jornalId: '5',
    nome: 'Apps de Apostas',
    status: 'ativa',
    numeroOperadores: 12,
    trafego: 118,
    operadores: []
  },
  {
    id: '131',
    jornalId: '5',
    nome: 'Casas de Apostas para Basquete',
    status: 'ativa',
    numeroOperadores: 6,
    trafego: 86,
    operadores: []
  },
  {
    id: '132',
    jornalId: '5',
    nome: 'Apostar na NBA',
    status: 'ativa',
    numeroOperadores: 6,
    trafego: 42,
    operadores: []
  },
  {
    id: '133',
    jornalId: '5',
    nome: 'O que é Over e Under',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 26,
    operadores: []
  },
  {
    id: '134',
    jornalId: '5',
    nome: 'Novas casas de apostas',
    status: 'ativa',
    numeroOperadores: 9,
    trafego: 25,
    operadores: []
  },
  {
    id: '135',
    jornalId: '5',
    nome: 'Casas de apostas com pagamento antecipado',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 20,
    operadores: []
  },
  {
    id: '136',
    jornalId: '5',
    nome: 'O que é Spread no Basquete?',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 12,
    operadores: []
  },
  {
    id: '137',
    jornalId: '5',
    nome: 'Casas de apostas que pagam via Pix',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 11,
    operadores: []
  },
  {
    id: '138',
    jornalId: '5',
    nome: 'O que é surebet?',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 10,
    operadores: []
  },
  {
    id: '139',
    jornalId: '5',
    nome: 'Sites de apostas para iniciantes',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 9,
    operadores: []
  },
  {
    id: '140',
    jornalId: '5',
    nome: 'Apostas Grátis',
    status: 'ativa',
    numeroOperadores: 7,
    trafego: 2,
    operadores: []
  },
  {
    id: '141',
    jornalId: '5',
    nome: 'Bets com saque rápido',
    status: 'ativa',
    numeroOperadores: 6,
    trafego: 0,
    operadores: []
  },
  {
    id: '142',
    jornalId: '5',
    nome: 'Depósito mínimo de 3 reais',
    status: 'ativa',
    numeroOperadores: 6,
    trafego: 0,
    operadores: []
  },

  // Páginas reais da Placar
  {
    id: '143',
    jornalId: '3',
    nome: 'Casas de apostas com depósito mínimo de 1 real',
    status: 'ativa',
    numeroOperadores: 9,
    trafego: 7238,
    operadores: []
  },
  {
    id: '144',
    jornalId: '3',
    nome: 'Bets que mais pagam',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 5779,
    operadores: []
  },
  {
    id: '145',
    jornalId: '3',
    nome: 'Cassinos com depósito mínimo de 1 real',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 4178,
    operadores: []
  },
  {
    id: '146',
    jornalId: '3',
    nome: 'Sites confiáveis para jogar Fortune Tiger',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 4005,
    operadores: []
  },
  {
    id: '147',
    jornalId: '3',
    nome: 'Casas de apostas legalizadas no Brasil',
    status: 'ativa',
    numeroOperadores: 14,
    trafego: 3188,
    operadores: []
  },
  {
    id: '148',
    jornalId: '3',
    nome: 'Cassinos Online',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 2028,
    operadores: []
  },
  {
    id: '149',
    jornalId: '3',
    nome: 'Sites de apostas para iniciantes',
    status: 'ativa',
    numeroOperadores: 15,
    trafego: 1877,
    operadores: []
  },
  {
    id: '150',
    jornalId: '3',
    nome: 'Plataformas com bônus no Brasil',
    status: 'ativa',
    numeroOperadores: 15,
    trafego: 1116,
    operadores: []
  },
  {
    id: '151',
    jornalId: '3',
    nome: 'Novas casas de apostas',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 1012,
    operadores: []
  },
  {
    id: '152',
    jornalId: '3',
    nome: 'Depósito mínimo de 3 reais',
    status: 'ativa',
    numeroOperadores: 3,
    trafego: 962,
    operadores: []
  },
  {
    id: '153',
    jornalId: '3',
    nome: 'Casas de Apostas',
    status: 'ativa',
    numeroOperadores: 20,
    trafego: 917,
    operadores: []
  },
  {
    id: '154',
    jornalId: '3',
    nome: 'Cassinos legais no Brasil',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 856,
    operadores: []
  },
  {
    id: '155',
    jornalId: '3',
    nome: 'Sites com o jogo do coelho',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 703,
    operadores: []
  },
  {
    id: '156',
    jornalId: '3',
    nome: 'Apps de Apostas',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 686,
    operadores: []
  },
  {
    id: '157',
    jornalId: '3',
    nome: 'Cassinos com depósito mínimo de 10 reais',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 588,
    operadores: []
  },
  {
    id: '158',
    jornalId: '3',
    nome: 'Casas de apostas com pagamento antecipado de 2 gols',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 527,
    operadores: []
  },
  {
    id: '159',
    jornalId: '3',
    nome: 'Casas de Apostas com Cash Out',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 411,
    operadores: []
  },
  {
    id: '160',
    jornalId: '3',
    nome: 'Cassinos com depósito mínimo de 5 reais',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 409,
    operadores: []
  },
  {
    id: '161',
    jornalId: '3',
    nome: 'Plataforma de 2 reais',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 408,
    operadores: []
  },
  {
    id: '162',
    jornalId: '3',
    nome: 'Casas de apostas com saque rápido',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 315,
    operadores: []
  },
  {
    id: '163',
    jornalId: '3',
    nome: 'Cassinos com rodadas grátis',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 166,
    operadores: []
  },
  {
    id: '164',
    jornalId: '3',
    nome: 'Opções de apostas esportivas',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 149,
    operadores: []
  },
  {
    id: '165',
    jornalId: '3',
    nome: 'Como jogar Fortune Mouse',
    status: 'ativa',
    numeroOperadores: 3,
    trafego: 136,
    operadores: []
  },
  {
    id: '166',
    jornalId: '3',
    nome: 'Casas de apostas que aceitam Pix',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 131,
    operadores: []
  },
  {
    id: '167',
    jornalId: '3',
    nome: 'Cassinos que pagam via Pix',
    status: 'ativa',
    numeroOperadores: 9,
    trafego: 127,
    operadores: []
  },
  {
    id: '168',
    jornalId: '3',
    nome: 'Como jogar Plinko',
    status: 'ativa',
    numeroOperadores: 3,
    trafego: 115,
    operadores: []
  },
  {
    id: '169',
    jornalId: '3',
    nome: 'Como apostar no Super Mundial de Clubes',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 110,
    operadores: []
  },
  {
    id: '170',
    jornalId: '3',
    nome: 'Casas de apostas com depósito mínimo de 5 reais',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 108,
    operadores: []
  },
  {
    id: '171',
    jornalId: '3',
    nome: 'Como jogar Aviator?',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 104,
    operadores: []
  },
  {
    id: '172',
    jornalId: '3',
    nome: 'Jogos de Cassino Online',
    status: 'ativa',
    numeroOperadores: 9,
    trafego: 85,
    operadores: []
  },
  {
    id: '173',
    jornalId: '3',
    nome: 'Como jogar Mines',
    status: 'ativa',
    numeroOperadores: 3,
    trafego: 84,
    operadores: []
  },
  {
    id: '174',
    jornalId: '3',
    nome: 'Cassinos que mais pagam',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 83,
    operadores: []
  },
  {
    id: '175',
    jornalId: '3',
    nome: 'Cashback cassino',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 81,
    operadores: []
  },
  {
    id: '176',
    jornalId: '3',
    nome: 'Crash Games',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 76,
    operadores: []
  },
  {
    id: '177',
    jornalId: '3',
    nome: 'Novos cassinos online',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 75,
    operadores: []
  },
  {
    id: '178',
    jornalId: '3',
    nome: 'Melhores mercados para apostar',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 74,
    operadores: []
  },
  {
    id: '179',
    jornalId: '3',
    nome: 'O que é chance dupla nas apostas?',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 63,
    operadores: []
  },
  {
    id: '180',
    jornalId: '3',
    nome: 'Como jogar Penalty Shoot Out',
    status: 'ativa',
    numeroOperadores: 2,
    trafego: 49,
    operadores: []
  },
  {
    id: '181',
    jornalId: '3',
    nome: 'Cassinos online que pagam na hora',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 46,
    operadores: []
  },
  {
    id: '182',
    jornalId: '3',
    nome: 'Cassinos de 3 reais',
    status: 'ativa',
    numeroOperadores: 3,
    trafego: 44,
    operadores: []
  },
  {
    id: '183',
    jornalId: '3',
    nome: 'Bônus para o Mundial de Clubes',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 41,
    operadores: []
  },
  {
    id: '184',
    jornalId: '3',
    nome: 'Como jogar JetX',
    status: 'ativa',
    numeroOperadores: 3,
    trafego: 40,
    operadores: []
  },
  {
    id: '185',
    jornalId: '3',
    nome: '1×2 aposta',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 37,
    operadores: []
  },
  {
    id: '186',
    jornalId: '3',
    nome: 'Bet builder',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 33,
    operadores: []
  },
  {
    id: '187',
    jornalId: '3',
    nome: 'Plataforma de 4 reais',
    status: 'ativa',
    numeroOperadores: 6,
    trafego: 33,
    operadores: []
  },
  {
    id: '188',
    jornalId: '3',
    nome: 'Como jogar roleta online e cassinos no Brasil',
    status: 'ativa',
    numeroOperadores: 7,
    trafego: 32,
    operadores: []
  },
  {
    id: '189',
    jornalId: '3',
    nome: 'Como jogar Gates of Olympus',
    status: 'ativa',
    numeroOperadores: 3,
    trafego: 26,
    operadores: []
  },
  {
    id: '190',
    jornalId: '3',
    nome: 'Plataformas sem saque mínimo',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 19,
    operadores: []
  },
  {
    id: '191',
    jornalId: '3',
    nome: 'Como apostar no Campeonato Brasileiro',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 18,
    operadores: []
  },
  {
    id: '192',
    jornalId: '3',
    nome: 'Jogos de cassino para celular',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 17,
    operadores: []
  },
  {
    id: '193',
    jornalId: '3',
    nome: 'Ambos marcam',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 14,
    operadores: []
  },
  {
    id: '194',
    jornalId: '3',
    nome: 'Jogos da Pragmatic Play',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 13,
    operadores: []
  },
  {
    id: '195',
    jornalId: '3',
    nome: 'Apostas grátis',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 12,
    operadores: []
  },
  {
    id: '196',
    jornalId: '3',
    nome: 'Como apostar na Libertadores',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 12,
    operadores: []
  },
  {
    id: '197',
    jornalId: '3',
    nome: 'Cassinos com bônus',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 9,
    operadores: []
  },
  {
    id: '198',
    jornalId: '3',
    nome: 'Cassinos ao vivo',
    status: 'ativa',
    numeroOperadores: 6,
    trafego: 8,
    operadores: []
  },
  {
    id: '199',
    jornalId: '3',
    nome: 'Como jogar Mega Joker',
    status: 'ativa',
    numeroOperadores: 3,
    trafego: 8,
    operadores: []
  },
  {
    id: '200',
    jornalId: '3',
    nome: 'Sites para jogar o jogo do astronauta',
    status: 'ativa',
    numeroOperadores: 3,
    trafego: 6,
    operadores: []
  },
  {
    id: '201',
    jornalId: '3',
    nome: 'Como apostar em jogos de futebol',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 5,
    operadores: []
  },
  {
    id: '202',
    jornalId: '3',
    nome: 'Como apostar na Copa do Brasil',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 5,
    operadores: []
  },
  {
    id: '203',
    jornalId: '3',
    nome: 'Aposta a longo prazo',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 4,
    operadores: []
  },
  {
    id: '204',
    jornalId: '3',
    nome: 'Jogos de caça-níqueis (slots)',
    status: 'ativa',
    numeroOperadores: 9,
    trafego: 3,
    operadores: []
  },
  {
    id: '205',
    jornalId: '3',
    nome: 'Como apostar na Copa Sul-Americana',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 3,
    operadores: []
  },
  {
    id: '206',
    jornalId: '3',
    nome: 'Apps de cassino online',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 2,
    operadores: []
  },
  {
    id: '207',
    jornalId: '3',
    nome: 'Como jogar Big Bass Bonanza',
    status: 'ativa',
    numeroOperadores: 3,
    trafego: 2,
    operadores: []
  },
  {
    id: '208',
    jornalId: '3',
    nome: 'Mercado de gols',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 1,
    operadores: []
  },
  {
    id: '209',
    jornalId: '3',
    nome: 'Bônus de cassino',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 0,
    operadores: []
  },
  {
    id: '210',
    jornalId: '3',
    nome: '5 slots com maior RTP',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 0,
    operadores: []
  },
  {
    id: '211',
    jornalId: '3',
    nome: 'Como jogar Fire Joker',
    status: 'ativa',
    numeroOperadores: 3,
    trafego: 0,
    operadores: []
  },
  {
    id: '212',
    jornalId: '3',
    nome: 'Como jogar Sweet Bonanza',
    status: 'ativa',
    numeroOperadores: 3,
    trafego: 0,
    operadores: []
  },
  {
    id: '213',
    jornalId: '3',
    nome: 'Fruit Party- sites para jogar o jogo da frutinha',
    status: 'ativa',
    numeroOperadores: 3,
    trafego: 0,
    operadores: []
  },
  {
    id: '214',
    jornalId: '3',
    nome: 'Slots de 10 centavos',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 0,
    operadores: []
  },
  {
    id: '215',
    jornalId: '3',
    nome: 'Empate anula aposta',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 0,
    operadores: []
  },
  {
    id: '216',
    jornalId: '3',
    nome: 'Gestão de banca nas apostas esportivas',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 0,
    operadores: []
  },
  {
    id: '217',
    jornalId: '3',
    nome: 'O que significa over e under nas apostas?',
    status: 'ativa',
    numeroOperadores: 6,
    trafego: 0,
    operadores: []
  },
  {
    id: '218',
    jornalId: '3',
    nome: 'Tipos de apostas esportivas',
    status: 'ativa',
    numeroOperadores: 3,
    trafego: 0,
    operadores: []
  },
  
  // Páginas reais do Um Dois Esportes
  {
    id: '33',
    jornalId: '4',
    nome: 'Plataformas do jogo do tigrinho',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 38472,
    operadores: []
  },
  {
    id: '34',
    jornalId: '4',
    nome: 'Cassinos com Bônus sem Depósito',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 32243,
    operadores: []
  },
  {
    id: '35',
    jornalId: '4',
    nome: 'Cassinos com Rodadas Grátis',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 17444,
    operadores: []
  },
  {
    id: '36',
    jornalId: '4',
    nome: 'Plataformas que mais pagam',
    status: 'ativa',
    numeroOperadores: 7,
    trafego: 13094,
    operadores: []
  },
  {
    id: '37',
    jornalId: '4',
    nome: 'Casas de apostas legalizadas no Brasil',
    status: 'ativa',
    numeroOperadores: 8,
    trafego: 6641,
    operadores: []
  },
  {
    id: '38',
    jornalId: '4',
    nome: 'Plataforma de 3 reais',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 5119,
    operadores: []
  },
  {
    id: '39',
    jornalId: '4',
    nome: 'Cassinos que pagam via Pix',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 3870,
    operadores: []
  },
  {
    id: '40',
    jornalId: '4',
    nome: 'Slots de 10 centavos',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 2809,
    operadores: []
  },
  {
    id: '41',
    jornalId: '4',
    nome: 'Casas de apostas com depósito mínimo de 5 reais',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 2160,
    operadores: []
  },
  {
    id: '42',
    jornalId: '4',
    nome: 'Novos cassinos online',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 1844,
    operadores: []
  },
  {
    id: '43',
    jornalId: '4',
    nome: 'Cassinos legalizados no Brasil',
    status: 'ativa',
    numeroOperadores: 15,
    trafego: 1756,
    operadores: []
  },
  {
    id: '44',
    jornalId: '4',
    nome: 'Melhores jogos de apostas',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 1248,
    operadores: []
  },
  {
    id: '45',
    jornalId: '4',
    nome: 'Plataforma de 2 reais',
    status: 'ativa',
    numeroOperadores: 3,
    trafego: 1150,
    operadores: []
  },
  {
    id: '46',
    jornalId: '4',
    nome: 'Cassinos online',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 1056,
    operadores: []
  },
  {
    id: '47',
    jornalId: '4',
    nome: 'Slots com maior RTP',
    status: 'ativa',
    numeroOperadores: 7,
    trafego: 962,
    operadores: []
  },
  {
    id: '48',
    jornalId: '4',
    nome: 'Cassinos com depósito mínimo de 1 real',
    status: 'ativa',
    numeroOperadores: 11,
    trafego: 686,
    operadores: []
  },
  {
    id: '49',
    jornalId: '4',
    nome: 'Como jogar Fortune Dragon',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 559,
    operadores: []
  },
  {
    id: '50',
    jornalId: '4',
    nome: 'Fortune Ox',
    status: 'ativa',
    numeroOperadores: 6,
    trafego: 515,
    operadores: []
  },
  {
    id: '51',
    jornalId: '4',
    nome: 'Slots online',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 503,
    operadores: []
  },
  {
    id: '52',
    jornalId: '4',
    nome: 'Casas de apostas que aceitam cartão de crédito',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 474,
    operadores: []
  },
  {
    id: '53',
    jornalId: '4',
    nome: 'Casas de apostas que aceitam cartão de débito',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 440,
    operadores: []
  },
  {
    id: '54',
    jornalId: '4',
    nome: 'Casas de apostas com depósito baixo',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 386,
    operadores: []
  },
  {
    id: '55',
    jornalId: '4',
    nome: 'Como funciona o jogo da roleta',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 355,
    operadores: []
  },
  {
    id: '56',
    jornalId: '4',
    nome: 'Plataforma para jogar Fortune Rabbit',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 274,
    operadores: []
  },
  {
    id: '57',
    jornalId: '4',
    nome: 'Bônus de cassino online',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 239,
    operadores: []
  },
  {
    id: '58',
    jornalId: '4',
    nome: 'Roleta brasileira',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 238,
    operadores: []
  },
  {
    id: '59',
    jornalId: '4',
    nome: 'Cassinos confiáveis para apostar no Brasil em 2025',
    status: 'ativa',
    numeroOperadores: 9,
    trafego: 232,
    operadores: []
  },
  {
    id: '60',
    jornalId: '4',
    nome: 'Plataforma de Bingo Online',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 226,
    operadores: []
  },
  {
    id: '61',
    jornalId: '4',
    nome: 'Plataformas de 10 reais',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 214,
    operadores: []
  },
  {
    id: '62',
    jornalId: '4',
    nome: 'Ganesha Gold',
    status: 'ativa',
    numeroOperadores: 4,
    trafego: 205,
    operadores: []
  },
  {
    id: '63',
    jornalId: '4',
    nome: 'Casas de apostas que aceitam Pix',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 167,
    operadores: []
  },
  {
    id: '64',
    jornalId: '4',
    nome: 'Tigre Sortudo',
    status: 'ativa',
    numeroOperadores: 9,
    trafego: 147,
    operadores: []
  },
  {
    id: '65',
    jornalId: '4',
    nome: 'Cassino VIP',
    status: 'ativa',
    numeroOperadores: 4,
    trafego: 117,
    operadores: []
  },
  {
    id: '66',
    jornalId: '4',
    nome: 'Bolsa de apostas',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 111,
    operadores: []
  },
  {
    id: '67',
    jornalId: '4',
    nome: 'Cassino com cashback',
    status: 'ativa',
    numeroOperadores: 4,
    trafego: 107,
    operadores: []
  },
  {
    id: '68',
    jornalId: '4',
    nome: 'Cassinos online que pagam',
    status: 'ativa',
    numeroOperadores: 8,
    trafego: 98,
    operadores: []
  },
  {
    id: '69',
    jornalId: '4',
    nome: 'Sites de apostas confiáveis',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 90,
    operadores: []
  },
  {
    id: '70',
    jornalId: '4',
    nome: 'Jackpot progressivo',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 79,
    operadores: []
  },
  {
    id: '71',
    jornalId: '4',
    nome: 'Casas de apostas com pagamento antecipado 2 gols',
    status: 'ativa',
    numeroOperadores: 6,
    trafego: 79,
    operadores: []
  },
  {
    id: '72',
    jornalId: '4',
    nome: 'Cassinos ao vivo',
    status: 'ativa',
    numeroOperadores: 8,
    trafego: 78,
    operadores: []
  },
  {
    id: '73',
    jornalId: '4',
    nome: 'Megaways Slots',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 76,
    operadores: []
  },
  {
    id: '74',
    jornalId: '4',
    nome: 'Melhores plataformas com VIP apostas',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 75,
    operadores: []
  },
  {
    id: '75',
    jornalId: '4',
    nome: 'Apostas grátis',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 71,
    operadores: []
  },
  {
    id: '76',
    jornalId: '4',
    nome: 'O que é rollover?',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 70,
    operadores: []
  },
  {
    id: '77',
    jornalId: '4',
    nome: 'Jogo da bombinha',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 68,
    operadores: []
  },
  {
    id: '78',
    jornalId: '4',
    nome: 'Plataforma para jogar Gates of Olympus',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 67,
    operadores: []
  },
  {
    id: '79',
    jornalId: '4',
    nome: 'Casas de apostas com a opção de Criar Aposta',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 60,
    operadores: []
  },
  {
    id: '80',
    jornalId: '4',
    nome: 'Jogos de cassino online',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 58,
    operadores: []
  },
  {
    id: '81',
    jornalId: '4',
    nome: 'Bônus de Indicação em Cassinos',
    status: 'ativa',
    numeroOperadores: 3,
    trafego: 47,
    operadores: []
  },
  {
    id: '82',
    jornalId: '4',
    nome: 'Casas de apostas',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 43,
    operadores: []
  },
  {
    id: '83',
    jornalId: '4',
    nome: 'Fortune Mouse',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 41,
    operadores: []
  },
  {
    id: '84',
    jornalId: '4',
    nome: 'Slots de 5 centavos',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 35,
    operadores: []
  },
  {
    id: '85',
    jornalId: '4',
    nome: 'Aplicativos de apostas',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 33,
    operadores: []
  },
  {
    id: '86',
    jornalId: '4',
    nome: 'Apps de Cassino',
    status: 'ativa',
    numeroOperadores: 7,
    trafego: 30,
    operadores: []
  },
  {
    id: '87',
    jornalId: '4',
    nome: 'Casas de apostas com cash out',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 29,
    operadores: []
  },
  {
    id: '88',
    jornalId: '4',
    nome: 'Jogos de cassino para celular',
    status: 'ativa',
    numeroOperadores: 8,
    trafego: 27,
    operadores: []
  },
  {
    id: '89',
    jornalId: '4',
    nome: 'Casas de apostas ao vivo do Brasil',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 25,
    operadores: []
  },
  {
    id: '90',
    jornalId: '4',
    nome: 'Dragon Hatch',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 24,
    operadores: []
  },
  {
    id: '91',
    jornalId: '4',
    nome: 'Sites de apostas para iniciantes',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 19,
    operadores: []
  },
  {
    id: '92',
    jornalId: '4',
    nome: 'Apostas no Campeonato Paranaense',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 17,
    operadores: []
  },
  {
    id: '93',
    jornalId: '4',
    nome: 'Slots de alta volatilidade',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 16,
    operadores: []
  },
  {
    id: '94',
    jornalId: '4',
    nome: 'Sweet Bonanza',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 16,
    operadores: []
  },
  {
    id: '95',
    jornalId: '4',
    nome: 'Top crash games',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 14,
    operadores: []
  },
  {
    id: '96',
    jornalId: '4',
    nome: 'Sites para jogar poker online em 2025',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 12,
    operadores: []
  },
  {
    id: '97',
    jornalId: '4',
    nome: 'Cassinos que aceitam cartão de crédito',
    status: 'ativa',
    numeroOperadores: 5,
    trafego: 0,
    operadores: []
  },
  {
    id: '98',
    jornalId: '4',
    nome: 'Casas de Apostas com Bônus de Cadastro',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 0,
    operadores: []
  },
  {
    id: '99',
    jornalId: '4',
    nome: 'Casas de apostas com depósito mínimo de 1 real',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 0,
    operadores: []
  },
  {
    id: '100',
    jornalId: '4',
    nome: 'Casas de Apostas que Pagam Rápido',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 0,
    operadores: []
  },
  {
    id: '101',
    jornalId: '4',
    nome: 'Novas casas de apostas',
    status: 'ativa',
    numeroOperadores: 10,
    trafego: 0,
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
