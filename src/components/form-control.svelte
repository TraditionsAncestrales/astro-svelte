<div class="w-full {cEl}">
  {#if label}<label for={name} class="mb-1">{label}</label>{/if}
  <slot />
  <label for={name} class="mt-2 text-sm text-secondary">{(errors ?? []).join('\n')}</label>
</div>

<script lang="ts">
  import type {z} from 'zod';
  import type {zFormControlP} from '~/data/schemas.ui';

  // PROPS =================================================================================================================================
  export let errors: Props['errors'];
  export let label: Props['label'];
  export let name: Props['name'];

  // STYLES =================================================================================================================================
  let cEl = '';
  export {cEl as class};

  // TYPES =================================================================================================================================
  type Props = z.infer<typeof zFormControlP>;
</script>
