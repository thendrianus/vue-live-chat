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
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        this.messages.push({ sender: "user", text: this.newMessage.trim() });
        this.newMessage = "";
      }
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
