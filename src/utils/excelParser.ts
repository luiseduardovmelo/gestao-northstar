import * as XLSX from 'xlsx';
import { Jornal, Pagina, Operador } from '../types';

export interface NorthStarData {
  jornais: Jornal[];
  paginas: Pagina[];
}

// Metadata fixa dos 7 jornais
const JORNAL_METADATA: Record<string, { id: string; slug: string; cor: string; logo: string }> = {
  'GAZETA DO POVO': { id: '1', slug: 'gazeta-do-povo', cor: '#003763', logo: '/lovable-uploads/8ddca8c2-7ea4-4f2b-bb6b-7a90d64fe838.png' },
  'LANCE': { id: '2', slug: 'lance', cor: '#1E1E1E', logo: '/lovable-uploads/lance.webp' },
  'UM DOIS ESPORTES': { id: '3', slug: 'um-dois-esportes', cor: '#009739', logo: '/lovable-uploads/999097ff-454a-4213-881a-cc6cbfa458ba.png' },
  'TRIVELA': { id: '4', slug: 'trivela', cor: '#006633', logo: '/lovable-uploads/46ae41cd-01d1-4c47-8333-9bb8c65a61f6.png' },
  'LAKERS BRASIL': { id: '5', slug: 'lakers-brasil', cor: '#552583', logo: '/lovable-uploads/73834f04-f5e8-458e-a465-94f40ed8f5f2.png' },
  'TRIBUNA DO PARANÁ': { id: '6', slug: 'tribuna-do-parana', cor: '#D92027', logo: '/lovable-uploads/tribuna.jpg' },
  'PLACAR': { id: '7', slug: 'placar', cor: '#E8312D', logo: '/lovable-uploads/1e8ad685-b8ed-49f9-891f-fe0a0882f140.png' }
};

// Converte "€ 1,500.00" ou "€ -" para numero
const parseEuroValue = (val: any): number => {
  if (!val) return 0;
  const str = String(val).trim();
  if (str === '-' || str === '€ -' || str === '€ -   ') return 0;
  // Remove tudo exceto numeros, virgula e ponto
  const clean = str.replace(/[^0-9.,]/g, '');
  // Formato europeu: 1,500.00 -> remove virgula (separador de milhar)
  const normalized = clean.replace(/,/g, '');
  return parseFloat(normalized) || 0;
};

// Converte trafego (pode ser string ou numero)
const parseTraffic = (val: any): number => {
  if (typeof val === 'number') return val;
  if (!val) return 0;
  const str = String(val).trim();
  // Remove pontos de milhar se existirem (formato BR: 26.385)
  const clean = str.replace(/\./g, '').replace(/,/g, '.');
  return parseInt(clean, 10) || 0;
};

// Formata nome do jornal (capitaliza)
const formatJornalName = (name: string): string => {
  const lower = name.toLowerCase();
  return lower.split(' ').map(word =>
    ['do', 'da', 'de'].includes(word) ? word : word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

export const parseExcelData = async (file: File): Promise<NorthStarData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        const allPaginas: Pagina[] = [];
        const jornaisMap: Record<string, Jornal> = {};

        let paginaId = Date.now();
        let operadorId = Date.now() + 100000;

        // Processa cada aba do Excel
        workbook.SheetNames.forEach((sheetName) => {
          const sheetNameUpper = sheetName.toUpperCase().trim();
          console.log('[Parser] Processando aba:', sheetName, '-> Upper:', sheetNameUpper);

          // Encontra o metadata do jornal correspondente
          const metaKey = Object.keys(JORNAL_METADATA).find(k => sheetNameUpper === k);
          if (!metaKey) {
            console.log('[Parser] Aba não encontrada no metadata:', sheetNameUpper);
            return;
          }
          console.log('[Parser] Aba encontrada! MetaKey:', metaKey, 'ID:', JORNAL_METADATA[metaKey].id);

          const meta = JORNAL_METADATA[metaKey];
          const sheet = workbook.Sheets[sheetName];
          const rows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null });

          if (rows.length < 5) return;

          // Estrutura fixa:
          // Row 0: PÁGINA | Nome1 | nan | nan | Nome2 | nan | nan | ...
          // Row 1: URL | url1 | nan | nan | url2 | ...
          // Row 2: TRÁFEGO | traffic1 | FIXO/VALOR | nan | traffic2 | ...
          // Row 3: (vazia)
          // Rows 4-9: posicao | operador | valor | nan | ...

          const row0 = rows[0] || [];
          const row2 = rows[2] || [];

          // Inicializa jornal
          if (!jornaisMap[meta.id]) {
            jornaisMap[meta.id] = {
              id: meta.id,
              nome: formatJornalName(metaKey),
              slug: meta.slug,
              corPrimaria: meta.cor,
              logoUrl: meta.logo,
              numeroPaginas: 0,
              numeroOperadores: 0,
              receitaTotal: 0,
              createdAt: new Date().toISOString()
            };
          }

          // Cada pagina comeca na coluna 1, 4, 7, 10... (padrao de 3 colunas)
          for (let col = 1; col < row0.length; col += 3) {
            const pageName = row0[col];
            if (!pageName || String(pageName).trim() === '' || String(pageName).toLowerCase() === 'nan') {
              continue;
            }

            console.log(`[Parser] ${metaKey} - Página na coluna ${col}: ${pageName}`);
            const traffic = parseTraffic(row2[col]);
            const currentPaginaId = String(paginaId++);

            // Extrai operadores a partir da row 4 (quantidade dinamica)
            const operadores: Operador[] = [];
            for (let opRow = 4; opRow < rows.length; opRow++) {
              const row = rows[opRow];
              if (!row) break;

              const opName = row[col];
              const opValue = row[col + 1];

              // Para se encontrar celula vazia (fim dos operadores desta pagina)
              if (!opName || String(opName).trim() === '' || String(opName).toLowerCase() === 'nan') {
                break;
              }

              const valor = parseEuroValue(opValue);

              operadores.push({
                id: String(operadorId++),
                paginaId: currentPaginaId,
                nome: String(opName).trim(),
                status: 'vendido',
                valor: valor,
                ordem: operadores.length + 1,
                vendidoEm: new Date().toISOString()
              });
            }

            // Cria a pagina
            allPaginas.push({
              id: currentPaginaId,
              jornalId: meta.id,
              nome: String(pageName).trim(),
              status: 'ativa',
              numeroOperadores: operadores.length,
              trafego: traffic,
              operadores: operadores
            });

            // Atualiza contadores do jornal
            const jornal = jornaisMap[meta.id];
            jornal.numeroPaginas++;
            jornal.numeroOperadores += operadores.length;
            jornal.receitaTotal += operadores.reduce((sum, op) => sum + op.valor, 0);
          }
        });

        const jornais = Object.values(jornaisMap).filter(j => j.numeroPaginas > 0);
        resolve({ jornais, paginas: allPaginas });

      } catch (err) {
        console.error('[Parser] Erro ao processar Excel:', err);
        reject(err);
      }
    };

    reader.onerror = (err) => reject(err);
    reader.readAsBinaryString(file);
  });
};
