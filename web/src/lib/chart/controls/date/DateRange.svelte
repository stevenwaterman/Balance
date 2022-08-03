<script lang="ts">
  import { desiredRangeStore, minRangeSeparationDays, rangeMax, rangeMin } from "$lib/visConfig";
  import DatePicker from "./DatePicker.svelte";

  function plusDays(date: Date, days: number): Date {
    const output = new Date(date.getTime());
    output.setUTCDate(output.getUTCDate() + days);
    return output;
  } 

  let maxStart: Date;
  $: maxStart = plusDays($desiredRangeStore.end, -minRangeSeparationDays);

  let minEnd: Date;
  $: minEnd = plusDays($desiredRangeStore.start, minRangeSeparationDays);

  // TODO add buttons to +- days, show all data etc
</script>

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr auto 1fr;

    row-gap: 0.25em;
    column-gap: 1em;

    align-items: flex-end;
    justify-items: center;
  }

  span {
    color: var(--white);
    font-weight: bold;
  }
</style>

<div class="container">
  <span>Start</span>
  <span style="grid-row: span 2; font-size: 30pt;">→</span>
  <span>End</span>

  <DatePicker bind:date={$desiredRangeStore.start} min={rangeMin} max={maxStart}/>
  <DatePicker bind:date={$desiredRangeStore.end} min={minEnd} max={rangeMax}/>
</div>


