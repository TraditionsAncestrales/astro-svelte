<UiForm
  name="newsletter"
  action="/api/newsletter"
  {validate}
  {messages}
  intent="secondary"
  submitText="Je m'inscris"
  submitTextDisabled="Inscription en cours..."
  cSubmit="w-full justify-center sm:w-auto"
  class="sm:flex-row sm:items-start {cEl}"
>
  <svelte:fragment slot="fields" let:form>
    <FormEmail name="email" placeholder="Votre courriel" {form} intent="secondary" class="sm:max-w-xs xl:max-w-sm" />
  </svelte:fragment>
</UiForm>

<script lang="ts">
  import {isEmail} from '~/data/utils';
  import FormEmail from './form-email.svelte';
  import UiForm from './ui-form.svelte';

  // STYLES ================================================================================================================================
  let cEl = '';
  export {cEl as class};

  // VARS ==================================================================================================================================
  const messages = {200: 'Inscription réalisée avec succès !', 401: 'Vous êtes déjà inscrit(e).'};
  const validate = ({email}: any) => ({email: !email ? 'Ce champ est requis.' : !isEmail(email) ? "Le courriel n'est pas valide." : null});
</script>
