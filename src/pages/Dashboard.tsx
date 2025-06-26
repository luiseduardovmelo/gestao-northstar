
import React from 'react';
import { JornalCard } from '@/components/JornalCard';
import { LogTimeline } from '@/components/LogTimeline';
import Navigation from '@/components/Navigation';
import { mockJornais, mockLogs } from '@/data/mockData';

const Dashboard = () => {
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

        {/* Layout de duas faixas fixas */}
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

          {/* Faixa 2: Log de Mudanças (altura fixa) */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Log de Mudanças</h2>
            </div>
            <div className="h-80 overflow-y-auto">
              <div className="p-6">
                <LogTimeline logs={mockLogs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
