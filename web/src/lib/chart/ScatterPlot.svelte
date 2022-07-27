<script lang="ts">
  import { dataViewStore } from "$lib/visConfig";
  import Axes from "./axes/Axes.svelte";
  import DataDisplay from "./data/DataDisplay.svelte";
  import { graphDimensionsStore } from "$lib/visConfig";
  import Loading from "$lib/Loading.svelte";
  import type { DataView } from "$lib/dataSet";

  let loading: boolean = false;

  async function updateDataView(promise: Promise<DataView>) {
    loading = true;
    dataView = await promise;
    loading = false;
  }
  $: updateDataView($dataViewStore);

  let dataView: DataView | undefined = undefined;
</script>

<style>
  svg {
    width: 100%;
    height: 100%;
  }
</style>

{#if loading}
  <Loading />
{/if}

<svg viewBox={`0 0 ${$graphDimensionsStore.width} ${$graphDimensionsStore.height}`}>
  <g transform={`translate(${$graphDimensionsStore.margin.left}, ${$graphDimensionsStore.margin.top})`}>
    <Axes>
      {#if dataView !== undefined}
        <DataDisplay data={dataView} />
      {/if}
    </Axes>
  </g>
</svg>