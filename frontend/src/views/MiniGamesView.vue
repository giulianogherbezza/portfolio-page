<template>
  <div class="mini-games-container">
    <h1 class="games-title">Game Center</h1>
    
    <!-- Tab Navigation -->
    <div class="tab-navigation">
      <button 
        v-for="(game, index) in games" 
        :key="index"
        :class="['tab-button', { active: activeGame === index }]"
        @click="selectGame(index)"
      >
        <span class="tab-icon">{{ game.icon }}</span>
        <span class="tab-text">{{ game.title }}</span>
      </button>
    </div>

    <!-- Game Content -->
    <div class="game-content">
      <transition name="fade-slide" mode="out-in">
        <div :key="activeGame" class="game-wrapper">
          <!-- Game Header -->
          <div class="game-header">
            <div class="game-icon-large">
              {{ games[activeGame].icon }}
            </div>
            <h2>{{ games[activeGame].title }}</h2>
            <p class="game-description">{{ games[activeGame].description }}</p>
          </div>

          <!-- Game Area -->
          <div class="game-area">
            <!-- Trivia Quiz -->
            <div v-if="activeGame === 0" class="game-section">
              <div class="question-card">
                <h3>Frage:</h3>
                <p class="question-text">{{ triviaQuestion.question }}</p>
              </div>
              
              <div class="answers-grid">
                <button 
                  v-for="(answer, index) in triviaAnswers" 
                  :key="index"
                  class="answer-button"
                  :class="{ 
                    'correct': showResult && answer === triviaQuestion.correct_answer,
                    'incorrect': showResult && answer !== triviaQuestion.correct_answer && answer === selectedAnswer
                  }"
                  @click="checkTriviaAnswer(answer)"
                  :disabled="showResult"
                >
                  {{ answer }}
                </button>
              </div>

              <div v-if="triviaFeedback" class="feedback-card" :class="isCorrect ? 'success' : 'error'">
                <span class="feedback-icon">{{ isCorrect ? '✓' : '✗' }}</span>
                <p>{{ triviaFeedback }}</p>
              </div>

              <button class="action-button primary" @click="fetchTriviaQuestion">
                <span>Nächste Frage</span>
                <span class="button-icon">→</span>
              </button>
            </div>

            <!-- Joke Generator -->
            <div v-if="activeGame === 1" class="game-section">
              <div class="joke-card">
                <div class="joke-setup">
                  <h3>Setup:</h3>
                  <p>{{ joke.setup || 'Klicke auf den Button für einen Witz!' }}</p>
                </div>
                <div v-if="showPunchline && joke.punchline" class="joke-punchline">
                  <h3>Punchline:</h3>
                  <p>{{ joke.punchline }}</p>
                </div>
              </div>

              <div class="button-group">
                <button 
                  v-if="joke.setup && !showPunchline" 
                  class="action-button secondary"
                  @click="showPunchline = true"
                >
                  <span>Zeige Punchline</span>
                  <span class="button-icon">😄</span>
                </button>
                <button class="action-button primary" @click="fetchJoke">
                  <span>Neuer Witz</span>
                  <span class="button-icon">🎭</span>
                </button>
              </div>
            </div>

            <!-- Pokémon Guessing Game -->
            <div v-if="activeGame === 2" class="game-section">
              <div class="pokemon-card">
                <div class="pokemon-image-container">
                  <img
                    v-if="pokemon.image"
                    :src="pokemon.image"
                    alt="Pokémon"
                    class="pokemon-image"
                    :class="{ 'silhouette': !pokemonRevealed }"
                  />
                  <div v-else class="pokemon-placeholder">
                    <span>?</span>
                  </div>
                </div>

                <div class="guess-section">
                  <input 
                    v-model="pokemonGuess" 
                    placeholder="Welches Pokémon ist das?"
                    class="guess-input"
                    @keyup.enter="checkPokemonGuess"
                    :disabled="pokemonRevealed"
                  />
                  <button 
                    class="action-button secondary" 
                    @click="checkPokemonGuess"
                    :disabled="!pokemonGuess || pokemonRevealed"
                  >
                    Rate!
                  </button>
                </div>

                <div v-if="pokemonFeedback" class="feedback-card" :class="pokemonCorrect ? 'success' : 'error'">
                  <span class="feedback-icon">{{ pokemonCorrect ? '✓' : '✗' }}</span>
                  <p>{{ pokemonFeedback }}</p>
                </div>
              </div>

              <button class="action-button primary" @click="fetchPokemon">
                <span>Neues Pokémon</span>
                <span class="button-icon">🎮</span>
              </button>
            </div>

            <!-- Country Flag Quiz -->
            <div v-if="activeGame === 3" class="game-section">
              <div class="flag-card">
                <div class="flag-container">
                  <img
                    v-if="country.flag"
                    :src="country.flag"
                    alt="Country Flag"
                    class="flag-image"
                  />
                  <div v-else class="flag-placeholder">
                    <span>🏳️</span>
                  </div>
                </div>

                <h3>Welches Land ist das?</h3>
              </div>

              <div class="options-grid">
                <button
                  v-for="(option, index) in countryOptions"
                  :key="index"
                  class="option-button"
                  :class="{
                    'correct': showCountryResult && option === country.name,
                    'incorrect': showCountryResult && option !== country.name && option === selectedCountry
                  }"
                  @click="checkCountryGuess(option)"
                  :disabled="showCountryResult"
                >
                  {{ option }}
                </button>
              </div>

              <div v-if="countryFeedback" class="feedback-card" :class="countryCorrect ? 'success' : 'error'">
                <span class="feedback-icon">{{ countryCorrect ? '✓' : '✗' }}</span>
                <p>{{ countryFeedback }}</p>
              </div>

              <button class="action-button primary" @click="fetchCountry">
                <span>Neue Flagge</span>
                <span class="button-icon">🌍</span>
              </button>
            </div>
          </div>

          <!-- Game Stats -->
          <div class="game-stats">
            <div class="stat-item">
              <span class="stat-label">Gespielt:</span>
              <span class="stat-value">{{ games[activeGame].stats.played }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Richtig:</span>
              <span class="stat-value success">{{ games[activeGame].stats.correct }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Erfolgsquote:</span>
              <span class="stat-value">{{ successRate }}%</span>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// Game State
const activeGame = ref(0);
const showResult = ref(false);
const selectedAnswer = ref("");
const showPunchline = ref(false);
const pokemonRevealed = ref(false);
const pokemonCorrect = ref(false);
const showCountryResult = ref(false);
const selectedCountry = ref("");
const countryCorrect = ref(false);
const isCorrect = ref(false);

// Game Data
const games = ref([
  {
    title: "Trivia Quiz",
    icon: "🧠",
    description: "Teste dein Wissen mit spannenden Fragen aus verschiedenen Kategorien!",
    stats: { played: 0, correct: 0 }
  },
  {
    title: "Joke Generator",
    icon: "😂",
    description: "Bringe dich zum Lachen mit zufälligen Witzen!",
    stats: { played: 0, correct: 0 }
  },
  {
    title: "Pokémon Quiz",
    icon: "🎮",
    description: "Erkennst du alle Pokémon? Teste deine Kenntnisse!",
    stats: { played: 0, correct: 0 }
  },
  {
    title: "Flaggen Quiz",
    icon: "🌍",
    description: "Wie gut kennst du die Flaggen der Welt?",
    stats: { played: 0, correct: 0 }
  }
]);

// Computed
const successRate = computed(() => {
  const current = games.value[activeGame.value].stats;
  if (current.played === 0) return 0;
  return Math.round((current.correct / current.played) * 100);
});

// Methods
const selectGame = (index) => {
  activeGame.value = index;
  resetGameStates();
};

const resetGameStates = () => {
  showResult.value = false;
  selectedAnswer.value = "";
  showPunchline.value = false;
  pokemonRevealed.value = false;
  pokemonCorrect.value = false;
  showCountryResult.value = false;
  selectedCountry.value = "";
  countryCorrect.value = false;
  isCorrect.value = false;
};

// Shuffle helper
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

//////////////////////////
// Trivia Quiz
const triviaQuestion = ref({});
const triviaAnswers = ref([]);
const triviaFeedback = ref("");

const fetchTriviaQuestion = async () => {
  try {
    const res = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");
    const data = await res.json();
    const question = data.results[0];
    triviaQuestion.value = question;
    triviaAnswers.value = shuffle([
      ...question.incorrect_answers,
      question.correct_answer,
    ]);
    triviaFeedback.value = "";
    showResult.value = false;
    selectedAnswer.value = "";
  } catch (error) {
    console.error("Error fetching trivia:", error);
  }
};

const checkTriviaAnswer = (answer) => {
  if (showResult.value) return;
  
  selectedAnswer.value = answer;
  showResult.value = true;
  games.value[0].stats.played++;
  
  if (answer === triviaQuestion.value.correct_answer) {
    triviaFeedback.value = "Richtig! Gut gemacht!";
    isCorrect.value = true;
    games.value[0].stats.correct++;
  } else {
    triviaFeedback.value = `Falsch! Die richtige Antwort war: ${triviaQuestion.value.correct_answer}`;
    isCorrect.value = false;
  }
};

//////////////////////////
// Joke Generator
const joke = ref({ setup: "", punchline: "" });

const fetchJoke = async () => {
  try {
    showPunchline.value = false;
    const res = await fetch("https://official-joke-api.appspot.com/random_joke");
    joke.value = await res.json();
    games.value[1].stats.played++;
    games.value[1].stats.correct = games.value[1].stats.played; // Jokes are always "correct"
  } catch (error) {
    console.error("Error fetching joke:", error);
  }
};

//////////////////////////
// Pokémon Guessing Game
const pokemon = ref({ name: "", image: "" });
const pokemonGuess = ref("");
const pokemonFeedback = ref("");

const fetchPokemon = async () => {
  try {
    const id = Math.floor(Math.random() * 151) + 1;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    pokemon.value = {
      name: data.name.toLowerCase(),
      image: data.sprites.front_default,
    };
    pokemonFeedback.value = "";
    pokemonGuess.value = "";
    pokemonRevealed.value = false;
    pokemonCorrect.value = false;
  } catch (error) {
    console.error("Error fetching pokemon:", error);
  }
};

const checkPokemonGuess = () => {
  if (!pokemonGuess.value || pokemonRevealed.value) return;
  
  pokemonRevealed.value = true;
  games.value[2].stats.played++;
  
  if (pokemonGuess.value.toLowerCase() === pokemon.value.name) {
    pokemonFeedback.value = "Richtig! Du kennst deine Pokémon!";
    pokemonCorrect.value = true;
    games.value[2].stats.correct++;
  } else {
    pokemonFeedback.value = `Falsch! Es war ${pokemon.value.name}`;
    pokemonCorrect.value = false;
  }
};

//////////////////////////
// Country Flag Quiz
const countries = ref([]);
const country = ref({ name: "", flag: "" });
const countryOptions = ref([]);
const countryFeedback = ref("");

const fetchCountry = async () => {
  try {
    if (countries.value.length === 0) {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      countries.value = data;
    }
    
    const selected = countries.value[Math.floor(Math.random() * countries.value.length)];
    country.value = {
      name: selected.name.common,
      flag: selected.flags.svg,
    };
    
    countryOptions.value = shuffle([
      selected.name.common,
      ...shuffle(countries.value.filter((c) => c.name.common !== selected.name.common))
        .slice(0, 3)
        .map((c) => c.name.common),
    ]);
    
    countryFeedback.value = "";
    showCountryResult.value = false;
    selectedCountry.value = "";
    countryCorrect.value = false;
  } catch (error) {
    console.error("Error fetching country:", error);
  }
};

const checkCountryGuess = (guess) => {
  if (showCountryResult.value) return;
  
  selectedCountry.value = guess;
  showCountryResult.value = true;
  games.value[3].stats.played++;
  
  if (guess === country.value.name) {
    countryFeedback.value = "Richtig! Du bist ein Geographie-Experte!";
    countryCorrect.value = true;
    games.value[3].stats.correct++;
  } else {
    countryFeedback.value = `Falsch! Es war ${country.value.name}`;
    countryCorrect.value = false;
  }
};

//////////////////////////
// Init
onMounted(() => {
  fetchTriviaQuestion();
  fetchJoke();
  fetchPokemon();
  fetchCountry();
});
</script>

<style scoped>
/* Styles werden in der CSS-Datei ergänzt */
</style>