<script lang="ts">
  export let value: number;

  let values: number[];
  $: values = new Array(10).fill(null).map((_, i) => i);
</script>

<select bind:value>
  {#each values as i}
    <option value={i}>{i}</option>
  {/each}
</select>