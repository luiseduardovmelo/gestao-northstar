import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Search, TrendingUp, Users } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { useNavigate } from 'react-router-dom';

interface OperadorExpandibleListProps {
  className?: string;
}

export const OperadorExpandibleList: React.FC<OperadorExpandibleListProps> = ({ className }) => {
  const { jornais, paginas } = useData();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'receita' | 'presencas' | 'alfabetica'>('receita');
  const [filterStatus, setFilterStatus] = useState<'todos' | 'pago' | 'livre'>('todos');

  // Calcular dados dos operadores
  const operadoresData = useMemo(() => {
    const operadoresMap = new Map<string, {
      id: string;
      nome: string;
      presencas: number;
      receitaTotal: number;
      detalhes: Array<{
        jornal: string;
        pagina: string;
        valor: number;
        isPago: boolean;
      }>;
    }>();

    paginas.forEach(pagina => {
      const jornal = jornais.find(j => j.id === pagina.jornalId);
      if (!jornal) return;

      pagina.operadores.forEach(operador => {
        const key = operador.nome.toLowerCase().trim();

        if (!operadoresMap.has(key)) {
          operadoresMap.set(key, {
            id: key,
            nome: operador.nome,
            presencas: 0,
            receitaTotal: 0,
            detalhes: []
          });
        }

        const opData = operadoresMap.get(key)!;
        opData.presencas++;
        opData.receitaTotal += operador.valor;
        opData.detalhes.push({
          jornal: jornal.nome,
          pagina: pagina.nome,
          valor: operador.valor,
          isPago: operador.valor > 0
        });
      });
    });

    return Array.from(operadoresMap.values());
  }, [jornais, paginas]);

  // Estatísticas calculadas
  const totalOperadores = operadoresData.length;
  const totalPresencas = operadoresData.reduce((acc, op) => acc + op.presencas, 0);
  const receitaConsolidada = operadoresData.reduce((acc, op) => acc + op.receitaTotal, 0);

  const toggleExpanded = (operadorId: string) => {
    setExpandedItems(prev =>
      prev.includes(operadorId)
        ? prev.filter(id => id !== operadorId)
        : [...prev, operadorId]
    );
  };

  const expandAll = () => {
    setExpandedItems(operadoresData.map(op => op.id));
  };

  const collapseAll = () => {
    setExpandedItems([]);
  };

  // Filtro e ordenação
  const filteredOperadores = operadoresData
    .filter(operador => {
      const matchesSearch = operador.nome.toLowerCase().includes(searchTerm.toLowerCase());
      if (filterStatus === 'todos') return matchesSearch;

      const hasStatus = operador.detalhes.some(detalhe =>
        filterStatus === 'pago' ? detalhe.isPago : !detalhe.isPago
      );
      return matchesSearch && hasStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'receita':
          return b.receitaTotal - a.receitaTotal;
        case 'presencas':
          return b.presencas - a.presencas;
        case 'alfabetica':
          return a.nome.localeCompare(b.nome);
        default:
          return 0;
      }
    });

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header com estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Total de Operadores</p>
                <p className="text-2xl font-bold" style={{ color: '#2F6BFF' }}>{totalOperadores}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Total de Presenças</p>
                <p className="text-2xl font-bold text-green-600">{totalPresencas}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Receita Consolidada</p>
                <p className="text-2xl font-bold" style={{ color: '#2F6BFF' }}>
                  € {receitaConsolidada.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controles de filtro e busca */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <CardTitle className="text-lg">Lista de Operadores</CardTitle>
            <div className="flex gap-2">
              <Button onClick={expandAll} variant="outline" size="sm">
                Expandir Todos
              </Button>
              <Button onClick={collapseAll} variant="outline" size="sm">
                Contrair Todos
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar operador..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'receita' | 'presencas' | 'alfabetica')}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="receita">Por Receita</option>
              <option value="presencas">Por Presenças</option>
              <option value="alfabetica">Alfabética</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'todos' | 'pago' | 'livre')}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="todos">Todos os Status</option>
              <option value="pago">Apenas Pagos</option>
              <option value="livre">Apenas Livres</option>
            </select>
          </div>

          {/* Lista de operadores */}
          <div className="space-y-2">
            {filteredOperadores.map((operador) => (
              <Collapsible
                key={operador.id}
                open={expandedItems.includes(operador.id)}
                onOpenChange={() => toggleExpanded(operador.id)}
              >
                <CollapsibleTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-md transition-all duration-200">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h3 className="font-semibold text-lg">{operador.nome}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>{operador.presencas} presença{operador.presencas !== 1 ? 's' : ''}</span>
                              <span className="font-medium" style={{ color: '#2F6BFF' }}>
                                € {operador.receitaTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="secondary"
                            className="cursor-pointer hover:bg-blue-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/operador/${encodeURIComponent(operador.nome)}`);
                            }}
                          >
                            Ver detalhes
                          </Badge>
                          <Badge variant="secondary">
                            {operador.detalhes.filter(d => d.isPago).length} pago{operador.detalhes.filter(d => d.isPago).length !== 1 ? 's' : ''}
                          </Badge>
                          {expandedItems.includes(operador.id) ? (
                            <ChevronUp className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleTrigger>

                <CollapsibleContent className="px-6 pb-4">
                  <div className="bg-gray-50 rounded-lg p-4 mt-2">
                    <div className="space-y-3">
                      {operador.detalhes.map((detalhe, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0 ${
                            !detalhe.isPago ? 'bg-orange-50 -mx-2 px-2 rounded' : ''
                          }`}
                        >
                          <div className="flex-1">
                            <div className="font-medium text-sm">{detalhe.jornal}</div>
                            <div className="text-xs text-gray-600">{detalhe.pagina}</div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge
                              variant={detalhe.isPago ? 'default' : 'secondary'}
                              className={
                                detalhe.isPago
                                  ? 'bg-green-100 text-green-800 border-green-200'
                                  : 'bg-orange-100 text-orange-800 border-orange-200'
                              }
                            >
                              {detalhe.isPago ? 'Pago' : 'Livre'}
                            </Badge>
                            <span className="text-sm font-medium min-w-[80px] text-right">
                              {detalhe.isPago ? (
                                <span className="text-green-600">
                                  € {detalhe.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                              ) : (
                                <span className="text-orange-600">-</span>
                              )}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>

          {filteredOperadores.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum operador encontrado.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
