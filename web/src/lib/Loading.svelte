<script lang="ts">
  import { blur } from "svelte/transition";

  const wait = () => new Promise((res) => setTimeout(res , 100));
</script>

<style>
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--white);
    font-size: 2em;
    text-align: center;
  }
</style>

<!-- svelte-ignore empty-block -->
{#await wait}
{:then}
  <span in:blur class="loading">Downloading Data</span>
{/await}
