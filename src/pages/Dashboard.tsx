import React, { useState, useEffect } from 'react';
import { JornalCard } from '@/components/JornalCard';
import { OperadorList } from '@/components/OperadorList';
import CSVUpload from '@/components/CSVUpload';
import Navigation from '@/components/Navigation';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { getTrevelaLogs, TrivelaBoardLog } from '@/utils/trivelaBoardLogs';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { jornais } = useData();
  const { signOut, user } = useAuth();
  const [trevelaLogs, setTrevelaLogs] = useState<TrivelaBoardLog[]>([]);

  // Carregar logs do Trivela, Gazeta do Povo, Um Dois Esportes, Placar e Lakers Brasil ao inicializar
  useEffect(() => {
    const loadTrevelaLogs = () => {
      try {
        const logs = getTrevelaLogs();
        // Filtrar apenas logs do Trivela, Gazeta do Povo, Um Dois Esportes, Placar e Lakers Brasil
        const filteredLogs = logs.filter(log =>
          log.jornal === 'Trivela' ||
          log.jornal === 'Gazeta do Povo' ||
          log.jornal === 'Um Dois Esportes' ||
          log.jornal === 'Placar' ||
          log.jornal === 'Lakers Brasil'
        );
        setTrevelaLogs(filteredLogs);
      } catch (error) {
        console.error('Erro ao carregar logs:', error);
      }
    };

    loadTrevelaLogs();

    // Atualizar logs a cada 5 segundos para capturar novos logs
    const interval = setInterval(loadTrevelaLogs, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleLogRemoved = () => {
    // Mantendo a função por compatibilidade se necessário, mas não será usada
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
              <span className="text-3xl font-bold" style={{ color: 'var(--accent-primary)' }}>
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

          <div className="flex items-center gap-4">
            <Navigation />
            <Button
              variant="outline"
              size="sm"
              onClick={signOut}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 hover:border-red-300"
            >
              <LogOut size={16} />
              Sair
            </Button>
          </div>
        </div>

        {/* Layout de duas faixas */}
        <div className="space-y-8">
          {/* Faixa 1: Grade de Jornais */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Nossos Jornais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {jornais.map((jornal) => (
                <JornalCard key={jornal.id} jornal={jornal} />
              ))}
            </div>
          </div>

          {/* Faixa 2: Operadores */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-display tracking-tight flex items-center gap-2">
              <span className="w-2 h-8 bg-green-600 rounded-full"></span>
              Operadores
            </h2>

            <OperadorList />
          </div>

          {/* Faixa 3: Seção Upload */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-display tracking-tight flex items-center gap-2">
              <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
              Atualização do Sistema
            </h2>

            <CSVUpload />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
