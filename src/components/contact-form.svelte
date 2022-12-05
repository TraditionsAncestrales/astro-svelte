<form use:form action="/api/contact" method="post">
  <input type="text" name="email" />
  <input type="password" name="password" />
  <button type="submit">Sign In</button>
</form>

<script lang="ts">
  import {validator} from '@felte/validator-zod';
  import {createForm} from 'felte';
  import z from 'zod';

  const schema = z.object({
    email: z.string().email('courriel invalide'),
    password: z.string().min(1),
  });

  const {errors, form, touched} = createForm<z.infer<typeof schema>>({
    extend: [validator({schema})],
    onError: (error) => {
      console.debug('error', error);
    },
    onSuccess: (response) => {
      console.debug('success', response);
    },
  });
</script>
