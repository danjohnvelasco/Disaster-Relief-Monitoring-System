<template>
  <v-app>
    <v-row>
      <v-col class="col-md-3 col-lg-3 mb-3">
        <EventList @displayEvent="displayEvent"></EventList>
      </v-col>
      <v-col class="col-md-9 col-lg-9 mb-9" id="disaster-event">
        <EventViewer :doc_id="doc_id" v-if="doc_id"></EventViewer>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import EventList from '@/components/EventList'
import EventViewer from '@/components/EventViewer'

export default {
  name: 'Dashboard',
  components: {
    EventList,
    EventViewer
  },
  data() {
    return {
      doc_id: null
    }
  },
  methods: {
    displayEvent(firebase_doc_id) { 
      this.doc_id = firebase_doc_id;
      console.log(firebase_doc_id);
    }
  }
}
</script>

<style scoped>
#disaster-event{
  padding-top: 0;
}
</style>

