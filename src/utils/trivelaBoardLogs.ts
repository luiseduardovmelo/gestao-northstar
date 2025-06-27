
// Utilitário para gerenciar logs específicos do Trivela
export interface TrivelaBoardLog {
  id: number;
  pagina: string;
  alteracoes: string[];
  timestamp: string;
  totalAlteracoes: number;
}

export const saveTrevelaLog = (log: TrivelaBoardLog): void => {
  try {
    const existingLogs = getTrevelaLogs();
    const updatedLogs = [log, ...existingLogs];
    localStorage.setItem('trivelaBoardLogs', JSON.stringify(updatedLogs));
  } catch (error) {
    console.error('Erro ao salvar log do Trivela:', error);
  }
};

export const getTrevelaLogs = (): TrivelaBoardLog[] => {
  try {
    const logs = localStorage.getItem('trivelaBoardLogs');
    return logs ? JSON.parse(logs) : [];
  } catch (error) {
    console.error('Erro ao carregar logs do Trivela:', error);
    return [];
  }
};

export const removeTrevelaLog = (logId: number): void => {
  try {
    const existingLogs = getTrevelaLogs();
    const updatedLogs = existingLogs.filter(log => log.id !== logId);
    localStorage.setItem('trivelaBoardLogs', JSON.stringify(updatedLogs));
  } catch (error) {
    console.error('Erro ao remover log do Trivela:', error);
  }
};

export const clearTrevelaLogs = (): void => {
  try {
    localStorage.removeItem('trivelaBoardLogs');
  } catch (error) {
    console.error('Erro ao limpar logs do Trivela:', error);
  }
};
