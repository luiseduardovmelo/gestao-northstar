import React, { useState, useEffect } from 'react';
import { JornalCard } from '@/components/JornalCard';
import { LogBoard } from '@/components/LogBoard';
import { TrevelaLogCard } from '@/components/TrevelaLogCard';
import Navigation from '@/components/Navigation';
import { mockJornais } from '@/data/mockData';
import { LogMudanca } from '@/types';
import { getTrevelaLogs, TrivelalLog } from '@/utils/trivelaBoardLogs';

// Logs de exemplo com diferentes tipos de ação
const mockLogsRecentes: LogMudanca[] = [
  {
    id: '1',
    acao: 'adicionar',
    entidade: 'operador',
    operador: 'Bet365',
    valorNovo: 'Posição #1 - R$ 15.000',
    timestamp: '2024-01-20T10:30:00Z',
    usuario: 'Admin',
    pagina: 'Primeira Página',
    jornal: 'Trivela'
  },
  {
    id: '2',
    acao: 'mover',
    entidade: 'operador',
    operador: 'Betano',
    valorAntigo: 'Posição #2',
    valorNovo: 'Posição #1',
    timestamp: '2024-01-20T09:15:00Z',
    usuario: 'Admin',
    pagina: 'Esportes',
    jornal: 'Gazeta do Povo'
  },
  {
    id: '3',
    acao: 'status',
    entidade: 'operador',
    operador: 'Sportingbet',
    valorAntigo: 'Livre',
    valorNovo: 'Vendido',
    timestamp: '2024-01-20T08:45:00Z',
    usuario: 'Admin',
    pagina: 'Primeira Página',
    jornal: 'Placar'
  },
  {
    id: '4',
    acao: 'remover',
    entidade: 'operador',
    operador: 'KTO',
    valorAntigo: 'Posição #5 - R$ 7.000',
    timestamp: '2024-01-19T16:20:00Z',
    usuario: 'Admin',
    pagina: 'Economia',
    jornal: 'Um Dois Esportes'
  },
  {
    id: '5',
    acao: 'adicionar',
    entidade: 'operador',
    operador: 'Betfair',
    valorNovo: 'Posição #3 - R$ 8.000',
    timestamp: '2024-01-19T14:10:00Z',
    usuario: 'Admin',
    pagina: 'Primeira Página',
    jornal: 'Lakers Brasil'
  },
  {
    id: '6',
    acao: 'mover',
    entidade: 'operador',
    operador: 'Rivalo',
    valorAntigo: 'Posição #4',
    valorNovo: 'Posição #2',
    timestamp: '2024-01-19T11:30:00Z',
    usuario: 'Admin',
    pagina: 'Esportes',
    jornal: 'Trivela'
  }
];

const Dashboard = () => {
  const [logs, setLogs] = useState<LogMudanca[]>(
    mockLogsRecentes.map(log => ({ ...log, status: 'espera' }))
  );
  
  // Estado para logs específicos do Trivela
  const [trevelaLogs, setTrevelaLogs] = useState<TrivelalLog[]>([]);

  // Carregar logs do Trivela ao inicializar
  useEffect(() => {
    const loadTrevelaLogs = () => {
      try {
        const logs = getTrevelaLogs();
        setTrevelaLogs(logs);
      } catch (error) {
        console.error('Erro ao carregar logs do Trivela:', error);
      }
    };

    loadTrevelaLogs();
    
    // Atualizar logs a cada 5 segundos para capturar novos logs
    const interval = setInterval(loadTrevelaLogs, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleLogMove = (logId: string, novaColuna: 'espera' | 'feito') => {
    setLogs(prev => prev.map(log => 
      log.id === logId ? { ...log, status: novaColuna } : log
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header com Navigation */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl font-bold" style={{ color: 'var(--accent-secondary)' }}>
                NORTH
              </span>
              <span className="text-3xl font-bold" style={{ color: 'var(--accent-primary)' }}>
                STAR
              </span>
              <span className="text-3xl font-bold text-gray-700 ml-2">
                NETWORK
              </span>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Gestão de Jornais
            </h1>
            <p className="text-gray-600">
              Gerencie a hierarquia de jornais, páginas e operadores
            </p>
          </div>
          
          <Navigation />
        </div>

        {/* Layout de três faixas */}
        <div className="space-y-8">
          {/* Faixa 1: Grade de Jornais */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Nossos Jornais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {mockJornais.map((jornal) => (
                <JornalCard key={jornal.id} jornal={jornal} />
              ))}
            </div>
          </div>

          {/* Faixa 2: Board de Logs estilo Trello */}
          <LogBoard logs={logs} onLogMove={handleLogMove} />

          {/* Faixa 2.5: Logs específicos do Trivela */}
          {trevelaLogs.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Logs do Trivela</h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {trevelaLogs.length}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {trevelaLogs.map((log) => (
                  <TrevelaLogCard key={log.id} log={log} />
                ))}
              </div>
            </div>
          )}

          {/* Faixa 3: Log de Mudanças Detalhado (altura fixa) - mantido para compatibilidade */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Histórico Completo</h2>
            </div>
            <div className="h-80 overflow-y-auto">
              <div className="p-6">
                <div className="space-y-4">
                  {mockLogsRecentes.map((log, index) => (
                    <div key={log.id} className="relative">
                      {/* Timeline line */}
                      {index < mockLogsRecentes.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200"></div>
                      )}
                      
                      <div className="flex items-start space-x-4">
                        {/* Timeline dot */}
                        <div className="flex-shrink-0 w-3 h-3 rounded-full bg-gray-300 mt-2"></div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                                  log.acao === 'adicionar' ? 'text-green-600 bg-green-50 border-green-200' :
                                  log.acao === 'remover' ? 'text-red-600 bg-red-50 border-red-200' :
                                  log.acao === 'mover' ? 'text-blue-600 bg-blue-50 border-blue-200' :
                                  log.acao === 'status' ? 'text-yellow-600 bg-yellow-50 border-yellow-200' :
                                  'text-gray-600 bg-gray-50 border-gray-200'
                                }`}>
                                  {log.acao.toUpperCase()}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {new Date(log.timestamp).toLocaleString('pt-BR')}
                                </span>
                              </div>
                              
                              <p className="text-sm font-medium text-gray-900 mb-1">
                                Operador: {log.operador}
                              </p>
                              
                              {(log.valorAntigo || log.valorNovo) && (
                                <div className="text-sm text-gray-600 mb-1">
                                  {log.valorAntigo && log.valorNovo && (
                                    <>
                                      <span className="line-through text-red-500">{log.valorAntigo}</span>
                                      {' → '}
                                      <span className="text-green-600">{log.valorNovo}</span>
                                    </>
                                  )}
                                  {!log.valorAntigo && log.valorNovo && (
                                    <span className="text-green-600">{log.valorNovo}</span>
                                  )}
                                </div>
                              )}
                              
                              <p className="text-xs text-gray-500">
                                {log.pagina} • {log.jornal} • Por: {log.usuario}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
