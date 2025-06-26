
import React from 'react';
import { Operador } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface OperadorRowProps {
  operador: Operador;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (operador: Operador) => void;
  onCancel: () => void;
  onDelete: () => void;
  editForm: Partial<Operador>;
  setEditForm: (form: Partial<Operador>) => void;
}

export const OperadorRow: React.FC<OperadorRowProps> = ({
  operador,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  editForm,
  setEditForm
}) => {
  const isVendido = operador.status === 'vendido';

  return (
    <tr 
      className={`
        border-b border-gray-200 transition-all duration-200
        ${isVendido ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-50'}
      `}
    >
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <div 
            className="w-2 h-8 bg-gray-300 cursor-move rounded"
            style={{ cursor: isVendido ? 'not-allowed' : 'move' }}
          />
          <span className="text-sm font-medium text-gray-900">#{operador.ordem}</span>
        </div>
      </td>
      
      <td className="px-6 py-4">
        {isEditing ? (
          <Input
            value={editForm.nome || ''}
            onChange={(e) => setEditForm({ ...editForm, nome: e.target.value })}
            className="w-full"
          />
        ) : (
          <span className="text-sm text-gray-900">{operador.nome}</span>
        )}
      </td>
      
      <td className="px-6 py-4">
        <span className={`
          inline-flex px-2 py-1 text-xs font-medium rounded-full
          ${operador.status === 'vendido' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
          }
        `}>
          {operador.status === 'vendido' ? '✓ Vendido' : 'Livre'}
        </span>
      </td>
      
      <td className="px-6 py-4">
        {isEditing ? (
          <Input
            type="number"
            value={editForm.valor || ''}
            onChange={(e) => setEditForm({ ...editForm, valor: Number(e.target.value) })}
            className="w-full"
          />
        ) : (
          <span className="text-sm font-medium text-gray-900">
            R$ {operador.valor.toLocaleString()}
          </span>
        )}
      </td>
      
      <td className="px-6 py-4">
        <div className="flex space-x-2">
          {!isVendido && (
            <>
              {isEditing ? (
                <>
                  <Button
                    size="sm"
                    onClick={() => onSave({ ...operador, ...editForm })}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Salvar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onCancel}
                  >
                    Cancelar
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onEdit}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={onDelete}
                  >
                    Deletar
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
