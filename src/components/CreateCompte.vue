<template>
  <div>
    <form>
      <label for="label">Libellé :</label>
      <input type="text" v-model="newCP.label" id="label" placeholder="Nom du compte partagé" required />
      <br />
      <label for="description">Description :</label>
      <textarea v-model="newCP.description" id="description" placeholder="Description du compte partagé" required></textarea>
      <br />
      <button @click.prevent="createCP">Créer</button>
    </form>
    <div id="allAccount">
      <table class="table">
        <thead>
        <tr>
          <th>Nom</th>
          <th>Description</th>
          <th>Date</th>
          <th>Gestion dépense</th>
          <th>Gestion membre</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(account,index) in sharedAccount" :key="account.label" id="MyAccount">
          <td>{{ account.label }}</td>
          <td>{{ account.description }}</td>
          <td>{{ account.date }}</td>
          <td>
            <RouterLink v-if="account.membres.length > 0" :to="`/gestionDepense/${account.label}`">Compte :{{ account.label }} </RouterLink>
          </td>
          <td><RouterLink :to="`/gestionMembreCompte/${account.label}`">Compte :{{ account.label }} </RouterLink></td>
          <td><button @click="removeCP(index)" class="btn btn-danger">Supprimer</button></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sharedAccount: JSON.parse(localStorage.getItem('CPS')) || [],
      newCP: {
        label: '',
        description: '',
        date : new Date(Date.now()).toLocaleDateString(),
        total: 0,
        accounts: [],
        membres: []
      },
    }
  },
  methods: {
    createCP() {
      // Enregistrer le nouveau CP dans le localstorage
      this.sharedAccount.push(this.newCP);
      localStorage.setItem('CPS', JSON.stringify(this.sharedAccount));
      // Réinitialiser le formulaire
      this.newCP = {
        label: '',
        description: '',
        date: '',
        accounts: [],
        membres: [],
        total: 0
      };
    },
    removeCP(index) {
      let CPS = JSON.parse(localStorage.getItem('CPS'));
      CPS.splice(index, 1);
      localStorage.setItem('CPS', JSON.stringify(CPS));
      this.sharedAccount = CPS;
    }
  }
}
</script>
<style scoped>
body {
  font-family: Arial, sans-serif;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
label {
  font-weight: bold;
  margin-bottom: 10px;
}
input[type="text"],
textarea {
  width: 40%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
}
button {
  background-color: #4CAF50;
  color: white;
  padding: 6px 12px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 14px;
}
/*#allAccount{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}*/
/*#MyAccount{
  display: flex;
}*/
li {
  list-style: none;
  margin: 10px;
}
a {
  color: #4CAF50;
  text-decoration: none;
}
</style>