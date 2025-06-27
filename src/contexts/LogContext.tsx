
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LogMudanca } from '@/types';

interface PendingChange {
  id: string;
  type: 'adicionar' | 'remover' | 'mover' | 'status';
  operador: string;
  slotOrigem?: number;
  slotDestino?: number;
  valor?: number;
  description: string;
}

interface LogContextType {
  logs: LogMudanca[];
  pendingChanges: PendingChange[];
  addPendingChange: (change: PendingChange) => void;
  clearPendingChanges: () => void;
  saveChangesToLog: (jornal: string, pagina: string) => void;
  hasPendingChanges: boolean;
}

const LogContext = createContext<LogContextType | undefined>(undefined);

const STORAGE_KEY = 'northstar_logs';

export const LogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<LogMudanca[]>([]);
  const [pendingChanges, setPendingChanges] = useState<PendingChange[]>([]);

  // Carregar logs do localStorage na inicialização
  useEffect(() => {
    const storedLogs = localStorage.getItem(STORAGE_KEY);
    if (storedLogs) {
      try {
        const parsedLogs = JSON.parse(storedLogs);
        setLogs(parsedLogs);
      } catch (error) {
        console.error('Erro ao carregar logs do localStorage:', error);
      }
    }
  }, []);

  // Salvar logs no localStorage sempre que mudarem
  useEffect(() => {
    if (logs.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    }
  }, [logs]);

  const addPendingChange = (change: PendingChange) => {
    setPendingChanges(prev => [...prev, change]);
  };

  const clearPendingChanges = () => {
    setPendingChanges([]);
  };

  const saveChangesToLog = (jornal: string, pagina: string) => {
    if (pendingChanges.length === 0) return;

    const newLog: LogMudanca = {
      id: Date.now().toString(),
      acao: pendingChanges.length === 1 ? pendingChanges[0].type : 'mover', // Usar tipo da primeira alteração ou 'mover' se múltiplas
      entidade: 'operador',
      operador: pendingChanges.length === 1 ? pendingChanges[0].operador : `${pendingChanges.length} operadores`,
      valorAntigo: pendingChanges.length > 1 ? `${pendingChanges.length} alterações` : undefined,
      valorNovo: pendingChanges.length > 1 ? 'Múltiplas operações' : pendingChanges[0].description,
      timestamp: new Date().toISOString(),
      usuario: 'Admin',
      pagina,
      jornal,
      status: 'espera',
      alteracoes: pendingChanges.map(change => change.description)
    };

    setLogs(prev => [newLog, ...prev]);
    clearPendingChanges();
  };

  const hasPendingChanges = pendingChanges.length > 0;

  return (
    <LogContext.Provider value={{
      logs,
      pendingChanges,
      addPendingChange,
      clearPendingChanges,
      saveChangesToLog,
      hasPendingChanges
    }}>
      {children}
    </LogContext.Provider>
  );
};

export const useLog = () => {
  const context = useContext(LogContext);
  if (context === undefined) {
    throw new Error('useLog deve ser usado dentro de um LogProvider');
  }
  return context;
};
