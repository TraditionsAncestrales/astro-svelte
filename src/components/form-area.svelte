<FormControl {form} {label} {name} class={cEl}>
  <textarea {name} rows="10" required class="{INPUT({touched: $touched[name]})} {cInput}" />
</FormControl>

<script lang="ts">
    import type {FormControlP} from '~/schemas/ui';
    import {INPUT} from '~/styles/ui';
    import FormControl from './form-control.svelte';

  // PROPS =================================================================================================================================
  export let form: FormControlP['form'];
  export let label: FormControlP['label'];
  export let name: FormControlP['name'];

  // STYLES ================================================================================================================================
  let cEl = '';
  export {cEl as class};
  export let cInput = '';

  // VARS ==================================================================================================================================
  $: ({touched} = form);
</script>
