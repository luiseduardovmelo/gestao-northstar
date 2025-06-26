
import React, { useState } from 'react';
import { LogMudanca } from '@/types';
import { LogCard } from '@/components/LogCard';

interface LogBoardProps {
  logs: LogMudanca[];
  onLogMove: (logId: string, novaColuna: 'espera' | 'feito') => void;
}

export const LogBoard: React.FC<LogBoardProps> = ({ logs, onLogMove }) => {
  const [draggedLog, setDraggedLog] = useState<string | null>(null);

  const logsEspera = logs.filter(log => log.status === 'espera' || !log.status);
  const logsFeito = logs.filter(log => log.status === 'feito');

  const handleDragStart = (e: React.DragEvent, logId: string) => {
    setDraggedLog(logId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, coluna: 'espera' | 'feito') => {
    e.preventDefault();
    if (draggedLog) {
      onLogMove(draggedLog, coluna);
      setDraggedLog(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, logId: string, colunaAtual: 'espera' | 'feito') => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      const novaColuna = colunaAtual === 'espera' ? 'feito' : 'espera';
      onLogMove(logId, novaColuna);
    }
  };

  const renderLogColumn = (
    titulo: string, 
    logs: LogMudanca[], 
    coluna: 'espera' | 'feito',
    bgColor: string
  ) => (
    <div className="flex-1 min-w-0">
      <div className={`${bgColor} px-4 py-3 border-b border-gray-200`}>
        <h3 className="font-semibold text-gray-900">{titulo}</h3>
        <p className="text-sm text-gray-600">{logs.length} logs</p>
      </div>
      <div
        className="p-4 min-h-64 max-h-96 overflow-y-auto"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, coluna)}
      >
        <div className="space-y-3">
          {logs.map((log) => (
            <div
              key={log.id}
              draggable
              onDragStart={(e) => handleDragStart(e, log.id)}
              onKeyDown={(e) => handleKeyDown(e, log.id, coluna)}
              tabIndex={0}
              className={`
                cursor-move focus:outline-none focus:ring-2 focus:ring-[#457B9D] focus:ring-offset-2 rounded-lg
                ${draggedLog === log.id ? 'opacity-50' : ''}
              `}
            >
              <LogCard log={log} size="large" />
            </div>
          ))}
          {logs.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <p className="text-sm">Nenhum log nesta lista</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Board de Logs</h2>
        <p className="text-sm text-gray-600 mt-1">
          Gerencie os logs de mudanças arrastando entre as colunas
        </p>
      </div>
      
      <div className="flex">
        {renderLogColumn(
          'Log em Espera', 
          logsEspera, 
          'espera',
          'bg-yellow-50'
        )}
        
        <div className="w-px bg-gray-200"></div>
        
        {renderLogColumn(
          'Log Feito', 
          logsFeito, 
          'feito',
          'bg-green-50'
        )}
      </div>
    </div>
  );
};
