
import React, { useState } from 'react';
import { TrivelaBoardLog, removeTrevelaLog } from '@/utils/trivelaBoardLogs';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TrevelaLogCardProps {
  log: TrivelaBoardLog;
  onLogRemoved: () => void;
}

export const TrevelaLogCard: React.FC<TrevelaLogCardProps> = ({ log, onLogRemoved }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleResolve = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      removeTrevelaLog(log.id);
      onLogRemoved();
      toast({
        title: "Log finalizado com sucesso",
        description: "O log foi removido da lista.",
      });
    } catch (error) {
      console.error('Erro ao resolver log:', error);
      toast({
        title: "Erro ao finalizar log",
        description: "Não foi possível remover o log. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <h4 className="text-lg font-bold text-gray-900">{log.pagina}</h4>
          </div>
        </div>
        
        <button
          onClick={handleResolve}
          className="flex items-center gap-1 px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded-full transition-colors"
          aria-label="Marcar como resolvido"
        >
          <Check size={12} />
          Resolvido
        </button>
      </div>

      <p className="text-xs text-gray-600 mb-2">
        {log.totalAlteracoes} alteração{log.totalAlteracoes !== 1 ? 'ões' : ''} registrada{log.totalAlteracoes !== 1 ? 's' : ''}
      </p>
      
      <p className="text-xs text-gray-500 mb-3">
        {log.timestamp}
      </p>

      <button
        onClick={handleToggleExpand}
        onKeyDown={handleKeyDown}
        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
        tabIndex={0}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm text-blue-600 font-medium">
            {isExpanded ? 'Ocultar detalhes' : 'Ver detalhes'}
          </span>
          <div className="ml-4">
            {isExpanded ? (
              <ChevronUp size={16} className="text-gray-500" />
            ) : (
              <ChevronDown size={16} className="text-gray-500" />
            )}
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-blue-200">
          <h5 className="text-sm font-semibold text-gray-800 mb-3">Detalhes das alterações:</h5>
          <ul className="space-y-2">
            {log.alteracoes.map((alteracao, index) => (
              <li key={index} className="flex items-start text-sm text-gray-700">
                <span className="text-blue-400 mr-2 mt-1">•</span>
                <span className="leading-5">{alteracao}</span>
              </li>
            ))}
          </ul>
          
          <div className="flex justify-end mt-4 pt-3 border-t border-blue-200">
            <button
              onClick={handleResolve}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-md transition-colors"
            >
              <Check size={14} />
              Resolvido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
