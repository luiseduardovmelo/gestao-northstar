import React, { createContext, useContext, useState, useEffect } from 'react';
import { Jornal, Pagina } from '../types';
import { supabase } from '../lib/supabase';

interface DataContextType {
  jornais: Jornal[];
  paginas: Pagina[];
  refreshData: (newJornais: Jornal[], newPaginas: Pagina[]) => void;
  isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Jornais fixos (nunca mudam)
const JORNAIS_FIXOS: Jornal[] = [
  {
    id: '1',
    nome: 'Gazeta Do Povo',
    slug: 'gazeta-do-povo',
    corPrimaria: '#003763',
    logoUrl: '/lovable-uploads/8ddca8c2-7ea4-4f2b-bb6b-7a90d64fe838.png',
    numeroPaginas: 0,
    numeroOperadores: 0,
    receitaTotal: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    nome: 'Lance',
    slug: 'lance',
    corPrimaria: '#1E1E1E',
    logoUrl: '/lovable-uploads/lance.webp',
    numeroPaginas: 0,
    numeroOperadores: 0,
    receitaTotal: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    nome: 'Um Dois Esportes',
    slug: 'um-dois-esportes',
    corPrimaria: '#009739',
    logoUrl: '/lovable-uploads/999097ff-454a-4213-881a-cc6cbfa458ba.png',
    numeroPaginas: 0,
    numeroOperadores: 0,
    receitaTotal: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    nome: 'Trivela',
    slug: 'trivela',
    corPrimaria: '#006633',
    logoUrl: '/lovable-uploads/46ae41cd-01d1-4c47-8333-9bb8c65a61f6.png',
    numeroPaginas: 0,
    numeroOperadores: 0,
    receitaTotal: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    nome: 'Lakers Brasil',
    slug: 'lakers-brasil',
    corPrimaria: '#552583',
    logoUrl: '/lovable-uploads/73834f04-f5e8-458e-a465-94f40ed8f5f2.png',
    numeroPaginas: 0,
    numeroOperadores: 0,
    receitaTotal: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: '6',
    nome: 'Tribuna Do Paraná',
    slug: 'tribuna-do-parana',
    corPrimaria: '#D92027',
    logoUrl: '/lovable-uploads/tribuna.jpg',
    numeroPaginas: 0,
    numeroOperadores: 0,
    receitaTotal: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: '7',
    nome: 'Placar',
    slug: 'placar',
    corPrimaria: '#E8312D',
    logoUrl: '/lovable-uploads/1e8ad685-b8ed-49f9-891f-fe0a0882f140.png',
    numeroPaginas: 0,
    numeroOperadores: 0,
    receitaTotal: 0,
    createdAt: new Date().toISOString()
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jornais, setJornais] = useState<Jornal[]>(JORNAIS_FIXOS);
  const [paginas, setPaginas] = useState<Pagina[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Busca dados do Supabase ao carregar
  useEffect(() => {
    loadDataFromSupabase();
  }, []);

  const loadDataFromSupabase = async () => {
    setIsLoading(true);
    console.log('[DataContext] loadDataFromSupabase iniciado');
    try {
      // Busca o upload mais recente
      const { data: latestUpload } = await supabase
        .from('csv_raw_data')
        .select('row_data')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      console.log('[DataContext] Dados do Supabase:', latestUpload ? 'Encontrados' : 'Não encontrados');

      if (latestUpload?.row_data) {
        const { jornais: dbJornais, paginas: dbPaginas } = latestUpload.row_data;
        console.log('[DataContext] Dados do banco:', dbJornais?.length, 'jornais,', dbPaginas?.length, 'páginas');
        console.log('[DataContext] Páginas do Um Dois Esportes no banco:', dbPaginas?.filter((p: Pagina) => p.jornalId === '3').length);

        // Atualiza jornais fixos com dados do banco (contadores)
        const updatedJornais = JORNAIS_FIXOS.map(jornal => {
          const dbJornal = dbJornais?.find((j: Jornal) => j.id === jornal.id);
          return dbJornal ? { ...jornal, ...dbJornal } : jornal;
        });

        setJornais(updatedJornais);
        setPaginas(dbPaginas || []);
        console.log('[DataContext] Estado atualizado do Supabase');
      } else {
        // Se não tem dados no Supabase, mostra jornais vazios
        setJornais(JORNAIS_FIXOS);
        setPaginas([]);
      }
    } catch (error) {
      console.error('[DataContext] Erro ao carregar dados do Supabase:', error);
      // Fallback para jornais fixos vazios
      setJornais(JORNAIS_FIXOS);
      setPaginas([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Atualiza os dados - NÃO recarrega do Supabase para evitar sobrescrever com dados antigos
  const refreshData = async (newJornais: Jornal[], newPaginas: Pagina[]) => {
    console.log('[DataContext] refreshData chamado com', newJornais.length, 'jornais e', newPaginas.length, 'páginas');
    console.log('[DataContext] Páginas do Um Dois Esportes (ID=3):', newPaginas.filter(p => p.jornalId === '3').length);
    // Atualiza imediatamente para feedback visual
    setJornais(newJornais);
    setPaginas(newPaginas);
    console.log('[DataContext] Estado atualizado com sucesso!');
    // REMOVIDO: setTimeout que recarregava do Supabase e sobrescrevia os dados novos
  };

  return (
    <DataContext.Provider value={{ jornais, paginas, refreshData, isLoading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
