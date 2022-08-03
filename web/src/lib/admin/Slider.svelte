<script lang="ts">
  export let label: string;
  export let value: number | undefined;

  let values: number[];
  $: values = new Array(10).fill(null).map((_, i) => i);
</script>

<style>
  span {
    text-align: right;
    color: var(--white)
  }

  select {
    font-size: 1em;
    background-color: var(--lightgrey);
    border: none;
    border-radius: 0.25em;
    color: var(--black);
    padding: 0.25em;
  }
</style>

<span>{label}</span>
<select bind:value>
  {#each values as i}
    <option value={i}>{i}</option>
  {/each}
</select>
