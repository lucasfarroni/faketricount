<template>
  <div>
    <h2>Total amount spent by the group : </h2>
    <h2 style="color: gold">{{ updateTotal }} euros</h2>
    <form>
      <label for="name">Name :</label>
      <input type="text" v-model="newExpense.name" id="name" placeholder="Enter the name of the expenses" required/>
      <br/>
      <label for="amount">Amount :</label>
      <input type="number" v-model="newExpense.amount" id="amount" placeholder="Enter the amount of the expense"
             required/>
      <br/>
      <label for="user">Member :</label>
      <select v-model="newExpense.user">
        <option v-for="user in getAccountInLocalStorage.membres" :value="user.name" :key="user">{{ user.name }}</option>
      </select>

      <br/>
      <button @click.prevent="addExpense">Add expense</button>
      <RouterLink :to="`/memberManagement/${getAccountInLocalStorage.label}`" id="routeMembre"> Access to account
        members :
        {{ getAccountInLocalStorage.label }}
      </RouterLink>
    </form>
    <h2 id="balance">Balance</h2>
    <table class="table">
      <thead>
      <tr>
        <th>Name</th>
        <th>Amount</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(userBalance, index) in tableauOfUser" :key="userBalance.nameMember+ index">
        <td>{{ userBalance.nameMember }}</td>
        <td :style="{color: updateTotal / getAccountInLocalStorage.membres.length > userBalance.totalAmount ? 'red' : 'green'}">
          {{ userBalance.totalAmount }}
        </td>
      </tr>
      </tbody>
    </table>
    <h2 id="historique">history</h2>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Amount</th>
        <th scope="col">Date</th>
        <th scope="col">added by</th>
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
      accounts: JSON.parse(localStorage.getItem('CPS')) || [],//get the local storage
      tableauOfAllUser: [],
      /**
       * Calcul balance object get the total amount spent by each member
       */
      CalculBalance: {
        nameMember: '',
        totalAmount: 0,
      },
      /**
       * newExpense object get the new expense
       */
      newExpense: {
        name: '',
        amount: '',
        date: new Date(Date.now()).toLocaleDateString(),
        user: ''
      }
    }
  },
  computed: {
    /**
     * get the label of the account
     */
    label() {
      return this.$route.params.label
    },
    /**
     * get the good account in the local storage with the label in the Url
     */
    getAccountInLocalStorage() {
      return this.accounts.find(account => account.label === this.label) || [];
    },
    /**
     *check if the amount is superior of zero
     */
    checkMontant() {
      return this.newExpense.amount > 0
    },
    /**
     * check if the name is not empty
     */
    checkName() {
      return this.newExpense.name.length > 0
    },
    /**
     * check if the user is not empty
     */
    checkUser() {
      return this.newExpense.user.length > 0
    },
    /**
     * update the total amount spent by the group
     */
    updateTotal() {
      let account = this.getAccountInLocalStorage;
      let total = this.getAccountInLocalStorage.total;
      account.accounts.forEach(expense => {
        total += expense.amount;
      });
      return total;
    },
    /**
     *function tableauOfUser get the total amount spent by each member and add it to the object CalculBalance
     */
    tableauOfUser() {
      let tableauOfAllUser = [];
      this.getAccountInLocalStorage.membres.forEach(membre => {
        this.CalculBalance.nameMember = membre.name;
        this.getAccountInLocalStorage.accounts.forEach(amount => {
          if (amount.user === membre.name) {
            this.CalculBalance.totalAmount += amount.amount;
          }
        });
        tableauOfAllUser.push(this.CalculBalance);
        this.CalculBalance = {
          nameMember: '',
          totalAmount: 0,
        };
      });
      return tableauOfAllUser;
    },
  }
  ,
  methods: {
    /**
     * Add expense
     */
    addExpense() {
      if (!this.checkMontant || !this.checkName || !this.checkUser) {
        alert('remplir les champs ou entrer un montant positif');
      } else {
        let account = this.getAccountInLocalStorage;
        account.accounts.push(this.newExpense);
        // Add the new expense to the local storage
        localStorage.setItem('CPS', JSON.stringify(this.accounts));
        // Reset the newExpense object
        this.newExpense = {
          name: '',
          amount: '',
          date: '',
          user: ''
        };
      }
    }
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

#historique {
  margin-top: 5%;
  background-color: #cccccc;
}

#balance {
  margin-top: 5%;
  background-color: #cccccc;
}

#routeMembre {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  margin-top: 20px;
  width: 300px;
  text-align: center;
}
</style>
