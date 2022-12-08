<div class="mb-2 pb-6 w-full relative {cEl}">
  {#if label}<label for={name}>{label}</label>{/if}
  <slot />
  <label for={name} class="absolute left-1 bottom-0 text-sm text-red-600">{error}</label>
</div>

<script lang="ts">
  import type {FormControlP} from '~/schemas/ui';

  // PROPS =================================================================================================================================
  export let form: FormControlP['form'];
  export let label: FormControlP['label'];
  export let name: FormControlP['name'];

  // STYLES ================================================================================================================================
  let cEl = '';
  export {cEl as class};

  // VARS ==================================================================================================================================
  $: ({errors, isSubmitting} = form);
  $: error = $errors[name]?.[0] ?? '';
</script>
