import React, { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ConversationContext from '../context/ConversationContext';

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 20px;
  max-height: 600px;
  overflow-y: auto;
  backdrop-filter: blur(10px);
  margin: 10px;
`;

const Message = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  
  p {
    max-width: 70%;
    padding: 12px 18px;
    border-radius: 18px;
    font-size: 15px;
    line-height: 1.5;
    word-wrap: break-word;
  }
`;

const UserMessage = styled(Message)`
  p {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
  }
`;

const BotMessage = styled(Message)`
  p {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border-left: 3px solid #667eea;
  }
`;

const Timestamp = styled.span`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 4px;
  margin-left: ${props => props.isUser ? 'auto' : '0'};
`;

const CharacterHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const CharacterInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CharacterName = styled.h4`
  margin: 0;
  color: white;
  font-size: 14px;
`;

const Status = styled.span`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
`;

export default function ChatWindow() {
  const { conversationHistory, selectedCharacter } = useContext(ConversationContext);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory]);

  if (!selectedCharacter) {
    return (
      <ChatContainer>
        <div style={{
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.5)',
          marginTop: '50px',
          fontSize: '16px'
        }}>
          🎀 Select a character to start chatting!
        </div>
      </ChatContainer>
    );
  }

  return (
    <ChatContainer>
      <CharacterHeader>
        <Avatar>{selectedCharacter.emoji || '👧'}</Avatar>
        <CharacterInfo>
          <CharacterName>{selectedCharacter.name}</CharacterName>
          <Status>{selectedCharacter.language} • Online</Status>
        </CharacterInfo>
      </CharacterHeader>
      
      {conversationHistory.length === 0 ? (
        <div style={{
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.5)',
          marginTop: '50px',
          fontSize: '16px'
        }}>
          🎀 Start a conversation with {selectedCharacter.name}!
        </div>
      ) : (
        conversationHistory.map((msg, index) => (
          <Message
            key={index}
            isUser={msg.isUser}
          >
            <p>{msg.text}</p>
            <Timestamp isUser={msg.isUser}>
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Timestamp>
          </Message>
        ))
      )}
      <div ref={messagesEndRef} />
    </ChatContainer>
  );
}
