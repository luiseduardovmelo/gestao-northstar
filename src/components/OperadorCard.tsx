
import React from 'react';
import { Operador } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Lock, Unlock, GripVertical, Trash } from 'lucide-react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

interface OperadorCardProps {
  operador: Operador;
  posicao: number;
  onStatusChange: (operador: Operador, novoStatus: 'livre' | 'vendido') => void;
  onRemove: (operador: Operador) => void;
  onSell: (operador: Operador) => void;
  isDragging?: boolean;
}

export const OperadorCard: React.FC<OperadorCardProps> = ({
  operador,
  posicao,
  onStatusChange,
  onRemove,
  onSell,
  isDragging = false
}) => {
  const isVendido = operador.status === 'vendido';
  const valorExibido = isVendido ? operador.valor : 0;

  const handleToggleStatus = () => {
    if (isVendido) {
      // Liberando operador vendido
      onStatusChange(operador, 'livre');
    } else {
      // Vendendo operador livre - abre modal para definir valor
      onSell(operador);
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className={`
            relative bg-white rounded-lg border border-gray-200 p-4 h-32
            transition-all duration-200 cursor-grab active:cursor-grabbing
            ${isDragging ? 'opacity-50 scale-105' : 'hover:shadow-md hover:-translate-y-1'}
            ${isVendido ? 'opacity-75 cursor-not-allowed' : ''}
          `}
          draggable={!isVendido}
        >
          {/* Número da posição */}
          <div className="absolute -top-2 -left-2 bg-[#457B9D] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            {posicao}
          </div>

          {/* Ícone de cadeado/desbloqueio no canto superior direito */}
          <button
            onClick={handleToggleStatus}
            className={`
              absolute top-2 right-2 p-1 rounded transition-colors
              ${isVendido 
                ? 'text-orange-600 hover:text-orange-800 hover:bg-orange-50' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }
            `}
            aria-label={isVendido ? 'Liberar operador' : 'Vender operador'}
          >
            {isVendido ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
          </button>

          {/* Ícone de exclusão (apenas quando livre) */}
          {!isVendido && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(operador);
              }}
              className="absolute top-8 right-2 p-1 rounded transition-colors text-red-400 hover:text-red-600 hover:bg-red-50"
              aria-label="Remover operador"
            >
              <Trash className="w-4 h-4" />
            </button>
          )}

          {/* Ícone de arrastar (apenas quando livre) */}
          {!isVendido && (
            <div className="absolute bottom-2 right-2 text-gray-400">
              <GripVertical className="w-4 h-4" />
            </div>
          )}

          {/* Logo do operador (se disponível) */}
          {operador.logoUrl && (
            <div className="w-8 h-8 rounded bg-gray-100 mb-2 bg-cover bg-center" 
                 style={{ backgroundImage: `url(${operador.logoUrl})` }} />
          )}

          {/* Nome do operador */}
          <h3 className="font-semibold text-sm text-gray-900 mb-2 truncate pr-12">
            {operador.nome}
          </h3>

          {/* Badge de status e valor */}
          <div className="flex items-center justify-between">
            <Badge
              variant={isVendido ? "default" : "secondary"}
              className={`
                text-xs
                ${isVendido 
                  ? 'bg-orange-100 text-orange-800 border-orange-200' 
                  : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                }
              `}
            >
              {isVendido ? 'Vendido' : 'Livre'}
            </Badge>

            {/* Valor */}
            <span className="text-xs font-medium text-gray-700">
              R$ {valorExibido.toLocaleString()}
            </span>
          </div>
        </div>
      </ContextMenuTrigger>
      
      <ContextMenuContent>
        {!isVendido && (
          <ContextMenuItem onClick={() => onSell(operador)}>
            Vender Operador
          </ContextMenuItem>
        )}
        {isVendido && (
          <ContextMenuItem onClick={() => onStatusChange(operador, 'livre')}>
            Liberar Operador
          </ContextMenuItem>
        )}
        {!isVendido && (
          <ContextMenuItem 
            onClick={() => onRemove(operador)}
            className="text-red-600"
          >
            Remover
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
};
