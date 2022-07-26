<script lang="ts">
  import type { Score } from "$lib/dataSet";
  import { getDataSeries, type SingleScore } from "$lib/transformation";
  import { desiredRangeStore, enablePersonalStore, enableProfessionalStore, enableSpiritualStore, windowMillisStore } from "$lib/visConfig";
  import DataLine from "./DataLine.svelte";

  export let data: Score[];

  let personal: SingleScore[];
  $: personal = getDataSeries(data, "personal", $windowMillisStore, $desiredRangeStore);

  let professional: SingleScore[];
  $: professional = getDataSeries(data, "professional", $windowMillisStore, $desiredRangeStore);

  let spiritual: SingleScore[];
  $: spiritual = getDataSeries(data, "spiritual", $windowMillisStore, $desiredRangeStore);
</script>

{#if $enablePersonalStore}
  <DataLine series={personal} color="var(--red)" />
{/if}

{#if $enableProfessionalStore}
  <DataLine series={professional} color="var(--green)" />
{/if}

{#if $enableSpiritualStore}
  <DataLine series={spiritual} color="var(--blue)" />
{/if}
