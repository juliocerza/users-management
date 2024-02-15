<script>
import axios from 'axios';
export default {
  created() {
    let req = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    axios
      .get(`http://localhost:2300/users/${this.$route.params.id}`, req)
      .then((res) => {
        console.log(res);
        this.name = res.data.name;
        this.email = res.data.email;
        this.id = res.data.id;
      })
      .catch((err) => {
        console.log(err.response);
        this.$router.push({ name: 'Admin' });
      });
  },
  data() {
    return {
      name: '',
      email: '',
      id: -1,
      error: undefined,
    };
  },
  methods: {
    update() {
      let req = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      };
      axios
        .put(
          'http://localhost:2300/users',
          {
            name: this.name,
            email: this.email,
            id: this.id,
          },
          req
        )
        .then((res) => {
          console.log(res);
          this.$router.push({ name: 'Admin' });
        })
        .catch((err) => {
          const msg = err.response.data;
          this.error = msg;
        });
    },
  },
};
</script>

<template>
  <div class="container content has-text-centered">
    <h2>Edição de Usuário</h2>
    <hr />
    <div class="columns is-centered">
      <div class="column is-half">
        <div v-if="error != undefined">
          <div class="notification is-danger">
            <p>{{ error }}</p>
          </div>
        </div>
        <label class="label">Nome</label>
        <div class="control">
          <input class="input" type="text" placeholder="Nome" v-model="name" />
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
        <br />
        <button class="button is-success" type="submit" @click="update">
          Editar
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
