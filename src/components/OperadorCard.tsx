
import React from 'react';
import { Operador } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Lock, GripVertical } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface OperadorCardProps {
  operador: Operador;
  posicao: number;
  onStatusChange: (operador: Operador, novoStatus: 'livre' | 'vendido') => void;
  onRemove: (operador: Operador) => void;
  isDragging?: boolean;
}

export const OperadorCard: React.FC<OperadorCardProps> = ({
  operador,
  posicao,
  onStatusChange,
  onRemove,
  isDragging = false
}) => {
  const isVendido = operador.status === 'vendido';

  return (
    <div
      className={`
        relative bg-white rounded-lg border border-gray-200 p-4 h-32
        transition-all duration-200 cursor-grab active:cursor-grabbing
        ${isDragging ? 'opacity-50 scale-105' : 'hover:shadow-md hover:-translate-y-1'}
        ${isVendido ? 'opacity-75' : ''}
      `}
      draggable={!isVendido}
    >
      {/* Número da posição */}
      <div className="absolute -top-2 -left-2 bg-[#457B9D] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
        {posicao}
      </div>

      {/* Ícone de arrastar */}
      {!isVendido && (
        <div className="absolute top-2 right-2 text-gray-400">
          <GripVertical className="w-4 h-4" />
        </div>
      )}

      {/* Cadeado para vendido */}
      {isVendido && (
        <Popover>
          <PopoverTrigger asChild>
            <div className="absolute top-2 right-2 text-gray-600 cursor-pointer hover:text-gray-800">
              <Lock className="w-4 h-4" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            <div className="space-y-2">
              <p className="text-sm font-medium">Alterar status</p>
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                onClick={() => onStatusChange(operador, 'livre')}
              >
                Liberar slot
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}

      {/* Logo do operador (se disponível) */}
      {operador.logoUrl && (
        <div className="w-8 h-8 rounded bg-gray-100 mb-2 bg-cover bg-center" 
             style={{ backgroundImage: `url(${operador.logoUrl})` }} />
      )}

      {/* Nome do operador */}
      <h3 className="font-semibold text-sm text-gray-900 mb-2 truncate">
        {operador.nome}
      </h3>

      {/* Badge de status e valor */}
      <div className="flex items-center justify-between">
        <Popover>
          <PopoverTrigger asChild>
            <Badge
              variant={isVendido ? "default" : "secondary"}
              className={`
                cursor-pointer text-xs
                ${isVendido 
                  ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                  : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                }
              `}
            >
              {isVendido ? 'Vendido' : 'Livre'}
            </Badge>
          </PopoverTrigger>
          <PopoverContent className="w-32">
            <div className="space-y-1">
              <Button
                size="sm"
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => onStatusChange(operador, 'livre')}
              >
                Livre
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => onStatusChange(operador, 'vendido')}
              >
                Vendido
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Valor */}
        <span className="text-xs font-medium text-gray-700">
          R$ {operador.valor.toLocaleString()}
        </span>
      </div>
    </div>
  );
};
