
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Jornal } from '@/types';
import { useNavigate } from 'react-router-dom';

interface JornalCardProps {
  jornal: Jornal;
}

export const JornalCard: React.FC<JornalCardProps> = ({ jornal }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/jornal/${jornal.id}/paginas`);
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
    <div className="w-full h-[220px]">
      <Card
        className={`
          relative cursor-pointer w-full h-full
          transition-all duration-300 ease-out
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
        {/* Logo em tela cheia */}
        <CardContent className="absolute inset-0 p-0 h-full">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${jornal.logoUrl})`,
              backgroundSize: 'cover'
            }}
          />
          
          {/* Overlay "Entrar" no hover */}
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <span className="text-white text-xl font-semibold">
                Entrar
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
