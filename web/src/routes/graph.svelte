<script lang="ts">
  import ScatterPlot from "$lib/chart/ScatterPlot.svelte";
  import { dataSet } from "$lib/dataSet";

  const dataViewPromise = dataSet.getView(
    new Date("2022-07-7 14:00:00"),
    new Date()
  );
</script>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100vw;
    height: 100vh;

    background-color: var(--black);
  }
</style>

{#await dataViewPromise}
  Fetching...  
{:then data}
  <div class="container">
    <ScatterPlot {data}/>
  </div>
{/await}
