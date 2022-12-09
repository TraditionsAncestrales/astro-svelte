<div class={cEl}>
  <ContactForm class="w-full max-w-xl" />
  <ContactMap class="absolute inset-y-0 right-0 w-1/2" />
</div>

<script lang="ts">
  import ContactForm from './contact-form.svelte';
  import ContactMap from './contact-map.svelte';

  // STYLES ================================================================================================================================
  let cEl = '';
  export {cEl as class};
</script>
