<template>
  <v-app>
    <v-row>
      <v-col class="col-md-3 col-lg-3 mb-3">
        <DisasterEvents/>
      </v-col>
      <v-col class="col-md-9 col-lg-9 mb-9">
          <ReadEvent/>
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
  }
}
</script>