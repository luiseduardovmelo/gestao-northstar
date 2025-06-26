
import React from 'react';
import { LogMudanca } from '@/types';

interface LogCardProps {
  log: LogMudanca;
  size?: 'small' | 'large';
}

export const LogCard: React.FC<LogCardProps> = ({ log, size = 'small' }) => {
  const getCorPorAcao = (acao: string) => {
    switch (acao) {
      case 'adicionar': return 'bg-green-50 border-green-200 hover:bg-green-100';
      case 'remover': return 'bg-red-50 border-red-200 hover:bg-red-100';
      case 'mover': return 'bg-blue-50 border-blue-200 hover:bg-blue-100';
      case 'status': return 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100';
      default: return 'bg-gray-50 border-gray-200 hover:bg-gray-100';
    }
  };

  const getCorIndicador = (acao: string) => {
    switch (acao) {
      case 'adicionar': return 'bg-green-500';
      case 'remover': return 'bg-red-500';
      case 'mover': return 'bg-blue-500';
      case 'status': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  // Simulando múltiplas páginas para demonstração
  const paginas = log.pagina ? [log.pagina] : [];
  const numeroPaginas = paginas.length;
  const numeroAlteracoes = 1; // Por enquanto cada log representa 1 alteração

  const getPaginasTexto = () => {
    if (numeroPaginas === 0) return 'Página não especificada';
    if (numeroPaginas === 1) return paginas[0];
    return `${paginas[0]} +${numeroPaginas - 1}`;
  };

  return (
    <button
      className={`
        relative w-80 h-36 rounded-lg border-2 p-3 flex-shrink-0 text-left
        ${getCorPorAcao(log.acao)} transition-all duration-200 hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-[#457B9D] focus:ring-offset-2
      `}
      tabIndex={0}
    >
      {/* Indicador colorido lateral */}
      <div 
        className={`absolute left-0 top-0 w-1 h-full ${getCorIndicador(log.acao)} rounded-l-lg`}
      />
      
      <div className="flex flex-col h-full justify-between ml-2">
        {/* Título - Nome da Revista */}
        <div>
          <h4 className="text-base font-bold text-gray-900 mb-1">
            {log.jornal || 'Jornal não especificado'}
          </h4>
          
          {/* Subtítulo - Página(s) */}
          <p className="text-sm font-medium text-gray-700 mb-2">
            {getPaginasTexto()}
          </p>
          
          {/* Texto menor - Número de alterações */}
          <p className="text-xs text-gray-600">
            {numeroAlteracoes} alteração{numeroAlteracoes !== 1 ? 'ões' : ''} registrada{numeroAlteracoes !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Footer com timestamp */}
        <div className="flex justify-between items-end">
          <span className="text-xs text-gray-500">
            {new Date(log.timestamp).toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
          
          {/* Badge da ação */}
          <span className={`
            px-2 py-1 rounded-full text-xs font-medium
            ${log.acao === 'adicionar' ? 'bg-green-100 text-green-800' :
              log.acao === 'remover' ? 'bg-red-100 text-red-800' :
              log.acao === 'mover' ? 'bg-blue-100 text-blue-800' :
              log.acao === 'status' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'}
          `}>
            {log.acao.toUpperCase()}
          </span>
        </div>
      </div>
    </button>
  );
};
