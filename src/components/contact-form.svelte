<form action="/api/contact" method="post" on:submit|preventDefault={onSubmit}>
  <input type="text" name="email" />
  <input type="password" name="password" />
  <button type="submit">Sign In</button>
</form>

<script lang="ts">
  let submitting = false;

  const onSubmit = async () => {
    try {
      submitting = true;
      const res = await fetch(`/api/contact`, {method: 'POST'});
      console.log(res);
    } catch (error) {
      console.error(`Eror: ${error}`);
    }
    submitting = false;
  };
</script>
