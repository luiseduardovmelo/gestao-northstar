import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Operador } from '@/types';

interface EditValorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (novoValor: number) => void;
  operador: Operador | null;
}

export const EditValorModal: React.FC<EditValorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  operador
}) => {
  const [valor, setValor] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (operador && isOpen) {
      if (operador.valor > 0) {
        setValor(`€ ${operador.valor.toFixed(2).replace('.', ',')}`);
      } else {
        setValor('');
      }
      setErro('');
    }
  }, [operador, isOpen]);

  const handleSave = () => {
    const valorNumerico = parseFloat(valor.replace(/[^\d,]/g, '').replace(',', '.'));

    if (isNaN(valorNumerico) || valorNumerico < 0) {
      setErro('Por favor, insira um valor válido.');
      return;
    }

    onSave(valorNumerico);
    setValor('');
    setErro('');
    onClose();
  };

  const handleRemoveValue = () => {
    onSave(0);
    setValor('');
    setErro('');
    onClose();
  };

  const handleClose = () => {
    setValor('');
    setErro('');
    onClose();
  };

  const formatarValor = (value: string) => {
    const numeros = value.replace(/\D/g, '');
    if (!numeros) return '';
    const valorFormatado = (parseInt(numeros) / 100).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return `€ ${valorFormatado}`;
  };

  if (!operador) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Valor Fixo</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Operador: <strong>{operador.nome}</strong>
          </p>

          {operador.valor > 0 && (
            <p className="text-sm text-gray-500">
              Valor atual: <span className="text-green-600 font-semibold">€ {operador.valor.toFixed(2)}</span>
            </p>
          )}

          <div className="space-y-2">
            <Label htmlFor="valor">Novo Valor Fixo</Label>
            <Input
              id="valor"
              placeholder="€ 0,00"
              value={valor}
              onChange={(e) => {
                setValor(formatarValor(e.target.value));
                setErro('');
              }}
              className={erro ? 'border-red-500' : ''}
            />
            {erro && <p className="text-sm text-red-500">{erro}</p>}
            <p className="text-xs text-gray-400">
              Deixe em branco ou € 0,00 para remover o valor fixo
            </p>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          {operador.valor > 0 && (
            <Button variant="destructive" onClick={handleRemoveValue}>
              Remover Valor
            </Button>
          )}
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
