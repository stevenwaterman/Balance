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

<style>
  .container {
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 1em;
    row-gap: 0.5em;
  }

  span {
    grid-column: span 2;
    text-align: center;
    font-weight: bold;
    color: var(--lightwhite);
  }

  input {
    background-color: var(--lightgrey);
    border: none;
    border-radius: 0.25em;
    font-size: 0.8em;
    width: 50vw;
    padding: 0.25em 0.5em;
  }

  button {
    background-color: var(--green);
    border: none;
    border-radius: 0.25em;
    padding: 0.2em 0.5em;
    font-size: 1em;
    cursor: pointer;
  }
</style>

<div class="container">
  <span>Label</span>
  <input type="text" bind:value={text} on:keypress={keypress} />
  <button on:click={submit}>Submit</button>
</div>
