import { ConversationProvider } from './ConversationContext';
import App from '../App';

export default function ConversationProviderWrapper() {
  return (
    <ConversationProvider>
      <App />
    </ConversationProvider>
  );
}
EOF && cat > index.js << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import ConversationProviderWrapper from './context/ConversationProviderWrapper';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConversationProviderWrapper />
  </React.StrictMode>
);
