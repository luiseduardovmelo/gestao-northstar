import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, TrendingUp } from 'lucide-react';

interface OperadorSummary {
  nome: string;
  totalPaginas: number;
  totalRevenue: number;
  jornais: string[];
}

type SortBy = 'paginas' | 'receita';

export const OperadorList: React.FC = () => {
  const { paginas } = useData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('paginas');

  // Agrupa operadores únicos
  const operadores = useMemo(() => {
    const operadoresMap = new Map<string, OperadorSummary>();

    paginas.forEach(pagina => {
      pagina.operadores.forEach(operador => {
        const key = operador.nome.toLowerCase().trim();

        if (operadoresMap.has(key)) {
          const existing = operadoresMap.get(key)!;
          existing.totalPaginas++;
          existing.totalRevenue += operador.valor;
        } else {
          operadoresMap.set(key, {
            nome: operador.nome,
            totalPaginas: 1,
            totalRevenue: operador.valor,
            jornais: []
          });
        }
      });
    });

    return Array.from(operadoresMap.values());
  }, [paginas]);

  // Filtra e ordena baseado no critério selecionado
  const sortedOperadores = useMemo(() => {
    const filtered = operadores.filter(op =>
      op.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      if (sortBy === 'paginas') {
        return b.totalPaginas - a.totalPaginas;
      } else {
        return b.totalRevenue - a.totalRevenue;
      }
    });
  }, [operadores, searchTerm, sortBy]);

  const top3 = sortedOperadores.slice(0, 3);
  const remaining = sortedOperadores.slice(3);

  const getPodiumColor = (index: number) => {
    if (index === 0) return 'from-yellow-400 to-yellow-600'; // Gold
    if (index === 1) return 'from-gray-300 to-gray-500'; // Silver
    if (index === 2) return 'from-amber-600 to-amber-800'; // Bronze
    return '';
  };

  const getPodiumIcon = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return '';
  };

  return (
    <div className="space-y-6">
      {/* Controles de busca e ordenação */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Input
          placeholder="Buscar operador..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <div className="flex gap-2">
          <Button
            variant={sortBy === 'paginas' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('paginas')}
            className="flex items-center gap-2"
          >
            <Trophy className="h-4 w-4" />
            Páginas Presentes
          </Button>
          <Button
            variant={sortBy === 'receita' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('receita')}
            className="flex items-center gap-2"
          >
            <TrendingUp className="h-4 w-4" />
            Receita
          </Button>
        </div>
      </div>

      {sortedOperadores.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {searchTerm ? 'Nenhum operador encontrado.' : 'Nenhum operador cadastrado.'}
          </p>
        </div>
      )}

      {sortedOperadores.length > 0 && (
        <>
          {/* Top 3 - Visual destacado */}
          {top3.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {top3.map((operador, index) => (
                <Card
                  key={operador.nome}
                  className="cursor-pointer hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 relative overflow-hidden"
                  onClick={() => navigate(`/operador/${encodeURIComponent(operador.nome)}`)}
                >
                  <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${getPodiumColor(index)}`} />
                  <CardContent className="pt-6 pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-4xl">{getPodiumIcon(index)}</div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500 font-medium">#{index + 1}</div>
                      </div>
                    </div>
                    <h3 className="font-bold text-xl mb-3 truncate">{operador.nome}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Páginas:</span>
                        <span className="font-semibold text-lg" style={{ color: '#2F6BFF' }}>
                          {operador.totalPaginas}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Receita:</span>
                        <span className="font-semibold text-lg text-green-600">
                          € {operador.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Restante dos operadores - Scrollable */}
          {remaining.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-4 text-gray-700">Outros Operadores</h3>
                <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
                  {remaining.map((operador, index) => (
                    <div
                      key={operador.nome}
                      className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                      onClick={() => navigate(`/operador/${encodeURIComponent(operador.nome)}`)}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
                          {index + 4}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-medium text-sm truncate">{operador.nome}</h4>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 ml-4">
                        <div className="text-right">
                          <div className="text-xs text-gray-500">Páginas</div>
                          <div className="font-semibold text-sm" style={{ color: '#2F6BFF' }}>
                            {operador.totalPaginas}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500">Receita</div>
                          <div className="font-semibold text-sm text-green-600">
                            € {operador.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};
