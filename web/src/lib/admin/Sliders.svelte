<script lang="ts">
  import { addDoc, collection, CollectionReference, doc, DocumentReference, onSnapshot, setDoc, type Firestore } from "firebase/firestore";
  import { onMount } from "svelte";
  import Slider from "./Slider.svelte";

  export let db: Firestore;

  let currentDoc: DocumentReference;
  $: currentDoc = doc(db, "current", "current");

  let historicCollection: CollectionReference;
  $: historicCollection = collection(db, "historic");

  onMount(() => {
    onSnapshot(currentDoc, doc => {
      const data = doc.data();
      if (data !== undefined) {
        remoteScore = {...data} as any;
        localScore = {...data} as any;
      }
    });
  });

  type DbScore = {
    timestamp: number;
    serenity: number;
    growth: number;
    belonging: number;
  }

  let remoteScore: DbScore | undefined;
  let localScore: DbScore | undefined;

  function needsUpdate(local: DbScore, remote: DbScore): boolean {
    if (local.serenity !== remote.serenity) return true;
    if (local.growth !== remote.growth) return true;
    if (local.belonging !== remote.belonging) return true;
    return false;
  }

  function update(local: DbScore | undefined, remote: DbScore | undefined) {
    if (local === undefined) return;
    if (remote === undefined) return;
    if (!needsUpdate(local, remote)) return;

    const score: DbScore = {
      ...local,
      timestamp: Math.floor(new Date().getTime() / 1000)
    }
    setDoc(currentDoc, score)
    addDoc(historicCollection, score)
  }

  $: update(localScore, remoteScore);
</script>

<style>
  .container {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: 1fr 1fr 1fr;
    justify-items: right;
    align-items: center;
    row-gap: 1em;
    column-gap: 1em;
    width: fit-content;
  }

  span {
    grid-column: span 2;
    justify-self: center;
    text-align: center;
    font-weight: bold;
  }
</style>

<div class="container">
  <span>Sliders</span>

  {#if localScore}
    <Slider label="Serenity" bind:value={localScore.serenity} />
    <Slider label="Growth" bind:value={localScore.growth} />
    <Slider label="Belonging" bind:value={localScore.belonging} />
  {/if}
</div>
