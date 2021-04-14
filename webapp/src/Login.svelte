<script>
  import { createEventDispatcher } from 'svelte';
  import {
    Form,
    TextInput,
    PasswordInput,
    Button
  } from "carbon-components-svelte";

  const dispatch = createEventDispatcher();

</script>

<p>Please login with your UNC Onyen.</p>
<Form on:submit={(e,d) => {dispatch('submit', {'username': e.target.username.value, 'password': e.target.password.value});}}>
  <TextInput
    required
    name="username"
    id="username"
    labelText="User name"
    autocomplete="username"
    placeholder="Enter user name..."
  />
  <PasswordInput
    required
    id="password"
    type="password"
    labelText="Password"
    autocomplete="current-password"
    placeholder="Enter password..."
  />
  <Button type="submit">Submit</Button>
</Form>