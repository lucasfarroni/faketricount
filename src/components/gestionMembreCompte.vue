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
      <li v-for="(participant, index) in participants" :key="participant.email+index">
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
      participants: JSON.parse(localStorage.getItem('CPS')) || [],
      newParticipant: {
        name: '',
        email: ''
      }
    }
  },
  methods: {
    addParticipant() {
      // Ajouter le nouveau participant à la liste
      this.participants.membres.push(this.newParticipant);

      // Enregistrer les participants dans le local storage
      localStorage.setItem('CPS', JSON.stringify(this.participants));

      // Réinitialiser le formulaire
      this.newParticipant = {
        name: '',
        email: ''
      };
    },
    removeParticipant(index) {
      // Supprimer le participant sélectionné
      this.participants.membres.splice(index, 1);

      // Mettre à jour les participants dans le local storage
      localStorage.setItem('CPS', JSON.stringify(this.participants));
    }
  }
}
</script>
