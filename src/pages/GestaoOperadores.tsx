import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { OperadorRankingCard } from '@/components/OperadorRankingCard';
import { OperadorGuide } from '@/components/OperadorGuide';
import { DraggableOperadorGrid } from '@/components/DraggableOperadorGrid';
import { EditValorModal } from '@/components/EditValorModal';
import { ConfirmDeleteModal } from '@/components/ConfirmDeleteModal';
import { AdicionarOperadorModal } from '@/components/AdicionarOperadorModal';
import { useData } from '@/context/DataContext';
import { Operador } from '@/types';
import { Pencil, X, Plus, Copy } from 'lucide-react';
import { toast } from 'sonner';

const GestaoOperadores = () => {
  const { jornalId, paginaId } = useParams<{ jornalId: string; paginaId: string }>();
  const navigate = useNavigate();
  const { jornais, paginas, updateOperador, deleteOperador, addOperador, reorderOperadores } = useData();

  // Estados para modo de edição
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingOperador, setEditingOperador] = useState<Operador | null>(null);
  const [deletingOperador, setDeletingOperador] = useState<Operador | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Estados para tracking de mudanças (para botão "Copiar Dados")
  const [originalOperadores, setOriginalOperadores] = useState<Operador[]>([]);
  const [deletedOperadores, setDeletedOperadores] = useState<Operador[]>([]);

  const jornal = jornais.find(j => j.id === jornalId);
  const pagina = paginas.find(p => p.id === paginaId);

  if (!jornal || !pagina) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Página não encontrada</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // Operadores já vêm ordenados do Excel (índice no array = posição no ranking)
  const operadores = pagina.operadores;

  // Salva snapshot quando entra em modo de edição
  useEffect(() => {
    if (isEditMode && pagina) {
      setOriginalOperadores([...pagina.operadores]);
      setDeletedOperadores([]);
    }
  }, [isEditMode]);

  // Função para copiar dados formatados
  const handleCopyData = () => {
    const lines: string[] = [];

    // URL da página
    lines.push(`URL: ${pagina.url || 'N/A'}`);
    lines.push('');

    // Ranking atual com marcações
    operadores.forEach((op, idx) => {
      const isNew = originalOperadores.length > 0 && !originalOperadores.find(o => o.id === op.id);
      const originalIdx = originalOperadores.findIndex(o => o.id === op.id);
      const isChanged = !isNew && originalOperadores.length > 0 && originalIdx !== -1 && originalIdx !== idx;

      const marker = isNew ? ' (new)' : isChanged ? ' (change)' : '';

      lines.push(`${idx + 1}. ${op.nome}${marker}`);
    });

    // Operadores removidos
    if (deletedOperadores.length > 0) {
      lines.push('');
      lines.push('REMOVE:');
      deletedOperadores.forEach(op => {
        lines.push(`- ${op.nome}`);
      });
    }

    navigator.clipboard.writeText(lines.join('\n'));
    toast.success('Dados copiados para a área de transferência!');
  };

  // Handlers para edição
  const handleEditOperador = (operador: Operador) => {
    setEditingOperador(operador);
  };

  const handleSaveValor = async (novoValor: number) => {
    if (editingOperador && paginaId) {
      await updateOperador(paginaId, editingOperador.id, {
        valor: novoValor,
        status: novoValor > 0 ? 'vendido' : 'livre'
      });
    }
    setEditingOperador(null);
  };

  const handleDeleteOperador = (operador: Operador) => {
    setDeletingOperador(operador);
  };

  const handleConfirmDelete = async () => {
    if (deletingOperador && paginaId) {
      // Adiciona ao array de deletados para o "Copiar Dados"
      setDeletedOperadores(prev => [...prev, deletingOperador]);
      await deleteOperador(paginaId, deletingOperador.id);
    }
    setDeletingOperador(null);
  };

  const handleReorder = async (newOrder: string[]) => {
    if (paginaId) {
      await reorderOperadores(paginaId, newOrder);
    }
  };

  const handleAddOperador = async (operador: Partial<Operador>) => {
    if (paginaId) {
      const newOperador: Omit<Operador, 'id'> = {
        paginaId,
        nome: operador.nome || '',
        status: (operador.valor && operador.valor > 0) ? 'vendido' : 'livre',
        valor: operador.valor || 0,
        ordem: operadores.length + 1,
        logoUrl: operador.logoUrl
      };
      await addOperador(paginaId, newOperador, operadores.length + 1);
    }
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
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
                <h1 className="text-3xl font-bold text-gray-900">
                  {pagina.nome}
                </h1>
                <p className="text-gray-600 text-lg mt-1">
                  {jornal.nome}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Tráfego Mensal</p>
                <p className="text-2xl font-bold text-blue-600">
                  {pagina.trafego.toLocaleString('pt-BR')}
                </p>
              </div>
              {/* Botão de Edição */}
              <Button
                variant={isEditMode ? "destructive" : "default"}
                onClick={() => setIsEditMode(!isEditMode)}
                className={isEditMode ? "" : "bg-blue-600 hover:bg-blue-700"}
              >
                {isEditMode ? (
                  <>
                    <X className="w-4 h-4 mr-2" />
                    Sair da Edição
                  </>
                ) : (
                  <>
                    <Pencil className="w-4 h-4 mr-2" />
                    Editar Ranking
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Ranking de Operadores */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                Ranking de Operadores
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyData}
                className="text-gray-600 hover:text-gray-900"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copiar Dados
              </Button>
            </div>
            {isEditMode && (
              <Button
                variant="outline"
                onClick={() => setIsAddModalOpen(true)}
                className="text-green-600 border-green-600 hover:bg-green-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Operador
              </Button>
            )}
          </div>

          {isEditMode ? (
            <DraggableOperadorGrid
              operadores={operadores}
              onReorder={handleReorder}
              onEdit={handleEditOperador}
              onDelete={handleDeleteOperador}
            />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
              {operadores.map((operador, index) => (
                <OperadorRankingCard
                  key={operador.id}
                  operador={operador}
                  posicao={index + 1}
                />
              ))}
            </div>
          )}

          {operadores.length === 0 && (
            <div className="text-center py-12 bg-gray-100 rounded-lg">
              <p className="text-gray-500 text-lg">Nenhum operador cadastrado</p>
              {isEditMode && (
                <Button
                  variant="outline"
                  onClick={() => setIsAddModalOpen(true)}
                  className="mt-4 text-green-600 border-green-600 hover:bg-green-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Primeiro Operador
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Guia dos Operadores */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Guia de Valores
          </h2>
          <OperadorGuide operadores={operadores} />
        </div>
      </div>

      {/* Modais */}
      <EditValorModal
        isOpen={!!editingOperador}
        onClose={() => setEditingOperador(null)}
        onSave={handleSaveValor}
        operador={editingOperador}
      />

      <ConfirmDeleteModal
        isOpen={!!deletingOperador}
        onClose={() => setDeletingOperador(null)}
        onConfirm={handleConfirmDelete}
        operadorNome={deletingOperador?.nome || ''}
      />

      <AdicionarOperadorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSelect={handleAddOperador}
      />
    </div>
  );
};

export default GestaoOperadores;
