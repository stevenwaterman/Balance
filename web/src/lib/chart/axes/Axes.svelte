<script lang="ts">
  import AxisX from "./AxisX.svelte";
  import AxisY from "./AxisY.svelte";
  import Hatching from "./Hatching.svelte";

  import { defaultTickIntervalX, getTicks, labelTickDate, type TickData } from "../ticks";
  import { axesDimensionsStore, dataDimensionsStore, graphDimensionsStore, xExtentStore, xScaleStore, yScaleStore } from "$lib/visConfig";

  let xTicks: TickData[];
  $: xTicks = getTicks($xExtentStore, 24 * 3600 * 1000, defaultTickIntervalX($xExtentStore), labelTickDate);

  let yTicks: TickData[];
  $: yTicks = getTicks([0, 9], 1, 1, y => y.toString());
</script>

<g
  transform={`translate(${$graphDimensionsStore.axes.yWidth + $graphDimensionsStore.axes.separation}, ${$axesDimensionsStore.height - $graphDimensionsStore.axes.xHeight})`}
  fill="none"
  font-size="8"
  font-family="sans-serif"
  text-anchor="middle"
>
  <AxisX width={$dataDimensionsStore.width} scale={$xScaleStore} ticks={xTicks} />
</g>

<g
  transform={`translate(${$graphDimensionsStore.axes.yWidth}, 0)`}
  fill="none"
  font-size="10"
  font-family="sans-serif"
  text-anchor="middle"
>
  <AxisY height={$dataDimensionsStore.height} scale={$yScaleStore} ticks={yTicks}/>
</g>

<g transform={`translate(${$graphDimensionsStore.axes.yWidth}, 0)`}>
  <Hatching {xTicks} {yTicks}/>
</g>

<g transform={`translate(${$axesDimensionsStore.width - $dataDimensionsStore.width}, 0)`}>
  <slot/>
</g>
