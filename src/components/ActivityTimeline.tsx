
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { getTrevelaLogs, TrivelaBoardLog } from '@/utils/trivelaBoardLogs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const ActivityTimeline = () => {
  const [logs, setLogs] = useState<TrivelaBoardLog[]>([]);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    try {
      const allLogs = getTrevelaLogs();
      // Ordenar por timestamp mais recente
      const sortedLogs = allLogs.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setLogs(sortedLogs);
    } catch (error) {
      console.error('Erro ao carregar logs:', error);
    }
  }, []);

  const logsFiltrados = logs.filter(log => {
    if (filtroTipo === 'todos') return true;
    return log.jornal.toLowerCase().includes(filtroTipo.toLowerCase());
  });

  const logsParaExibir = isExpanded ? logsFiltrados : logsFiltrados.slice(0, 5);

  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
      
      if (diffInHours < 1) {
        const diffInMinutes = Math.floor(diffInHours * 60);
        return `${diffInMinutes}min atrás`;
      } else if (diffInHours < 24) {
        return `${Math.floor(diffInHours)}h atrás`;
      } else {
        return date.toLocaleDateString('pt-BR');
      }
    } catch (error) {
      return timestamp;
    }
  };

  const getActivityIcon = (alteracoes: string[]) => {
    if (alteracoes.some(alt => alt.includes('vendido'))) {
      return <div className="w-3 h-3 bg-green-500 rounded-full"></div>;
    } else if (alteracoes.some(alt => alt.includes('livre'))) {
      return <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>;
    } else {
      return <div className="w-3 h-3 bg-blue-500 rounded-full"></div>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-500" />
            Timeline de Atividades
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select value={filtroTipo} onValueChange={setFiltroTipo}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filtrar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="trivela">Trivela</SelectItem>
                <SelectItem value="gazeta">Gazeta do Povo</SelectItem>
                <SelectItem value="um dois">Um Dois Esportes</SelectItem>
                <SelectItem value="placar">Placar</SelectItem>
                <SelectItem value="lakers">Lakers Brasil</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Clock className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">Nenhuma atividade recente</p>
          </div>
        ) : (
          <div className="space-y-4">
            {logsParaExibir.map((log, index) => (
              <div key={log.id} className="relative">
                {/* Timeline line */}
                {index < logsParaExibir.length - 1 && (
                  <div className="absolute left-6 top-8 w-0.5 h-8 bg-gray-200"></div>
                )}
                
                <div className="flex items-start space-x-4">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 mt-2">
                    {getActivityIcon(log.alteracoes)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm text-gray-900">{log.jornal}</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{log.pagina}</span>
                        </div>
                        
                        <div className="text-sm text-gray-700 mb-2">
                          {log.alteracoes.length === 1 ? (
                            <span>{log.alteracoes[0]}</span>
                          ) : (
                            <span>{log.totalAlteracoes} alterações realizadas</span>
                          )}
                        </div>
                        
                        {log.alteracoes.length > 1 && (
                          <div className="text-xs text-gray-500 space-y-1">
                            {log.alteracoes.slice(0, 2).map((alteracao, i) => (
                              <div key={i}>• {alteracao}</div>
                            ))}
                            {log.alteracoes.length > 2 && (
                              <div className="text-blue-600">
                                +{log.alteracoes.length - 2} outras alterações
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="text-xs text-gray-500 ml-4">
                        {formatTimestamp(log.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {logsFiltrados.length > 5 && (
              <div className="text-center pt-4 border-t">
                <Button 
                  variant="ghost" 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Mostrar menos
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      Mostrar mais ({logsFiltrados.length - 5} atividades)
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
