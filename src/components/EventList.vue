<template>
  <v-app>
    <v-navigation-drawer clipped floating fixed width="25%" class="pt-12">
      <h2 class="headline mx-6 mt-8 mb-4">Disaster Events</h2>
      <v-card width='auto' class="mb-6 mx-4" v-for="doc in activeTopLevelDocs" :key="doc.id" @click="displayEvent(doc.id)">
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline">{{doc.last_updated}}</div>
            <v-list-item-title class="headline mb-1">{{doc.title}}</v-list-item-title>
            <v-list-item-subtitle>Lead School: //lead school</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  props: {
    activeTopLevelDocs: Array
  },
  methods: {
    displayEvent(doc_id) {
      this.$emit('displayEvent', doc_id);
    }
  },
  created(){
    console.log('EventList created');
  }
}
</script>

