<form use:form name="contact" action="/api/contact" method="POST" data-netlify="true" class="mb-4 flex flex-col {cEl}">
  <input type="hidden" name="form-name" value="contact" />
  <FormText name="fullname" label="Votre nom" form={formState} />
  <FormEmail name="email" label="Votre courriel" form={formState} />
  <FormArea name="message" label="Votre message" form={formState} />
  <div class:invisible={!alert} class="mb-2 {alert?.isSuccess ? 'bg-emerald-500' : 'bg-red-500'} text-white text-center p-2">
    {alert?.message}
  </div>
  <FormSubmit form={formState} class="self-end" />
</form>

<script lang="ts">
  import {createForm} from 'felte';
  import {isEmail} from '~/data/svelte.utils';
  import FormArea from './form-area.svelte';
  import FormEmail from './form-email.svelte';
  import FormSubmit from './form-submit.svelte';
  import FormText from './form-text.svelte';

  // STYLES ================================================================================================================================
  let cEl = '';
  export {cEl as class};

  // VARS ==================================================================================================================================
  let alert: {isSuccess: boolean; message: string} | undefined;
  const {form, reset, ...formState} = createForm<{email: string; fullname: string; 'form-name': string; message: string}>({
    validate: ({email, fullname, message}) => ({
      email: !email ? 'Ce champ est requis.' : !isEmail(email) ? "Le courriel n'est pas valide." : null,
      fullname: fullname ? null : 'Ce champ est requis.',
      message: message ? null : 'Ce champ est requis.',
    }),
    onSuccess: () => {
      reset();
      alert = {isSuccess: true, message: 'Message envoyé avec succès!'};
      setTimeout(() => (alert = undefined), 3000);
    },
    onError: () => {
      alert = {isSuccess: false, message: 'Une erreur est survenue. Veuillez réessayer ultérieurement.'};
      setTimeout(() => (alert = undefined), 3000);
    },
  });
</script>
