
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
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

  const handleCardClick = () => {
    navigate(`/jornal/${jornalId}/pagina/${pagina.id}/operadores`);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick();
    }
  };

  const formatarTrafego = (trafego: number) => {
    if (trafego >= 1000) {
      return `${(trafego / 1000).toFixed(1)}k`;
    }
    return trafego.toString();
  };

  return (
    <Card 
      className="relative w-full h-[200px] bg-white rounded-xl shadow-sm border border-gray-200 cursor-pointer transition-transform duration-200 hover:scale-105 hover:z-20 hover:shadow-2xl group focus-within:scale-105 focus-within:z-20 focus-within:shadow-2xl overflow-hidden"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Entrar na página ${pagina.nome}`}
    >
      <CardContent className="p-6 h-full relative">
        {/* Conteúdo sempre visível - Centralizado - Desaparece no hover */}
        <div className="flex flex-col items-center justify-center h-full visible group-hover:invisible group-focus-within:invisible">
          <h3 className="text-lg font-semibold text-center text-gray-900 mb-3 line-clamp-2">
            {pagina.nome}
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(pagina.status)}`}>
            {pagina.status}
          </span>
        </div>

        {/* Conteúdo detalhado - Aparece apenas no hover */}
        <div className="
          absolute inset-0 p-6 bg-white/98 backdrop-blur-sm
          invisible pointer-events-none
          group-hover:visible group-hover:pointer-events-auto
          group-focus-within:visible group-focus-within:pointer-events-auto
          transition-all duration-200
          flex flex-col items-center justify-center
        ">
          {/* Informações em grid */}
          <div className="grid grid-cols-2 gap-4 w-full mb-4">
            <div className="text-center">
              <span className="text-sm text-gray-600">Slots</span>
              <div className="font-medium text-gray-900">{pagina.numeroOperadores}</div>
            </div>
            <div className="text-center">
              <span className="text-sm text-gray-600">Tráfego</span>
              <div className="font-medium text-blue-600">{formatarTrafego(pagina.trafego)}</div>
            </div>
          </div>
          
          {/* Receita estimada */}
          <div className="text-center">
            <div className="text-sm font-medium text-gray-700">Receita estimada</div>
            <div className="text-lg text-green-600 font-semibold">
              R$ {(pagina.trafego * 0.5).toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Baseado em {formatarTrafego(pagina.trafego)} visitas mensais
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
