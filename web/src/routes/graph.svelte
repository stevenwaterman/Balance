<script lang="ts">
  import DataLines from "$lib/DataLines.svelte";
  import { dataSet } from "$lib/dataSet";
import GraphGrid from "$lib/GraphGrid.svelte";

  const dataViewPromise = dataSet.getView(
    new Date("2022-05-10"),
    new Date("2022-08-20")
  );
</script>

<style>
  svg {
    width: 100vw;
    height: 100vh;
  }
</style>

{#await dataViewPromise}
  Fetching...  
{:then data}
  <svg viewBox={`0 0 1 9`} preserveAspectRatio="none">
    <DataLines data={data} />
    <GraphGrid/>
  </svg>
{/await}
