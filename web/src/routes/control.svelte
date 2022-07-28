<script lang="ts">
  import AdminPanel from "$lib/admin/AdminPanel.svelte";
  import { initFirebase } from "$lib/initFirebase";
  import {
    browserLocalPersistence,
    getAuth,
    GoogleAuthProvider,
    setPersistence,
    signInWithPopup,
    type User,
  } from "firebase/auth";

  const db = initFirebase();

  async function loginWithGoogle(): Promise<User | undefined> {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return setPersistence(auth, browserLocalPersistence).then(() => {
      if (auth.currentUser === null) {
        return signInWithPopup(auth, provider).then((cred) => cred.user);
      } else {
        return auth.currentUser;
      }
    });
  }
</script>

{#await loginWithGoogle()}
  <p>Please Log in via the popup</p>
{:then user}
  {#if user?.uid === "sDV4cfFys0R5bapdvpeCTQSL9t32"}
    <AdminPanel {db} />
  {:else}
    <p>This only works if you log in as Steven, sorry</p>
  {/if}
{/await}
