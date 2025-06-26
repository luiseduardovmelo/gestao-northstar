
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PaginaCard } from '@/components/PaginaCard';
import { mockPaginas, mockJornais } from '@/data/mockData';
import { StatusFilter } from '@/types';

const PaginasJornal = () => {
  const { jornalId } = useParams<{ jornalId: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('todos');

  const jornal = mockJornais.find(j => j.id === jornalId);
  const paginas = mockPaginas.filter(p => p.jornalId === jornalId);

  const filteredPaginas = paginas.filter(pagina => {
    const matchesSearch = pagina.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || pagina.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!jornal) {
    return <div>Jornal não encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Fixo */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Voltar
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">
                {jornal.nome}
              </h1>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar páginas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="flex gap-2">
              {(['todos', 'ativa', 'inativa', 'manutencao'] as StatusFilter[]).map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? 'default' : 'outline'}
                  onClick={() => setStatusFilter(status)}
                  className={statusFilter === status ? 'bg-[#2F6BFF] hover:bg-[#1E4FCC]' : ''}
                >
                  {status === 'todos' ? 'Todos' : status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPaginas.map((pagina) => (
            <PaginaCard 
              key={pagina.id} 
              pagina={pagina} 
              jornalId={jornalId!}
            />
          ))}
        </div>

        {filteredPaginas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhuma página encontrada com os filtros aplicados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaginasJornal;
