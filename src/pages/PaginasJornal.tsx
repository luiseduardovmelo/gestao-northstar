
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PaginaCard } from '@/components/PaginaCard';
import { useData } from '@/context/DataContext';

const PaginasJornal = () => {
  const { jornalId } = useParams<{ jornalId: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const { jornais, paginas: allPaginas } = useData();
  const jornal = jornais.find(j => j.id === jornalId);
  const paginas = allPaginas.filter(p => p.jornalId === jornalId);

  const filteredPaginas = paginas.filter(pagina => {
    return pagina.nome.toLowerCase().includes(searchTerm.toLowerCase());
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

          {/* Busca */}
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Buscar páginas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Conteúdo - Grid com cards maiores */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 overflow-visible">
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
              Nenhuma página encontrada.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaginasJornal;
