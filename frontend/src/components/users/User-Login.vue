<script>
import axios from 'axios';
export default {
  data() {
    return {
      email: '',
      password: '',
      error: undefined,
    };
  },
  methods: {
    login() {
      axios
        .post('http://localhost:2300/login', {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          localStorage.setItem('token', res.data.token);
          this.$router.push({ name: 'Home' });
        })
        .catch((err) => {
          const msg = err.response.data.err;
          this.error = msg;
        });
    },
  },
};
</script>

<template>
  <div class="container content has-text-centered">
    <h2>Login</h2>
    <hr />
    <div class="columns is-centered">
      <div class="column is-half">
        <div v-if="error != undefined">
          <div class="notification is-danger">
            <p>{{ error }}</p>
          </div>
        </div>
        <label class="label">Email</label>
        <div class="control">
          <input
            class="input"
            type="email"
            placeholder="Email"
            v-model="email"
          />
        </div>
        <label class="label">Senha</label>
        <div class="control">
          <input
            class="input"
            type="password"
            placeholder="******"
            v-model="password"
          />
        </div>
        <br />
        <button class="button is-success" type="submit" @click="login">
          Entrar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.log {
  color: #000;
}
</style>
