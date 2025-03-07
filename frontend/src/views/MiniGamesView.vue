<template>
  <div class="mini-games-container">
    <h1>Mini Games</h1>

    <!-- Trivia Quiz -->
    <div class="game-card">
      <h2>Trivia Quiz</h2>
      <p>{{ triviaQuestion.question }}</p>
      <div v-for="(answer, index) in triviaAnswers" :key="index">
        <button @click="checkTriviaAnswer(answer)">{{ answer }}</button>
      </div>
      <p v-if="triviaFeedback">{{ triviaFeedback }}</p>
    </div>

    <!-- Number Facts -->
    <div class="game-card">
      <h2>Number Facts</h2>
      <input v-model="numberInput" type="number" placeholder="Enter a number" />
      <button @click="fetchNumberFact">Get Fact</button>
      <p>{{ numberFact }}</p>
    </div>

    <!-- Joke Generator -->
    <div class="game-card">
      <h2>Joke Generator</h2>
      <p>{{ joke.setup }}</p>
      <p v-if="joke.punchline">{{ joke.punchline }}</p>
      <button @click="fetchJoke">New Joke</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

// Trivia Quiz
const triviaQuestion = ref({});
const triviaAnswers = ref([]);
const triviaFeedback = ref("");

const fetchTriviaQuestion = async () => {
  const res = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");
  const data = await res.json();
  const question = data.results[0];
  triviaQuestion.value = question;
  triviaAnswers.value = shuffle([
    ...question.incorrect_answers,
    question.correct_answer,
  ]);
};

const checkTriviaAnswer = (answer) => {
  triviaFeedback.value =
    answer === triviaQuestion.value.correct_answer
      ? "Correct!"
      : "Wrong answer!";
};

// Number Facts
const numberInput = ref("");
const numberFact = ref("");

const fetchNumberFact = async () => {
  const res = await fetch(`http://numbersapi.com/${numberInput.value}`);
  numberFact.value = await res.text();
};

// Joke Generator
const joke = ref({ setup: "", punchline: "" });

const fetchJoke = async () => {
  const res = await fetch("https://official-joke-api.appspot.com/random_joke");
  joke.value = await res.json();
};

// Shuffle helper
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

onMounted(() => {
  fetchTriviaQuestion();
  fetchJoke();
});
</script>
