
import React, { useState, useRef, useEffect } from 'react';
import { LogMudanca } from '@/types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface LogCardProps {
  log: LogMudanca;
  size?: 'small' | 'large';
  onDragStart?: () => void;
  onExpandChange?: (isExpanded: boolean) => void;
}

export const LogCard: React.FC<LogCardProps> = ({ 
  log, 
  size = 'small', 
  onDragStart,
  onExpandChange 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLButtonElement>(null);

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

  // Usar alterações do log se disponíveis, senão criar uma lista padrão
  const alteracoes = log.alteracoes || [
    log.acao === 'mover' 
      ? `${log.valorAntigo || '#?'} → ${log.valorNovo || '#?'}`
      : log.acao === 'status'
      ? `${log.valorAntigo || 'Status'} → ${log.valorNovo || 'Status'}`
      : log.valorNovo || 'Alteração'
  ];

  const numeroAlteracoes = alteracoes.length;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    if (onExpandChange) {
      onExpandChange(newExpanded);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newExpanded = !isExpanded;
      setIsExpanded(newExpanded);
      if (onExpandChange) {
        onExpandChange(newExpanded);
      }
    } else if (e.key === 'Escape' && isExpanded) {
      e.preventDefault();
      setIsExpanded(false);
      if (onExpandChange) {
        onExpandChange(false);
      }
    }
  };

  const handleDragStart = () => {
    if (isExpanded) {
      setIsExpanded(false);
      if (onExpandChange) {
        onExpandChange(false);
      }
    }
    if (onDragStart) {
      onDragStart();
    }
  };

  useEffect(() => {
    if (onDragStart) {
      const element = cardRef.current?.parentElement;
      if (element) {
        element.addEventListener('dragstart', handleDragStart);
        return () => element.removeEventListener('dragstart', handleDragStart);
      }
    }
  }, [onDragStart]);

  return (
    <button
      ref={cardRef}
      className={`
        relative w-full rounded-md border-2 p-4 text-left shadow-sm
        ${getCorPorAcao(log.acao)} transition-all duration-250 hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-[#457B9D] focus:ring-offset-2
        min-h-[160px]
      `}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Indicador colorido lateral */}
      <div 
        className={`absolute left-0 top-0 w-1 h-full ${getCorIndicador(log.acao)} rounded-l-md`}
      />
      
      {/* Ícone de expansão */}
      <div className="absolute top-4 right-4">
        {isExpanded ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
      </div>
      
      <div className="flex flex-col ml-2 pr-6">
        {/* Conteúdo principal sempre visível */}
        <div className="flex flex-col justify-between min-h-[120px]">
          {/* Título - Nome da Revista */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">
              {log.jornal || 'Jornal não especificado'}
            </h4>
            
            {/* Subtítulo - Página */}
            <p className="text-sm font-medium text-gray-700 mb-2 leading-5 max-h-10 overflow-hidden">
              {log.pagina || 'Página não especificada'}
            </p>
            
            {/* Texto menor - Número de alterações */}
            <p className="text-xs text-gray-600 mb-2">
              {numeroAlteracoes} alteração{numeroAlteracoes !== 1 ? 'ões' : ''} registrada{numeroAlteracoes !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Footer com timestamp */}
          <div className="flex justify-start items-end mt-auto">
            <span className="text-xs text-gray-500">
              {new Date(log.timestamp).toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>

        {/* Conteúdo expandido */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h5 className="text-sm font-semibold text-gray-800 mb-2">Alterações detalhadas:</h5>
            <ul className="space-y-1">
              {alteracoes.map((alteracao, index) => (
                <li key={index} className="text-xs text-gray-600 flex items-start">
                  <span className="text-gray-400 mr-2">•</span>
                  <span>{alteracao}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </button>
  );
};
