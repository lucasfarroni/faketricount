<template>
  <div id="app">
    <h1>freeCount</h1>
    <div id="routeLink">
      <router-link to="/CreateCompte" id="crCompte">All Account</router-link>
    </div>
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
#routeLink {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
