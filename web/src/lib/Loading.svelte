<script lang="ts">
  import { blur } from "svelte/transition";

  function wait(delay: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => resolve(), delay);
    })
  }
</script>

<style>
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--white);
    font-size: 3vw;
    text-align: center;
  }
</style>

{#await wait(200)}
  <span></span>
{:then}
  <span class="loading" transition:blur>Downloading Data...</span>
{/await}
