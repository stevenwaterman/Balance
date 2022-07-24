<script lang="ts">
  import type { Score } from "./dataSet";
  import { extractSingleScore, movingAvg, type SingleScore } from "./transformation";

  export let data: Score[];
  export let scoreType: "personal" | "professional" | "spiritual";
  export let xMin: number;
  export let xRange: number;
  export let color: string;

  let singleScores: SingleScore[];
  $: singleScores = extractSingleScore(data, scoreType);

  let movingAvgScores: SingleScore[];
  $: movingAvgScores = movingAvg(singleScores, 24);

  let points: string;
  $: points = movingAvgScores.map(elem => {
    const time = elem.date;
    const xFraction = (time - xMin) / xRange;

    const yFraction = 9 - elem.value;

    return `${xFraction},${yFraction}`;
  }).join(" ");
</script>

<style>
  polyline {
    stroke-width: 0.5;
  }
</style>

<polyline points={points} fill="none" stroke={color} vector-effect="non-scaling-stroke" />
