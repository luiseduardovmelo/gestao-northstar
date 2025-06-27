
import React from 'react';
import { JornalCard } from '@/components/JornalCard';
import { LogBoard } from '@/components/LogBoard';
import Navigation from '@/components/Navigation';
import { mockJornais } from '@/data/mockData';
import { useLog } from '@/contexts/LogContext';

const Dashboard = () => {
  const { logs, saveChangesToLog } = useLog();

  const handleLogMove = (logId: string, novaColuna: 'espera' | 'feito') => {
    // Esta funcionalidade será implementada se necessário
    console.log('Log moved:', logId, novaColuna);
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

          {/* Faixa 3: Log de Mudanças Detalhado (altura fixa) - mantido para compatibilidade */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Histórico Completo</h2>
            </div>
            <div className="h-80 overflow-y-auto">
              <div className="p-6">
                <div className="space-y-4">
                  {logs.slice(0, 10).map((log, index) => (
                    <div key={log.id} className="relative">
                      {/* Timeline line */}
                      {index < Math.min(logs.length, 10) - 1 && (
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
                  
                  {logs.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <p className="text-sm">Nenhum log registrado ainda</p>
                    </div>
                  )}
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
