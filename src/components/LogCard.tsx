
import React from 'react';
import { LogMudanca } from '@/types';

interface LogCardProps {
  log: LogMudanca;
  size?: 'small' | 'large';
}

export const LogCard: React.FC<LogCardProps> = ({ log, size = 'small' }) => {
  const getCorPorAcao = (acao: string) => {
    switch (acao) {
      case 'adicionar': return 'bg-green-100 border-green-200 text-green-800';
      case 'remover': return 'bg-red-100 border-red-200 text-red-800';
      case 'mover': return 'bg-blue-100 border-blue-200 text-blue-800';
      case 'status': return 'bg-yellow-100 border-yellow-200 text-yellow-800';
      default: return 'bg-gray-100 border-gray-200 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    if (size === 'large') {
      return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAcaoTexto = (acao: string) => {
    switch (acao) {
      case 'adicionar': return 'ADICIONAR';
      case 'remover': return 'REMOVER';
      case 'mover': return 'MOVER';
      case 'status': return 'STATUS';
      default: return acao.toUpperCase();
    }
  };

  const cardSize = size === 'large' ? 'w-60 h-32' : 'w-48 h-24';
  const textSize = size === 'large' ? 'text-sm' : 'text-xs';
  const padding = size === 'large' ? 'p-4' : 'p-3';

  return (
    <div className={`
      ${cardSize} rounded-lg border-2 ${padding} flex-shrink-0
      ${getCorPorAcao(log.acao)} transition-all duration-200 hover:shadow-md
    `}>
      <div className="flex flex-col h-full justify-between">
        {/* Header com ação */}
        <div className="flex items-center justify-between">
          <span className={`${textSize} font-bold`}>
            {getAcaoTexto(log.acao)}
          </span>
          <span className={`${size === 'large' ? 'text-xs' : 'text-xs'} opacity-75`}>
            {formatTimestamp(log.timestamp)}
          </span>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 min-h-0">
          <div className={`${textSize} font-medium truncate`}>
            {log.operador}
          </div>
          <div className={`${size === 'large' ? 'text-xs' : 'text-xs'} opacity-75 truncate`}>
            {log.pagina} • {log.jornal}
          </div>
          {log.valorAntigo && log.valorNovo && size === 'large' && (
            <div className="text-xs opacity-75 truncate mt-1">
              {log.valorAntigo} → {log.valorNovo}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`${size === 'large' ? 'text-xs' : 'text-xs'} opacity-75`}>
          por {log.usuario}
        </div>
      </div>
    </div>
  );
};
