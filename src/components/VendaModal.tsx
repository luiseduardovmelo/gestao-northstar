
import React, { useState } from 'react';
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

interface VendaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (valor: number) => void;
  operadorNome: string;
}

export const VendaModal: React.FC<VendaModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  operadorNome
}) => {
  const [valor, setValor] = useState('');
  const [erro, setErro] = useState('');

  const handleConfirm = () => {
    const valorNumerico = parseFloat(valor.replace(/[^\d,]/g, '').replace(',', '.'));
    
    if (!valorNumerico || valorNumerico <= 0) {
      setErro('Por favor, insira um valor maior que zero.');
      return;
    }

    onConfirm(valorNumerico);
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
    const valorFormatado = (parseInt(numeros) / 100).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return valorFormatado === '0,00' ? '' : `R$ ${valorFormatado}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Vender Operador</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Definir valor de venda para: <strong>{operadorNome}</strong>
          </p>
          
          <div className="space-y-2">
            <Label htmlFor="valor">Valor de Venda *</Label>
            <Input
              id="valor"
              placeholder="R$ 0,00"
              value={valor}
              onChange={(e) => {
                setValor(formatarValor(e.target.value));
                setErro('');
              }}
              className={erro ? 'border-red-500' : ''}
            />
            {erro && <p className="text-sm text-red-500">{erro}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm} className="bg-[#457B9D] hover:bg-[#3a6b8a]">
            Confirmar Venda
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
