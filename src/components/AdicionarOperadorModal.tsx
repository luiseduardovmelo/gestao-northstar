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
import { Checkbox } from '@/components/ui/checkbox';
import { Search, ArrowLeft } from 'lucide-react';
import { Operador } from '@/types';
import { useData } from '@/context/DataContext';

interface AdicionarOperadorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (operador: Partial<Operador>) => void;
}

export const AdicionarOperadorModal: React.FC<AdicionarOperadorModalProps> = ({
  isOpen,
  onClose,
  onSelect
}) => {
  const { getUniqueOperadores } = useData();
  const [search, setSearch] = useState('');
  const [step, setStep] = useState<'select' | 'valor'>('select');
  const [selectedOperador, setSelectedOperador] = useState<{ nome: string; logoUrl?: string } | null>(null);
  const [temValorFixo, setTemValorFixo] = useState(false);
  const [valorFixo, setValorFixo] = useState('');

  const operadoresDisponiveis = getUniqueOperadores();
  const operadoresFiltrados = operadoresDisponiveis.filter(op =>
    op.nome.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectOperador = (operador: { nome: string; logoUrl?: string }) => {
    setSelectedOperador(operador);
    setStep('valor');
  };

  const handleConfirm = () => {
    if (!selectedOperador) return;

    let valor = 0;
    if (temValorFixo && valorFixo) {
      valor = parseFloat(valorFixo.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    }

    onSelect({
      nome: selectedOperador.nome,
      logoUrl: selectedOperador.logoUrl,
      valor,
      status: valor > 0 ? 'vendido' : 'livre'
    });

    // Reset state
    setSearch('');
    setStep('select');
    setSelectedOperador(null);
    setTemValorFixo(false);
    setValorFixo('');
  };

  const handleClose = () => {
    setSearch('');
    setStep('select');
    setSelectedOperador(null);
    setTemValorFixo(false);
    setValorFixo('');
    onClose();
  };

  const handleBack = () => {
    setStep('select');
    setSelectedOperador(null);
    setTemValorFixo(false);
    setValorFixo('');
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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 'select' ? 'Adicionar Operador' : 'Definir Valor Fixo'}
          </DialogTitle>
        </DialogHeader>

        {step === 'select' ? (
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
                  onClick={() => handleSelectOperador(operador)}
                >
                  {/* Logo do operador */}
                  {operador.logoUrl ? (
                    <div
                      className="w-8 h-8 rounded bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url(${operador.logoUrl})` }}
                    />
                  ) : (
                    <div className="w-8 h-8 rounded bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-500 text-xs font-bold">
                      {operador.nome.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 truncate">
                      {operador.nome}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {operadoresFiltrados.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>Nenhum operador encontrado</p>
                <p className="text-xs mt-2">Os operadores disponíveis são baseados nos já cadastrados em outras páginas</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <Button variant="ghost" size="sm" onClick={handleBack} className="mb-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Operador selecionado:</p>
              <p className="font-semibold text-lg">{selectedOperador?.nome}</p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="temValorFixo"
                checked={temValorFixo}
                onCheckedChange={(checked) => setTemValorFixo(checked === true)}
              />
              <Label htmlFor="temValorFixo" className="cursor-pointer">
                Este operador tem valor fixo
              </Label>
            </div>

            {temValorFixo && (
              <div className="space-y-2">
                <Label htmlFor="valorFixo">Valor Fixo</Label>
                <Input
                  id="valorFixo"
                  placeholder="€ 0,00"
                  value={valorFixo}
                  onChange={(e) => setValorFixo(formatarValor(e.target.value))}
                />
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
              <Button onClick={handleConfirm} className="bg-green-600 hover:bg-green-700">
                Adicionar
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
