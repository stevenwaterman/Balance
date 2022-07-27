<script lang="ts">
  import { windowFractionStore } from "$lib/visConfig";
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  span {
    color: var(--white);
    font-weight: bold;
  }

  input {
    width: 20em
  }
</style>

<div class="container">
  <span>Smoothing: {($windowFractionStore * 100).toFixed(0)}%</span>
  <input type="range" min="0" max="0.40" step="0.01" bind:value={$windowFractionStore}/>
</div>
