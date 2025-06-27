
import React, { useState, useEffect } from 'react';
import { JornalCard } from '@/components/JornalCard';
import { TrevelaLogCard } from '@/components/TrevelaLogCard';
import Navigation from '@/components/Navigation';
import { mockJornais } from '@/data/mockData';
import { getTrevelaLogs, TrivelalLog } from '@/utils/trivelaBoardLogs';

const Dashboard = () => {
  const [trevelaLogs, setTrevelaLogs] = useState<TrivelalLog[]>([]);

  // Carregar logs do Trivela ao inicializar
  useEffect(() => {
    const loadTrevelaLogs = () => {
      try {
        const logs = getTrevelaLogs();
        setTrevelaLogs(logs);
      } catch (error) {
        console.error('Erro ao carregar logs do Trivela:', error);
      }
    };

    loadTrevelaLogs();
    
    // Atualizar logs a cada 5 segundos para capturar novos logs
    const interval = setInterval(loadTrevelaLogs, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleLogRemoved = () => {
    // Recarregar logs após remoção
    try {
      const logs = getTrevelaLogs();
      setTrevelaLogs(logs);
    } catch (error) {
      console.error('Erro ao recarregar logs:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header com Navigation */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl font-bold" style={{ color: 'var(--accent-secondary)' }}>
                NORTH
              </span>
              <span className="text-3xl font-bold" style={{ color: 'var(--accent-primary)' }}>
                STAR
              </span>
              <span className="text-3xl font-bold text-gray-700 ml-2">
                NETWORK
              </span>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Gestão de Jornais
            </h1>
            <p className="text-gray-600">
              Gerencie a hierarquia de jornais, páginas e operadores
            </p>
          </div>
          
          <Navigation />
        </div>

        {/* Layout de duas faixas */}
        <div className="space-y-8">
          {/* Faixa 1: Grade de Jornais */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Nossos Jornais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {mockJornais.map((jornal) => (
                <JornalCard key={jornal.id} jornal={jornal} />
              ))}
            </div>
          </div>

          {/* Faixa 2: Seção LOGS */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">LOGS</h2>
            
            {trevelaLogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {trevelaLogs.map((log) => (
                  <TrevelaLogCard 
                    key={log.id} 
                    log={log} 
                    onLogRemoved={handleLogRemoved}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                </div>
                <p className="text-gray-500 text-lg font-medium">Nenhum log pendente</p>
                <p className="text-gray-400 text-sm mt-1">
                  Os logs das alterações do Trivela aparecerão aqui
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
