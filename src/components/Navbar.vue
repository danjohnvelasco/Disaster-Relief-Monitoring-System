<template>
  <div class="root">
    <v-app-bar height="70px" elevate-on-scroll fixed color="white">
      <v-btn text color="white" class="mr-12 px-2" height="56px" to="/">
        <img :src="require('../assets/brand.png')" height="56px"/>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn small text color="#184725" class="px-2 mx-2"
        to="/">
        <v-icon small class="pr-2 caption navbar">mdi-view-dashboard</v-icon>
        <span class="font-weight-regular">Dashboard</span>
      </v-btn>
      <v-btn small text color="#184725" class="px-2 mx-2"
        to="/schools">
        <v-icon small class="pr-2">mdi-school</v-icon>
        <span class="font-weight-regular">Schools</span>
      </v-btn>
      <v-btn small text color="#184725" class="px-2 mx-2"
        to="/about">
        <v-icon small class="pr-2">mdi-comment-question</v-icon>
        <span class="font-weight-regular">About</span>
      </v-btn>
      <v-btn  small class="px-2 mx-2"
              dark style="background:#184725;"
              @click="toggleForm">+ Event
      </v-btn>
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

<style scoped>
span, v-btn{
  font-family: 'Roboto', sans-serif;
  font-size: 13px;
}
</style>
