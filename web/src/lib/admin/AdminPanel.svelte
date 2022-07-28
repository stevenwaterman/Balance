<script lang="ts">
  import type { Firestore } from "firebase/firestore";
  import Labeller from "./Labeller.svelte";
  import Sliders from "./Sliders.svelte";

  export let db: Firestore;
</script>

<style>
  .container {
    display: grid;
    grid-template-rows: auto auto;

    row-gap: 3em;

    width: fit-content;
    height: fit-content;

    justify-items: center;
    align-items: center;

    font-size: min(2vw, 4vh);
  }
</style>

<div class="container">
  <Sliders {db} />
  <Labeller {db} />
</div>

