<script lang="ts">
  import type { TickData } from "./ticks";
  import type * as d3 from "d3";

  export let height: number;
  export let scale: d3.ScaleLinear<number, number, never>;
  export let ticks: TickData[];
</script>

<style>
  line {
    stroke: var(--white);
  }

  text {
    fill: var(--white);
  }
</style>

<line x1="0" x2="0" y1="0" y2={height} />
{#each ticks as tick}
  <g transform={`translate(0,${scale(tick.position)})`}>
    <line x1="0" x2="-6"/>
    <text x="-9" dx="-0.2em" dy="0.32em">{tick.label}</text>
  </g>
{/each}
