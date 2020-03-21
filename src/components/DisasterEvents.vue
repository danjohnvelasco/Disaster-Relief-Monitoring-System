<template>
  <v-app>
      <v-navigation-drawer clipped floating fixed width="25%" class="pt-12">
        <h2 class="headline mx-6 mt-8 mb-4">Disaster Events</h2>
        <v-card width='auto' class="mb-6 mx-4" v-for="disaster in disasters" :key="disaster.id" @click="displayEvent(disaster.id)">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline">{{disaster.last_updated}}</div>
              <v-list-item-title class="headline mb-1">{{disaster.title}}</v-list-item-title>
              <v-list-item-subtitle>Lead School: //lead school</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-navigation-drawer>
  </v-app>
</template>

<script>
import {db} from '@/firebase/init'

export default {
  data(){
    return{
      disasters: []
      }
  },
  methods: {
    timestampToDate: (timestamp) => {
      var date = timestamp.toDate()
      var newdate = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
      return newdate
    },
    displayEvent(doc_id) {
      //console.log(doc_id);
      this.$emit('displayEvent', doc_id);
    }
  },
  created(){
      db.collection("disasters2").where("archived", "==", false)
        .get()
        .then((snapshot) => {
        snapshot.forEach((doc) => {
          var disaster = doc.data();
          disaster.id = doc.id;
          disaster.last_updated = this.timestampToDate(disaster.last_updated);
          this.disasters.push(disaster);
          //console.log(doc.id, " => ", doc.data());
        });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
  }
}
</script>