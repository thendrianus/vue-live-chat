const CHAT_MESSAGES_STORAGE_KEY = 'chatMessages';
const USERNAME_SESSION_KEY = 'chatUsername';

export default {
  getMessages() {
    const storedMessages = localStorage.getItem(CHAT_MESSAGES_STORAGE_KEY);
    return JSON.parse(storedMessages) || [];
  },

  addMessage(message) {
    const messages = this.getMessages();
    messages.push(message);
    localStorage.setItem(CHAT_MESSAGES_STORAGE_KEY, JSON.stringify(messages));
    this.broadcastMessage(message);
  },

  broadcastMessage(message) {
    localStorage.setItem('newChatMessage', JSON.stringify(message));
  },

  clearBroadcastMessage() {
    localStorage.removeItem('newChatMessage');
  },

  subscribeToBroadcast(callback) {
    window.addEventListener('storage', (event) => {
      if (event.key === 'newChatMessage') {
        const newMessage = JSON.parse(event.newValue);
        callback(newMessage);
        this.clearBroadcastMessage();
      }
    });
  },

  getUsername() {
    return sessionStorage.getItem(USERNAME_SESSION_KEY);
  },

  setUsername(username) {
    sessionStorage.setItem(USERNAME_SESSION_KEY, username);
  }
};
