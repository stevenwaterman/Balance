<script lang="ts">
  import type { BoolWritable } from "$lib/visConfig";

  export let store: BoolWritable;
  export let label: string;
  export let color: string;

  let actualColor: string;
  $: actualColor = `var(--${color})`;

  let lightColor: string;
  $: lightColor = `var(--light${color})`;
</script>

<style>
  .container {
    display: contents;

    cursor: pointer;
    font-size: 16pt;
    color: var(--white);
  }

  /* Hide the default checkbox */
  input {
    position: fixed;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .label {
    color: var(--white);
    user-select: none;
  }

  .customToggle {
    height: 1em;
    width: 1em;
    background-color: var(--white);
    border-radius: 100%;
    user-select: none;
  }

  /* Use dark version of color when checked */
  .container:not(:hover) input:checked ~ .customToggle {
    background-color: var(--color);
  }
  .container:not(:hover) input:checked ~ .label {
    color: var(--color);
  }

  /* Use light version of color on hover */
  .container:hover input:not(:checked) ~ .label {
    color: var(--lightwhite);
  }
  .container:hover input:not(:checked) ~ .customToggle {
    background-color: var(--lightwhite);
  }

  /* Use light version of color on hover */
  .container:hover input:checked ~ .label {
    color: var(--lightcolor);
  }
  .container:hover input:checked ~ .customToggle {
    background-color: var(--lightcolor);
  }
</style>

<label class="container" style={`--color: ${actualColor}; --lightcolor: ${lightColor};`}>
  <input class="checkbox" type="checkbox" bind:checked={$store}/>
  <span class="customToggle" aria-hidden="true"></span>
  <span class="label">{label}</span>
</label>
