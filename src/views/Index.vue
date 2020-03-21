<template>
  <div class="home">
      <v-btn depressed medium @click="toggleEdit()">Edit</v-btn>
      <v-dialog v-model="dialog" scrollable persistent>
        <EventForm v-if="editing" @close="toggleEdit" :populateWith="disaster" :editing="editing"></EventForm>
      </v-dialog>
  </div>
</template>

<script>
import EventForm from '@/components/EventForm'

export default {
  name: 'Index',
  components: {
    EventForm
  },
  data () {
    return {
      dialog: false,
      editing: false,
      disaster: { // Don't include data the the user doesn't directly manipulates.
        title: 'Leveriza Fire',
        type: 'Fire',
        location: 'New York City',
        description: 'Nasunog ang New York City', 
        remarks: 'remarks goes here',
        donate_option: 'in-kind',
        donation_details: 'Donate kayo sa banko ko',
        link_profile: true,
        reliefs: [
          {item: 'tae', spec:'baho'},
          {item: 'slippers', spec:'galing kay Korina'}
        ],
        fam_affected: '239',
        indiv_affected: '23',
        evac_fam_inside: '123',
        evac_indiv_inside: '53',
        damage_cost: '2345',
        structures_damaged: '12'
      }
    }	
  },
  methods: {
    toggleEdit() {
      this.editing = !this.editing;
      this.dialog = !this.dialog;
    }
  }
  
}
</script>

<style>
  .event-card {
    height: 150px;
    width: 300px
  }
</style>
