<template>
  <v-app>
      <v-navigation-drawer clipped floating fixed width="25%" class="pt-12">
        <h2 class="headline mx-6 mt-8 mb-4">Disaster Events</h2>
        <v-card width='auto' class="mb-6 mx-4">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline">{{disaster.created_at}}</div>
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
      disaster: {},
      }
  },
  methods: {
    timestampToDate: (timestamp) => {
      var date = timestamp.toDate()
      var newdate = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
      return newdate
    }
  },
  created(){
      db.collection('disasters2')
        .doc('K03ir5XbyRDepBz69fCd')
        .collection('history').orderBy('created_at').get().then(doc =>{
            if (doc){
              this.disaster = doc.docs.slice(-1)[0].data()
              this.disaster.created_at = this.timestampToDate(this.disaster.created_at)
            } else{
              console.log('no doc found')
            }
          }).catch(err =>{
            console.log("Error: " + err)
      })
  }
}
</script>