
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Jornal } from '@/types';
import { useNavigate } from 'react-router-dom';

interface JornalCardProps {
  jornal: Jornal;
}

export const JornalCard: React.FC<JornalCardProps> = ({ jornal }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleEntrar = () => {
    navigate(`/jornal/${jornal.id}/paginas`);
  };

  // Mapear slug para classe CSS
  const getJornalClass = (slug: string) => {
    return `jornal-${slug}`;
  };

  return (
    <Card
      className={`
        jornal-card relative cursor-pointer
        ${getJornalClass(jornal.slug)}
        ${isHovered ? 'transform translate-y-[-4px]' : ''}
        hover:transform hover:translate-y-[-4px]
        w-full h-[220px]
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex-1 flex flex-col justify-between">
          {/* Nome do jornal sempre visível */}
          <h3 className="text-xl font-bold mb-4 text-center leading-tight">
            {jornal.nome}
          </h3>
          
          {/* Conteúdo que aparece no hover */}
          <div 
            className={`
              transition-all duration-200 ease-out overflow-hidden
              ${isHovered ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="opacity-90">Páginas:</span>
                <span className="font-semibold">{jornal.numeroPaginas}</span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="opacity-90">Operadores:</span>
                <span className="font-semibold">{jornal.numeroOperadores}</span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="opacity-90">Receita Total:</span>
                <span className="font-semibold">
                  R$ {(jornal.receitaTotal / 1000).toFixed(0)}k
                </span>
              </div>
              
              <Button 
                onClick={handleEntrar}
                className="w-full mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-current"
                variant="outline"
              >
                Entrar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
