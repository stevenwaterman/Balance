<script lang="ts">
  import { addDoc, collection, type CollectionReference, type Firestore } from "firebase/firestore";

  export let db: Firestore;
  let labelCollection: CollectionReference;
  $: labelCollection = collection(db, "labels")

  let text: string;

  function keypress(event: KeyboardEvent) {
    if (event.key === "Enter") {
      submit();
    }
  }

  function submit() {
    const data = { timestamp: new Date().getTime(), text };
    addDoc(labelCollection, data);
    text = "";
  }
</script>

<input type="text" bind:value={text} on:keypress={keypress} />
<button on:click={submit}>Submit</button>
