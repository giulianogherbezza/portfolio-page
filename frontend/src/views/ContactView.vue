<template>
  <div class="contact-container">
    <h1>Kontaktiere mich</h1>
    <form @submit.prevent="sendEmail">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="form.name" required />

      <label for="email">E-Mail:</label>
      <input type="email" id="email" v-model="form.email" required />

      <label for="message">Nachricht:</label>
      <textarea id="message" v-model="form.message" required></textarea>

      <button type="submit" :disabled="loading">
        {{ loading ? "Senden..." : "Nachricht senden" }}
      </button>
    </form>

    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import emailjs from "@emailjs/browser";

// Reaktive Variablen für das Formular und die Statusmeldungen
const form = ref({
  name: "",
  email: "",
  message: "",
});

const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

const sendEmail = async () => {
  loading.value = true;
  successMessage.value = "";
  errorMessage.value = "";

  const serviceID = "service_idhqbvh";
  const templateID = "template_go0ij3c";
  const publicKey = "R4s8Cdf_p67jcUVWs";

  try {
    await emailjs.send(
      serviceID,
      templateID,
      {
        name: form.value.name,
        email: form.value.email,
        message: form.value.message,
      },
      publicKey
    );

    successMessage.value = "Deine Nachricht wurde erfolgreich gesendet!";
    form.value = { name: "", email: "", message: "" };
  } catch (error) {
    errorMessage.value = "Fehler beim Senden. Bitte versuche es erneut.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.contact-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 10px;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  margin-top: 15px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background-color: gray;
}

.success-message {
  color: green;
  margin-top: 10px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
