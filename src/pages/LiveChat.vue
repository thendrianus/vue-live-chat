<!-- src/components/ChatUI.vue -->

<template>
  <v-container ref="messageContainer">
    <!-- load history -->
    <v-row justify="center" class="mb-2">
      <v-btn
        @click="loadPreviousChat"
        v-if="messagesCursor !== 0"
        color="primary"
        variant="text"
      >
        More history
      </v-btn>
      <p
        v-if="messagesCursor === 0 && messages.length !== 0"
        class="font-weight-thin"
      >
        No more history
      </p>
    </v-row>

    <!-- Chatroom -->
    <keep-alive>
      <div :key="componentKey">
        <v-row v-for="(message, index) in displayMessages" :key="index">
          <v-col
            class="d-flex"
            :class="message.sender === username ? 'justify-end' : ''"
          >
            <v-avatar v-if="message.sender !== username" class="mr-3">
              <img
                :src="senderProfilePhoto"
                alt="Sender Photo"
                class="cover-image"
              />
            </v-avatar>
            <v-card
              :class="{
                'message-right': message.sender === username,
                'message-left': message.sender !== username,
              }"
            >
              <v-card-text>{{ message.text }}</v-card-text>
            </v-card>
            <v-avatar v-if="message.sender === username" class="ml-3">
              <img
                :src="userProfilePhoto"
                alt="User Photo"
                class="cover-image"
              />
            </v-avatar>
          </v-col>
        </v-row>
      </div>
    </keep-alive>

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
import { ref, computed, onMounted } from "vue";
import { useChatStore } from "@/store/live-chat";

export default {
  setup() {
    const chatStore = useChatStore();
    const newMessage = ref("");
    const userProfilePhoto = "src/assets/profile.jpg";
    const senderProfilePhoto = "src/assets/profile.jpg";
    const usernameDialog = ref(false);
    const usernameInput = ref("");

    const messageContainer = ref(null);
    const componentKey = ref(0);

    const PAGINATION_SIZE = 25;
    const messagesCursor = ref(0);

    // Load messages from the store
    const messages = computed(() => chatStore.messages);
    const displayMessages = computed(() =>
      chatStore.messages.slice(messagesCursor.value)
    );

    const username = computed(() => chatStore.username);

    const sendMessage = () => {
      if (newMessage.value.trim() !== "") {
        const message = {
          sender: username.value,
          text: newMessage.value.trim(),
        };
        chatStore.addMessage(message);
        newMessage.value = "";
      }
    };

    const loadChatHistory = () => {
      chatStore.loadChatHistory(() => {
        messagesCursor.value = Math.max(
          messages.value.length - PAGINATION_SIZE,
          0
        );
      });
    };

    const saveUsername = () => {
      if (usernameInput.value.trim() !== "") {
        chatStore.setUsername(usernameInput.value.trim());
        usernameInput.value = "";
        usernameDialog.value = false;
        loadChatHistory();
        chatStore.subscribeToChatBroadcast();
      }
    };

    const scrollToBottom = () => {
      if (messageContainer.value) {
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
      }
    };

    const loadPreviousChat = () => {
      console.log("loadPreviousChat");
      if (messagesCursor.value > 0) {
        messagesCursor.value = Math.max(
          messagesCursor.value - PAGINATION_SIZE,
          0
        );
        componentKey.value += 1;
      }
    };

    onMounted(() => {
      if (!chatStore.getUsername()) {
        usernameDialog.value = true;
      } else {
        loadChatHistory();
        chatStore.subscribeToChatBroadcast();
      }

      scrollToBottom();
    });

    return {
      messages,
      displayMessages,
      newMessage,
      userProfilePhoto,
      senderProfilePhoto,
      usernameDialog,
      usernameInput,
      username,
      messagesCursor,
      componentKey,
      sendMessage,
      saveUsername,
      loadPreviousChat,
    };
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
