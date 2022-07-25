<script lang="ts">
  import type { Score } from "$lib/dataSet";
  import { getDataSeries, type SingleScore } from "$lib/transformation";
  import { writable, type Writable } from "svelte/store";
  import Axes from "./Axes.svelte";
  import DataLine from "./DataLine.svelte";

  export let width: number = 460;
  export let height: number = 400;

  export let margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  } = {
    top: 40,
    right: 10,
    bottom: 10,
    left: 10
  };

  export let data: Score[];

  let windowHrsStore: Writable<number> = writable(24);

  let personal: SingleScore[];
  $: personal = getDataSeries(data, "personal", $windowHrsStore);

  let professional: SingleScore[];
  $: professional = getDataSeries(data, "professional", $windowHrsStore);

  let spiritual: SingleScore[];
  $: spiritual = getDataSeries(data, "spiritual", $windowHrsStore);

  let enablePersonal: boolean = true;
  let enableProfessional: boolean = true;
  let enableSpiritual: boolean = true;
</script>

<style>
  svg {
    width: 90vw;
    height: 90vh;
  }

  circle {
    cursor: pointer;
  }

  text {
    user-select: none;
    cursor: pointer;
  }
</style>

<p style="color: var(--white);">{$windowHrsStore.toFixed(1)} hrs</p>
<input type="range" min="0.1" max="48" step="0.1" bind:value={$windowHrsStore}/>

<svg viewBox={`0 0 ${width} ${height}`}>
  <g on:click={() => enablePersonal = !enablePersonal}>
    <circle cx="20" cy="10" r="5" fill={enablePersonal ? "var(--red)" : "var(--white)"} />
    <text x="30" y="13" fill="var(--red)" font-size="10">Personal</text>
  </g>

  <g on:click={() => enableProfessional = !enableProfessional}>
    <circle cx="125" cy="10" r="5" fill={enableProfessional ? "var(--green)" : "var(--white)"} />
    <text x="135" y="13" fill="var(--green)" font-size="10">Professional</text>
  </g>

  <g on:click={() => enableSpiritual = !enableSpiritual}>
    <circle cx="240" cy="10" r="5" fill={enableSpiritual ? "var(--blue)" : "var(--white)"} />
    <text x="250" y="13" fill="var(--blue)" font-size="10">Spiritual</text>
  </g>
  

  <g transform={`translate(${margin.left}, ${margin.top})`}>
    <Axes
      {data}
      width={width - margin.left - margin.right}
      height={height - margin.top - margin.bottom}
      let:xScale
      let:yScale
    >
      {#if enablePersonal}
        <DataLine series={personal} color="var(--red)" {xScale} {yScale} />
      {/if}

      {#if enableProfessional}
        <DataLine series={professional} color="var(--green)" {xScale} {yScale} />
      {/if}

      {#if enableSpiritual}
        <DataLine series={spiritual} color="var(--blue)" {xScale} {yScale} />
      {/if}
    </Axes>
  </g>
</svg>
