{#key item}
  <div in:fly={{y: -400, duration: 1000}} out:fly={{y: 400, duration: 1000}} class={cEl}>
    <h5 class="text-3xl italic">{item.title}</h5>
    <p class="italic">{item.content}</p>
    <p class="font-bold">{item.author}</p>
  </div>
{/key}

<script lang="ts">
  import {onMount} from 'svelte';
  import {fly} from 'svelte/transition';
  import type {Testimony} from '~/schemas';

  // PROPS =================================================================================================================================
  export let items: Testimony[];

  // STYLES =================================================================================================================================
  const cEl = 'absolute inset-0 prose mx-auto flex-1 flex flex-col items-center justify-center text-center lg:prose-xl';

  // VARS ==================================================================================================================================
  let selected = 0;
  $: item = items[selected];

  onMount(() => {
    const interval = setInterval(() => (selected = (selected + 1) % items.length), 6000);
    return () => clearInterval(interval);
  });
</script>
