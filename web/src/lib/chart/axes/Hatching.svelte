<script lang="ts">
  import { dataDimensionsStore, graphDimensionsStore, xScaleStore, yScaleStore } from "$lib/visConfig";
  import type { TickData } from "../ticks";

  export let xTicks: TickData[];
  export let yTicks: TickData[];
</script>

<style>
  line {
    stroke: var(--lightgrey);
    stroke-width: 0.5;
    stroke-dasharray: 3 6;
    stroke-opacity: 1;
  }
</style>

{#each xTicks as tick}
  <line 
    x1={$xScaleStore(tick.position) + $graphDimensionsStore.axes.separation}
    x2={$xScaleStore(tick.position) + $graphDimensionsStore.axes.separation}
    y1={0}
    y2={$dataDimensionsStore.height + $graphDimensionsStore.axes.separation}
  />
{/each}

{#each yTicks as tick}
  <line
    x1={0}
    x2={$dataDimensionsStore.width + $graphDimensionsStore.axes.separation}
    y1={$yScaleStore(tick.position)}
    y2={$yScaleStore(tick.position)}/>
{/each}
