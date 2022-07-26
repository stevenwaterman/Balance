<script lang="ts">
  import { windowHrsStore } from "$lib/visConfig";


</script>

<style>
  .container {
    display: flex;
    flex-direction: row;
  }
</style>

<div class="container">
  <p style="color: var(--white);">{$windowHrsStore.toFixed(1)} hrs</p>
  <input type="range" min="0.1" max="48" step="0.1" bind:value={$windowHrsStore}/>
</div>
