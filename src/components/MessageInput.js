import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import ConversationContext from '../context/ConversationContext';

const InputContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(10px);
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
`;

export default function MessageInput() {
  const { selectedCharacter, conversationHistory, setConversationHistory } = useContext(ConversationContext);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

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

    setTimeout(() => {
      const botResponse = {
        text: `That's interesting! Tell me more about that.`,
        isUser: false,
        timestamp: Date.now()
      };
      setConversationHistory(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  return (
    <InputContainer>
      <Input
        type="text"
        placeholder={isTyping ? "AI is thinking..." : `Ask ${selectedCharacter?.name || 'girlfriend'}...`}
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
