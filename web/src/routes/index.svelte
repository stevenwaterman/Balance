<script lang="ts">
  import { initializeApp } from "firebase/app";
  import { doc, getFirestore, onSnapshot } from "firebase/firestore";
  import { blur } from "svelte/transition";

  const firebaseConfig = {
    apiKey: "AIzaSyDgmBSpuzMuyZ2z_Dd5KSwwPRRHNvDw5so",
    authDomain: "balance-scores.firebaseapp.com",
    projectId: "balance-scores",
    storageBucket: "balance-scores.appspot.com",
    messagingSenderId: "900673448207",
    appId: "1:900673448207:web:dd5f173851b0edcb7a767a"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const currentDoc = doc(db, "current", "current");
  onSnapshot(currentDoc, doc => {
    const data = doc.data();
    if (data !== undefined) {
      personal = data.personal;
      professional = data.professional;
      spiritual = data.spiritual;
      timestamp = data.timestamp;
    }
  });

  let personal: number | undefined = undefined;
  let professional: number | undefined = undefined;
  let spiritual: number | undefined = undefined;
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

  .personal,
  .professional,
  .spiritual {
    font-size: min(30vw, calc(90vh - 6em));
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
    color: var(--lightgrey);
    margin-top: 1em;
    font-size: 1.5vw;
    text-align: center;
  }

  @media(max-height: 300px) {
    .timestamp {
      display: none;
    }

    .personal,
    .professional,
    .spiritual {
      font-size: min(30vw, calc(90vh - 4em));
    }
  }
</style>

<div class="col" style="height: 100%;">
  <div class="scores">
    {#key personal}
      <div class="col" style="grid-column: 1; grid-row: 1;" title="My mental health, physical health, and general happiness">
        {#if personal}
          <span transition:blur class="personal">{personal}</span>
          <span transition:blur class="label">Personal</span>
        {/if}
      </div>
    {/key}
  
    {#key professional}
      <div class="col" style="grid-column: 2; grid-row: 1;" title="How much I'm learning, how much I am enjoying my work, and how competent I feel">
        {#if professional}
          <span transition:blur class="professional">{professional}</span>
          <span transition:blur class="label">Professional</span>
        {/if}
      </div>
    {/key}
  
    {#key spiritual}
      <div class="col" style="grid-column: 3; grid-row: 1;" title="A sense of belonging, knowing that I have found my place in the world, and true belief in what I'm working towards.">
        {#if spiritual}
          <span transition:blur class="spiritual">{spiritual}</span>
          <span transition:blur class="label">Spiritual</span>
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
