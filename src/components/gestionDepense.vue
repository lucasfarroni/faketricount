
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
      <select v-model="selectedUser">
        <option v-for="user in users.membres" :value="user">{{ user }}</option>
      </select>
      <br />
      <button @click.prevent="addExpense">Ajouter dépense</button>
    </form>
    <ul>
      <li v-for="(expense, index) in expenses" :key="expense.name+index+expense.date">
        {{ expense.name }} - {{ expense.amount }} - {{ expense.date }} - Ajouté par {{ expense.user }}
      </li>
    </ul>
  </div>
  <div>
    LABEL : {{ label }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      expenses: JSON.parse(localStorage.getItem('CPS')) || [],
      users: JSON.parse(localStorage.getItem('CPS')) || [],
      selectedUser: '',
      newExpense: {
        name: '',
        amount: '',
        date: '',
        user: ''
      }
    }
  },
  computed:{
    label(){
      return this.$route.params.label
    }
  },
  methods: {
    addExpense() {
      // Ajouter l'utilisateur sélectionné à la nouvelle dépense
      this.newExpense.user = this.selectedUser;

      // Ajouter la nouvelle dépense à la liste
      let newCPS = this.expenses;
      newCPS.accounts.push(this.newExpense);
      //this.expenses.accounts.push(this.newExpense);
      // Enregistrer les dépenses dans le local storage
      localStorage.setItem('CPS', JSON.stringify(newCPS));
      this.expenses = newCPS;
      // Réinitialiser le formulaire
      this.newExpense = {
        name: '',
        amount: '',
        date: '',
        user: ''
      };
      this.selectedUser = '';
    }
  }
}
</script>

