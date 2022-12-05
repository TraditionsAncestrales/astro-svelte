<form use:form action="/api/contact" method="post">
  <input type="text" name="email" />
  <ValidationMessage for="email" let:messages={message}>
    <span>{message}</span>
    <span slot="placeholder">Please type a valid email.</span>
  </ValidationMessage>
  <input type="password" name="password" />
  <ValidationMessage for="password" let:messages={message}>
    <span>{message || ''}</span>
  </ValidationMessage>
  <button type="submit">Sign In</button>
</form>
<pre>
  {JSON.stringify($errors, null, 2)}
</pre>

<pre>
  {JSON.stringify($touched, null, 2)}
</pre>

<script lang="ts">
  import {reporter, ValidationMessage} from '@felte/reporter-svelte';
  import {validator} from '@felte/validator-zod';
  import {createForm} from 'felte';
  import z from 'zod';

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
  });

  const {errors, form, touched} = createForm<z.infer<typeof schema>>({
    extend: [validator({schema}), reporter],
    onError: (error) => {
      console.debug('error', error);
    },
    onSuccess: (response) => {
      console.debug('success', response);
    },
  });
</script>
