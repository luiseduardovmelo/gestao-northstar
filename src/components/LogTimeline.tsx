
import React from 'react';
import { LogMudanca } from '@/types';

interface LogTimelineProps {
  logs: LogMudanca[];
}

export const LogTimeline: React.FC<LogTimelineProps> = ({ logs }) => {
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('pt-BR');
  };

  const getAcaoColor = (acao: string) => {
    switch (acao) {
      case 'criar': return 'text-green-600 bg-green-50 border-green-200';
      case 'editar': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'deletar': return 'text-red-600 bg-red-50 border-red-200';
      case 'reordenar': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      {logs.map((log, index) => (
        <div key={log.id} className="relative">
          {/* Timeline line */}
          {index < logs.length - 1 && (
            <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200"></div>
          )}
          
          <div className="flex items-start space-x-4">
            {/* Timeline dot */}
            <div className="flex-shrink-0 w-3 h-3 rounded-full bg-gray-300 mt-2"></div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getAcaoColor(log.acao)}`}>
                      {log.acao.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatTimestamp(log.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {log.entidade === 'operador' && log.operador && `Operador: ${log.operador}`}
                    {log.entidade === 'pagina' && 'Página modificada'}
                    {log.entidade === 'jornal' && 'Jornal modificado'}
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
                    Por: {log.usuario}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
