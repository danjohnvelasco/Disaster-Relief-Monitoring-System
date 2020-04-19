<template>
  <v-app>
    <v-navigation-drawer clipped floating fixed width="25%" class="pt-12" id="body">
      <h2 class="headline mx-6 mt-8 mb-2" style="color:#427f50;"><b>Disaster Events</b></h2>
      <v-btn small text color="#184725" class="px-2 mx-4 mb-3">
        <span>Active</span>
      </v-btn>
      <v-btn small text color="#184725" class="px-2 mx-4 mb-3">
        <span>Archived</span>
      </v-btn>
      <v-card width='auto' class="mb-6 mx-4 d-card" id="card" v-for="doc in activeTopLevelDocs" :key="doc.id" @click="displayEvent(doc.id)">
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title style="color:#427f50;" class="headline mb-1" >{{doc.title}}</v-list-item-title>
            <v-list-item-subtitle >Lead School: //lead school</v-list-item-subtitle>
            <div class="overline mt-2" >Updated: {{doc.last_updated}}</div>
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
    // emits doc_id to parent component
    displayEvent(doc_id) {
      this.$emit('displayEvent', doc_id);
      console.log(doc_id);
    }
  },
  created(){
    console.log('EventList created');
  }
}
</script>

<style scoped>

#card{
  border-radius:15px;
  
}

#body{
  background-color:#f8f8f8;
  padding-right: 10px;
}

.d-card{
  background-color:white;
}

</style>