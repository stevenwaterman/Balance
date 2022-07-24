<script lang="ts">
  import GraphGridLine from "./GraphGridLine.svelte";

  const ys = Array(10).fill(null).map((_, idx) => idx);
</script>

{#each ys as y}
  <GraphGridLine {y}/>
{/each}