<script lang="ts">
  import { enablePersonalStore, enableProfessionalStore, enableSpiritualStore } from "$lib/visConfig";
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
  <LegendElement label="Personal" store={enablePersonalStore} color="red" />
  <LegendElement label="Professional" store={enableProfessionalStore} color="green" />
  <LegendElement label="Spiritual" store={enableSpiritualStore} color="blue" />
</div>
