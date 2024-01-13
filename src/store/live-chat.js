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
    getUsername() {
      const usernameRes = chatService.getUsername()
      if (usernameRes) {
        this.username = usernameRes;
      }
      return usernameRes;
    },
    setUsername(usernameInput) {
      chatService.setUsername(usernameInput)
      this.getUsername()
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
