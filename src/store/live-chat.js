import { defineStore } from "pinia";
import chatService from '../services/ChatService'

export const useChatStore = defineStore({
  id: "livechat",
  state: () => ({
    messages: [],
    username: "",
  }),
  actions: {
    addMessage(message) {
      this.messages.push(message);
      chatService.addMessage(message)
    },
    setUsername(usernameInput) {
      this.username = usernameInput;
    },
    loadChatHistory() {
      this.messages = chatService.getMessages()
    },
    subscribeToChatBroadcast() {
      chatService.subscribeToBroadcast((newMessage) => {
        // Handle incoming messages here
        console.log('Received new message haha:', newMessage);
        if (newMessage) {
          this.messages.push(newMessage);
        }
      });
    }
  },
});
