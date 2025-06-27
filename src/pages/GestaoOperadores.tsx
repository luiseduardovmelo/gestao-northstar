import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { OperadorCard } from '@/components/OperadorCard';
import { SlotVazio } from '@/components/SlotVazio';
import { AdicionarOperadorModal } from '@/components/AdicionarOperadorModal';
import { ConfirmDeleteModal } from '@/components/ConfirmDeleteModal';
import { VendaModal } from '@/components/VendaModal';
import { OperadorGuide } from '@/components/OperadorGuide';
import { mockOperadores, mockPaginas, mockJornais } from '@/data/mockData';
import { Operador, RankingSlot } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useLog } from '@/contexts/LogContext';

const GestaoOperadores = () => {
  const { jornalId, paginaId } = useParams<{ jornalId: string; paginaId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addPendingChange, saveChangesToLog, hasPendingChanges, clearPendingChanges } = useLog();
  
  const jornal = mockJornais.find(j => j.id === jornalId);
  const pagina = mockPaginas.find(p => p.id === paginaId);
  
  // Estado inicial - criar slots baseado no número de operadores da página
  const [ranking, setRanking] = useState<RankingSlot[]>(() => {
    const slots: RankingSlot[] = [];
    const numSlots = pagina?.numeroOperadores || 10;
    for (let i = 1; i <= numSlots; i++) {
      const operadorExistente = mockOperadores.find(op => op.ordem === i);
      slots.push({
        id: `slot-${i}`,
        posicao: i,
        operador: operadorExistente,
        isEmpty: !operadorExistente
      });
    }
    return slots;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slotSelecionado, setSlotSelecionado] = useState<number | null>(null);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  
  // Estados para modais de confirmação
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; operador: Operador | null }>({
    isOpen: false,
    operador: null
  });
  const [vendaModal, setVendaModal] = useState<{ isOpen: boolean; operador: Operador | null }>({
    isOpen: false,
    operador: null
  });

  // Operadores atualmente no ranking
  const operadoresNoRanking = ranking
    .filter(slot => !slot.isEmpty && slot.operador)
    .map(slot => slot.operador!);

  const handleAbrirModal = (posicao: number) => {
    setSlotSelecionado(posicao);
    setIsModalOpen(true);
  };

  const handleAdicionarOperador = (operadorData: Partial<Operador>) => {
    if (slotSelecionado === null) return;

    const novoOperador: Operador = {
      id: Date.now().toString(),
      paginaId: paginaId!,
      nome: operadorData.nome!,
      status: 'livre',
      valor: 0,
      ordem: slotSelecionado,
      logoUrl: operadorData.logoUrl
    };

    setRanking(prev => prev.map(slot => 
      slot.posicao === slotSelecionado 
        ? { ...slot, operador: novoOperador, isEmpty: false }
        : slot
    ));

    // Adicionar alteração pendente
    addPendingChange({
      id: Date.now().toString(),
      type: 'adicionar',
      operador: novoOperador.nome,
      slotDestino: slotSelecionado,
      description: `ADICIONADO: Operador ${novoOperador.nome} no slot ${slotSelecionado}`
    });

    setSlotSelecionado(null);
  };

  const handleStatusChange = (operador: Operador, novoStatus: 'livre' | 'vendido') => {
    setRanking(prev => prev.map(slot => 
      slot.operador?.id === operador.id 
        ? { 
            ...slot, 
            operador: { 
              ...slot.operador, 
              status: novoStatus,
              valor: novoStatus === 'livre' ? 0 : slot.operador.valor,
              vendidoEm: novoStatus === 'vendido' ? new Date().toISOString() : undefined
            } 
          }
        : slot
    ));

    // Adicionar alteração pendente
    addPendingChange({
      id: Date.now().toString(),
      type: 'status',
      operador: operador.nome,
      slotDestino: operador.ordem,
      description: `STATUS: Operador ${operador.nome} alterado para ${novoStatus === 'vendido' ? 'VENDIDO' : 'LIVRE'} no slot ${operador.ordem}`
    });

    toast({
      title: "Status alterado",
      description: `${operador.nome} agora está ${novoStatus === 'vendido' ? 'vendido' : 'livre'}.`,
    });
  };

  const handleRemoveOperador = (operador: Operador) => {
    if (operador.status === 'vendido') {
      toast({
        title: "Operação não permitida",
        description: "Operadores vendidos não podem ser removidos.",
        variant: "destructive",
      });
      return;
    }

    setDeleteModal({ isOpen: true, operador });
  };

  const handleConfirmDelete = () => {
    if (!deleteModal.operador) return;

    setRanking(prev => prev.map(slot => 
      slot.operador?.id === deleteModal.operador?.id 
        ? { ...slot, operador: undefined, isEmpty: true }
        : slot
    ));
    
    // Adicionar alteração pendente
    addPendingChange({
      id: Date.now().toString(),
      type: 'remover',
      operador: deleteModal.operador.nome,
      slotOrigem: deleteModal.operador.ordem,
      description: `REMOVIDO: Operador ${deleteModal.operador.nome} do slot ${deleteModal.operador.ordem}`
    });

    setDeleteModal({ isOpen: false, operador: null });
    
    toast({
      title: "Operador removido",
      description: `${deleteModal.operador.nome} foi removido da posição ${deleteModal.operador.ordem}.`,
    });
  };

  const handleSellOperador = (operador: Operador) => {
    if (operador.status === 'vendido') return;
    setVendaModal({ isOpen: true, operador });
  };

  const handleConfirmSale = (valor: number) => {
    if (!vendaModal.operador) return;

    setRanking(prev => prev.map(slot => 
      slot.operador?.id === vendaModal.operador?.id 
        ? { 
            ...slot, 
            operador: { 
              ...slot.operador, 
              status: 'vendido',
              valor: valor,
              vendidoEm: new Date().toISOString()
            } 
          }
        : slot
    ));
    
    // Adicionar alteração pendente
    addPendingChange({
      id: Date.now().toString(),
      type: 'status',
      operador: vendaModal.operador.nome,
      slotDestino: vendaModal.operador.ordem,
      valor: valor,
      description: `VENDIDO: Operador ${vendaModal.operador.nome} no slot ${vendaModal.operador.ordem} por R$ ${valor.toLocaleString()}`
    });
    
    setVendaModal({ isOpen: false, operador: null });
    
    toast({
      title: "Operador vendido",
      description: `${vendaModal.operador.nome} foi vendido por R$ ${valor.toLocaleString()}.`,
    });
  };

  const handleDragStart = (e: React.DragEvent, posicao: number) => {
    const slot = ranking.find(s => s.posicao === posicao);
    if (slot?.operador?.status === 'vendido') {
      e.preventDefault();
      toast({
        title: "Slot bloqueado",
        description: "Operadores vendidos não podem ser movidos.",
        variant: "destructive",
      });
      return;
    }
    setDraggedItem(posicao);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetPosicao: number) => {
    e.preventDefault();
    if (draggedItem === null) return;

    const targetSlot = ranking.find(s => s.posicao === targetPosicao);
    if (targetSlot?.operador?.status === 'vendido') {
      toast({
        title: "Slot bloqueado",
        description: "Não é possível mover para um slot com operador vendido.",
        variant: "destructive",
      });
      setDraggedItem(null);
      return;
    }

    const draggedSlot = ranking.find(s => s.posicao === draggedItem);
    
    // Registrar a movimentação antes de fazer a troca
    if (draggedSlot?.operador) {
      addPendingChange({
        id: Date.now().toString(),
        type: 'mover',
        operador: draggedSlot.operador.nome,
        slotOrigem: draggedItem,
        slotDestino: targetPosicao,
        description: `MOVIDO: Operador ${draggedSlot.operador.nome} do slot ${draggedItem} para slot ${targetPosicao}`
      });
    }

    // Trocar posições
    setRanking(prev => {
      const newRanking = [...prev];
      const draggedSlot = newRanking.find(s => s.posicao === draggedItem);
      const targetSlot = newRanking.find(s => s.posicao === targetPosicao);

      if (draggedSlot && targetSlot) {
        const tempOperador = draggedSlot.operador;
        const tempIsEmpty = draggedSlot.isEmpty;

        draggedSlot.operador = targetSlot.operador;
        draggedSlot.isEmpty = targetSlot.isEmpty;

        targetSlot.operador = tempOperador;
        targetSlot.isEmpty = tempIsEmpty;

        // Atualizar ordem dos operadores
        if (draggedSlot.operador) {
          draggedSlot.operador.ordem = draggedItem;
        }
        if (targetSlot.operador) {
          targetSlot.operador.ordem = targetPosicao;
        }
      }

      return newRanking;
    });

    setDraggedItem(null);
  };

  const handleSalvarAlteracoes = () => {
    if (!hasPendingChanges) {
      toast({
        title: "Nenhuma alteração",
        description: "Não há alterações pendentes para salvar.",
        variant: "destructive",
      });
      return;
    }

    // Salvar todas as alterações pendentes no log
    saveChangesToLog(jornal?.nome || 'Jornal', pagina?.nome || 'Página');
    
    toast({
      title: "Alterações salvas",
      description: "Todas as alterações foram registradas no log com sucesso.",
    });

    // Navegar de volta para o dashboard para ver o log
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const handleCancelarAlteracoes = () => {
    clearPendingChanges();
    toast({
      title: "Alterações canceladas",
      description: "Todas as alterações pendentes foram descartadas.",
    });
  };

  if (!jornal || !pagina) {
    return <div>Página não encontrada</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate(`/jornal/${jornalId}/paginas`)}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Voltar
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Ranking Top {pagina.numeroOperadores} - {pagina.nome}
                </h1>
                <p className="text-gray-600">
                  {jornal.nome} • {pagina.trafego.toLocaleString()} visitas/mês
                  {hasPendingChanges && (
                    <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      Alterações pendentes
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Grade dinâmica do ranking baseada no número de slots */}
        <div className={`grid gap-6 max-w-6xl mx-auto ${
          pagina.numeroOperadores <= 5 ? 'grid-cols-5' : 
          pagina.numeroOperadores <= 10 ? 'grid-cols-5' :
          'grid-cols-6'
        }`}>
          {ranking.map((slot) => (
            <div
              key={slot.id}
              className={`${draggedItem === slot.posicao ? 'border-2 border-dashed border-[#457B9D]' : ''}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, slot.posicao)}
            >
              {slot.isEmpty ? (
                <SlotVazio
                  posicao={slot.posicao}
                  onAddOperador={() => handleAbrirModal(slot.posicao)}
                />
              ) : (
                <div
                  draggable={slot.operador?.status !== 'vendido'}
                  onDragStart={(e) => handleDragStart(e, slot.posicao)}
                  className={draggedItem === slot.posicao ? 'opacity-50' : ''}
                >
                  <OperadorCard
                    operador={slot.operador!}
                    posicao={slot.posicao}
                    onStatusChange={handleStatusChange}
                    onRemove={handleRemoveOperador}
                    onSell={handleSellOperador}
                    isDragging={draggedItem === slot.posicao}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Guia dos Operadores */}
        <OperadorGuide operadores={operadoresNoRanking} />
      </div>

      {/* Botões de Ação - Fixos */}
      {hasPendingChanges && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          <Button
            onClick={handleCancelarAlteracoes}
            variant="outline"
            className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg shadow-lg border"
          >
            Cancelar alterações
          </Button>
          <Button
            onClick={handleSalvarAlteracoes}
            className="bg-[#457B9D] hover:bg-[#3a6b8a] text-white px-6 py-3 rounded-lg shadow-lg"
          >
            Salvar alterações
          </Button>
        </div>
      )}

      {/* Modais */}
      <AdicionarOperadorModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSlotSelecionado(null);
        }}
        onSelect={handleAdicionarOperador}
      />

      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, operador: null })}
        onConfirm={handleConfirmDelete}
        operadorNome={deleteModal.operador?.nome || ''}
      />

      <VendaModal
        isOpen={vendaModal.isOpen}
        onClose={() => setVendaModal({ isOpen: false, operador: null })}
        onConfirm={handleConfirmSale}
        operadorNome={vendaModal.operador?.nome || ''}
      />
    </div>
  );
};

export default GestaoOperadores;
