<script lang="ts">
  import { enableSerenityStore, enableGrowthStore, enableBelongingStore } from "$lib/visConfig";
  import LegendElement from "./LegendElement.svelte";
</script>

<style>
  .container {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: 1fr 1fr 1fr;

    row-gap: 1em;
    column-gap: 1em;

    justify-items: left;
    align-items: center;
  }
</style>

<div class="container">
  <LegendElement label="Serenity" store={enableSerenityStore} color="red" />
  <LegendElement label="Growth" store={enableGrowthStore} color="green" />
  <LegendElement label="Belonging" store={enableBelongingStore} color="blue" />
</div>
