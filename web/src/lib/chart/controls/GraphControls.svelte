<script lang="ts">
  import DateRange from "./date/DateRange.svelte";
  import Legend from "./legend/Legend.svelte";
  import WindowSize from "./WindowSize.svelte";
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    row-gap: 3em;

    min-width: 25em;
  }
</style>

<div class="container">
  <Legend />
  <DateRange />
  <WindowSize />
</div>

