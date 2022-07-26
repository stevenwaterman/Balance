<script lang="ts">
  import type { SingleScore } from "$lib/transformation";
  import { xScaleStore, yScaleStore } from "$lib/visConfig";

  export let series: SingleScore[];
  export let color: string;

  let points: string;
  $: points = series
    .map(elem => 
      `${$xScaleStore(elem.date)},${$yScaleStore(elem.value)}`
    ).join(" ");
</script>

<style>
  polyline {
    stroke-width: 2;
    stroke-opacity: 0.8;
  }
</style>

<polyline points={points} fill="none" stroke={color} vector-effect="non-scaling-stroke" />
