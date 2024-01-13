const STORAGE_KEY = 'chatMessages';

export default {
  getMessages() {
    const storedMessages = localStorage.getItem(STORAGE_KEY);
    return JSON.parse(storedMessages) || [];
  },

  addMessage(message) {
    const messages = this.getMessages();
    messages.push(message);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
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
};
