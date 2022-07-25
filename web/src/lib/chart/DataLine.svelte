<script lang="ts">
  import type { SingleScore } from "../transformation";
  import type * as d3 from "d3"

  export let series: SingleScore[];
  export let xScale: d3.ScaleLinear<number, number, never>;
  export let yScale: d3.ScaleLinear<number, number, never>;
  export let color: string;

  let points: string;
  $: points = series
    .map(elem => 
      `${xScale(elem.date)},${yScale(elem.value)}`
    ).join(" ");
</script>

<style>
  polyline {
    stroke-width: 1;
  }
</style>

<polyline points={points} fill="none" stroke={color} vector-effect="non-scaling-stroke" />
