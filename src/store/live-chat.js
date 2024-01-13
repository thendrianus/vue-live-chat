import { defineStore } from "pinia";

export const useChatStore = defineStore({
  id: "livechat",
  state: () => ({
    messages: [
      { sender: "user", text: "Hello!" },
      { sender: "sender", text: "Hi there!" },
      { sender: "user", text: "Hello!" },
      { sender: "sender", text: "Hi there!" },
      { sender: "user", text: "Hello!" },
      { sender: "sender", text: "Hi there!" },
      { sender: "user", text: "Hello!" },
      { sender: "sender", text: "Hi there!" },
      { sender: "user", text: "Hello!" },
      { sender: "sender", text: "Hi there!" },
      { sender: "user", text: "Hello!" },
      { sender: "sender", text: "Hi there!" },
      { sender: "user", text: "Hello!" },
      { sender: "sender", text: "Hi there!" },
      { sender: "user", text: "Hello!" },
      { sender: "sender", text: "Hi there!" },
    ],
    username: "",
  }),
  actions: {
    addMessage(message) {
      this.messages.push(message);
    },
    setUsername(usernameInput) {
      console.log(usernameInput)
      this.username = usernameInput;
    }
  },
});
