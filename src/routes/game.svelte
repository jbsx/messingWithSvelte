<script lang="ts">
    import { initializeApp } from "firebase/app";
    import { getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
    import { getFirestore, doc, onSnapshot, setDoc, addDoc, collection} from "firebase/firestore";

    export let params = {};

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
    const db = getFirestore(app);
    $: gamedata = {
        player1: user["email"],
        turn: user["email"],
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
    }
    
//LOGIN
    const auth = getAuth();

    $: user = {};
    $: logged = false;

    const login = async ()=>{
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    }

// Update state on login and logout
    auth.onAuthStateChanged(async curr => {
        if (curr){
            logged = true;
            user = curr;
            if (!gamedata["player2"] && gamedata["player1"]){
                gamedata["player2"] = curr.email;
                await setDoc(doc(db, "games", params["id"]), gamedata);
            }
        } else {
            logged = false;
        }
    })

    const addPlayer2 = async ()=>{
        gamedata["player2"] = user["email"];
        await setDoc(doc(db, "games", params["id"]), gamedata);
    }

//GAME LOGIC
    onSnapshot(doc(db, "games", params["id"]), (doc) => {
        //@ts-ignore
        gamedata = doc.data();
    });

//Play turn
    const update = async (position: number) =>{
        if (gamedata["turn"] === user["email"] && gamedata["player2"] && gamedata.gameboard[position] === ""){
            if (gamedata["player1"] === user["email"]){
                gamedata.gameboard[position] = "X"
                gamedata.turn = gamedata["player2"];
                checkEnd()
                await setDoc(doc(db, "games", params["id"]), gamedata)
            } else if(gamedata["player2"] === user["email"]) {
                gamedata.gameboard[position] = "O"
                gamedata.turn = gamedata["player1"];
                checkEnd()
                await setDoc(doc(db, "games", params["id"]), gamedata)
            }
        }
    }

    const checkEnd = ()=>{
        const solutions = [
            ["1", "2", "3"],
            ["4", "5", "6"],
            ["7", "8", "9"],
            ["1", "4", "7"],
            ["2", "5", "8"],
            ["3", "6", "9"],
            ["1", "5", "9"],
            ["7", "5", "3"],
        ];
        for (let i = 0; i < solutions.length; i++){
            if (gamedata.gameboard[solutions[i][0]] === gamedata.gameboard[solutions[i][1]] && 
                gamedata.gameboard[solutions[i][1]] === gamedata.gameboard[solutions[i][2]] &&
                gamedata.gameboard[solutions[i][1]] !== "")
                {
                if(gamedata.gameboard[solutions[i][1]] === "X"){
                    gamedata["winner"] = gamedata["player1"];
                } else {
                    gamedata["winner"] = gamedata["player2"];
                }
            }
        }
    }
</script>

<main>
    {#if logged}
        {#if user["email"] == gamedata["player1"] || user["email"] == gamedata["player2"]}
            {#if gamedata["winner"]}
                WINNER: {gamedata["winner"]}
                <br/>
                <br/>
                <button on:click={async ()=>{
                    try {
                      const docRef = await addDoc(collection(db, "games"), {
                        player1: user["email"]? user["email"]: "John Cena",
                        turn:  user["email"]? user["email"]: "John Cena",
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
                }}>Play again</button>
            {:else}
                <span class="gamedesc">
                    Share game link: <a href={window.location.toString()}>{window.location.toString()}</a>
                </span>
                <span>Current turn: {gamedata.turn}</span>
                <div id="game">
                    <button id="1" on:click={() => {update(1)}}>{gamedata.gameboard[1]}</button>
                    <button id="2" on:click={() => {update(2)}}>{gamedata.gameboard[2]}</button>
                    <button id="3" on:click={() => {update(3)}}>{gamedata.gameboard[3]}</button>
                    <button id="4" on:click={() => {update(4)}}>{gamedata.gameboard[4]}</button>
                    <button id="5" on:click={() => {update(5)}}>{gamedata.gameboard[5]}</button>
                    <button id="6" on:click={() => {update(6)}}>{gamedata.gameboard[6]}</button>
                    <button id="7" on:click={() => {update(7)}}>{gamedata.gameboard[7]}</button>
                    <button id="8" on:click={() => {update(8)}}>{gamedata.gameboard[8]}</button>
                    <button id="9" on:click={() => {update(9)}}>{gamedata.gameboard[9]}</button>
                </div>
                <span>
                    You are {#if gamedata.player1 == user["email"]}
                        X
                    {:else}
                        O
                    {/if}
                </span>
            {/if}
        {:else if !gamedata["player2"]}
            {addPlayer2()}
        {:else}
            Lobby is full
        {/if}
    {:else}
        <button on:click={()=>{login()}}>Log in to join game</button>
    {/if}
</main>

<style>
    .gamedesc{
        position: absolute;
        top: 10px;
        transform: translateX(-50%);
    }

    a{
        background-color: rgb(28,28,28);
        padding: 10px;
        border-radius: 5px;
        color: rgb(200, 200, 255);
    }

    #game{
        background-color: rgba(255, 255, 255, 30%);
        height: 300px;
        width: 300px;
        border-radius: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    #game button{
        height: 90px;
        width: 90px;
        margin: 5px;
        font-size: 20px;
    }
</style>
