<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import { initializeApp } from "firebase/app";
  
  const firebaseConfig = {
    apiKey: "AIzaSyA2uCHyHvmfpQX_YPBI1utv_Kkm4rK709g",
    authDomain: "test-85760.firebaseapp.com",
    projectId: "test-85760",
    storageBucket: "test-85760.appspot.com",
    messagingSenderId: "768617131325",
    appId: "1:768617131325:web:4fbdbf9fb31aa2efa66954",
    measurementId: "G-PBGF5YRB26"
  };
  
  const app = initializeApp(firebaseConfig);
</script>

<main>
    <h1>
    TicTacToe
    </h1>
    <button>
    Play as Guest
    </button>
    <button>
    Login to play competitive
    </button>
</main>

<style>
</style>
