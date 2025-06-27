
import React, { useState } from 'react';
import { TrivelalLog } from '@/utils/trivelaBoardLogs';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

interface TrevelaLogCardProps {
  log: TrivelalLog;
}

export const TrevelaLogCard: React.FC<TrevelaLogCardProps> = ({ log }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200">
      <button
        onClick={handleToggleExpand}
        onKeyDown={handleKeyDown}
        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
        tabIndex={0}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <h4 className="text-lg font-bold text-gray-900">{log.jornal}</h4>
            </div>
            
            <p className="text-sm font-medium text-gray-700 mb-1">
              {log.pagina}
            </p>
            
            <p className="text-xs text-gray-600 mb-2">
              {log.totalAlteracoes} alteração{log.totalAlteracoes !== 1 ? 'ões' : ''} registrada{log.totalAlteracoes !== 1 ? 's' : ''}
            </p>
            
            <p className="text-xs text-gray-500">
              {log.timestamp}
            </p>
          </div>
          
          <div className="ml-4">
            {isExpanded ? (
              <ChevronUp size={20} className="text-gray-500" />
            ) : (
              <ChevronDown size={20} className="text-gray-500" />
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
        </div>
      )}
    </div>
  );
};
