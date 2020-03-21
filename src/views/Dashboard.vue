<template>
  <v-app>
    <v-container>

        <v-row class="px-12">
          <v-col class="col-md-8 col-lg-8 mb-8" align="left">
            <h2 class="headline mb-2">Disaster Events</h2>

<!--Still figuring out how to loop :( -->
            <v-card width='100%' class="mb-6">
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">{{disaster.created_at}}</div>
                  <v-list-item-title class="headline mb-1">{{disaster.title}}</v-list-item-title>
                  <v-list-item-subtitle>Lead School: //lead school</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>

            <v-card width='100%' class="mb-6">
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">{{disaster.created_at}}</div>
                  <v-list-item-title class="headline mb-1">{{disaster.title}}</v-list-item-title>
                  <v-list-item-subtitle>Lead School: //lead school</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>

            <v-card width='100%' class="mb-6">
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">{{disaster.created_at}}</div>
                  <v-list-item-title class="headline mb-1">{{disaster.title}}</v-list-item-title>
                  <v-list-item-subtitle>Lead School: //lead school</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>


          </v-col>

          <v-col class="col-md-4 col-lg-4 mb-4" align="left">
            <h2 class="headline mb-2">Bulletin</h2>

            <v-card width='100%' class="mb-6">
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">Bulletin #1</v-list-item-title>
                  <v-list-item-subtitle>{{disaster.created_at}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>

            <v-card width='100%' class="mb-6">
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">Bulletin #2</v-list-item-title>
                  <v-list-item-subtitle>{{disaster.created_at}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>

            <v-card width='100%' class="mb-6">
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">Bulletin #3</v-list-item-title>
                  <v-list-item-subtitle>{{disaster.created_at}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
            
          </v-col>

      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import db from '@/firebase/init'

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