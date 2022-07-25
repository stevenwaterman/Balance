<script lang="ts">
  import type { TickData } from "./ticks";
  import type * as d3 from "d3";

  export let width: number;
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

<line x1={0} x2={width} y1="0" y2="0"/>
{#each ticks as tick}
  <g transform={`translate(${scale(tick.position)},0)`}>
    <line y1="0" y2="6" />
    <text y="9" dy="0.71em">{tick.label}</text>
  </g>
{/each}
