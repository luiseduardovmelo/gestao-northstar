
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Star, TrendingUp } from 'lucide-react';
import { Jornal } from '@/types';

interface TopPerformersProps {
  jornais: Jornal[];
}

export const TopPerformers: React.FC<TopPerformersProps> = ({ jornais }) => {
  // Calcular operadores mais valiosos
  const operadoresComValor = jornais.flatMap(jornal => 
    jornal.paginas?.flatMap(pagina => 
      pagina.operadores?.filter(op => op.status === 'vendido').map(operador => ({
        ...operador,
        jornal: jornal.nome,
        pagina: pagina.nome,
        jornalSlug: jornal.slug
      })) || []
    ) || []
  ).sort((a, b) => b.valor - a.valor).slice(0, 10);

  // Calcular ranking de jornais por receita
  const jornaisPorReceita = jornais.map(jornal => {
    const receita = jornal.paginas?.reduce((total, pagina) => {
      return total + (pagina.operadores?.reduce((subTotal, op) => {
        return subTotal + (op.status === 'vendido' ? op.valor : 0);
      }, 0) || 0);
    }, 0) || 0;

    const slotsVendidos = jornal.paginas?.reduce((total, pagina) => {
      return total + (pagina.operadores?.filter(op => op.status === 'vendido').length || 0);
    }, 0) || 0;

    return {
      nome: jornal.nome,
      receita,
      slotsVendidos,
      slug: jornal.slug
    };
  }).sort((a, b) => b.receita - a.receita);

  // Calcular operadores mais presentes (multi-jornal)
  const contadorOperadores = new Map();
  jornais.forEach(jornal => {
    jornal.paginas?.forEach(pagina => {
      pagina.operadores?.forEach(operador => {
        if (operador.status === 'vendido' && operador.nome) {
          const key = operador.nome;
          if (!contadorOperadores.has(key)) {
            contadorOperadores.set(key, { nome: operador.nome, count: 0, valor: 0, jornais: new Set() });
          }
          const item = contadorOperadores.get(key);
          item.count++;
          item.valor += operador.valor;
          item.jornais.add(jornal.nome);
        }
      });
    });
  });

  const operadoresMultiJornal = Array.from(contadorOperadores.values())
    .filter(op => op.jornais.size > 1)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

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
            {operadoresComValor.map((operador, index) => (
              <div key={`${operador.jornal}-${operador.id}`} className="flex items-center justify-between">
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

      {/* Ranking de Jornais por Receita */}
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
                    R$ {(jornal.receita / 1000).toFixed(0)}k
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${maxReceita > 0 ? (jornal.receita / maxReceita) * 100 : 0}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">
                  {jornal.slotsVendidos} slots vendidos
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top 5 Operadores Multi-Jornal */}
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
                    R$ {(operador.valor / 1000).toFixed(0)}k
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
