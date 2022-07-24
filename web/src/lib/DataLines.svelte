<script lang="ts">
  import DataLine from "./DataLine.svelte";
  import type { Score } from "./dataSet";

  export let data: Score[];

  let xMin: number;
  $: xMin = data.reduce((acc, elem) => Math.min(acc, elem.date.getTime()), Number.MAX_SAFE_INTEGER);

  let xMax: number;
  $: xMax = data.reduce((acc, elem) => Math.max(acc, elem.date.getTime()), 0);

  let xRange: number;
  $: xRange = xMax - xMin;
</script>

<DataLine {data} scoreType="personal" {xMin} {xRange} color="red" />
<DataLine {data} scoreType="professional" {xMin} {xRange} color="blue" />
<DataLine {data} scoreType="spiritual" {xMin} {xRange} color="green" />
