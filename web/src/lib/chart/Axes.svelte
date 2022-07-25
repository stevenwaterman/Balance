<script lang="ts">
  import type { Score } from "$lib/dataSet";

  import * as d3 from "d3";

  import AxisX from "./AxisX.svelte";
  import AxisY from "./AxisY.svelte";
  import Hatching from "./Hatching.svelte";

  import { defaultTickIntervalX, getTicks, labelTickDate, type TickData } from "./ticks";

  export let width: number;
  export let height: number;

  export let xAxisHeight: number = 20;
  export let yAxisWidth: number = 20;
  export let axisSeparation: number = 10;

  export let data: Score[];

  function getExtentX(data: Score[]): [number, number] {
    const extent = d3.extent(data, elem => elem.date.getTime());
    const min = extent[0] ?? 0;
    const max = extent[1] ?? 0;
    return [min, max];
  }
  
  let xExtent: [number, number];
  $: xExtent = getExtentX(data);

  let dataHeight: number;
  $: dataHeight = height - xAxisHeight - axisSeparation;

  let dataWidth: number;
  $: dataWidth = width - yAxisWidth - axisSeparation;

  let xScale: d3.ScaleLinear<number, number, never>;
  $: xScale = d3.scaleLinear()
    .domain(xExtent)
    .range([0, dataWidth]);

  let yScale: d3.ScaleLinear<number, number, never>;
  $: yScale = d3.scaleLinear()
    .domain([0, 9])
    .range([dataHeight, 0])

  let xTicks: TickData[];
  $: xTicks = getTicks(xExtent, 24 * 3600 * 1000, defaultTickIntervalX(xExtent), labelTickDate);

  let yTicks: TickData[];
  $: yTicks = getTicks([0, 9], 1, 1, y => y.toString());
</script>

<g
  transform={`translate(${yAxisWidth + axisSeparation}, ${height - xAxisHeight})`}
  fill="none"
  font-size="8"
  font-family="sans-serif"
  text-anchor="middle"
>
  <AxisX width={dataWidth} scale={xScale} ticks={xTicks} />
</g>

<g
  transform={`translate(${yAxisWidth}, 0)`}
  fill="none"
  font-size="10"
  font-family="sans-serif"
  text-anchor="middle"
>
  <AxisY height={dataHeight} scale={yScale} ticks={yTicks}/>
</g>

<g transform={`translate(${yAxisWidth}, 0)`}>
  <Hatching {axisSeparation} {dataWidth} {dataHeight} {xTicks} {yTicks} {xScale} {yScale}/>
</g>

<g transform={`translate(${width - dataWidth}, 0)`}>
  <slot {xScale} {yScale}/>
</g>
