import React, { createContext, useContext, useState, useEffect } from 'react';

const ConversationContext = createContext();

export function ConversationProvider({ children }) {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  return (
    <ConversationContext.Provider value={{
      selectedCharacter,
      setSelectedCharacter,
      conversationHistory,
      setConversationHistory,
      isTyping,
      setIsTyping
    }}>
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

// Export the context itself for direct import
export default ConversationContext;
