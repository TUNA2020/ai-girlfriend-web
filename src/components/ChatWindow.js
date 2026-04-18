import React, { useContext } from 'react';
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

export default function ChatWindow() {
  const { conversationHistory } = useContext(ConversationContext);
  
  return (
    <ChatContainer>
      {conversationHistory.length === 0 ? (
        <div style={{
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.5)',
          marginTop: '50px',
          fontSize: '16px'
        }}>
          🎀 Start a conversation with your AI girlfriend!
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
    </ChatContainer>
  );
}
