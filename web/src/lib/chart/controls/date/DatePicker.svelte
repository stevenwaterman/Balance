<script lang="ts">
  export let date: Date;
  export let min: Date;
  export let max: Date;

  let dateString: string;

  function toDateString(date: Date): string {
    const years = date.getUTCFullYear();
    const months = date.getUTCMonth() + 1;
    const days = date.getUTCDate();

    const yearsString = years.toString().padStart(4, "0");
    const monthsString = months.toString().padStart(2, "0");
    const daysString = days.toString().padStart(2, "0");

    return `${yearsString}-${monthsString}-${daysString}`;
  }

  function internalUpdate(dateString: string) {
    date = new Date(`${dateString}T00:00:00Z`);
  }
  $: dateString && internalUpdate(dateString);

  function externalUpdate(date: Date) {
    dateString = toDateString(date);
  }
  $: date && externalUpdate(date);
</script>

<style>
  input {
    background-color: var(--grey);
    outline: none;
    border: none;
    color: var(--white);
    font-size: 12pt;
    border-radius: 0.5em;
  }
</style>

<input type="date"
  bind:value={dateString}
  min={toDateString(min)}
  max={toDateString(max)}
/>
