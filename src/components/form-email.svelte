<FormControl {errors} {label} {name} class={cEl}>
  <div class="relative w-full flex items-center">
    <!-- <Sprite name="teenyicons:envelope-solid" class="absolute z-10 left-2 w-5 h-5 text-secondary/30" /> -->
    <input {name} type="email" required placeholder={label ?? name} class="{INPUT({iconed: true})} {cInput}" />
  </div>
</FormControl>

<script lang="ts">
  import type {z} from 'zod';
  import type {zFormEmailP} from '~/data/schemas.ui';
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
  type Props = z.infer<typeof zFormEmailP>;
</script>
