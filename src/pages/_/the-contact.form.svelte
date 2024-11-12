<script lang="ts" module>
  // I18N **********************************************************************************************************************************
  function i18n(code?: Message) {
    if (code === "BAD_REQUEST") return "Une erreur est survenue.Veuillez contacter un administrateur";
    if (code === "SUCCESS") return "Message envoyé avec succès";
    return "Une erreur est survenue. Veuillez réessayer ultérieurement.";
  }

  // TYPES *********************************************************************************************************************************
  export type TheContactFormProps = {
    class: string;
    submitIcon: Snippet;
    submittingIcon: Snippet;
    sv: SuperValidated<ContactValues, Message>;
  };
</script>

<script lang="ts">
  import * as Form from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { Textarea } from "@/components/ui/textarea";
  import { cn, zContactValues, type ContactValues, type Message } from "@/lib/utils";
  import { actions } from "astro:actions";
  import type { Snippet } from "svelte";
  import { toast } from "svelte-sonner";
  import { superForm, type SuperValidated } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";

  // PROPS *********************************************************************************************************************************
  let { class: className, submitIcon, submittingIcon, sv }: TheContactFormProps = $props();

  // VARS **********************************************************************************************************************************
  const sf = superForm(sv, {
    validators: zodClient(zContactValues),
    onError: () => toast.error(i18n()),
    onUpdated: ({ form: { message, valid } }) => {
      if (message) valid ? toast.success(i18n(message)) : toast.error(i18n(message));
    },
  });
  const { delayed, enhance, form, submitting } = sf;
</script>

<form method="POST" action={actions.sendMessage} use:enhance class={cn("flex flex-col gap-4", className)}>
  <Form.Field form={sf} name="fullname">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Votre nom</Form.Label>
        <Input {...props} bind:value={$form.fullname} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field form={sf} name="email">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Votre courriel</Form.Label>
        <Input type="email" {...props} bind:value={$form.email} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field form={sf} name="message">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Votre message</Form.Label>
        <Textarea rows={5} {...props} bind:value={$form.message} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button disabled={$submitting} class="flex gap-2 self-end">
    {#if $delayed}{@render submittingIcon?.()}{:else}{@render submitIcon?.()}{/if}
    Envoyer
  </Form.Button>
</form>
