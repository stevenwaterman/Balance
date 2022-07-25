<script lang="ts">
  import type { TickData } from "./ticks";

  export let xTicks: TickData[];
  export let yTicks: TickData[];

  export let xScale: d3.ScaleLinear<number, number, never>;
  export let yScale: d3.ScaleLinear<number, number, never>;

  export let axisSeparation: number;
  export let dataWidth: number;
  export let dataHeight: number;
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
    x1={xScale(tick.position) + axisSeparation}
    x2={xScale(tick.position) + axisSeparation}
    y1={0}
    y2={dataHeight + axisSeparation}
  />
{/each}

{#each yTicks as tick}
  <line
    x1={0}
    x2={dataWidth + axisSeparation}
    y1={yScale(tick.position)}
    y2={yScale(tick.position)}/>
{/each}
