import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ConversationContext } from '../context/ConversationContext';
import CharacterCard from './CharacterCard';
import conversationManager from '../utils/conversationManager';

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

const CharacterSelection = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: rgba(255, 255, 255, 0.8);
`;

const SelectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 30px;
  color: white;
`;

const CharacterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
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
    background: ${props => props.isUser ?
      'linear-gradient(135deg, #667eea, #764ba2)' :
      'rgba(255, 255, 255, 0.1)'}
    ;
    color: ${props => props.isUser ? 'white' : 'white'};
    border-left: ${props => props.isUser ? 'none' : '3px solid #667eea'};
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

const InputContainer = styled.form`
  display: flex;
  gap: 12px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  margin: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 15px 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 15px;
  outline: none;
  transition: border-color 0.3s ease;
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
  &:focus {
    border-color: #667eea;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 15px 30px;
  border-radius: 25px;
  font-weight: 600;
  transition: transform 0.2s ease;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    transform: scale(1.05);
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 15px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
`;

const Bubble = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  animation: pulse 1.5s ease-in-out infinite;
  ${props => props.delay && `animation-delay: ${props.delay}s;`}

  @keyframes pulse {
    0%, 100% { opacity: 0.3; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.1); }
  }
`;

export default function ChatWindow() {
  const context = useContext(ConversationContext);

  // Provide default values if context is null
  const conversationHistory = context?.conversationHistory || [];
  const selectedCharacter = context?.selectedCharacter || null;
  const setConversationHistory = context?.setConversationHistory || (() => {});
  const isTyping = context?.isTyping || false;

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [message, setMessage] = React.useState('');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationHistory, isTyping]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = inputRef.current;
    const msg = message.trim();

    if (!msg || !selectedCharacter) return;

    const newMessage = {
      text: msg,
      isUser: true,
      timestamp: Date.now()
    };

    setConversationHistory(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate AI response with typing indicator
    setConversationHistory(prev => [...prev, {
      text: '',
      isUser: false,
      timestamp: Date.now(),
      isTyping: true
    }]);

    try {
      const botText = await conversationManager.generateResponse(
        [...conversationHistory, newMessage],
        selectedCharacter
      );

      setConversationHistory(prev => prev.filter(m => !m.isTyping));
      const botResponse = {
        text: botText,
        isUser: false,
        timestamp: Date.now()
      };
      setConversationHistory(prev => [...prev, botResponse]);
    } catch (err) {
      console.error('LLM error:', err);
      setConversationHistory(prev => {
        const filtered = prev.filter(m => !m.isTyping);
        filtered.push({
          text: "I'm having trouble thinking right now. Please try again later.",
          isUser: false,
          timestamp: Date.now()
        });
        return filtered;
      });
    }
  };

  if (!selectedCharacter) {
    return (
      <CharacterSelection>
        <SelectionTitle>🎀 Select Your Girlfriend</SelectionTitle>
        <CharacterGrid>
          {Array.from({ length: 5 }).map((_, index) => (
            <CharacterCard
              key={index}
              character={{
                id: index + 1,
                name: ['Priya', 'Riya', 'Ananya', 'Sofia', 'Meera'][index],
                age: ['22', '24', '21', '23', '25'][index],
                emoji: ['👧', '💖', '🌸', '💕', '🌷'][index],
                tags: ['Sweet', 'Romantic', 'Smart', 'Adventurous', 'Wise'][index].split(', '),
                language: ['English', 'Hinglish', 'English', 'English', 'Hindi'][index],
                description: ['Cheerful companion', 'Tender-hearted', 'Brilliant mind', 'Vibrant spirit', 'Nurturing presence'][index]
              }}
              isSelected={false}
              onClick={() => {}}
            />
          ))}
        </CharacterGrid>
      </CharacterSelection>
    );
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <CharacterHeader>
        <Avatar>{selectedCharacter.emoji}</Avatar>
        <CharacterInfo>
          <CharacterName>{selectedCharacter.name}</CharacterName>
          <Status>{selectedCharacter.language} • Online</Status>
        </CharacterInfo>
      </CharacterHeader>

      <ChatContainer>
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
          conversationHistory
            .filter(m => !m.isTyping)
            .map((msg, index) => (
              <Message key={msg.timestamp || index} isUser={msg.isUser}>
                <p>{msg.text}</p>
                <Timestamp isUser={msg.isUser}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Timestamp>
              </Message>
            ))
        )}
        {isTyping && (
          <TypingIndicator>
            <Bubble delay={0} />
            <Bubble delay={0.2} />
            <Bubble delay={0.4} />
            AI is thinking...
          </TypingIndicator>
        )}
        <div ref={messagesEndRef} />
      </ChatContainer>

      <InputContainer onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          type="text"
          placeholder={isTyping ? "AI is thinking..." : `Ask ${selectedCharacter?.name}...`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isTyping}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <Button type="submit" disabled={isTyping || !message.trim()}>
          {isTyping ? '...' : 'Send'}
        </Button>
      </InputContainer>
    </div>
  );
}