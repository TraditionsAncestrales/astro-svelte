<FormControl {form} {intent} {label} {name} class={cEl}>
  <textarea {name} rows="10" required class="{INPUT({touched: $touched[name]})} {cInput}" />
</FormControl>

<script lang="ts">
    import type {FormAreaP} from '~/schemas/ui';
    import {INPUT} from '~/styles/ui';
    import FormControl from './form-control.svelte';

  // PROPS =================================================================================================================================
  export let form: FormAreaP['form'];
  export let intent: FormAreaP['intent'] = 'primary';
  export let label: FormAreaP['label'];
  export let name: FormAreaP['name'];

  // STYLES ================================================================================================================================
  let cEl = '';
  export {cEl as class};
  export let cInput = '';

  // VARS ==================================================================================================================================
  $: ({touched} = form);
</script>
