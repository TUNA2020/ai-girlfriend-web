import React from 'react';
import styled from 'styled-components';
import CharacterCard from '../components/CharacterCard';
import { useCharacters } from '../hooks/useCharacter';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const WelcomeText = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 10px;
  background: linear-gradient(145deg, #ffd700, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 40px;
  text-align: center;
`;

const StartButton = styled.button`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 20px 40px;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  }
`;

export default function Home() {
  const { randomCharacter } = useCharacters();

  const handleStart = () => {
    const character = randomCharacter();
    // Navigate to chat
    console.log('Starting with character:', character.name);
  };

  return (
    <HomeContainer>
      <WelcomeText>AI Girlfriend</WelcomeText>
      <WelcomeSubtitle>Your Emotional Companion Awaits</WelcomeSubtitle>
      <StartButton onClick={handleStart}>
        Start Chatting 💕
      </StartButton>
    </HomeContainer>
  );
}
