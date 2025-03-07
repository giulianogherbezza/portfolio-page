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
      <button @click="fetchTriviaQuestion">Nächste Frage</button>
    </div>

    <!-- Joke Generator -->
    <div class="game-card">
      <h2>Joke Generator</h2>
      <p>{{ joke.setup }}</p>
      <p v-if="joke.punchline">{{ joke.punchline }}</p>
      <button @click="fetchJoke">Neuer Witz</button>
    </div>

    <!-- Pokémon Guessing Game -->
    <div class="game-card">
      <h2>Pokémon Guessing Game</h2>
      <img
        v-if="pokemon.image"
        :src="pokemon.image"
        alt="Pokémon"
        class="game-image"
      />
      <input v-model="pokemonGuess" placeholder="Welches Pokémon ist das?" />
      <button @click="checkPokemonGuess">Guess</button>
      <p>{{ pokemonFeedback }}</p>
      <button @click="fetchPokemon">Neues Pokémon</button>
    </div>

    <!-- Country Flag Quiz -->
    <div class="game-card">
      <h2>Country Flag Quiz</h2>
      <img
        v-if="country.flag"
        :src="country.flag"
        alt="Country Flag"
        class="game-image"
      />
      <div v-for="(option, index) in countryOptions" :key="index">
        <button @click="checkCountryGuess(option)">{{ option }}</button>
      </div>
      <p>{{ countryFeedback }}</p>
      <button @click="fetchCountry">Neues Land</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Shuffle helper
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

//////////////////////////
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
  triviaFeedback.value = "";
};

const checkTriviaAnswer = (answer) => {
  triviaFeedback.value =
    answer === triviaQuestion.value.correct_answer ? "Richtig!" : "Falsch!";
};

//////////////////////////
// Joke Generator
const joke = ref({ setup: "", punchline: "" });

const fetchJoke = async () => {
  const res = await fetch("https://official-joke-api.appspot.com/random_joke");
  joke.value = await res.json();
};

//////////////////////////
// Pokémon Guessing Game
const pokemon = ref({ name: "", image: "" });
const pokemonGuess = ref("");
const pokemonFeedback = ref("");

const fetchPokemon = async () => {
  const id = Math.floor(Math.random() * 151) + 1;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  pokemon.value = {
    name: data.name.toLowerCase(),
    image: data.sprites.front_default,
  };
  pokemonFeedback.value = "";
  pokemonGuess.value = "";
};

const checkPokemonGuess = () => {
  if (pokemonGuess.value.toLowerCase() === pokemon.value.name) {
    pokemonFeedback.value = "Richtig!";
  } else {
    pokemonFeedback.value = `Falsch! Es war ${pokemon.value.name}`;
  }
};

//////////////////////////
// Country Flag Quiz
const countries = ref([]);
const country = ref({ name: "", flag: "" });
const countryOptions = ref([]);
const countryFeedback = ref("");

const fetchCountry = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();
  countries.value = data;
  const selected = data[Math.floor(Math.random() * data.length)];
  country.value = {
    name: selected.name.common,
    flag: selected.flags.svg,
  };
  countryOptions.value = shuffle([
    selected.name.common,
    ...shuffle(data.filter((c) => c.name.common !== selected.name.common))
      .slice(0, 3)
      .map((c) => c.name.common),
  ]);
  countryFeedback.value = "";
};

const checkCountryGuess = (guess) => {
  if (guess === country.value.name) {
    countryFeedback.value = "Richtig!";
  } else {
    countryFeedback.value = `Falsch! Es war ${country.value.name}`;
  }
};

//////////////////////////

//////////////////////////
// Init
onMounted(() => {
  fetchTriviaQuestion();
  fetchJoke();
  fetchPokemon();
  fetchCountry();
});
</script>
