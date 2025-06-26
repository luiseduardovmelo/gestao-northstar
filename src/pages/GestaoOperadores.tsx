
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OperadorRow } from '@/components/OperadorRow';
import { mockOperadores, mockPaginas, mockJornais } from '@/data/mockData';
import { Operador } from '@/types';
import { useToast } from '@/hooks/use-toast';

const GestaoOperadores = () => {
  const { jornalId, paginaId } = useParams<{ jornalId: string; paginaId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [operadores, setOperadores] = useState<Operador[]>(mockOperadores);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Operador>>({});
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newOperadorForm, setNewOperadorForm] = useState<Partial<Operador>>({
    nome: '',
    cargo: '',
    valor: 0,
    status: 'livre'
  });

  const jornal = mockJornais.find(j => j.id === jornalId);
  const pagina = mockPaginas.find(p => p.id === paginaId);

  const handleEdit = (id: string) => {
    const operador = operadores.find(o => o.id === id);
    if (operador) {
      setEditingId(id);
      setEditForm(operador);
    }
  };

  const handleSave = (updatedOperador: Operador) => {
    setOperadores(prev => 
      prev.map(op => op.id === updatedOperador.id ? updatedOperador : op)
    );
    setEditingId(null);
    setEditForm({});
    
    toast({
      title: "Operador atualizado",
      description: `${updatedOperador.nome} foi atualizado com sucesso.`,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id: string) => {
    const operador = operadores.find(o => o.id === id);
    if (operador?.status === 'vendido') return;
    
    setOperadores(prev => prev.filter(o => o.id !== id));
    
    toast({
      title: "Operador removido",
      description: `Operador foi removido com sucesso.`,
      variant: "destructive",
    });
  };

  const handleAddNew = () => {
    if (!newOperadorForm.nome || !newOperadorForm.cargo || !newOperadorForm.valor) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const novoOperador: Operador = {
      id: Date.now().toString(),
      paginaId: paginaId!,
      nome: newOperadorForm.nome!,
      cargo: newOperadorForm.cargo!,
      status: 'livre',
      valor: newOperadorForm.valor!,
      ordem: operadores.length + 1
    };

    setOperadores(prev => [...prev, novoOperador]);
    setIsAddingNew(false);
    setNewOperadorForm({ nome: '', cargo: '', valor: 0, status: 'livre' });
    
    toast({
      title: "Operador adicionado",
      description: `${novoOperador.nome} foi adicionado com sucesso.`,
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
                  {pagina.nome}
                </h1>
                <p className="text-gray-600">{jornal.nome}</p>
              </div>
            </div>
            
            <Button
              onClick={() => setIsAddingNew(true)}
              className="bg-[#2F6BFF] hover:bg-[#1E4FCC]"
            >
              Adicionar Operador
            </Button>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="container mx-auto px-4 py-8">
        {/* Formulário de Novo Operador */}
        {isAddingNew && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Novo Operador</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input
                  placeholder="Nome"
                  value={newOperadorForm.nome || ''}
                  onChange={(e) => setNewOperadorForm(prev => ({ ...prev, nome: e.target.value }))}
                />
                <Input
                  placeholder="Cargo"
                  value={newOperadorForm.cargo || ''}
                  onChange={(e) => setNewOperadorForm(prev => ({ ...prev, cargo: e.target.value }))}
                />
                <Input
                  type="number"
                  placeholder="Valor"
                  value={newOperadorForm.valor || ''}
                  onChange={(e) => setNewOperadorForm(prev => ({ ...prev, valor: Number(e.target.value) }))}
                />
                <div className="flex space-x-2">
                  <Button onClick={handleAddNew} className="bg-green-600 hover:bg-green-700">
                    Salvar
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabela de Operadores */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ordem
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cargo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {operadores.map((operador) => (
                    <OperadorRow
                      key={operador.id}
                      operador={operador}
                      isEditing={editingId === operador.id}
                      onEdit={() => handleEdit(operador.id)}
                      onSave={handleSave}
                      onCancel={handleCancel}
                      onDelete={() => handleDelete(operador.id)}
                      editForm={editForm}
                      setEditForm={setEditForm}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {operadores.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum operador cadastrado ainda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GestaoOperadores;
