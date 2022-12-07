<FormControl {errors} {label} {name} class={cEl}>
  <input {name} required placeholder={label ?? name} class="{INPUT()} {cInput}" />
</FormControl>

<script lang="ts">
  import type {z} from 'zod';
  import type {zFormTextP} from '~/data/schemas.ui';
  import {INPUT} from '~/styles/ui';
  import FormControl from './form-control.svelte';

  // PROPS =================================================================================================================================
  export let errors: Props['errors'];
  export let label: Props['label'];
  export let name: Props['name'];
  export let touched: boolean;

  // STYLES ================================================================================================================================
  let cEl = '';
  export {cEl as class};
  export let cInput = '';

  // VARS ==================================================================================================================================

  // TYPES =================================================================================================================================
  type Props = z.infer<typeof zFormTextP>;
</script>
