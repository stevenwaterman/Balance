<script lang="ts">
  import type { Score } from "$lib/dataSet";
  import { getDataSeries, type SingleScore } from "$lib/transformation";
  import { desiredRangeStore, enableSerenityStore, enableGrowthStore, enableBelongingStore, windowMillisStore } from "$lib/visConfig";
  import DataLine from "./DataLine.svelte";

  export let data: Score[];

  let serenity: SingleScore[];
  $: serenity = getDataSeries(data, "serenity", $windowMillisStore, $desiredRangeStore);

  let growth: SingleScore[];
  $: growth = getDataSeries(data, "growth", $windowMillisStore, $desiredRangeStore);

  let belonging: SingleScore[];
  $: belonging = getDataSeries(data, "belonging", $windowMillisStore, $desiredRangeStore);
</script>

{#if $enableSerenityStore}
  <DataLine series={serenity} color="var(--red)" />
{/if}

{#if $enableGrowthStore}
  <DataLine series={growth} color="var(--green)" />
{/if}

{#if $enableBelongingStore}
  <DataLine series={belonging} color="var(--blue)" />
{/if}
