import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Operador } from '@/types';
import { OperadorRankingCard } from './OperadorRankingCard';

interface SortableItemProps {
  operador: Operador;
  posicao: number;
  onEdit: (operador: Operador) => void;
  onDelete: (operador: Operador) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({ operador, posicao, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: operador.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <OperadorRankingCard
        operador={operador}
        posicao={posicao}
        isEditing={true}
        onEdit={onEdit}
        onDelete={onDelete}
        isDragging={isDragging}
        dragHandleProps={listeners}
      />
    </div>
  );
};

interface DraggableOperadorGridProps {
  operadores: Operador[];
  onReorder: (newOrder: string[]) => void;
  onEdit: (operador: Operador) => void;
  onDelete: (operador: Operador) => void;
}

export const DraggableOperadorGrid: React.FC<DraggableOperadorGridProps> = ({
  operadores,
  onReorder,
  onEdit,
  onDelete,
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      const oldIndex = operadores.findIndex((op) => op.id === active.id);
      const newIndex = operadores.findIndex((op) => op.id === over.id);

      const newOrder = arrayMove(operadores, oldIndex, newIndex).map((op) => op.id);
      onReorder(newOrder);
    }
  };

  const activeOperador = activeId ? operadores.find((op) => op.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={operadores.map((op) => op.id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {operadores.map((operador, index) => (
            <SortableItem
              key={operador.id}
              operador={operador}
              posicao={index + 1}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeOperador ? (
          <div className="opacity-90">
            <OperadorRankingCard
              operador={activeOperador}
              posicao={operadores.findIndex((op) => op.id === activeId) + 1}
              isDragging={true}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
