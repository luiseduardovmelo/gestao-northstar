
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Jornal } from '@/types';

interface HeatmapSlotsProps {
  jornais: Jornal[];
  filters: {
    jornal: string;
    status: string;
    valorMin: number;
    valorMax: number;
  };
}

export const HeatmapSlots: React.FC<HeatmapSlotsProps> = ({ jornais, filters }) => {
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [filtroJornal, setFiltroJornal] = useState('todos');
  const [filtroStatus, setFiltroStatus] = useState('todos');

  // Gerar todos os slots de todos os jornais
  const todosSlots = jornais.flatMap(jornal => 
    jornal.paginas?.flatMap(pagina => 
      pagina.operadores?.map(operador => ({
        ...operador,
        jornal: jornal.nome,
        pagina: pagina.nome,
        jornalSlug: jornal.slug
      })) || []
    ) || []
  );

  // Filtrar slots
  const slotsFiltrados = todosSlots.filter(slot => {
    if (filtroJornal !== 'todos' && slot.jornal !== filtroJornal) return false;
    if (filtroStatus !== 'todos' && slot.status !== filtroStatus) return false;
    return true;
  });

  const getSlotColor = (slot: any) => {
    if (slot.status === 'vendido') return 'bg-blue-500 hover:bg-blue-600';
    return 'bg-green-500 hover:bg-green-600';
  };

  const getSlotTooltip = (slot: any) => {
    return `${slot.nome || 'Slot'} - ${slot.jornal}\n${slot.pagina}\nR$ ${slot.valor.toLocaleString()}\nStatus: ${slot.status}`;
  };

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex flex-wrap gap-4">
        <Select value={filtroJornal} onValueChange={setFiltroJornal}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrar por jornal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os jornais</SelectItem>
            {jornais.map(jornal => (
              <SelectItem key={jornal.id} value={jornal.nome}>{jornal.nome}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filtroStatus} onValueChange={setFiltroStatus}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os status</SelectItem>
            <SelectItem value="vendido">Vendido</SelectItem>
            <SelectItem value="livre">Livre</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>Vendido</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Livre</span>
          </div>
        </div>
      </div>

      {/* Grid de Slots */}
      <div className="grid grid-cols-8 md:grid-cols-12 lg:grid-cols-16 xl:grid-cols-20 gap-1 p-4 bg-gray-50 rounded-lg">
        {slotsFiltrados.map((slot, index) => (
          <div
            key={`${slot.jornal}-${slot.pagina}-${slot.id || index}`}
            className={`
              w-8 h-8 rounded cursor-pointer transition-all duration-200 relative group
              ${getSlotColor(slot)}
            `}
            title={getSlotTooltip(slot)}
            onClick={() => setSelectedSlot(slot)}
          >
            {/* Tooltip hover */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
              <div className="bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                {slot.nome || 'Slot'}<br />
                {slot.jornal} - {slot.pagina}<br />
                R$ {slot.valor.toLocaleString()}<br />
                {slot.status === 'vendido' ? 'Vendido' : 'Livre'}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {slotsFiltrados.filter(s => s.status === 'vendido').length}
          </div>
          <div className="text-sm text-gray-600">Vendidos</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {slotsFiltrados.filter(s => s.status === 'livre').length}
          </div>
          <div className="text-sm text-gray-600">Livres</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-2xl font-bold text-gray-600">
            {slotsFiltrados.length}
          </div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">
            {slotsFiltrados.length > 0 ? ((slotsFiltrados.filter(s => s.status === 'vendido').length / slotsFiltrados.length) * 100).toFixed(0) : 0}%
          </div>
          <div className="text-sm text-gray-600">Ocupação</div>
        </div>
      </div>

      {/* Modal de detalhes do slot */}
      {selectedSlot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setSelectedSlot(null)}>
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4">Detalhes do Slot</h3>
            <div className="space-y-2">
              <p><strong>Operador:</strong> {selectedSlot.nome || 'Não definido'}</p>
              <p><strong>Jornal:</strong> {selectedSlot.jornal}</p>
              <p><strong>Página:</strong> {selectedSlot.pagina}</p>
              <p><strong>Valor:</strong> R$ {selectedSlot.valor.toLocaleString()}</p>
              <p><strong>Status:</strong> {selectedSlot.status === 'vendido' ? 'Vendido' : 'Livre'}</p>
            </div>
            <div className="flex gap-2 mt-6">
              <Button 
                variant={selectedSlot.status === 'vendido' ? 'outline' : 'default'}
                onClick={() => setSelectedSlot(null)}
              >
                {selectedSlot.status === 'vendido' ? 'Liberar Slot' : 'Marcar como Vendido'}
              </Button>
              <Button variant="outline" onClick={() => setSelectedSlot(null)}>
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
