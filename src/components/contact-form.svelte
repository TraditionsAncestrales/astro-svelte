<form use:form name="contact" action="/api/contact" method="POST" data-netlify="true">
  <fieldset class="w-full flex items-center gap-4">
    <FormText name="forename" label="Prénom" errors={$errors.forename ?? []} touched={$touched.forename} />
    <FormText name="surname" label="Nom" errors={$errors.surname ?? []} touched={$touched.surname} />
  </fieldset>
  <FormEmail name="email" label="Votre courriel" errors={$errors.email ?? []} touched={$touched.email} />
  <FormArea name="message" label="Votre message" errors={$errors.message ?? []} touched={$touched.message} />

  <button type="submit" disabled={$isSubmitting} class={BTN()}>{$isSubmitting ? 'Envoi en cours...' : 'Envoyer'}</button>
</form>

<script lang="ts">
  import {createForm} from 'felte';
  import isEmail from 'is-email';
  import {BTN} from '~/styles/ui';
  import FormArea from './form-area.svelte';
  import FormEmail from './form-email.svelte';
  import FormText from './form-text.svelte';

  const {errors, form, isSubmitting, touched} = createForm<{email: string; forename: string; message: string; surname: string}>({
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (values) => {
      console.log(values);
    },
    validate: (values) => {
      const errors = {
        email: isEmail(values.email ?? '') ? null : "le courriel n'est pas valide.",
        forename: values.forename ? null : 'ce champ est requis.',
        message: values.message ? null : 'ce champ est requis.',
        surname: values.surname ? null : 'ce champ est requis.',
      };
      return errors;
    },
  });


  
</script>
