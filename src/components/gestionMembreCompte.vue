<template>
  <div>
    <form>
      <label for="name">Nom :</label>
      <input type="text" v-model="newParticipant.name" id="name" placeholder="Entrez le nom du participant" required />
      <br />
      <label for="email">Email :</label>
      <input type="email" v-model="newParticipant.email" id="email" placeholder="Entrez l'email du participant" required />
      <br />
      <button @click.prevent="addParticipant">Ajouter participant</button>
    </form>
    <ul>
      <li v-for="(participant, index) in getAccountInLocalStorage.membres" :key="participant.email + index">
        {{ participant.name }} - {{ participant.email }}
        <button @click="removeParticipant(index)">Supprimer</button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      accounts: JSON.parse(localStorage.getItem('CPS')) ,
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
  },
  methods: {
    addParticipant() {
      let account = this.getAccountInLocalStorage;
      account.membres.push(this.newParticipant);
      localStorage.setItem('CPS', JSON.stringify(this.accounts));
      this.newParticipant = {
        name: '',
        email: ''
      };
    },
    removeParticipant(index) {
      let account = this.getAccountInLocalStorage;
      account.membres.splice(index, 1);
      localStorage.setItem('CPS', JSON.stringify(account));
    }
  }
}
</script>