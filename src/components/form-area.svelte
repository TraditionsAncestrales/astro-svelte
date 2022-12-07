<FormControl {errors} {label} {name} class={cEl}>
  <textarea {name} required placeholder={label ?? name} class="{'INPUT()'} {cInput}" />
</FormControl>

<script lang="ts">
  import FormControl from './form-control.svelte';

  // PROPS =================================================================================================================================
  export let errors: string[];
  export let label: string;
  export let name: string;
  export let touched: boolean;

  // STYLES ================================================================================================================================
  let cEl = '';
  export {cEl as class};
  export let cInput = '';

  // VARS ==================================================================================================================================

  // TYPES =================================================================================================================================
</script>
