<script lang="ts">
    import Home from "./routes/Home.svelte";
    import Game from "./routes/game.svelte";
    import NotFound from "./routes/notfound.svelte";
    import Router from "svelte-spa-router";

    let routes = {
        "/": Home,
        "/404": NotFound,
        "/:id": Game,
    }
</script>

<main>
    <Router {routes}/>
</main>

<style>
</style>
