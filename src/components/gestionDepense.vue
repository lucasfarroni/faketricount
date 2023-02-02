
<template>
  <div>
    <form>
      <label for="name">Nom :</label>
      <input type="text" v-model="newExpense.name" id="name" placeholder="Entrez le nom de la dépense" required />
      <br />
      <label for="amount">Montant :</label>
      <input type="number" v-model="newExpense.amount" id="amount" placeholder="Entrez le montant de la dépense" required />
      <br />
      <label for="date">Date :</label>
      <input type="date" v-model="newExpense.date" id="date" required />
      <br />
      <label for="user">Utilisateur :</label>
      <select v-model="newExpense.user">
        <option v-for="user in getAccountInLocalStorage.membres" :value="user.name" :key="user">{{ user.name }}</option>
      </select>

      <br />
      <button @click.prevent="addExpense">Ajouter dépense</button>
    </form>
    <ul>
      <li v-for="(expense, index) in getAccountInLocalStorage.accounts" :key="expense.name+index+expense.date">
        {{ expense.name }} - {{ expense.amount }} - {{ expense.date }} - Ajouté par {{ expense.user }}
      </li>
    </ul>
  </div>
  <div>
    LABEL : {{ label }}
    accounts : {{ getAccountInLocalStorage}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      accounts: JSON.parse(localStorage.getItem('CPS')) || [],
      newExpense: {
        name: '',
        amount: '',
        date: '',
        user: ''
      }
    }
  },
  computed:{
    /**
     * Récupère le label de l'URL
     */
    label(){
      return this.$route.params.label
    },
    /**
     * Récupère le compte dans le localStorage
     */
      getAccountInLocalStorage(){
        return this.accounts.find(account => account.label === this.label) || [];
      }
    }
  ,
  methods: {
    /**
     * Ajoute une dépense
     */
    addExpense() {
      let account = this.getAccountInLocalStorage;

      // Ajouter l'utilisateur sélectionné à la nouvelle dépense
      //account = tableau du localStorage .accounts = tableau des dépenses . push = ajouter un élément au tableau
      account.accounts.push(this.newExpense);
      // Ajouter la nouvelle dépense à la liste
      //this.expenses.accounts.push(this.newExpense);
      // Enregistrer les dépenses dans le local storage
      localStorage.setItem('CPS', JSON.stringify(this.accounts));
      // Réinitialiser le formulaire
      this.newExpense = {
        name: '',
        amount: '',
        date: '',
        user: ''
      };
    }
  }
}
</script>

