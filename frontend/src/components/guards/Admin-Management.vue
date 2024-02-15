<script>
import axios from 'axios';
export default {
  data() {
    return {
      users: [],
      showModal: false,
    };
  },

  created() {
    let req = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    axios
      .get('http://localhost:2300/users', req)
      .then((res) => {
        this.users = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    displayRole(role) {
      return role === 0 ? 'usuário comum' : 'Admin';
    },
    hideModal() {
      this.showModal = false;
    },
    shownModal(id) {
      console.log(`id: ${id}`);
      this.showModal = true;
    },
  },
};
</script>

<template>
  <div class="container content has-text-centered">
    <h1>Painel Administrativo</h1>
    <table class="table">
      <caption></caption>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Cargo</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ displayRole(user.role) }}</td>
          <td>
            <button class="button is-success">Editar</button
            ><button class="button is-danger" @click="shownModal(user.id)">
              Deletar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div :class="{ modal: true, 'is-active': showModal }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">Você realmente quer deletar?</p>
          </header>
          <div class="card-content">
            <div class="content">Ação sem volta!</div>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item" @click="hideModal()"
              >Cancelar</a
            >
            <a href="#" class="card-footer-item">Deletar</a>
          </footer>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="hideModal()"
      ></button>
    </div>
  </div>
</template>

<style scoped>
.log {
  color: #000;
}
</style>
