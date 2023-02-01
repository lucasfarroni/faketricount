<template>
  <div id="app">
    <h1>App</h1>
    <p>ceci est un test</p>

    <router-link to="/CreateCompte">Compte</router-link>
    <router-link to="/gestionMembreCompte">Membre</router-link>
    <router-link to="/gestionDepense">Gestion Depense</router-link>
    <router-link to="/BalanceDepense">Balance</router-link>

    <router-view/>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}
</style>
