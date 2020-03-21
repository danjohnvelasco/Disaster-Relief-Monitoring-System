<template>
  <v-app>
    <v-content class="ml-2">

      <v-container id="gen_info" align="center">
        <h1 class="display-2 pb-0">{{disaster.title}}</h1>
        <h3 class="subtitle-2 grey--text mb-3 ml-1">Last Updated: {{disaster.created_at}}</h3>
        <h2 class="headline mb-2 text-center">General Information</h2>
        <v-card>
          <table>
            <tr>
              <td class="text-right label">Lead School:</td> <td>LEAD SCHOOL HERE</td>
            </tr>
            <tr>
              <td class="text-right label">Disaster Type:</td> <td>{{disaster.type}}</td>
            </tr>
            <tr>
              <td class="text-right label">Location:</td> <td>{{disaster.location}}</td>
            </tr>
            <tr>
              <td class="text-right label">Description:</td> <td>{{disaster.description}}</td>
            </tr>
            <tr v-if="disaster.remarks != null">
              <td class="text-right label">Additional Remarks:</td> <td>{{disaster.remarks}}</td>
            </tr>
          </table>
        </v-card>
      </v-container>

      <v-container id="stats" class="pb-5">
        
          <h2 class="headline text-center">Statistics Overview</h2>

          <v-row wrap class="mx-8">

            <v-col class="col-md-6 col-lg-6 mb-6" align="center">
              <v-card class="text-center" width='280'>
                <v-icon size='70' class='mt-3'>mdi-account</v-icon>
                <v-card-text class="display-2 font-weight-bold">{{disaster.indiv_affected}}</v-card-text>
                <v-card-text class="title pt-0">Individuals Affected</v-card-text>
              </v-card>
            </v-col>

            <v-col class="col-md-6 col-lg-6 mb-6" align="center">
              <v-card class="text-center" width="280">
                <v-icon size='70' class='mt-3'>mdi-account-group</v-icon>
                <v-card-text class="display-2 font-weight-bold">{{disaster.fam_affected}}</v-card-text>
                <v-card-text class="title pt-0">Families Affected</v-card-text>
              </v-card>
            </v-col>

            <v-col  class="col-md-6 col-lg-6 mb-6" align="center" v-if="disaster.evac_indiv_inside != null">
              <v-card class="text-center" width="280">
                <v-icon size='70' class='mt-3'>mdi-home-variant</v-icon>
                <v-card-text class="display-2 font-weight-bold">{{disaster.evac_indiv_inside}}</v-card-text>
                <v-card-text class="title pt-0">Individuals in Evac Centers</v-card-text>
              </v-card>
            </v-col>

            <v-col class="col-md-6 col-lg-6 mb-6" align="center" v-if="disaster.evac_fam_inside != null">
              <v-card class="text-center" width="280">
                <v-icon size='70' class='mt-3'>mdi-home-group</v-icon>
                <v-card-text class="display-2 font-weight-bold">{{disaster.evac_fam_inside}}</v-card-text>
                <v-card-text class="title pt-0">Families In Evac Centers</v-card-text>
              </v-card>
            </v-col>

            <v-col class="col-md-6 col-lg-6 mb-6" align="center" v-if="disaster.damage_cost != null">
              <v-card class="text-center" width="280">
                <v-icon size='70' class='mt-3'>mdi-cash</v-icon>
                <v-card-text class="display-2 font-weight-bold">{{disaster.damage_cost}}</v-card-text>
                <v-card-text class="title pt-0">Damage Cost (PHP)</v-card-text>
              </v-card>
            </v-col>

            <v-col class="col-md-6 col-lg-6 mb-6" align="center" v-if="disaster.structures_damaged != null">
              <v-card class="text-center" width="280">
                <v-icon size='70' class='mt-3'>mdi-domain</v-icon>
                <v-card-text class="display-2 font-weight-bold">{{disaster.structures_damaged}}</v-card-text>
                <v-card-text class="title pt-0">Structures Damaged</v-card-text>
              </v-card>
            </v-col>
          </v-row>

        
      </v-container>

      <v-container id="call_for_donations" v-if="disaster.donate_option != null">
        <h2 class="headline text-center">Call for Donations</h2>

        <v-row wrap class="">
          <v-col cols="12" align="center" v-if="disaster.donate_option == 'cash' || disaster.donate_option == 'both'">
            <v-card width="500">
              <v-card-text class="title">For Cash:</v-card-text>
              <v-card-text class="text-left ml-4 pt-0"><pre>{{disaster.donation_details}}</pre></v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" align="center" v-if="disaster.donate_option == 'in-kind' || disaster.donate_option == 'both'">
            <v-card width="500">
              <v-card-text class="title">For In-kind:</v-card-text>
              <v-card-text class="text-left ml-4 pt-0" v-for="item in disaster.reliefs" v-bind:key="item.item">- {{item.item}} <span v-if="item.spec != null"> ({{item.spec}})</span></v-card-text>
            </v-card>
          </v-col>
        </v-row>
        
       <!--
        <v-row wrap class="ml-4 mr-4">

          <v-col cols="12" align="center">
            <v-card class="text-center" width='600'>
            <v-card-text class="title pt-0">Cash:</v-card-text>
            <v-card-text align="left" width="400"><pre>{{disaster.donation_details}}</pre></v-card-text>
              
            </v-card>
          </v-col>

        </v-row>

          <v-container style="width: 400px">
            <v-card-text>Cash Donations</v-card-text>
            <v-card-text align="left" width="400"><pre>{{disaster.donation_details}}</pre></v-card-text>
          </v-container>

          <v-container>
            <v-card-text>In-kind Donations</v-card-text>
            <v-list>
            <v-list-item-group>
            
            </v-list-item-group>
            
              <v-list-item selectable>Item #1</v-list-item>
              <v-list-item>Item #2</v-list-item>
              <v-list-item>Item #2</v-list-item>
            </v-list>

           
          </v-container>
        -->

      
      </v-container>

      <v-container id="gallery">

        <h2 class="headline text-center">Gallery</h2>
          <v-container class='pl-5 pr-5 pb-5'>
            <v-carousel
              cycle
              height="400"
              hide-delimiter-background
              show-arrows-on-hover
            >
              <v-carousel-item
                v-for="(slide, i) in slides"
                :key="i"
              >
                <v-sheet
                  :color="colors[i]"
                  height="100%"
                >
                  <v-row
                    class="fill-height"
                    align="center"
                    justify="center"
                  >
                    <div class="display-3">{{ slide }} Slide</div>
                  </v-row>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
          </v-container>
      
      </v-container>

      <v-container id="graphs">

        <h2 class="headline text-center">Historical Graphs</h2>

      
      </v-container>
    
    </v-content>
  </v-app>
</template>

<script>
import {db} from '@/firebase/init'

export default {

  data(){
    return{
      disaster: {},
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        'Filler',
        'Filler',
        'Filler',
        'Filler',
        'Filler',
      ]
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
    // real-time listener
    // db.collection('disasters2').onSnapshot(res =>{
    //   const changes = res.docChanges()

    //   changes.forEach(change =>{
    //     if (change.type  === 'added'){
    //       this.disasters.push({
    //         ...change.doc.data()
    //       })
    //     }
    //   })
    //   this.disasters.forEach(disaster =>{
    //     console.log(disaster.archived)
    //   })
    // })

    // grabs latest data in history subcollection
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

<style scoped>
h1{
  padding: 10px 0 20px 0;
}

.stats_cards{
  margin: 20px;
}

td{
  padding: 10px;
}
.label{
  width: 130px;
}

</style>