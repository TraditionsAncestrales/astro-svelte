<form use:form action="/api/contact" method="post">
  <input type="text" name="email" />
  <input type="password" name="password" />
  <button type="submit">Sign In</button>
</form>

<script lang="ts">
  import {createForm} from 'felte';

  const {errors, form, touched} = createForm({
    onError: (error) => {
      console.debug('error', error);
    },
    onSuccess: (response) => {
      console.debug('success', response);
    },
  });
</script>
