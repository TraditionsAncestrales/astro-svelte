<UiForm
  name="contact"
  action={import.meta.env.DEV ? '/api/contact' : '/'}
  netlify
  {messages}
  {validate}
  cSubmit="self-end"
  class="mb-4 {cEl}"
>
  <svelte:fragment slot="fields" let:form>
    <FormText id="contactFullname" name="fullname" label="Votre nom" {form} />
    <FormEmail id="contactEmail" name="email" label="Votre courriel" {form} />
    <FormArea id="contactMessage" name="message" label="Votre message" {form} />
  </svelte:fragment>
</UiForm>

<script lang="ts">
  import {isEmail} from '~/data/utils';
  import FormArea from './form-area.svelte';
  import FormEmail from './form-email.svelte';
  import FormText from './form-text.svelte';
  import UiForm from './ui-form.svelte';

  // STYLES ================================================================================================================================
  let cEl = '';
  export {cEl as class};

  // VARS ==================================================================================================================================
  const messages = {200: 'Message envoyé avec succès !'};

  const validate = ({email, fullname, message}: any) => ({
    email: !email ? 'Ce champ est requis.' : !isEmail(email) ? "Le courriel n'est pas valide." : null,
    fullname: fullname ? null : 'Ce champ est requis.',
    message: message ? null : 'Ce champ est requis.',
  });
</script>
