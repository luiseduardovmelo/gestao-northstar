
// Utilitário para gerenciar logs específicos do Trivela e Gazeta do Povo
export interface TrivelaBoardLog {
  id: number;
  jornal: string;
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
    console.error('Erro ao salvar log:', error);
  }
};

export const getTrevelaLogs = (): TrivelaBoardLog[] => {
  try {
    const logs = localStorage.getItem('trivelaBoardLogs');
    return logs ? JSON.parse(logs) : [];
  } catch (error) {
    console.error('Erro ao carregar logs:', error);
    return [];
  }
};

export const removeTrevelaLog = (logId: number): void => {
  try {
    const existingLogs = getTrevelaLogs();
    const updatedLogs = existingLogs.filter(log => log.id !== logId);
    localStorage.setItem('trivelaBoardLogs', JSON.stringify(updatedLogs));
  } catch (error) {
    console.error('Erro ao remover log:', error);
  }
};

export const clearTrevelaLogs = (): void => {
  try {
    localStorage.removeItem('trivelaBoardLogs');
  } catch (error) {
    console.error('Erro ao limpar logs:', error);
  }
};
