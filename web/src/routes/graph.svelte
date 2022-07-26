<script lang="ts">
  import Controls from "$lib/chart/controls/Controls.svelte";
import ScatterPlot from "$lib/chart/ScatterPlot.svelte";
</script>

<style>
  .container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 100vw;
    height: 100vh;

    background-color: var(--black);
  }
</style>

<div class="container">
  <ScatterPlot />
  <Controls />
</div>