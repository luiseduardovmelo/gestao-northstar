
import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { OperadorCard } from '@/components/OperadorCard';
import { SlotVazio } from '@/components/SlotVazio';
import { AdicionarOperadorModal } from '@/components/AdicionarOperadorModal';
import { mockOperadores, mockPaginas, mockJornais } from '@/data/mockData';
import { Operador, RankingSlot, LogMudanca } from '@/types';
import { useToast } from '@/hooks/use-toast';

const GestaoOperadores = () => {
  const { jornalId, paginaId } = useParams<{ jornalId: string; paginaId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Estado inicial - criar 10 slots
  const [ranking, setRanking] = useState<RankingSlot[]>(() => {
    const slots: RankingSlot[] = [];
    for (let i = 1; i <= 10; i++) {
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
  const [hasChanges, setHasChanges] = useState(false);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const jornal = mockJornais.find(j => j.id === jornalId);
  const pagina = mockPaginas.find(p => p.id === paginaId);

  // Operadores disponíveis para adicionar
  const operadoresDisponiveis = [
    { nome: 'Bet365', cargo: 'Casa de Apostas', valor: 15000, logoUrl: '/placeholder.svg' },
    { nome: 'Betano', cargo: 'Casa de Apostas', valor: 12000, logoUrl: '/placeholder.svg' },
    { nome: 'Sportingbet', cargo: 'Casa de Apostas', valor: 10000, logoUrl: '/placeholder.svg' },
    { nome: 'Betfair', cargo: 'Casa de Apostas', valor: 8000, logoUrl: '/placeholder.svg' },
    { nome: 'KTO', cargo: 'Casa de Apostas', valor: 7000, logoUrl: '/placeholder.svg' },
  ];

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
      cargo: operadorData.cargo!,
      status: 'livre',
      valor: operadorData.valor!,
      ordem: slotSelecionado,
      logoUrl: operadorData.logoUrl
    };

    setRanking(prev => prev.map(slot => 
      slot.posicao === slotSelecionado 
        ? { ...slot, operador: novoOperador, isEmpty: false }
        : slot
    ));

    setHasChanges(true);
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
              vendidoEm: novoStatus === 'vendido' ? new Date().toISOString() : undefined
            } 
          }
        : slot
    ));
    setHasChanges(true);

    toast({
      title: "Status alterado",
      description: `${operador.nome} agora está ${novoStatus === 'vendido' ? 'vendido' : 'livre'}.`,
    });
  };

  const handleRemoveOperador = (operador: Operador) => {
    setRanking(prev => prev.map(slot => 
      slot.operador?.id === operador.id 
        ? { ...slot, operador: undefined, isEmpty: true }
        : slot
    ));
    setHasChanges(true);
  };

  const handleDragStart = (e: React.DragEvent, posicao: number) => {
    const slot = ranking.find(s => s.posicao === posicao);
    if (slot?.operador?.status === 'vendido') {
      e.preventDefault();
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

    setHasChanges(true);
    setDraggedItem(null);
  };

  const gerarLogs = useCallback((): LogMudanca[] => {
    // Simular geração de logs baseada nas mudanças
    const logs: LogMudanca[] = [];
    
    // Para esta implementação, vamos gerar logs de exemplo
    logs.push({
      id: Date.now().toString(),
      acao: 'mover',
      entidade: 'operador',
      operador: 'Bet365',
      valorAntigo: 'Posição #1',
      valorNovo: 'Posição #3',
      timestamp: new Date().toISOString(),
      usuario: 'Admin',
      pagina: pagina?.nome,
      jornal: jornal?.nome
    });

    return logs;
  }, [pagina, jornal]);

  const handleSalvarAlteracoes = () => {
    const novoLogs = gerarLogs();
    
    // Aqui salvaria no backend e atualizaria o log global
    console.log('Salvando alterações...', { ranking, logs: novoLogs });
    
    setHasChanges(false);
    
    toast({
      title: "Ranking salvo",
      description: "Todas as alterações foram salvas com sucesso.",
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
                  Ranking Top 10 - {pagina.nome}
                </h1>
                <p className="text-gray-600">{jornal.nome}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="container mx-auto px-4 py-8">
        {/* Grade 2x5 do ranking */}
        <div className="grid grid-cols-5 gap-6 max-w-5xl mx-auto">
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
                    isDragging={draggedItem === slot.posicao}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Botão Salvar Alterações - Fixo */}
      {hasChanges && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={handleSalvarAlteracoes}
            className="bg-[#457B9D] hover:bg-[#3a6b8a] text-white px-6 py-3 rounded-lg shadow-lg"
          >
            Salvar alterações
          </Button>
        </div>
      )}

      {/* Modal Adicionar Operador */}
      <AdicionarOperadorModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSlotSelecionado(null);
        }}
        onSelect={handleAdicionarOperador}
        operadoresDisponiveis={operadoresDisponiveis}
      />
    </div>
  );
};

export default GestaoOperadores;
