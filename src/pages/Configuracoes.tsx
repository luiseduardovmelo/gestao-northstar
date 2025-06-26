
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Configuracoes = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
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
            Configurações
          </h1>
          <p className="text-gray-600">
            Ajustes de moeda, timezone, permissões e etiquetas de log
          </p>
        </div>

        {/* Grid de Configurações */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configurações Gerais */}
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Moeda Padrão
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="BRL">Real Brasileiro (R$)</option>
                  <option value="USD">Dólar Americano ($)</option>
                  <option value="EUR">Euro (€)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="America/Sao_Paulo">São Paulo (UTC-3)</option>
                  <option value="America/New_York">Nova York (UTC-5)</option>
                  <option value="Europe/London">Londres (UTC+0)</option>
                </select>
              </div>

              <Button style={{ backgroundColor: 'var(--accent-primary)' }} className="text-white">
                Salvar Configurações Gerais
              </Button>
            </CardContent>
          </Card>

          {/* Permissões */}
          <Card>
            <CardHeader>
              <CardTitle>Permissões</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Criar Jornais</span>
                  <input type="checkbox" className="h-4 w-4" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Editar Operadores</span>
                  <input type="checkbox" className="h-4 w-4" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Deletar Páginas</span>
                  <input type="checkbox" className="h-4 w-4" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Visualizar Relatórios</span>
                  <input type="checkbox" className="h-4 w-4" defaultChecked />
                </div>
              </div>

              <Button style={{ backgroundColor: 'var(--accent-secondary)' }} className="text-white">
                Salvar Permissões
              </Button>
            </CardContent>
          </Card>

          {/* Etiquetas de Log */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Etiquetas de Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Criar
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <input 
                      type="text" 
                      defaultValue="CRIAR" 
                      className="flex-1 p-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Editar
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <input 
                      type="text" 
                      defaultValue="EDITAR" 
                      className="flex-1 p-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Deletar
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <input 
                      type="text" 
                      defaultValue="DELETAR" 
                      className="flex-1 p-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Reordenar
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-500 rounded"></div>
                    <input 
                      type="text" 
                      defaultValue="REORDENAR" 
                      className="flex-1 p-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
              </div>

              <Button 
                style={{ backgroundColor: 'var(--accent-primary)' }} 
                className="text-white mt-4"
              >
                Salvar Etiquetas
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Configuracoes;
