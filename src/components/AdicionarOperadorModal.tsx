
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Operador } from '@/types';

interface AdicionarOperadorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (operador: Partial<Operador>) => void;
  operadoresDisponiveis: Partial<Operador>[];
}

export const AdicionarOperadorModal: React.FC<AdicionarOperadorModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  operadoresDisponiveis
}) => {
  const [search, setSearch] = useState('');

  const operadoresFiltrados = operadoresDisponiveis.filter(op =>
    op.nome?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (operador: Partial<Operador>) => {
    onSelect(operador);
    setSearch('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Operador</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Campo de pesquisa */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Pesquisar operador..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Lista de operadores */}
          <div className="max-h-64 overflow-y-auto space-y-2">
            {operadoresFiltrados.map((operador, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
                onClick={() => handleSelect(operador)}
              >
                {/* Logo do operador */}
                {operador.logoUrl ? (
                  <div 
                    className="w-8 h-8 rounded bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: `url(${operador.logoUrl})` }}
                  />
                ) : (
                  <div className="w-8 h-8 rounded bg-gray-200 flex-shrink-0" />
                )}

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900 truncate">
                    {operador.nome}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {operador.cargo}
                  </p>
                </div>

                <div className="text-xs text-gray-500">
                  R$ {operador.valor?.toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {operadoresFiltrados.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>Nenhum operador encontrado</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
