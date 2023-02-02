<template>
  <div>
    <h2>Montant total dépensé par le groupe : </h2>
    <h2 style="color: gold">{{updateTotal}} euros</h2>
    <form>
      <label for="name">Nom :</label>
      <input type="text" v-model="newExpense.name" id="name" placeholder="Entrez le nom de la dépense" required />
      <br />
      <label for="amount">Montant :</label>
      <input type="number" v-model="newExpense.amount" id="amount" placeholder="Entrez le montant de la dépense" required />
      <br />
      <label for="user">Utilisateur :</label>
      <select v-model="newExpense.user">
        <option v-for="user in getAccountInLocalStorage.membres" :value="user.name" :key="user">{{ user.name }}</option>
      </select>

      <br />
      <button @click.prevent="addExpense">Ajouter dépense</button>
    </form>
    <h2 id="balance">Balance</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Montant</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(userBalance, index) in tableauOfUser" :key="userBalance.nameMember+ index">
          <td>{{ userBalance.nameMember }}</td>
          <td  :style="{color: updateTotal / getAccountInLocalStorage.membres.length > userBalance.totalAmount ? 'red' : 'green'}">{{ userBalance.totalAmount }}</td>
        </tr>
      </tbody>
    </table>
  <h2 id="historique">historique</h2>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Nom</th>
        <th scope="col">Montant</th>
        <th scope="col">Date</th>
        <th scope="col">Ajouté par</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(expense, index) in getAccountInLocalStorage.accounts" :key="expense.name+index+expense.date">
        <td>{{ expense.name }}</td>
        <td>{{ expense.amount }}</td>
        <td>{{ expense.date }}</td>
        <td>{{ expense.user }}</td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
export default {
  data() {
    return {
      totalExpensesfriend: 0,
      accounts: JSON.parse(localStorage.getItem('CPS')) || [],
      tableauOfAllUser: [],
      CalculBalance: {
        nameMember:'',
        totalAmount:0,
      },
      newExpense: {
        name: '',
        amount: '',
        date : new Date(Date.now()).toLocaleDateString(),
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
    },
    updateTotal(){
      let account = this.getAccountInLocalStorage;
      let total = this.getAccountInLocalStorage.total;
      account.accounts.forEach(expense => {
        total += expense.amount;
      });
      return total;
    },
    tableauOfUser(){
      let tableauOfAllUser = [];
      this.getAccountInLocalStorage.membres.forEach(membre => {
            this.CalculBalance.nameMember = membre.name;
        this.getAccountInLocalStorage.accounts.forEach(amount => {
              if (amount.user === membre.name){
                this.CalculBalance.totalAmount += amount.amount;
              }
            });
            tableauOfAllUser.push(this.CalculBalance);
            this.CalculBalance = {
              nameMember:'',
              totalAmount:0,
            };
        });
        return tableauOfAllUser;
    },
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
    },
  }
}
</script>
<style>
form {
  display: flex;
  flex-direction: column;
  align-items: center;

}

label {
  font-weight: bold;
  margin: 10px 0;
}

input[type="text"],
input[type="number"],
select,
input[type="date"] {
  width: 30%;
  padding: 5px;
  margin-bottom: 10px;
}

.table {
  width: 100%;
  margin-top: 20px;
}

th,
td {

  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
#historique{
  margin-top: 5%;
  background-color: #cccccc;
}
#balance{
  margin-top: 5%;
  background-color: #cccccc;
}
</style>
