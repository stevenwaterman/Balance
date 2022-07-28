<script lang="ts">
  import { addDoc, collection, CollectionReference, doc, DocumentReference, onSnapshot, setDoc, type Firestore } from "firebase/firestore";
import Slider from "./Slider.svelte";

  export let db: Firestore;

  let currentDoc: DocumentReference;
  $: currentDoc = doc(db, "current", "current");

  let historicCollection: CollectionReference;
  $: historicCollection = collection(db, "historic");

  $: onSnapshot(currentDoc, doc => {
    const data = doc.data();
    if (data !== undefined) {
      remoteScore = {...data} as any;
      localScore = {...data} as any;
    }
  });

  type DbScore = {
    timestamp: number;
    personal: number;
    professional: number;
    spiritual: number;
  }

  let remoteScore: DbScore | undefined;
  let localScore: DbScore | undefined;

  function requiresUpdate(local: DbScore | undefined, remote: DbScore | undefined): boolean {
    if (local === undefined) return false;
    if (remote === undefined) return true;
    if (local.personal !== remote.personal) return true;
    if (local.professional !== remote.professional) return true;
    if (local.spiritual !== remote.spiritual) return true;
    return false;
  }

  let timer: NodeJS.Timeout | undefined = undefined;

  function setTimer(score: DbScore) {
    if (timer !== undefined) clearTimeout(timer);
    if (!requiresUpdate(score, remoteScore)) return;

    const scoreCapture = {
      ...score,
      timestamp: new Date().getTime()
    };

    timer = setTimeout(() => {
      timer = undefined;
      if (requiresUpdate(scoreCapture, remoteScore)) {
        setDoc(currentDoc, score)
        addDoc(historicCollection, score)
      }
    }, 5000);
  }

  $: if(localScore !== undefined) setTimer(localScore);
</script>

<style>
  .container {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: 1fr 1fr 1fr;
    row-gap: 1em;
    column-gap: 0.5em;
  }
</style>

<div class="container">
  {#if localScore !== undefined}
    <span>Personal</span>
    <Slider bind:value={localScore.personal} />

    <span>Professional</span>
    <Slider bind:value={localScore.professional} />

    <span>Spiritual</span>
    <Slider bind:value={localScore.spiritual} />
  {/if}
</div>
