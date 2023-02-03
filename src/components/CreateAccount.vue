<template>
  <div>
    <form>
      <label for="label">Label</label>
      <input type="text" v-model="newSharedAccount.label" id="label" placeholder="Name of the shared account" required />
      <br />
      <label for="description">Description :</label>
      <textarea v-model="newSharedAccount.description" id="description" placeholder="Description of the shared account" required></textarea>
      <br />
      <button @click.prevent="createNewSharedAccount">Create</button>
    </form>
    <div id="allAccount">
      <table class="table">
        <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Date</th>
          <th>Expense Management</th>
          <th>Member Management </th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(account,index) in sharedAccount" :key="account.label" id="MyAccount">
          <td>{{ account.label }}</td>
          <td>{{ account.description }}</td>
          <td>{{ account.date }}</td>
          <td>
            <RouterLink v-if="account.membres.length > 0" :to="`/expenseManagement/${account.label}`">Account :{{ account.label }} </RouterLink>
          </td>
          <td><RouterLink :to="`/memberManagement/${account.label}`">Account :{{ account.label }} </RouterLink></td>
          <td><button @click="removeSharedAccount(index)" class="btn btn-danger">Delete</button></td>
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
      /**
       * object newSharedAccount with label and description properties to create a new shared account
       */
      newSharedAccount: {
        label: '',
        description: '',
        date : new Date(Date.now()).toLocaleDateString(),
        total: 0,
        accounts: [],
        membres: []
      },
    }
  },
  computed: {
    /**
     * Check if the label is empty
     * @returns {boolean}
     */
    checkLabel() {
      return this.newSharedAccount.label === '';
    },
  },
  methods: {
    /**
     * Create a new shared account
     */
    createNewSharedAccount() {
      if (this.checkLabel) {
        alert('Please enter the name of the shared account');
      } else {
        // create a new shared account
        this.sharedAccount.push(this.newSharedAccount);
        localStorage.setItem('CPS', JSON.stringify(this.sharedAccount));
        // Reset the form
        this.newSharedAccount = {
          label: '',
          description: '',
          date: '',
          accounts: [],
          membres: [],
          total: 0
        };
    }
  },
    /**
     * Remove a shared account
     * @param index
     */
    removeSharedAccount(index) {
      //get the shared account in the local storage and remove it
      let account = JSON.parse(localStorage.getItem('CPS'));
      account.splice(index, 1);
      localStorage.setItem('CPS', JSON.stringify(account));//update the local storage
      this.sharedAccount = account;
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