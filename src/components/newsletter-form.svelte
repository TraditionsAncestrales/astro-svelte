<form use:form name="newsletter" action="/api/newsletter" method="POST" class="sm:flex items-start gap-4 {cEl}">
  <FormEmail name="email" placeholder="Votre courriel" form={formState} class="max-w-sm" />
  <!-- <div class:invisible={!alert} class="mb-2 {alert?.isSuccess ? 'bg-emerald-500' : 'bg-red-500'} text-white text-center p-2">
    {alert?.message}
  </div> -->
  <FormSubmit form={formState} intent="secondary" class="w-full justify-center sm:w-auto" />
</form>

<script lang="ts">
  import {createForm} from 'felte';
  import {isEmail} from '~/data/utils';
  import FormEmail from './form-email.svelte';
  import FormSubmit from './form-submit.svelte';

  // STYLES ================================================================================================================================
  let cEl = '';
  export {cEl as class};

  // VARS ==================================================================================================================================
  let alert: {isSuccess: boolean; message: string} | undefined;

  const {form, reset, ...formState} = createForm<{email: string}>({
    validate: ({email}) => ({email: !email ? 'Ce champ est requis.' : !isEmail(email) ? "Le courriel n'est pas valide." : null}),
    onSuccess: () => handleResponse(),
    onError: () => handleResponse(false),
  });

  // METHODS ===============================================================================================================================
  const handleResponse = (isSuccess = true) => {
    reset();
    alert = {isSuccess, message: isSuccess ? 'Message envoyé avec succès!' : 'Une erreur est survenue. Veuillez réessayer ultérieurement.'};
    setTimeout(() => (alert = undefined), 2000);
  };
</script>
