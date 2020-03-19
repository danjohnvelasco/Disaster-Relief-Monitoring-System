<template>
  <div class="root">
    <v-app-bar flat light dense>
      <v-btn text color="darkgrey" class="px-2" to="/">
        <v-icon small class="pr-2" color="darkgrey">mdi-handshake</v-icon>
          <v-toolbar-title class="pr-3 darkgrey--text">
            <span class="font-weight-light">LS</span>
            <span class="font-weight-medium">DR</span>
          </v-toolbar-title>
      </v-btn>
      <v-btn text color="darkgrey" class="px-2">
        <v-icon small class="pr-2 caption">mdi-view-dashboard</v-icon>
        <span class="font-weight-light">Dashboard</span>
      </v-btn>
      <v-btn text color="darkgrey" class="px-2" href="../#/schools">
        <v-icon small class="pr-2">mdi-school</v-icon>
        <span class="font-weight-light">Schools</span>
      </v-btn>
      <v-btn text color="darkgrey" class="px-2">
        <v-icon small class="pr-2">mdi-newspaper-variant-multiple</v-icon>
        <span class="font-weight-light">Bulletin</span>
      </v-btn>
      <v-btn text color="darkgrey" class="px-2" href="../#/about">
        <v-icon small class="pr-2">mdi-comment-question</v-icon>
        <span class="font-weight-light">About</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn depressed medium @click="toggleForm">Add event</v-btn>
    </v-app-bar>
    <!--Event Form Dialog-->
    <v-dialog v-model="dialog" scrollable persistent>
      <EventForm @close="toggleForm"></EventForm>
    </v-dialog>
  </div>
</template>
    
<script>
import EventForm from '@/components/EventForm'

export default {
  components: {
    EventForm
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    toggleForm() {
      this.dialog = !this.dialog;
    }
  } 
}
</script>