<template>
  <div class="root">
    <v-app-bar fixed elevate-on-scroll color="white">
      <v-btn active-class text color="darkgrey" class="px-2 mx-2" 
        to="/">
          <v-toolbar-title class="px-3 darkgrey--text">
            <span class="font-weight-light">LS</span>
            <span class="font-weight-medium">DR</span>
          </v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn small text color="#184725" class="px-2 mx-2"
        to="/">
        <v-icon small class="pr-2 caption navbar">mdi-view-dashboard</v-icon>
        <span class="font-weight-light">Dashboard</span>
      </v-btn>
      <v-btn small text color="#184725" class="px-2 mx-2"
        to="/schools">
        <v-icon small class="pr-2">mdi-school</v-icon>
        <span class="font-weight-light">Schools</span>
      </v-btn>
      <v-btn small text color="#184725" class="px-2 mx-2"
        to="/bulletin">
        <v-icon small class="pr-2">mdi-newspaper-variant-multiple</v-icon>
        <span class="font-weight-light">Bulletin</span>
      </v-btn>
      <v-btn small text color="#184725" class="px-2 mx-2"
        to="/about">
        <v-icon small class="pr-2">mdi-comment-question</v-icon>
        <span class="font-weight-light">About</span>
      </v-btn>
      <v-btn small dark style="background:#184725;" @click="toggleForm">+ Event</v-btn>
    </v-app-bar>
    <!--Event Form Dialog-->
    <v-dialog v-model="dialog" scrollable persistent>
      <EventForm v-if="dialog" @close="toggleForm"></EventForm>
    </v-dialog>
    <div class="py-8"></div>
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