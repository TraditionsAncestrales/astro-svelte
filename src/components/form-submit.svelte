<button type="submit" {disabled} class="{BTN()} {cEl}">{disabled ? 'Envoi en cours...' : 'Envoyer'}</button>

<script lang="ts">
  import type {FormControlP} from '~/schemas/ui';
  import {BTN} from '~/styles/ui';

  // PROPS =================================================================================================================================
  export let form: FormControlP['form'];

  // STYLES ================================================================================================================================
  let cEl = '';
  export {cEl as class};

  // VARS ==================================================================================================================================
  $: ({isSubmitting, isValid} = form);
  $: disabled = $isSubmitting && $isValid;
</script>
