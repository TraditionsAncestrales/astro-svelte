<button type="submit" {disabled} class="{BTN({intent})} {cEl}">{disabled ? 'Envoi en cours...' : 'Envoyer'}</button>

<script lang="ts">
  import type {FormSubmitP} from '~/schemas/ui';
  import {BTN} from '~/styles/ui';

  // PROPS =================================================================================================================================
  export let form: FormSubmitP['form'];
  export let intent: FormSubmitP['intent'] = 'primary';

  // STYLES ================================================================================================================================
  let cEl = '';
  export {cEl as class};

  // VARS ==================================================================================================================================
  $: ({isSubmitting, isValid} = form);
  $: disabled = $isSubmitting && $isValid;
</script>
