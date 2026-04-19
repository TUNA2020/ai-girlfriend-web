import React, { createContext, useContext, useState } from 'react';

const ConversationContext = createContext(null);

export function ConversationProvider({ children }) {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  return (
    <ConversationContext.Provider
      value={{
        selectedCharacter,
        setSelectedCharacter,
        conversationHistory,
        setConversationHistory,
        isTyping,
        setIsTyping
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error('useConversation must be used within ConversationProvider');
  }
  return context;
};

export { ConversationContext };