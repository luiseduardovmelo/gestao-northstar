import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { OperadorRankingCard } from '@/components/OperadorRankingCard';
import { OperadorGuide } from '@/components/OperadorGuide';
import { useData } from '@/context/DataContext';

const GestaoOperadores = () => {
  const { jornalId, paginaId } = useParams<{ jornalId: string; paginaId: string }>();
  const navigate = useNavigate();
  const { jornais, paginas } = useData();

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
            <div className="text-right">
              <p className="text-sm text-gray-500">Tráfego Mensal</p>
              <p className="text-2xl font-bold text-blue-600">
                {pagina.trafego.toLocaleString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Ranking de Operadores */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Ranking de Operadores
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {operadores.map((operador, index) => (
              <OperadorRankingCard
                key={operador.id}
                operador={operador}
                posicao={index + 1}
              />
            ))}
          </div>
        </div>

        {/* Guia dos Operadores */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Guia de Valores
          </h2>
          <OperadorGuide operadores={operadores} />
        </div>
      </div>
    </div>
  );
};

export default GestaoOperadores;
