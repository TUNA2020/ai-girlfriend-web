import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ConversationContext } from '../context/ConversationContext';
import conversationManager from '../utils/conversationManager';

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

export default function MessageInput() {
  const { selectedCharacter, conversationHistory, setConversationHistory } = useContext(ConversationContext);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Reset input when conversation changes (AI responds)
  useEffect(() => {
    setMessage('');
    setIsTyping(false);
  }, [conversationHistory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedCharacter) return;

    const newMessage = {
      text: message,
      isUser: true,
      timestamp: Date.now()
    };

    setConversationHistory(prev => [...prev, newMessage]);
    setMessage('');
    setIsTyping(true);

    (async () => {
      try {
        const botText = await conversationManager.generateResponse([...conversationHistory, newMessage], selectedCharacter);
        const botResponse = {
          text: botText,
          isUser: false,
          timestamp: Date.now()
        };
        setConversationHistory(prev => [...prev, botResponse]);
      } catch (err) {
        console.error('LLM error:', err);
        const fallback = {
          text: "I'm having trouble thinking right now. Please try again later.",
          isUser: false,
          timestamp: Date.now()
        };
        setConversationHistory(prev => [...prev, fallback]);
      } finally {
        setIsTyping(false);
      }
    })();
  };

  return (
    <InputContainer onSubmit={handleSubmit}>
      <Input
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
  );
}