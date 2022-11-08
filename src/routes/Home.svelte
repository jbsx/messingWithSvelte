<script lang="ts">
    import { initializeApp } from "firebase/app";
    import { getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
    import { getFirestore, collection, addDoc} from "firebase/firestore";

    export const params = {};

    // Initialize Firebase App
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
    const db = getFirestore(app)

    // LOGIN
    const auth = getAuth();

    $: user = undefined;
    $: logged = false;

    const login = async ()=>{
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider)
    }

    // Update state on login and logout
    auth.onAuthStateChanged(curr => {
        if (curr){
            logged = true
            user = curr
        } else {
            logged = false
        }
        console.log(user);
    })

    //Play button function
    const generateLobby = async ()=>{
        try {
          const docRef = await addDoc(collection(db, "games"), {
            player1: user.email? user.email: "John Cena",
            turn:  user.email? user.email: "John Cena",
            gameboard: {
                "1": "",
                "2": "",
                "3": "",
                "4": "",
                "5": "",
                "6": "",
                "7": "",
                "8": "",
                "9": "",
            },
          });
          console.log("Document written with ID: ", docRef.id);
          const path = "/#/"+docRef.id
          window.location.href = path;
        } catch (e) {
          console.error("Error adding document: ", e);
        }
    }

</script>

<main>
    <h1>
        TicTacToe
    </h1>
    {#if logged}
        <div class="stats">
            {user.email}
            <br/>
            {user.displayName}
        </div>
        <button on:click={()=>{generateLobby()}}>
            Play
        </button>
        <button on:click={()=>{auth.signOut()}}>
            Logout
        </button>
    {:else}
        <button on:click={()=>{generateLobby()}}>
            Play as Guest
        </button>
        <button on:click={()=>{login()}}>
            Login to store game history
        </button>
    {/if}
</main>

<style>
    .stats{
        position: absolute;
        text-align: right;
        right:0px;
        top:0px;
        padding: 10px;
        font-size: 24px;
    }
</style>
