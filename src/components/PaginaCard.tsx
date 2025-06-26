
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pagina } from '@/types';
import { useNavigate } from 'react-router-dom';

interface PaginaCardProps {
  pagina: Pagina;
  jornalId: string;
}

export const PaginaCard: React.FC<PaginaCardProps> = ({ pagina, jornalId }) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativa': return 'bg-green-100 text-green-800';
      case 'inativa': return 'bg-gray-100 text-gray-800';
      case 'manutencao': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAbrirPagina = () => {
    navigate(`/jornal/${jornalId}/pagina/${pagina.id}/operadores`);
  };

  const formatarTrafego = (trafego: number) => {
    if (trafego >= 1000) {
      return `${(trafego / 1000).toFixed(1)}k`;
    }
    return trafego.toString();
  };

  return (
    <Card className="w-[320px] h-[180px] cursor-pointer relative overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-200 group">
      <CardContent className="p-6 h-full relative">
        {/* Conteúdo sempre visível */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 mr-2">
            {pagina.nome}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pagina.status)}`}>
            {pagina.status}
          </span>
        </div>

        {/* Conteúdo detalhado - revelado no hover */}
        <div className="
          absolute top-0 left-0 w-full h-full p-6 bg-white
          opacity-0 pointer-events-none
          group-hover:opacity-100 group-hover:pointer-events-auto
          group-focus-within:opacity-100 group-focus-within:pointer-events-auto
          transition-opacity duration-200
        ">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 mr-2">
              {pagina.nome}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pagina.status)}`}>
              {pagina.status}
            </span>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Slots:</span>
                <span className="font-medium text-gray-900">{pagina.numeroOperadores}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tráfego:</span>
                <span className="font-medium text-blue-600">{formatarTrafego(pagina.trafego)}</span>
              </div>
            </div>
            
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Receita estimada:</span>
                <span className="text-sm text-green-600 font-medium">
                  R$ {(pagina.trafego * 0.5).toLocaleString()}
                </span>
              </div>
              <div className="text-xs text-gray-500 mb-3">
                Baseado em {formatarTrafego(pagina.trafego)} visitas mensais
              </div>
              
              <Button 
                onClick={handleAbrirPagina}
                className="w-full bg-[#2F6BFF] hover:bg-[#1E4FCC] text-white"
              >
                Abrir Página
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
