<FormControl {form} {label} {name} class={cEl}>
  <input {name} type="email" {placeholder} required class="{INPUT({touched: $touched[name]})} {cInput}" />
</FormControl>

<script lang="ts">
  import type {FormControlP} from '~/schemas/ui';
  import {INPUT} from '~/styles/ui';
  import FormControl from './form-control.svelte';

  // PROPS =================================================================================================================================
  export let form: FormControlP['form'];
  export let label: FormControlP['label'] = undefined;
  export let name: FormControlP['name'];
  export let placeholder: FormControlP['placeholder'] = undefined;

  // STYLES ================================================================================================================================
  let cEl = '';
  export {cEl as class};
  export let cInput = '';

  // VARS ==================================================================================================================================
  $: ({touched} = form);
</script>
