<script lang="ts">
  import { dataViewStore } from "$lib/visConfig";
  import Axes from "./axes/Axes.svelte";
  import DataDisplay from "./data/DataDisplay.svelte";
  import { graphDimensionsStore } from "$lib/visConfig";
  import Loading from "$lib/Loading.svelte";
</script>

<style>
  svg {
    width: 100%;
    height: 100%;
  }
</style>

<svg viewBox={`0 0 ${$graphDimensionsStore.width} ${$graphDimensionsStore.height}`}>
  <g transform={`translate(${$graphDimensionsStore.margin.left}, ${$graphDimensionsStore.margin.top})`}>
    <Axes>
    {#await $dataViewStore}
      <Loading />
    {:then data}
      <DataDisplay {data} />
    {/await}
    </Axes>
  </g>
</svg>