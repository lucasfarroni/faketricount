<template>
  <div>
    <form>
      <label for="label">Libellé :</label>
      <input type="text" v-model="newCP.label" id="label" placeholder="Nom du compte partagé" required />
      <br />
      <label for="description">Description :</label>
      <textarea v-model="newCP.description" id="description" placeholder="Description du compte partagé" required></textarea>
      <br />
      <label for="date">Date de création :</label>
      <input type="date" v-model="newCP.date" id="date" required />
      <br />
      <button @click.prevent="createCP">Créer</button>
    </form>

    <ul v-for="account in sharedAccount" :key="account.label+index">
      <li >nom : {{ account.label }}</li>
      <li>description : {{ account.description }}</li>
      <li>date : {{ account.date }}</li>
      <RouterLink :to="`/gestionDepense/${account.label}`">{{ account.label }}</RouterLink>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sharedAccount: JSON.parse(localStorage.getItem('CPS')) ,
      newCP: {
        label: '',
        description: '',
        date: '',
        accounts: [],
        membres: []
      },
    }

  },

  methods: {
    createCP() {

      // Enregistrer le nouveau CP dans le localstorage
      let CPS = JSON.parse(localStorage.getItem('CPS')) || [];
      CPS.push(this.newCP);
      localStorage.setItem('CPS', JSON.stringify(CPS));

      // Mettre à jour le tableau "shareAccount"
      this.sharedAccount = CPS;

      // Réinitialiser le formulaire
      this.newCP = {
        label: '',
        description: '',
        date: ''
      };
    }
  }
}
</script>
