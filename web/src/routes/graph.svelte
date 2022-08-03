<script lang="ts">
  import GraphControls from "$lib/chart/controls/GraphControls.svelte";
  import ScatterPlot from "$lib/chart/ScatterPlot.svelte";

  // TODO use grid and change the orientation on mobile so the graph is on top
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
  <GraphControls />
</div>