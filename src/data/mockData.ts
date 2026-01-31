import { Jornal, Pagina, Operador } from "../types";

export const mockJornais: Jornal[] = [
  {
    "id": "1",
    "nome": "Gazeta Do Povo",
    "slug": "gazeta-do-povo",
    "corPrimaria": "#003763",
    "logoUrl": "/lovable-uploads/8ddca8c2-7ea4-4f2b-bb6b-7a90d64fe838.png",
    "numeroPaginas": 12,
    "numeroOperadores": 0,
    "receitaTotal": 0,
    "createdAt": "2024-03-20T10:00:00Z"
  },
  {
    "id": "2",
    "nome": "Lance",
    "slug": "lance",
    "corPrimaria": "#1E1E1E",
    "logoUrl": "/lovable-uploads/lance.webp",
    "numeroPaginas": 12,
    "numeroOperadores": 0,
    "receitaTotal": 0,
    "createdAt": "2024-03-20T10:00:00Z"
  },
  {
    "id": "3",
    "nome": "Um Dois Esportes",
    "slug": "um-dois-esportes",
    "corPrimaria": "#009739",
    "logoUrl": "/lovable-uploads/999097ff-454a-4213-881a-cc6cbfa458ba.png",
    "numeroPaginas": 12,
    "numeroOperadores": 0,
    "receitaTotal": 0,
    "createdAt": "2024-03-20T10:00:00Z"
  },
  {
    "id": "4",
    "nome": "Trivela",
    "slug": "trivela",
    "corPrimaria": "#006633",
    "logoUrl": "/lovable-uploads/46ae41cd-01d1-4c47-8333-9bb8c65a61f6.png",
    "numeroPaginas": 9,
    "numeroOperadores": 0,
    "receitaTotal": 0,
    "createdAt": "2024-03-20T10:00:00Z"
  },
  {
    "id": "5",
    "nome": "Lakers Brasil",
    "slug": "lakers-brasil",
    "corPrimaria": "#552583",
    "logoUrl": "/lovable-uploads/73834f04-f5e8-458e-a465-94f40ed8f5f2.png",
    "numeroPaginas": 1,
    "numeroOperadores": 0,
    "receitaTotal": 0,
    "createdAt": "2024-03-20T10:00:00Z"
  },
  {
    "id": "6",
    "nome": "Tribuna Do Paran\u00e1",
    "slug": "tribuna-do-parana",
    "corPrimaria": "#D92027",
    "logoUrl": "/lovable-uploads/tribuna.jpg",
    "numeroPaginas": 1,
    "numeroOperadores": 0,
    "receitaTotal": 0,
    "createdAt": "2024-03-20T10:00:00Z"
  },
  {
    "id": "7",
    "nome": "Placar",
    "slug": "placar",
    "corPrimaria": "#E8312D",
    "logoUrl": "/lovable-uploads/1e8ad685-b8ed-49f9-891f-fe0a0882f140.png",
    "numeroPaginas": 9,
    "numeroOperadores": 0,
    "receitaTotal": 0,
    "createdAt": "2024-03-20T10:00:00Z"
  }
];

