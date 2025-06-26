
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

  return (
    <Card
      className={`
        relative cursor-pointer transition-all duration-200 ease-out
        ${isHovered ? 'transform translate-y-[-8px] shadow-2xl' : 'shadow-sm'}
        hover:shadow-2xl hover:transform hover:translate-y-[-8px]
        bg-white border border-gray-200
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {jornal.nome}
          </h3>
          
          <div 
            className={`
              transition-all duration-200 ease-out overflow-hidden
              ${isHovered ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Páginas:</span>
                <span className="font-medium text-gray-900">{jornal.numeroPaginas}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Operadores:</span>
                <span className="font-medium text-gray-900">{jornal.numeroOperadores}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Receita Total:</span>
                <span className="font-medium text-green-600">
                  R$ {(jornal.receitaTotal / 1000).toFixed(0)}k
                </span>
              </div>
              
              <Button 
                onClick={handleEntrar}
                className="w-full mt-4 bg-[#2F6BFF] hover:bg-[#1E4FCC] text-white"
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
