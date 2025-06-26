
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
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  const handleEntrar = () => {
    navigate(`/jornal/${jornal.id}/paginas`);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  // Função para escurecer a cor em 10%
  const darkenColor = (color: string) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    const darkenedR = Math.max(0, Math.floor(r * 0.9));
    const darkenedG = Math.max(0, Math.floor(g * 0.9));
    const darkenedB = Math.max(0, Math.floor(b * 0.9));
    
    return `#${darkenedR.toString(16).padStart(2, '0')}${darkenedG.toString(16).padStart(2, '0')}${darkenedB.toString(16).padStart(2, '0')}`;
  };

  return (
    <div className="perspective-1000 w-full h-[220px]">
      <Card
        className={`
          relative cursor-pointer w-full h-full
          transform-style-preserve-3d transition-all duration-300 ease-out
          ${isFlipped ? 'rotate-y-180' : ''}
          ${isHovered ? 'scale-105' : 'scale-100'}
          hover:scale-105 overflow-hidden
        `}
        style={{
          borderColor: darkenColor(jornal.corPrimaria),
          borderWidth: '1px'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        {/* Frente do card - Logo em tela cheia */}
        <CardContent className="absolute inset-0 p-0 h-full backface-hidden">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${jornal.logoUrl})`,
              backgroundSize: 'cover'
            }}
          />
        </CardContent>

        {/* Verso do card */}
        <CardContent 
          className="absolute inset-0 p-6 h-full flex flex-col backface-hidden rotate-y-180"
          style={{
            backgroundColor: jornal.corPrimaria,
          }}
        >
          <div className="flex-1 flex flex-col justify-between text-white">
            <h3 className="text-xl font-bold mb-4 text-center leading-tight">
              {jornal.nome}
            </h3>
            
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
                onClick={(e) => {
                  e.stopPropagation();
                  handleEntrar();
                }}
                className="w-full mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-current"
                variant="outline"
              >
                Entrar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
