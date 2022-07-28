<script lang="ts">
  import AdminPanel from "$lib/admin/AdminPanel.svelte";
  import { initFirebase } from "$lib/initFirebase";
  import {
    browserLocalPersistence,
    getAuth,
    getRedirectResult,
    GoogleAuthProvider,
    setPersistence,
    signInWithRedirect,
    type Auth,
    type User,
  } from "firebase/auth";
import type { Firestore } from "firebase/firestore";

  let db: Firestore;
  $: db = initFirebase();

  async function loginWithGoogle(): Promise<User | undefined> {
    const auth = getAuth();
    return setPersistence(auth, browserLocalPersistence)
      .then(async () => {
        if (auth.currentUser !== null) return auth.currentUser;

        const redirectResult = await getRedirectResult(auth);
        if (redirectResult !== null) return redirectResult.user;

        await signInWithRedirect(auth, new GoogleAuthProvider());
      });
  }
</script>

{#await loginWithGoogle()}
  <p>Redirecting you to log in...</p>
{:then user}
  {#if user?.uid === "sDV4cfFys0R5bapdvpeCTQSL9t32"}
    <AdminPanel {db} />
  {:else}
    <p>This only works if you log in as Steven, sorry</p>
  {/if}
{/await}
