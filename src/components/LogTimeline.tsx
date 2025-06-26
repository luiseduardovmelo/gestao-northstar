
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      case 'criar': return 'text-green-600 bg-green-50';
      case 'editar': return 'text-blue-600 bg-blue-50';
      case 'deletar': return 'text-red-600 bg-red-50';
      case 'reordenar': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          Log de Mudanças
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start space-x-4 p-4 border-l-4 border-gray-200 bg-gray-50 rounded-r-lg">
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getAcaoColor(log.acao)}`}>
                {log.acao.toUpperCase()}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    {log.entidade === 'operador' && log.operador && `Operador: ${log.operador}`}
                    {log.entidade === 'pagina' && 'Página modificada'}
                    {log.entidade === 'jornal' && 'Jornal modificado'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatTimestamp(log.timestamp)}
                  </p>
                </div>
                
                {(log.valorAntigo || log.valorNovo) && (
                  <div className="mt-1 text-sm text-gray-600">
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
                
                <p className="text-xs text-gray-500 mt-1">
                  Por: {log.usuario}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
