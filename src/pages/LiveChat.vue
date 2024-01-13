<template>
  <v-container>
    <!-- Chatroom -->
    <v-row v-for="(message, index) in messages" :key="index">
      <v-col
        class="d-flex"
        :class="{
          'align-start': message.sender !== 'user',
          'align-end': message.sender === 'user',
        }"
      >
        <v-avatar v-if="message.sender === 'user'" class="mr-3">
          <img :src="userProfilePhoto" alt="User Photo" class="cover-image" />
        </v-avatar>
        <v-card
          min-width="100%"
          :class="{
            'message-right': message.sender === 'user',
            'message-left': message.sender !== 'user',
          }"
        >
          <v-card-text>{{ message.text }}</v-card-text>
        </v-card>
        <v-avatar v-if="message.sender != 'user'" class="ml-3">
          <img :src="senderProfilePhoto" alt="Sender Photo" class="cover-image" />
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

    <!-- Chat Username Promt -->
    <v-dialog v-model="usernameDialog" persistent>
      <v-card>
        <v-card-title>
          Enter Your Username
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="usernameInput" label="Username"></v-text-field>
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
export default {
  data() {
    return {
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
      newMessage: "",
      bottomSheet: true,
      userProfilePhoto: "src/assets/profile.jpg",
      senderProfilePhoto: "src/assets/profile.jpg",
      usernameDialog: false,
      usernameInput: "",
      username: ""
    };
  },
  mounted() {
    // Everytime page load will promt username dialog
    this.usernameDialog = true;
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        this.messages.push({ sender: "user", text: this.newMessage.trim() });
        this.newMessage = "";
      }
    },
    saveUsername() {
      this.username = this.usernameInput;
      this.usernameInput = "";
      this.usernameDialog = false;
    },
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
