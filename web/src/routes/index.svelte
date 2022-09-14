<script lang="ts">
  import { initFirebase } from "$lib/initFirebase";
  import { doc, getFirestore, onSnapshot } from "firebase/firestore";
  import { blur } from "svelte/transition";

  const db = initFirebase();
  const currentDoc = doc(db, "current", "current");
  onSnapshot(currentDoc, doc => {
    const data = doc.data();
    if (data !== undefined) {
      serenity = data.serenity;
      growth = data.growth;
      belonging = data.belonging;
      timestamp = data.timestamp;
    }
  });

  let serenity: number | undefined = undefined;
  let growth: number | undefined = undefined;
  let belonging: number | undefined = undefined;
  let timestamp: number | undefined = undefined;

  let time: Date | undefined = undefined;
  $: time = timestamp === undefined ? undefined : new Date(timestamp * 1000);

  function timeToString(date: Date): string {
    // HH:MM am/pm on %day%
    const hours = date.getHours();
    const simpleHours = hours % 12;
    const am = hours > 12 ? "PM" : "AM";

    const minutes = date.getMinutes();

    const dayIdx = date.getDay();
    const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayIdx];
    return `${simpleHours}:${minutes} ${am} ${day}`
  }

  let timeString: string | undefined;
  $: timeString = time === undefined ? undefined : timeToString(time);
</script>

<style>
  :global(body) { 
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }


  .scores {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    align-items: center;
    width: fit-content;
    column-gap: calc(2em + 5vw);
    margin: auto;
  }

  .col {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  p {
    margin: 0;
  }

  .title {
    color: var(--grey);
    text-align: center;
    font-size: min(8vw, 20vh);
  }

  .serenity,
  .growth,
  .belonging {
    font-size: min(30vw, 50vh);
    font-weight: bold;
    color: var(--black);
  }


  .label {
    color: var(--grey);
    font-style: italic;
    margin-top: -0.5em;
    font-size: min(4vw, 10vh);
  }

  .timestamp {
    margin-top: 1em;
    color: var(--lightgrey);
    font-size: min(2vw, 5vh);
    text-align: center;
  }

  @media(max-height: 300px) {
    .timestamp {
      display: none;
    }

    .serenity,
    .growth,
    .belonging {
      font-size: min(30vw, 60vh);
    }
  }
</style>

<svelte:head>
  <title>Balance Scores</title>
</svelte:head>

<div class="col" style="height: 100%;">
  <p class="title">(Live) How I Feel:</p>

  <div class="scores">
    {#key serenity}
      <div class="col" style="grid-column: 1; grid-row: 1;" title="The absence of unhappiness, being relaxed rather than stressed, and finding self-acceptance">
        {#if serenity}
          <span transition:blur class="serenity">{serenity}</span>
          <span transition:blur class="label">Serenity</span>
        {/if}
      </div>
    {/key}
  
    {#key growth}
      <div class="col" style="grid-column: 2; grid-row: 1;" title="Mastery of my craft, improving things, achieving my purpose, taking advantage of opportunities, and carving my own path">
        {#if growth}
          <span transition:blur class="growth">{growth}</span>
          <span transition:blur class="label">Growth</span>
        {/if}
      </div>
    {/key}
  
    {#key belonging}
      <div class="col" style="grid-column: 3; grid-row: 1;" title="Having a purpose in life, closeness with others, ability to be myself, not having to try and fit in, and feeling valuable">
        {#if belonging}
          <span transition:blur class="belonging">{belonging}</span>
          <span transition:blur class="label">Belonging</span>
        {/if}
      </div>
    {/key}
  </div>
  
  {#key timeString}
    {#if timeString}
      <p transition:blur class="timestamp">Updated {timeString}</p>
    {/if}
  {/key}  
</div>
