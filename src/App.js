import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CharacterCarousel from './components/CharacterCarousel';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import ConversationContext from './context/ConversationContext';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  padding: 20px;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const Title = styled.h1`
  color: white;
  font-size: 2rem;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin: 5px 0 0 0;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  padding: 20px;
`;

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);

  return (
    <ConversationContext.Provider value={{ selectedCharacter, setSelectedCharacter, conversationHistory, setConversationHistory }}>
      <AppContainer>
        <Header>
          <Title>AI Girlfriend</Title>
          <Subtitle>Your Emotional Companion</Subtitle>
        </Header>
        <MainContent>
          {!selectedCharacter ? (
            <CharacterCarousel />
          ) : (
            <>
              <ChatWindow />
              <MessageInput />
            </>
          )}
        </MainContent>
      </AppContainer>
    </ConversationContext.Provider>
  );
}

export default App;
