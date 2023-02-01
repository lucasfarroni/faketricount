<template>
  <div>
    <h2>Montant total dépensé par le groupe : {{ totalExpensesfriend }}</h2>
    <table>
      <thead>
      <tr>
        <th>Nom</th>
        <th>Solde r</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(participant, index) in participants" :key="index">
        <td>{{ participant.name }}</td>
        <td :style="{ color: participant.balance >= 0 ? 'green' : 'red' }">{{ participant.balance }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      participants: [],
      totalExpenses: 0,
    };
  },
  computed: {
    totalExpensesfriend() {
      return this.participants.reduce((total, participant) => {
        return total + participant.expenses.reduce((subtotal, expense) => subtotal + expense, 0);
      }, 0);
    },
  },
  mounted() {
    this.participants = JSON.parse(localStorage.getItem('CPS')) || [];
    this.participants.forEach(participant => {
      const totalExpenses = participant.expenses.reduce((total, expense) => total + expense, 0);
      const avgExpenses = totalExpenses / this.participants.length;
      participant.balance = totalExpenses - avgExpenses;
    });
  },
  watch: {
    participants: {
      handler() {
        localStorage.setItem('sharedAccount', JSON.stringify(this.participants));
      },
      deep: true,
    },
  },
};
</script>
