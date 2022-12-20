<div class={cEl}>
  <ContactForm class="w-full max-w-xl pb-96 xl:pb-0" />
  <ContactMap lng={55.294209} lat={-21.142107} zoom={17} class="z-0 absolute bottom-0 inset-x-0 h-96 xl:top-0 xl:left-auto xl:w-1/2 xl:h-auto" />
</div>

<script lang="ts">
  import ContactForm from './contact-form.svelte';
  import ContactMap from './contact-map.svelte';

  // STYLES ================================================================================================================================
  let cEl = '';
  export {cEl as class};
</script>
