
import React, { useEffect, useRef } from 'react';
import { LogMudanca } from '@/types';
import { X } from 'lucide-react';

interface LogCardOverlayProps {
  log: LogMudanca;
  isOpen: boolean;
  onClose: () => void;
}

export const LogCardOverlay: React.FC<LogCardOverlayProps> = ({ log, isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const getCorPorAcao = (acao: string) => {
    switch (acao) {
      case 'adicionar': return 'bg-green-50';
      case 'remover': return 'bg-red-50';
      case 'mover': return 'bg-blue-50';
      case 'status': return 'bg-yellow-50';
      default: return 'bg-gray-50';
    }
  };

  // Simulando múltiplas alterações para demonstração
  const alteracoes = [
    {
      acao: log.acao,
      operador: log.operador || 'Operador',
      pagina: log.pagina || 'Página',
      detalhe: log.acao === 'mover' 
        ? `${log.valorAntigo || '#?'} → ${log.valorNovo || '#?'}`
        : log.acao === 'status'
        ? `${log.valorAntigo || 'Status'} → ${log.valorNovo || 'Status'}`
        : log.valorNovo || 'Alteração'
    },
    // Exemplos adicionais para demonstrar lista
    ...(Math.random() > 0.5 ? [{
      acao: 'status',
      operador: 'Outro Operador',
      pagina: log.pagina || 'Página',
      detalhe: 'Livre → Vendido'
    }] : [])
  ];

  const numeroAlteracoes = alteracoes.length;

  // Agrupar alterações por página
  const alteracoesPorPagina = alteracoes.reduce((acc, alteracao) => {
    const pagina = alteracao.pagina;
    if (!acc[pagina]) {
      acc[pagina] = [];
    }
    acc[pagina].push(alteracao);
    return acc;
  }, {} as Record<string, typeof alteracoes>);

  // Focus trap e keyboard handling
  useEffect(() => {
    if (isOpen && overlayRef.current) {
      overlayRef.current.focus();
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-30"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={overlayRef}
        className={`
          relative w-4/5 max-w-4xl max-h-[70vh] overflow-y-auto
          p-6 rounded-lg shadow-xl
          ${getCorPorAcao(log.acao)} bg-opacity-85
          transform transition-all duration-200 ease-out
          ${isOpen ? 'scale-100' : 'scale-90'}
        `}
        tabIndex={-1}
        style={{ outline: 'none' }}
      >
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors"
          aria-label="Fechar"
        >
          <X size={20} className="text-gray-600" />
        </button>

        {/* Conteúdo */}
        <div className="space-y-4 pr-8">
          {/* Título */}
          <h2 className="text-2xl font-bold text-gray-900">
            {log.jornal || 'Jornal não especificado'}
          </h2>

          {/* Linha divisória */}
          <div className="border-t border-gray-300"></div>

          {/* Alterações por página */}
          <div className="space-y-4">
            {Object.entries(alteracoesPorPagina).map(([pagina, alteracoesPagina]) => (
              <div key={pagina} className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {pagina}
                </h3>
                <ul className="space-y-1 ml-4">
                  {alteracoesPagina.map((alteracao, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-700" style={{ lineHeight: '20px' }}>
                      <span className="text-gray-400 mr-2 mt-1">•</span>
                      <span>
                        <strong className="uppercase font-medium">{alteracao.acao}</strong>
                        {' — '}
                        <span className="font-medium">{alteracao.operador}</span>
                        {' — '}
                        <span className="text-gray-600">{alteracao.detalhe}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Rodapé */}
          <div className="flex justify-end pt-4 border-t border-gray-300">
            <span className="text-xs text-gray-500">
              {numeroAlteracoes} alteraç{numeroAlteracoes !== 1 ? 'ões' : 'ão'} • {' '}
              {new Date(log.timestamp).toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              })} • Por {log.usuario}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
