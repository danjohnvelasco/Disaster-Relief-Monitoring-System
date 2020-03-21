<template>
  <v-app>
    <v-row>
      <v-col class="col-md-3 col-lg-3 mb-3">
        <DisasterEvents @displayEvent="displayEvent"></DisasterEvents>
      </v-col>
      <v-col class="col-md-9 col-lg-9 mb-9">
        <v-card dark height="90%" width="100%">
          <ReadEvent :doc_id="doc_id"></ReadEvent>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import DisasterEvents from '@/components/DisasterEvents'
import ReadEvent from '@/components/ReadEvent'

export default {
  name: 'Dashboard',
  components: {
    DisasterEvents,
    ReadEvent
  },
  methods: {
    displayEvent(payload) { // payload is a firebase doc_id from DisasterEvents
      this.doc_id = payload;
      console.log(payload);
    }
  },
  data() {
    return {
      doc_id: null
    }
  }
}
</script>