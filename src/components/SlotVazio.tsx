
import React from 'react';
import { Plus } from 'lucide-react';

interface SlotVazioProps {
  posicao: number;
  onAddOperador: () => void;
}

export const SlotVazio: React.FC<SlotVazioProps> = ({ posicao, onAddOperador }) => {
  return (
    <div
      className="
        relative bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 h-32
        flex flex-col items-center justify-center cursor-pointer
        hover:border-[#457B9D] hover:bg-blue-50 transition-all duration-200
        group
      "
      onClick={onAddOperador}
    >
      {/* Número da posição */}
      <div className="absolute -top-2 -left-2 bg-gray-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
        {posicao}
      </div>

      {/* Ícone de adicionar */}
      <Plus className="w-8 h-8 text-gray-400 group-hover:text-[#457B9D] transition-colors duration-200" />
      
      <span className="text-xs text-gray-500 group-hover:text-[#457B9D] mt-1 transition-colors duration-200">
        Adicionar
      </span>
    </div>
  );
};
