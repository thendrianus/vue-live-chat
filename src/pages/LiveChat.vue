<!-- src/components/ChatUI.vue -->

<template>
  <v-container>
    <!-- Chatroom -->
    <v-row v-for="(message, index) in messages" :key="index">
      <v-col
        class="d-flex"
      >
        <v-avatar v-if="message.sender === username" class="mr-3">
          <img :src="userProfilePhoto" alt="User Photo" class="cover-image" />
        </v-avatar>
        <v-card
          min-width="100%"
          :class="{
            'message-right': message.sender === username,
            'message-left': message.sender !== username,
          }"
        >
          <v-card-text>{{ message.text }}</v-card-text>
        </v-card>
        <v-avatar v-if="message.sender !== username" class="ml-3">
          <img
            :src="senderProfilePhoto"
            alt="Sender Photo"
            class="cover-image"
          />
        </v-avatar>
      </v-col>
    </v-row>

    <!-- Chat input -->
    <v-footer app fixed>
      <v-container>
        <v-row class="d-flex">
          <v-text-field
            v-model="newMessage"
            label="Type a message"
            outlined
          ></v-text-field>
          <v-btn @click="sendMessage" color="primary" class="ml-2">Send</v-btn>
        </v-row>
      </v-container>
    </v-footer>

    <!-- Chat Username Prompt -->
    <v-dialog v-model="usernameDialog" persistent>
      <v-card>
        <v-card-title> Enter Your Username </v-card-title>
        <v-card-text>
          <v-text-field
            :rules="[(v) => !!v || 'Username is required']"
            v-model="usernameInput"
            label="Username"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="saveUsername" color="primary" class="mr-2">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { ref, computed } from "vue";
import { useChatStore } from "@/store/live-chat";

export default {
  setup() {
    const chatStore = useChatStore();
    const newMessage = ref("");
    const userProfilePhoto = "src/assets/profile.jpg";
    const senderProfilePhoto = "src/assets/profile.jpg";
    const usernameDialog = ref(false);
    const usernameInput = ref("");

    // Load messages from the store
    const messages = chatStore.messages;
    const username = computed(() => chatStore.username);

    const sendMessage = () => {
      if (newMessage.value.trim() !== "") {
        console.log(username.value)
        const message = { sender: username.value, text: newMessage.value.trim() };
        chatStore.addMessage(message);
        newMessage.value = "";
      }
    };

    const saveUsername = () => {
      if (usernameInput.value.trim() !== "") {
        chatStore.setUsername(usernameInput.value.trim());
        usernameInput.value = "";
        usernameDialog.value = false;
      }
    };

    return {
      messages,
      newMessage,
      userProfilePhoto,
      senderProfilePhoto,
      usernameDialog,
      usernameInput,
      username,
      sendMessage,
      saveUsername,
    };
  },
  mounted() {
    // Everytime page load will promt username dialog
    this.usernameDialog = true;
  },
};
</script>

<style scoped>
.align-start {
  align-self: flex-start;
}

.align-end {
  align-self: flex-end;
}

.message-left {
  background-color: #f0f0f0; /* Left message background color */
  color: #333; /* Left message text color */
}

.message-right {
  background-color: #4caf50; /* Right message background color */
  color: white; /* Right message text color */
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
