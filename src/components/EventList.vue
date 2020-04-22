<template>
  <v-app>
    <v-navigation-drawer clipped floating fixed width="25%" class="mt-12 pt-2" id="body">

      <h2 class="mx-6 mt-8 mb-2" id="DE">
        Disaster Events
      </h2>

      <div class="mb-6 mx-4">
        <v-tabs
          background-color="transparent"
          color="#184725"
          grow
          height="40px"
        >
          <v-tab @click="toggleActive">
            Active
          </v-tab>
          <v-tab @click="toggleArchived">
            Archived
          </v-tab>
        </v-tabs>
      </div>

      <div 
        class="activeEvents"
        v-if="activeList" 
        @close="toggleActive"
      >
        <v-card 
          width='auto' class="mb-6 mx-4 d-card" id="card" 
          v-for="doc in activeTopLevelDocs" :key="doc.id" 
          @click="displayEvent(doc.id)"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title style="color:#427f50;" class="headline mb-1" >{{doc.title}}</v-list-item-title>
              <v-list-item-subtitle >Lead School: De La Salle University</v-list-item-subtitle>
              <div class="overline mt-2" >Updated: {{doc.last_updated}}</div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </div>

      <div 
        class="archivedEvents"
        v-if="archivedList" 
        @close="toggleArchived"
      >
        <v-card 
          width='auto' class="mb-6 mx-4 d-card" id="card" 
          v-for="doc in archivedTopLevelDocs" :key="doc.id" 
          @click="displayEvent(doc.id)"
        >
          <v-list-item three-line>
            <v-list-item-content>
            
              <v-list-item-title style="color:#427f50;" class="headline mb-1" >{{doc.title}}</v-list-item-title>
              <v-list-item-subtitle >Lead School: De La Salle University</v-list-item-subtitle>
              <div class="overline mt-2" >Updated: {{doc.last_updated}}</div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </div>

    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  props: {
    activeTopLevelDocs: Array,
    archivedTopLevelDocs: Array,
  },
  data() {
    return {
      activeList: true,
      archivedList: false,
    }
  },
  methods: {
    // emits doc_id to parent component
    displayEvent(doc_id) {
      this.$emit('displayEvent', doc_id);
      console.log(doc_id);
    },
    getListType(type){
      this.$emit('getListType', type)
    },
    toggleActive() {
      this.activeList = true;
      this.archivedList = false;
      this.getListType('active')
    },
    toggleArchived() {
      this.archivedList = true;
      this.activeList = false;
      this.getListType('archived')
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
  background-color:#fcfcfc;
}

.d-card{
  background-color:white;
}

#DE{
  font-size: 25px;
  font-family: 'EB Garamond', serif;
  color: #184725;
}
</style>
