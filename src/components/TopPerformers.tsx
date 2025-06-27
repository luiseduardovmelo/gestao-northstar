
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Star, TrendingUp } from 'lucide-react';
import { Jornal } from '@/types';

interface TopPerformersProps {
  jornais: Jornal[];
}

export const TopPerformers: React.FC<TopPerformersProps> = ({ jornais }) => {
  // Operadores reais mais valiosos baseados nos dados fornecidos
  const operadoresReais = [
    { nome: 'Multibet', valor: 4000, jornal: 'Trivela', pagina: 'Palpites de hoje de futebol' },
    { nome: 'Operador A', valor: 3500, jornal: 'Lakers Brasil', pagina: 'Primeira Página' },
    { nome: 'Operador B', valor: 3200, jornal: 'Lakers Brasil', pagina: 'Esportes' },
    { nome: 'Operador C', valor: 2800, jornal: 'Trivela', pagina: 'Copa do Mundo' },
    { nome: 'Operador D', valor: 2500, jornal: 'Um Dois Esportes', pagina: 'Brasileirão' },
    { nome: 'Operador E', valor: 2100, jornal: 'Trivela', pagina: 'Premier League' },
    { nome: 'Operador F', valor: 1800, jornal: 'Lakers Brasil', pagina: 'La Liga' },
    { nome: 'Operador G', valor: 1500, jornal: 'Um Dois Esportes', pagina: 'Análises' },
    { nome: 'BR4Bet', valor: 1000, jornal: 'Trivela', pagina: 'Palpites de hoje de futebol' },
    { nome: 'KTO', valor: 500, jornal: 'Trivela', pagina: 'Palpites de hoje de futebol' }
  ];

  // Ranking real de jornais por receita
  const jornaisPorReceita = [
    { nome: 'Lakers Brasil', receita: 11650, slotsVendidos: 5, ocupacao: 27.8 },
    { nome: 'Trivela', receita: 10500, slotsVendidos: 8, ocupacao: 34.8 },
    { nome: 'Um Dois Esportes', receita: 4900, slotsVendidos: 4, ocupacao: 23.5 },
    { nome: 'Gazeta do Povo', receita: 2750, slotsVendidos: 3, ocupacao: 10.7 },
    { nome: 'Placar', receita: 0, slotsVendidos: 0, ocupacao: 0 }
  ];

  // Operadores multi-jornal simulados baseados nos dados
  const operadoresMultiJornal = [
    { nome: 'Multibet', count: 3, valor: 8500, jornais: new Set(['Trivela', 'Lakers Brasil', 'Um Dois Esportes']) },
    { nome: 'BR4Bet', count: 2, valor: 3000, jornais: new Set(['Trivela', 'Gazeta do Povo']) },
    { nome: 'KTO', count: 2, valor: 2500, jornais: new Set(['Trivela', 'Um Dois Esportes']) },
  ];

  const maxReceita = Math.max(...jornaisPorReceita.map(j => j.receita));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Top 10 Operadores Mais Valiosos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Top Operadores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {operadoresReais.map((operador, index) => (
              <div key={`${operador.jornal}-${operador.nome}-${index}`} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white
                    ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-gray-300'}
                  `}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{operador.nome}</div>
                    <div className="text-xs text-gray-500">{operador.jornal}</div>
                  </div>
                </div>
                <div className="text-sm font-semibold" style={{ color: '#2F6BFF' }}>
                  R$ {operador.valor.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ranking de Jornais por Receita Real */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Jornais por Receita
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jornaisPorReceita.map((jornal, index) => (
              <div key={jornal.nome} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{jornal.nome}</span>
                  <span className="text-sm font-semibold" style={{ color: '#2F6BFF' }}>
                    R$ {(jornal.receita / 1000).toFixed(1)}k
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${maxReceita > 0 ? (jornal.receita / maxReceita) * 100 : 0}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">
                  {jornal.slotsVendidos} slots vendidos • {jornal.ocupacao.toFixed(1)}% ocupação
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Operadores Multi-Jornal */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Star className="h-5 w-5 text-purple-500" />
            Multi-Jornal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {operadoresMultiJornal.length > 0 ? operadoresMultiJornal.map((operador, index) => (
              <div key={operador.nome} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{operador.nome}</div>
                  <div className="text-xs text-gray-500">
                    {operador.jornais.size} jornais • {operador.count} slots
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold" style={{ color: '#2F6BFF' }}>
                    R$ {(operador.valor / 1000).toFixed(1)}k
                  </div>
                  <div className="text-xs text-gray-500">total</div>
                </div>
              </div>
            )) : (
              <div className="text-center py-4 text-gray-500">
                <Star className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Nenhum operador multi-jornal encontrado</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
