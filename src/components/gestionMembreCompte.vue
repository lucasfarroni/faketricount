<template>
  <div>
    <form>
      <label for="name">Nom </label>
      <input type="text" v-model="newParticipant.name" id="name" placeholder="Entrez le nom du participant" required/>
      <br/>
      <label for="email">Email </label>
      <input type="email" v-model="newParticipant.email" id="email" placeholder="Entrez l'email du participant"
             required/>
      <br/>
      <button id="btnSupMembre" @click.prevent="addParticipant">Ajouter participant</button>
    </form>
      <div id="accessToExpense" v-if= "getAccountInLocalStorage.membres.length > 0">
        <RouterLink :to="`/gestionDepense/${getAccountInLocalStorage.label}`" id="routeDepense"> Acceder aux dépenses du compte :
          {{ getAccountInLocalStorage.label }}
        </RouterLink>
      </div>
    <table class="table">
      <thead>
      <tr>
        <th>Nom</th>
        <th>Email</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(participant, index) in getAccountInLocalStorage.membres" :key="participant.email + index">
        <td>{{ participant.name }}</td>
        <td>{{ participant.email }}</td>
        <td>
          <button id="btnSup" class="btn btn-danger" @click="removeParticipant(index) ">Supprimer</button>
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>
<script>
export default {
  data() {
    return {
      accounts: JSON.parse(localStorage.getItem('CPS')) || [],
      newParticipant: {
        name: '',
        email: ''
      }
    }
  },
  computed: {
    label() {
      return this.$route.params.label
    },
    getAccountInLocalStorage() {
      return this.accounts.find(account => account.label === this.label);
    },
    checkName() {
      return this.newParticipant.name === '' ;
    },
    checkEmail() {
      return this.newParticipant.email === '';
    },
  },
  methods: {
    addParticipant() {
      if (this.checkName && this.checkEmail) {
        alert('Veuillez remplir tous les champs');
      } else {
        let account = this.getAccountInLocalStorage;
        account.membres.push(this.newParticipant);
        localStorage.setItem('CPS', JSON.stringify(this.accounts));
        this.newParticipant = {
          name: '',
          email: ''
        };
      }
    },
    removeParticipant(index) {
      let account = this.getAccountInLocalStorage;
      account.membres.splice(index, 1);
      localStorage.setItem('CPS', JSON.stringify(account));
    }
  }
}
</script>
<style>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

label {
  margin-bottom: 10px;
}

input[type="text"], input[type="email"] {
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  width: 300px;
}

#btnSupMembre {
  background-color: #4CAF50;
  color: white;
  padding: 6px 12px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.table {
  margin-top: 20px;
  width: 100%;
  text-align: center;
}

#btnSup {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
}
#btnSup:hover {
  background-color:#bb2d3b ;
}
#routeDepense{
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
