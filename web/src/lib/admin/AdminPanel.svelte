<script lang="ts">
  import type { Firestore } from "firebase/firestore";
  import Labeller from "./Labeller.svelte";
  import Sliders from "./Sliders.svelte";

  export let db: Firestore;
</script>

<Sliders {db} />
<Labeller {db} />
