import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface JornalStats {
  jornalNome: string;
  jornalId: string;
  totalPaginas: number;
  totalTrafego: number;
  paginasPagas: number;
  paginasNaoPagas: number;
  paginas: Array<{
    nome: string;
    posicao: number;
    valor: number;
    trafego: number;
    isPago: boolean;
  }>;
}

const OperadorDetail: React.FC = () => {
  const { operadorName } = useParams<{ operadorName: string }>();
  const navigate = useNavigate();
  const { jornais, paginas } = useData();

  const operadorStats = useMemo(() => {
    if (!operadorName) return null;

    const decodedName = decodeURIComponent(operadorName);
    const jornalStatsMap = new Map<string, JornalStats>();
    let totalPaginas = 0;
    let totalRevenue = 0;
    let totalTrafego = 0;
    let totalPaginasPagas = 0;
    let totalPaginasNaoPagas = 0;

    paginas.forEach(pagina => {
      pagina.operadores.forEach((operador, index) => {
        if (operador.nome.toLowerCase().trim() === decodedName.toLowerCase().trim()) {
          const isPago = operador.valor > 0;

          totalPaginas++;
          totalRevenue += operador.valor;
          totalTrafego += pagina.trafego || 0;

          if (isPago) {
            totalPaginasPagas++;
          } else {
            totalPaginasNaoPagas++;
          }

          const jornal = jornais.find(j => j.id === pagina.jornalId);
          if (!jornal) return;

          if (!jornalStatsMap.has(pagina.jornalId)) {
            jornalStatsMap.set(pagina.jornalId, {
              jornalNome: jornal.nome,
              jornalId: pagina.jornalId,
              totalPaginas: 0,
              totalTrafego: 0,
              paginasPagas: 0,
              paginasNaoPagas: 0,
              paginas: []
            });
          }

          const stats = jornalStatsMap.get(pagina.jornalId)!;
          stats.totalPaginas++;
          stats.totalTrafego += pagina.trafego || 0;

          if (isPago) {
            stats.paginasPagas++;
          } else {
            stats.paginasNaoPagas++;
          }

          stats.paginas.push({
            nome: pagina.nome,
            posicao: index + 1,
            valor: operador.valor,
            trafego: pagina.trafego || 0,
            isPago
          });
        }
      });
    });

    return {
      nome: decodedName,
      totalPaginas,
      totalRevenue,
      totalTrafego,
      totalPaginasPagas,
      totalPaginasNaoPagas,
      jornais: Array.from(jornalStatsMap.values()).sort((a, b) =>
        b.totalPaginas - a.totalPaginas
      )
    };
  }, [operadorName, paginas, jornais]);

  if (!operadorStats) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="container mx-auto">
          <Button onClick={() => navigate('/')}>← Voltar</Button>
          <div className="text-center py-12">
            <p className="text-gray-500">Operador não encontrado.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            ← Voltar ao Dashboard
          </Button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {operadorStats.nome}
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div>
              <p className="text-xs text-gray-500 mb-1">Total de Páginas</p>
              <p className="font-semibold text-2xl text-gray-900">
                {operadorStats.totalPaginas}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Páginas Pagas</p>
              <p className="font-semibold text-2xl text-green-600">
                {operadorStats.totalPaginasPagas}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Páginas Não Pagas</p>
              <p className="font-semibold text-2xl text-orange-600">
                {operadorStats.totalPaginasNaoPagas}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Receita Total</p>
              <p className="font-semibold text-2xl text-gray-900">
                € {operadorStats.totalRevenue.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Tráfego Total</p>
              <p className="font-semibold text-2xl text-gray-900">
                {operadorStats.totalTrafego.toLocaleString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {operadorStats.jornais.map(jornalStat => (
            <Card key={jornalStat.jornalId}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{jornalStat.jornalNome}</span>
                  <div className="flex gap-4 text-sm font-normal text-gray-600">
                    <span>
                      {jornalStat.totalPaginas} página{jornalStat.totalPaginas !== 1 ? 's' : ''}
                    </span>
                    <span className="text-green-600">
                      {jornalStat.paginasPagas} paga{jornalStat.paginasPagas !== 1 ? 's' : ''}
                    </span>
                    <span className="text-orange-600">
                      {jornalStat.paginasNaoPagas} não paga{jornalStat.paginasNaoPagas !== 1 ? 's' : ''}
                    </span>
                    <span>
                      Tráfego: {jornalStat.totalTrafego.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4 font-semibold text-gray-700">
                          Página
                        </th>
                        <th className="text-center py-2 px-4 font-semibold text-gray-700">
                          Posição
                        </th>
                        <th className="text-right py-2 px-4 font-semibold text-gray-700">
                          Tráfego
                        </th>
                        <th className="text-right py-2 px-4 font-semibold text-gray-700">
                          Valor
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {jornalStat.paginas.map((paginaInfo, idx) => (
                        <tr key={idx} className={`border-b hover:bg-gray-50 ${!paginaInfo.isPago ? 'bg-orange-50' : ''}`}>
                          <td className="py-2 px-4">{paginaInfo.nome}</td>
                          <td className="py-2 px-4 text-center">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-semibold">
                              {paginaInfo.posicao}
                            </span>
                          </td>
                          <td className="py-2 px-4 text-right text-gray-600">
                            {paginaInfo.trafego.toLocaleString('pt-BR')}
                          </td>
                          <td className="py-2 px-4 text-right font-medium">
                            {paginaInfo.isPago ? (
                              <span className="text-green-600">€ {paginaInfo.valor.toFixed(2)}</span>
                            ) : (
                              <span className="text-orange-600">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {operadorStats.jornais.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Nenhum dado encontrado para este operador.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OperadorDetail;
