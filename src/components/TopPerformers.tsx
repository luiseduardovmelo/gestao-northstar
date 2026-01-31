import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Star, TrendingUp } from 'lucide-react';
import { Jornal, Pagina } from '@/types';

interface TopPerformersProps {
  dadosJornais: Array<{
    nome: string;
    receita: number;
    slotsVendidos: number;
    slotsTotal: number;
    ocupacao: number;
  }>;
  paginas: Pagina[];
  jornais: Jornal[];
}

export const TopPerformers: React.FC<TopPerformersProps> = ({ dadosJornais, paginas, jornais }) => {
  // Calcular top operadores com dados reais
  const topOperadores = useMemo(() => {
    const operadoresMap = new Map<string, { nome: string; valor: number; jornal: string; pagina: string }[]>();

    paginas.forEach(pagina => {
      const jornal = jornais.find(j => j.id === pagina.jornalId);
      if (!jornal) return;

      pagina.operadores.forEach(operador => {
        if (operador.valor > 0) {
          const key = operador.nome.toLowerCase().trim();
          if (!operadoresMap.has(key)) {
            operadoresMap.set(key, []);
          }
          operadoresMap.get(key)!.push({
            nome: operador.nome,
            valor: operador.valor,
            jornal: jornal.nome,
            pagina: pagina.nome
          });
        }
      });
    });

    // Pegar o slot mais valioso de cada operador e ordenar
    const operadoresComMaiorValor: Array<{ nome: string; valor: number; jornal: string; pagina: string }> = [];
    operadoresMap.forEach(slots => {
      const maiorSlot = slots.reduce((max, slot) => slot.valor > max.valor ? slot : max);
      operadoresComMaiorValor.push(maiorSlot);
    });

    return operadoresComMaiorValor
      .sort((a, b) => b.valor - a.valor)
      .slice(0, 10);
  }, [paginas, jornais]);

  // Calcular operadores multi-jornal
  const operadoresMultiJornal = useMemo(() => {
    const operadoresMap = new Map<string, {
      nome: string;
      jornaisSet: Set<string>;
      totalSlots: number;
      valorTotal: number;
    }>();

    paginas.forEach(pagina => {
      const jornal = jornais.find(j => j.id === pagina.jornalId);
      if (!jornal) return;

      pagina.operadores.forEach(operador => {
        const key = operador.nome.toLowerCase().trim();

        if (!operadoresMap.has(key)) {
          operadoresMap.set(key, {
            nome: operador.nome,
            jornaisSet: new Set(),
            totalSlots: 0,
            valorTotal: 0
          });
        }

        const opData = operadoresMap.get(key)!;
        opData.jornaisSet.add(jornal.nome);
        opData.totalSlots++;
        opData.valorTotal += operador.valor;
      });
    });

    // Filtrar apenas operadores em múltiplos jornais e ordenar
    return Array.from(operadoresMap.values())
      .filter(op => op.jornaisSet.size > 1)
      .sort((a, b) => {
        // Primeiro por número de jornais, depois por valor total
        if (b.jornaisSet.size !== a.jornaisSet.size) {
          return b.jornaisSet.size - a.jornaisSet.size;
        }
        return b.valorTotal - a.valorTotal;
      })
      .slice(0, 10);
  }, [paginas, jornais]);

  const maxReceita = Math.max(...dadosJornais.map(j => j.receita));

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
            {topOperadores.length > 0 ? topOperadores.map((operador, index) => (
              <div key={`${operador.nome}-${index}`} className="flex items-center justify-between">
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
                  € {operador.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-gray-500">
                <Trophy className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Nenhum operador encontrado</p>
              </div>
            )}
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
            {dadosJornais.length > 0 ? dadosJornais.map((jornal) => (
              <div key={jornal.nome} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{jornal.nome}</span>
                  <span className="text-sm font-semibold" style={{ color: '#2F6BFF' }}>
                    € {(jornal.receita / 1000).toFixed(1)}k
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
            )) : (
              <div className="text-center py-8 text-gray-500">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Nenhum dado disponível</p>
              </div>
            )}
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
            {operadoresMultiJornal.length > 0 ? operadoresMultiJornal.map((operador) => (
              <div key={operador.nome} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{operador.nome}</div>
                  <div className="text-xs text-gray-500">
                    {operador.jornaisSet.size} jornais • {operador.totalSlots} slots
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold" style={{ color: '#2F6BFF' }}>
                    € {(operador.valorTotal / 1000).toFixed(1)}k
                  </div>
                  <div className="text-xs text-gray-500">total</div>
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-gray-500">
                <Star className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Nenhum operador multi-jornal</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
