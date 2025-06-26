
import React from 'react';
import { JornalCard } from '@/components/JornalCard';
import { LogTimeline } from '@/components/LogTimeline';
import { mockJornais, mockLogs } from '@/data/mockData';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestão de Jornais
          </h1>
          <p className="text-gray-600">
            Gerencie a hierarquia de jornais, páginas e operadores
          </p>
        </div>

        {/* Grid de Jornais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {mockJornais.map((jornal) => (
            <JornalCard key={jornal.id} jornal={jornal} />
          ))}
        </div>

        {/* Log de Mudanças */}
        <LogTimeline logs={mockLogs} />
      </div>
    </div>
  );
};

export default Dashboard;
