
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Search, Filter, TrendingUp, Users } from 'lucide-react';

// Dados reais dos operadores da planilha Excel
const operadoresReais = [
  {
    id: 'stake',
    nome: 'Stake',
    presencas: 3,
    receitaTotal: 7700,
    detalhes: [
      { jornal: 'Trivela', pagina: 'Casas de apostas', valor: 2000, status: 'vendido' },
      { jornal: 'Um Dois Esportes', pagina: 'Fortune tiger', valor: 1500, status: 'vendido' },
      { jornal: 'Lakers Brasil', pagina: 'Sites de apostas confiáveis', valor: 4200, status: 'vendido' }
    ]
  },
  {
    id: 'betano',
    nome: 'Betano',
    presencas: 4,
    receitaTotal: 7500,
    detalhes: [
      { jornal: 'Trivela', pagina: 'Plataforma que mais paga', valor: 3500, status: 'vendido' },
      { jornal: 'Um Dois Esportes', pagina: 'Plataformas legalizadas', valor: 1200, status: 'vendido' },
      { jornal: 'Gazeta do Povo', pagina: 'Plataformas legalizadas', valor: 0, status: 'livre' },
      { jornal: 'Lakers Brasil', pagina: 'Melhores bets', valor: 2800, status: 'vendido' }
    ]
  },
  {
    id: 'superbet',
    nome: 'Superbet',
    presencas: 3,
    receitaTotal: 4450,
    detalhes: [
      { jornal: 'Trivela', pagina: 'Novas casas de apostas', valor: 1800, status: 'vendido' },
      { jornal: 'Gazeta do Povo', pagina: 'Bônus sem depósito', valor: 0, status: 'livre' },
      { jornal: 'Lakers Brasil', pagina: 'Apps de apostas', valor: 2650, status: 'vendido' }
    ]
  },
  {
    id: 'lottoland',
    nome: 'Lottoland',
    presencas: 2,
    receitaTotal: 2750,
    detalhes: [
      { jornal: 'Lakers Brasil', pagina: 'Casas de apostas com bônus', valor: 2000, status: 'vendido' },
      { jornal: 'Gazeta do Povo', pagina: 'Bônus sem depósito', valor: 750, status: 'vendido' }
    ]
  },
  {
    id: 'br4bet',
    nome: 'BR4Bet',
    presencas: 2,
    receitaTotal: 2500,
    detalhes: [
      { jornal: 'Trivela', pagina: 'Apps de apostas', valor: 1200, status: 'vendido' },
      { jornal: 'Um Dois Esportes', pagina: 'Plataforma de 10 reais', valor: 1300, status: 'vendido' }
    ]
  },
  {
    id: 'betboom',
    nome: 'Betboom',
    presencas: 1,
    receitaTotal: 2000,
    detalhes: [
      { jornal: 'Trivela', pagina: 'Casas de apostas que aceitam Pix', valor: 2000, status: 'vendido' }
    ]
  },
  {
    id: 'novibet',
    nome: 'Novibet',
    presencas: 1,
    receitaTotal: 1000,
    detalhes: [
      { jornal: 'Trivela', pagina: 'Melhores bets', valor: 1000, status: 'vendido' }
    ]
  },
  {
    id: 'multibet',
    nome: 'Multibet',
    presencas: 2,
    receitaTotal: 900,
    detalhes: [
      { jornal: 'Um Dois Esportes', pagina: 'Plataforma de 5 reais', valor: 900, status: 'vendido' },
      { jornal: 'Gazeta do Povo', pagina: 'Plataformas legalizadas', valor: 0, status: 'livre' }
    ]
  },
  {
    id: 'operadores-livres',
    nome: 'Operadores Livres',
    presencas: 9,
    receitaTotal: 0,
    detalhes: [
      { jornal: 'Gazeta do Povo', pagina: 'Plataformas legalizadas', valor: 0, status: 'livre', operadores: ['KTO', 'Alfabet', 'Hanzbet', 'Estrelabet'] },
      { jornal: 'Gazeta do Povo', pagina: 'Bônus sem depósito', valor: 0, status: 'livre', operadores: ['Bacana Play', 'Esportiva Bet', 'Betwarrior'] }
    ]
  }
];

interface OperadorExpandibleListProps {
  className?: string;
}

export const OperadorExpandibleList: React.FC<OperadorExpandibleListProps> = ({ className }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'receita' | 'presencas' | 'alfabetica'>('receita');
  const [filterStatus, setFilterStatus] = useState<'todos' | 'vendido' | 'livre'>('todos');

  // Estatísticas calculadas
  const totalOperadores = operadoresReais.length;
  const totalPresencas = operadoresReais.reduce((acc, op) => acc + op.presencas, 0);
  const receitaConsolidada = operadoresReais.reduce((acc, op) => acc + op.receitaTotal, 0);

  const toggleExpanded = (operadorId: string) => {
    setExpandedItems(prev =>
      prev.includes(operadorId)
        ? prev.filter(id => id !== operadorId)
        : [...prev, operadorId]
    );
  };

  const expandAll = () => {
    setExpandedItems(operadoresReais.map(op => op.id));
  };

  const collapseAll = () => {
    setExpandedItems([]);
  };

  // Filtro e ordenação
  const filteredOperadores = operadoresReais
    .filter(operador => {
      const matchesSearch = operador.nome.toLowerCase().includes(searchTerm.toLowerCase());
      if (filterStatus === 'todos') return matchesSearch;
      
      const hasStatus = operador.detalhes.some(detalhe => detalhe.status === filterStatus);
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
                  R$ {receitaConsolidada.toLocaleString()}
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
              onChange={(e) => setFilterStatus(e.target.value as 'todos' | 'vendido' | 'livre')}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="todos">Todos os Status</option>
              <option value="vendido">Apenas Vendidos</option>
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
                              <span>{operador.presencas} presenças</span>
                              <span className="font-medium" style={{ color: '#2F6BFF' }}>
                                R$ {operador.receitaTotal.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">
                            {operador.detalhes.filter(d => d.status === 'vendido').length} vendidos
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
                        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                          <div className="flex-1">
                            <div className="font-medium text-sm">{detalhe.jornal}</div>
                            <div className="text-xs text-gray-600">{detalhe.pagina}</div>
                            {detalhe.operadores && (
                              <div className="text-xs text-gray-500 mt-1">
                                {detalhe.operadores.join(', ')}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge
                              variant={detalhe.status === 'vendido' ? 'default' : 'secondary'}
                              className={
                                detalhe.status === 'vendido'
                                  ? 'bg-blue-100 text-blue-800 border-blue-200'
                                  : 'bg-green-100 text-green-800 border-green-200'
                              }
                            >
                              {detalhe.status === 'vendido' ? 'Vendido' : 'Livre'}
                            </Badge>
                            <span className="text-sm font-medium">
                              {detalhe.valor > 0 ? `R$ ${detalhe.valor.toLocaleString()}` : '-'}
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
        </CardContent>
      </Card>
    </div>
  );
};
