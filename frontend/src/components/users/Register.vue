<script setup></script>

<template>
  <div class="container content has-text-centered">
    <h2>Registro de Usuário</h2>
    <hr />
    <div class="columns is-centered">
      <div class="column is-half">
        <label class="label">Nome</label>
        <div class="control">
          <input class="input" type="text" placeholder="Nome" />
        </div>
        <label class="label">Email</label>
        <div class="control">
          <input class="input" type="email" placeholder="Email" />
        </div>
        <label class="label">Senha</label>
        <div class="control">
          <input class="input" type="password" placeholder="******" />
        </div>
        <br />
        <button class="button is-success" type="submit">Cadastrar</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