export const mockPaginas: Pagina[] = [
  {
    "id": "1",
    "jornalId": "1",
    "nome": "PLATAFORMA B\u00d4NUS DE CADASTRO",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "2",
    "jornalId": "1",
    "nome": "PLATAFORMA QUE MAIS PAGA",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "3",
    "jornalId": "1",
    "nome": "B\u00d4NUS SEM DEP CASSINO",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "4",
    "jornalId": "1",
    "nome": "FORTUNE TIGER",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "5",
    "jornalId": "1",
    "nome": "PLATAFORMAS LEGALIZADAS",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "6",
    "jornalId": "1",
    "nome": "MELHORES CASAS DE APOSTAS",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "7",
    "jornalId": "1",
    "nome": "PLATAFORMAS DE 10 CENTAVOS",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "8",
    "jornalId": "1",
    "nome": "CASSINOS LEGALIZADOS",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "9",
    "jornalId": "1",
    "nome": "CASSINOS ONLINE",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "10",
    "jornalId": "1",
    "nome": "MELHORES GRUPOS DE TELEGRAM",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "11",
    "jornalId": "1",
    "nome": "PLATAFORMA NOVA PAGANDO",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "12",
    "jornalId": "1",
    "nome": "PLATAFORMA DE 5 REAIS",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "13",
    "jornalId": "2",
    "nome": "CASSINOS COM GIROS GR\u00c1TIS",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "14",
    "jornalId": "2",
    "nome": "NOVOS CASSINOS ONLINE",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "15",
    "jornalId": "2",
    "nome": "PLATAFORMA DE 5 REAIS",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "16",
    "jornalId": "2",
    "nome": "PLATAFORMA NOVA",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "17",
    "jornalId": "2",
    "nome": "SITES DE APOSTAS",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "18",
    "jornalId": "2",
    "nome": "TOP 20 CASAS",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "19",
    "jornalId": "2",
    "nome": "BETS AUTORIZADAS",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "20",
    "jornalId": "2",
    "nome": "PLATAFORMA COM B\u00d4NUS",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "21",
    "jornalId": "2",
    "nome": "PLATAFORMA QUE MAIS PAGA",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "22",
    "jornalId": "2",
    "nome": "COPA DO MUNDO 2026",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "23",
    "jornalId": "2",
    "nome": "BRASILEIR\u00c3O 2026",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "24",
    "jornalId": "2",
    "nome": "AVIATOR",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "25",
    "jornalId": "3",
    "nome": "CASSINOS COM B\u00d4NUS SEM DEP\u00d3SITO",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "26",
    "jornalId": "3",
    "nome": "CASSINOS COM RODADAS GR\u00c1TIS",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "27",
    "jornalId": "3",
    "nome": "PLATAFORMAS QUE MAIS PAGAM",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "28",
    "jornalId": "3",
    "nome": "PLATAFORMAS DO JOGO DO TIGRINHO",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "29",
    "jornalId": "3",
    "nome": "CASSINOS QUE PAGAM VIA PIX",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "30",
    "jornalId": "3",
    "nome": "CASAS DE APOSTAS LEGALIZADAS NO BRASIL",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "31",
    "jornalId": "3",
    "nome": "PLATAFORMA DE 3 REAIS",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "32",
    "jornalId": "3",
    "nome": "NOVOS CASSINOS ONLINE",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "33",
    "jornalId": "3",
    "nome": "CASSINOS LEGALIZADOS NO BRASIL",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "34",
    "jornalId": "3",
    "nome": "CASSINOS COM DEP\u00d3SITO M\u00cdNIMO DE 1 REAL",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "35",
    "jornalId": "3",
    "nome": "SLOTS DE 10 CENTAVOS",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "36",
    "jornalId": "3",
    "nome": "SLOTS COM MAIOR RTP",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "37",
    "jornalId": "4",
    "nome": "PLATAFORMA QUE MAIS PAGA",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "38",
    "jornalId": "4",
    "nome": "CASAS DE APOSTAS",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "39",
    "jornalId": "4",
    "nome": "PAGAMENTO ANTECIPADO",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "40",
    "jornalId": "4",
    "nome": "CASAS DE APOSTAS LEGALIZADAS",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "41",
    "jornalId": "4",
    "nome": "PLATAFORMA DE 3 REAIS",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "42",
    "jornalId": "4",
    "nome": "PLATAFORMA NOVA",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "43",
    "jornalId": "4",
    "nome": "NOVAS CASAS DE APOSTAS",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "44",
    "jornalId": "4",
    "nome": "CASAS DE APOSTAS PARA ESCANTEIOS",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "45",
    "jornalId": "4",
    "nome": "CASAS DE APOSTAS COM CASHBACK",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "46",
    "jornalId": "5",
    "nome": "CASAS DE APOSTAS",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "47",
    "jornalId": "6",
    "nome": "PLATAFORMA NOVA",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "48",
    "jornalId": "7",
    "nome": "BETS QUE MAIS PAGAM",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "49",
    "jornalId": "7",
    "nome": "PLATAFORMAS COM B\u00d4NUS NO BRASIL",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "50",
    "jornalId": "7",
    "nome": "CASSINOS ONLINE",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "51",
    "jornalId": "7",
    "nome": "SITES FORTUNE TIGER",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "52",
    "jornalId": "7",
    "nome": "CASSINO DEP\u00d3SITO M\u00cdNIMO 1 REAL",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "53",
    "jornalId": "7",
    "nome": "CASA DE APOSTA DEP\u00d3SITO M\u00cdNIMO 1 REAL",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "54",
    "jornalId": "7",
    "nome": "MELHORES CASAS DE APOSTAS",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "55",
    "jornalId": "7",
    "nome": "SITES PARA INICIANTES",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  },
  {
    "id": "56",
    "jornalId": "7",
    "nome": "NOVAS CASAS DE APOSTAS",
    "status": "ativa",
    "numeroOperadores": 0,
    "trafego": 0,
    "operadores": []
  }
];

export const operadoresDisponiveis: Operador[] = [];
export const mockOperadores: Operador[] = [];
