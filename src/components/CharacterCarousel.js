import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCharacters } from '../hooks/useCharacter';
import CharacterCard from './CharacterCard';

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 350px;
  margin: 50px auto;
  height: 500px;
`;

const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  height: 100%;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(102, 126, 234, 0.7);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
  z-index: 10;
  
  &:hover {
    background: rgba(102, 126, 234, 1);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const PrevButton = styled(NavigationButton)`
  left: -20px;
`;

const NextButton = styled(NavigationButton)`
  right: -20px;
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? '#667eea' : 'rgba(255,255,255,0.3)' };
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#667eea' : 'rgba(255,255,255,0.5)' };
  }
`;

export default function CharacterCarousel() {
  const { characters, selectCharacter, randomCharacter } = useCharacters();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => 
          prev === characters.length - 1 ? 0 : prev + 1
        );
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, characters.length]);

  const nextCharacter = () => {
    setIsAutoPlay(false);
    setCurrentIndex(prev => 
      prev === characters.length - 1 ? 0 : prev + 1
    );
  };

  const prevCharacter = () => {
    setIsAutoPlay(false);
    setCurrentIndex(prev => 
      prev === 0 ? characters.length - 1 : prev - 1
    );
  };

  const selectCharacterAtIndex = (index) => {
    setIsAutoPlay(false);
    setCurrentIndex(index);
  };

  const currentCharacter = characters[currentIndex];

  return (
    <CarouselContainer>
      <CarouselTrack style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {characters.map((character, index) => (
          <div key={character.id} style={{ minWidth: '100%' }}>
            <CharacterCard
              character={character}
              isSelected={index === currentIndex}
              onClick={() => selectCharacterAtIndex(index)}
            />
          </div>
        ))}
      </CarouselTrack>
      
      {characters.length > 1 && (
        <>
          <PrevButton onClick={prevCharacter} disabled={characters.length <= 1}>
            ‹
          </PrevButton>
          <NextButton onClick={nextCharacter} disabled={characters.length <= 1}>
            ›
          </NextButton>
        </>
      )}
      
      <DotsContainer>
        {characters.map((_, index) => (
          <Dot
            key={index}
            active={index === currentIndex}
            onClick={() => selectCharacterAtIndex(index)}
          />
        ))}
      </DotsContainer>
    </CarouselContainer>
  );
}
