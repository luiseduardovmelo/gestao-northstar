import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Jornal, Pagina, Operador } from '../types';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

interface DataContextType {
  jornais: Jornal[];
  paginas: Pagina[];
  refreshData: (newJornais: Jornal[], newPaginas: Pagina[]) => void;
  isLoading: boolean;
  // CRUD Operations
  updateOperador: (paginaId: string, operadorId: string, updates: Partial<Operador>) => Promise<void>;
  deleteOperador: (paginaId: string, operadorId: string) => Promise<void>;
  addOperador: (paginaId: string, operador: Omit<Operador, 'id'>, position: number) => Promise<void>;
  reorderOperadores: (paginaId: string, newOrder: string[]) => Promise<void>;
  getUniqueOperadores: () => { nome: string; logoUrl?: string }[];
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

  // Recalcula totais dos jornais baseado nas páginas
  const recalculateJornalTotals = useCallback((newPaginas: Pagina[]): Jornal[] => {
    return JORNAIS_FIXOS.map(jornal => {
      const jornalPaginas = newPaginas.filter(p => p.jornalId === jornal.id);
      const numeroPaginas = jornalPaginas.length;
      const numeroOperadores = jornalPaginas.reduce((acc, p) => acc + p.operadores.length, 0);
      const receitaTotal = jornalPaginas.reduce(
        (acc, p) => acc + p.operadores.reduce((opAcc, op) => opAcc + op.valor, 0), 0
      );
      return { ...jornal, numeroPaginas, numeroOperadores, receitaTotal };
    });
  }, []);

  // Salva dados no Supabase (UPDATE no registro existente)
  const saveToSupabase = useCallback(async (newJornais: Jornal[], newPaginas: Pagina[]) => {
    try {
      console.log('[DataContext] saveToSupabase iniciado');

      // Busca o ID do registro mais recente
      const { data: latestUpload } = await supabase
        .from('csv_raw_data')
        .select('id')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (latestUpload?.id) {
        const { error } = await supabase
          .from('csv_raw_data')
          .update({
            row_data: { jornais: newJornais, paginas: newPaginas }
          })
          .eq('id', latestUpload.id);

        if (error) {
          console.error('[DataContext] Erro ao salvar no Supabase:', error);
          toast.error('Erro ao salvar alterações no banco de dados');
          throw error;
        }
        console.log('[DataContext] saveToSupabase concluído com sucesso');
      } else {
        console.warn('[DataContext] Nenhum registro encontrado para atualizar');
        toast.error('Nenhum dado encontrado para atualizar. Faça upload de um arquivo primeiro.');
      }
    } catch (error) {
      console.error('[DataContext] Erro ao salvar no Supabase:', error);
      throw error;
    }
  }, []);

  // Atualiza um operador específico
  const updateOperador = useCallback(async (paginaId: string, operadorId: string, updates: Partial<Operador>) => {
    console.log('[DataContext] updateOperador:', { paginaId, operadorId, updates });

    const newPaginas = paginas.map(p => {
      if (p.id !== paginaId) return p;
      return {
        ...p,
        operadores: p.operadores.map(op =>
          op.id === operadorId ? { ...op, ...updates } : op
        )
      };
    });

    const newJornais = recalculateJornalTotals(newPaginas);

    await saveToSupabase(newJornais, newPaginas);
    setJornais(newJornais);
    setPaginas(newPaginas);
    toast.success('Operador atualizado com sucesso');
  }, [paginas, recalculateJornalTotals, saveToSupabase]);

  // Deleta um operador
  const deleteOperador = useCallback(async (paginaId: string, operadorId: string) => {
    console.log('[DataContext] deleteOperador:', { paginaId, operadorId });

    const newPaginas = paginas.map(p => {
      if (p.id !== paginaId) return p;
      const newOperadores = p.operadores.filter(op => op.id !== operadorId);
      return {
        ...p,
        operadores: newOperadores.map((op, idx) => ({ ...op, ordem: idx + 1 })),
        numeroOperadores: newOperadores.length
      };
    });

    const newJornais = recalculateJornalTotals(newPaginas);

    await saveToSupabase(newJornais, newPaginas);
    setJornais(newJornais);
    setPaginas(newPaginas);
    toast.success('Operador removido com sucesso');
  }, [paginas, recalculateJornalTotals, saveToSupabase]);

  // Adiciona um operador em uma posição específica
  const addOperador = useCallback(async (paginaId: string, operador: Omit<Operador, 'id'>, position: number) => {
    console.log('[DataContext] addOperador:', { paginaId, operador, position });

    const newId = String(Date.now());
    const newOperador: Operador = {
      ...operador,
      id: newId,
      paginaId,
      ordem: position
    };

    const newPaginas = paginas.map(p => {
      if (p.id !== paginaId) return p;
      const newOperadores = [...p.operadores];
      newOperadores.splice(position - 1, 0, newOperador);
      return {
        ...p,
        operadores: newOperadores.map((op, idx) => ({ ...op, ordem: idx + 1 })),
        numeroOperadores: newOperadores.length
      };
    });

    const newJornais = recalculateJornalTotals(newPaginas);

    await saveToSupabase(newJornais, newPaginas);
    setJornais(newJornais);
    setPaginas(newPaginas);
    toast.success('Operador adicionado com sucesso');
  }, [paginas, recalculateJornalTotals, saveToSupabase]);

  // Reordena operadores (drag & drop)
  const reorderOperadores = useCallback(async (paginaId: string, newOrder: string[]) => {
    console.log('[DataContext] reorderOperadores:', { paginaId, newOrder });

    const newPaginas = paginas.map(p => {
      if (p.id !== paginaId) return p;
      const reordered = newOrder.map((id, idx) => {
        const op = p.operadores.find(o => o.id === id);
        if (!op) return null;
        return { ...op, ordem: idx + 1 };
      }).filter((op): op is Operador => op !== null);
      return { ...p, operadores: reordered };
    });

    // Reordenação não muda totais, mas precisamos salvar
    await saveToSupabase(jornais, newPaginas);
    setPaginas(newPaginas);
    toast.success('Ordem atualizada com sucesso');
  }, [paginas, jornais, saveToSupabase]);

  // Retorna lista de operadores únicos (para modal de adicionar)
  const getUniqueOperadores = useCallback((): { nome: string; logoUrl?: string }[] => {
    const operadoresMap = new Map<string, { nome: string; logoUrl?: string }>();
    paginas.forEach(p => {
      p.operadores.forEach(op => {
        const key = op.nome.toLowerCase().trim();
        if (!operadoresMap.has(key)) {
          operadoresMap.set(key, { nome: op.nome, logoUrl: op.logoUrl });
        }
      });
    });
    return Array.from(operadoresMap.values()).sort((a, b) => a.nome.localeCompare(b.nome));
  }, [paginas]);

  return (
    <DataContext.Provider value={{
      jornais,
      paginas,
      refreshData,
      isLoading,
      updateOperador,
      deleteOperador,
      addOperador,
      reorderOperadores,
      getUniqueOperadores
    }}>
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
