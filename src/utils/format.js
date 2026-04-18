// Format helpers for AI Girlfriend app

export function formatTimestamp(timestamp) {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function formatMessage(text) {
  // Basic text formatting
  return text
    .replace(/\n/g, ' ')
    .trim();
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn('LocalStorage not available:', error);
  }
}

export function loadFromLocalStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.warn('LocalStorage read error:', error);
    return null;
  }
}

export function truncateText(text, maxLength = 100) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}
