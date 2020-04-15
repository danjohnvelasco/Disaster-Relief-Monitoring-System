<template>
  <v-app>
    <v-content class="ml-2">
      <!--EventForm edit mode dialog-->
      <v-btn depressed medium @click="toggleEdit()">Edit</v-btn>
      <v-dialog v-model="dialog" scrollable persistent>
        <EventForm v-if="editing" @close="toggleEdit" :populateWith="disaster" :editing="editing" :doc_id="doc_id"></EventForm>
      </v-dialog>
      <!-- Disaster Event Content-->
      <v-container id="gen_info" align="center">
        <h1 class="display-2 pb-0">{{disaster.title}}</h1>
        <h3 class="subtitle-2 grey--text mb-3 ml-1">Last Updated: {{disaster.created_at}}</h3>
        <v-divider></v-divider>
        <h2 class="headline mb-2 mt-7 ml-5">General Information</h2>
        
          <table>
            <tr>
              <td class="text-right label"><span class="info-label">Lead School</span></td> <td>LEAD SCHOOL HERE</td>
            </tr>
            <tr>
              <td class="text-right label"><span class="info-label">Disaster Type</span></td> <td>{{disaster.type}}</td>
            </tr>
            <tr>
              <td class="text-right label"><span class="info-label">Location</span></td> <td>{{disaster.location}}</td>
            </tr>
            <tr>
              <td class="text-right label"><span class="info-label">Description</span></td> <td>{{disaster.description}}</td>
            </tr>
            <tr v-if="disaster.remarks != null">
              <td class="text-right label"><span class="info-label">Additional Remarks</span></td> <td>{{disaster.remarks}}</td>
            </tr>
          </table>
        
      </v-container>
      <!-- statistics section -->
      <v-container id="stats" class="pb-5">
        <h2 class="headline ml-5">Statistics Overview</h2>
       
        <!-- for 2 or 4 cards -->
        <v-row wrap class="mx-8" v-if="this.stats_num == 2 || this.stats_num == 4">
            <v-col v-for="(stat,i) in stats" v-bind:key="i" class="col-md-6 col-lg-6 mb-6" align="center">
              <v-card class="text-center rounded-card" v-if="stat.value != null">
                <v-row>
                  <v-col class="col-md-4 col-lg-4">
                    <v-icon size='70' class="stats-card">{{stat.icon}}</v-icon>
                  </v-col>
                  <v-col class="col-md-8 col-lg-8 ">
                    <v-card-text class="title pb-0 text-left ml-4 mt-3">{{stat.title}}</v-card-text>
                    <v-card-text class="headline text-left ml-4">{{stat.value}}</v-card-text>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
        </v-row>
        <!-- for 3 or 5-6 cards -->
        <v-row wrap class="mx-8" v-else>
            <v-col v-for="(stat,i) in stats" v-bind:key="i" class="col-md-4 col-lg-4 mb-6" align="center">
              <v-card class="text-center rounded-card" v-if="stat.value != null">
                <v-row>
                  <v-col class="col-md-4 col-lg-4">
                    <v-icon size='70' class="stats-card">{{stat.icon}}</v-icon>
                  </v-col>
                  <v-col class="col-md-8 col-lg-8">
                    <v-card-text class="title pb-0 text-left ml-4 mt-1">{{stat.title}}</v-card-text>
                    <v-card-text class="headline text-left ml-4">{{stat.value}}</v-card-text>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
        </v-row>

        
       
      </v-container>
      <!-- call for donation section -->
      <v-container id="call_for_donations" v-if="disaster.donate_option != null">
        <h2 class="headline ml-5">Call for Donations</h2>
        <v-row wrap class="">
          <v-col cols="12" align="center" v-if="disaster.donate_option == 'cash' || disaster.donate_option == 'both'">
            <v-card width="500">
              <v-card-text class="title">Cash</v-card-text>
              <v-card-text class="text-left ml-4 pt-0"><pre>{{disaster.donation_details}}</pre></v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" align="center" v-if="disaster.donate_option == 'in-kind' || disaster.donate_option == 'both'">
            <v-card width="500">
              <v-card-text class="title">In-kind</v-card-text>
              <v-card-text class="text-left ml-4 pt-0" v-for="item in disaster.reliefs" v-bind:key="item.item">- {{item.item}} <span v-if="item.spec != null"> ({{item.spec}})</span></v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <!-- gallery section -->
      <v-container id="gallery" v-if="file_URLs != undefined && file_URLs.length > 0">
        <h2 class="headline ml-5">Gallery</h2>
          <v-container class='pl-5 pr-5 pb-5 text-center'>
            <v-carousel cycle height="auto" style="width: 700px; margin: auto;" hide-delimiter-background show-arrows-on-hover>
              <v-carousel-item v-for="(url, i) in file_URLs" :key="i" :src="url">
              </v-carousel-item>
            </v-carousel>
          </v-container>
      </v-container>
      <!-- historical data section -->
      <v-container id="historical_data" >
        <h2 class="headline ml-5">History</h2>
        <v-card style="margin: auto; max-width:1000px;" class="mt-4">
          <v-simple-table>
            <thead>
              <tr>
                <th class="">Date</th>
                <th class="">Individuals Affected</th>
                <th class="">Families Affected</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, i) in history" :key="i">
                <td>{{data.date}}</td>
                <td>{{data.indiv_affected}}</td>
                <td>{{data.fam_affected}}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { db, storage } from '@/firebase/init'
import EventForm from '@/components/EventForm'

export default {
  components: {
    EventForm
  },
  props: ['doc_id'],
  data(){
    return{
      disaster: {},
      file_URLs: [],
      history: [],
      dialog: false,
      editing: false,
      stats: [
        {
          title: 'Individuals Affected',
          icon: 'mdi-account',
          value: ''
        },
        {
          title: 'Families Affected',
          icon: 'mdi-account-group',
          value: ''
        },
        {
          title: 'Indiv. in Evac Centers',
          icon: 'mdi-home-variant',
          value: ''
        },
        {
          title: 'Families in Evac Centers',
          icon: 'mdi-home-group',
          value: ''
        },
        {
          title: 'Damage Cost (PHP)',
          icon: 'mdi-cash',
          value: ''
        },
        {
          title: 'Structures Damaged',
          icon: 'mdi-domain',
          value: ''
        }
      ],
      stats_num: ''
    }
  },
  watch: {
    doc_id(newVal) {
      this.getData(newVal);
    }
  },
  methods: {
    clearData: function() {
      this.disaster = {};
      this.file_URLs = [];
      this.history = []
    },
    toggleEdit: function () {
      this.editing = !this.editing;
      this.dialog = !this.dialog;
    },
    timestampToDate: (timestamp) => {
      var date = timestamp.toDate()
      var newdate = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
      return newdate
    },
    getImageURLs: function (doc_id, files) {
      // create storage reference
      var storageRef = storage.ref()
      // create child reference, which points to 'disaster_id' folder
      var imageRef = storageRef.child(doc_id)
      // pushes each image download URL to file_URLs array
      files.forEach((file) => {
        imageRef.child(file).getDownloadURL().then((url) => {
          this.file_URLs.push(url)
        }).catch(err => {
          console.log('Image Error: ' + err)
        })
      })
    },
    getHistoricalData: function(list) {
      var historical_data = {
        date: '',
        indiv_affected: '',
        fam_affected: ''
      }
      list.forEach((disaster) => {
        historical_data.date = this.timestampToDate(disaster.data().created_at)
        historical_data.indiv_affected = disaster.data().indiv_affected
        historical_data.fam_affected = disaster.data().fam_affected
        this.history.push(historical_data)
        historical_data = {}
      })
    },
    assignStats: function(disaster){
      this.stats[0].value = disaster.indiv_affected
      this.stats[1].value = disaster.fam_affected

      if(disaster.evac_indiv_inside != null)
        this.stats[2].value = disaster.evac_indiv_inside
      else
        this.stats[2].value = null

      if(disaster.evac_fam_inside != null)
        this.stats[3].value = disaster.evac_fam_inside
      else
        this.stats[3].value = null

      if(disaster.damage_cost != null)
        this.stats[4].value = disaster.damage_cost
      else
        this.stats[4].value = null

      if(disaster.structures_damaged != null)
        this.stats[5].value = disaster.structures_damaged
      else
        this.stats[5].value = null

      this.getNumberOfStats()
    },
    getNumberOfStats: function(){
      var count = 0

      for(var i = 0; i < this.stats.length; i++){
        if(this.stats[i].value != null)
          count++
      }

      this.stats_num = count
    },
    getData: function (doc_id) {
      db.collection('disasters2')
      .doc(doc_id)
      .collection('history').orderBy('created_at').get().then(doc => {
        if (doc) {
          // clears current data in disaster form
          this.clearData()
          // rearranges disaster historical data array into latest first
          var disaster_data = doc.docs.reverse()
          // grabs latest data in history subcollection
          this.disaster = disaster_data[0].data()
          // converts timestamp data type into Date
          this.disaster.created_at = this.timestampToDate(this.disaster.created_at)
          // converts image URLs to download URLs and transfers to file_URLs array
          if(this.disaster.img_URLs != undefined && this.disaster.img_URLs.length > 0)
            this.getImageURLs(doc_id, this.disaster.img_URLs)
          // gets historical data of disaster event
          this.getHistoricalData(disaster_data)
          // assigns disaster stats in stats array
          this.assignStats(this.disaster)
        } else{
        console.log('no doc found')
        }
      }).catch(err => {
        console.log("Error: " + err)
      })
    }
  },
  created() {
    this.getData(this.doc_id);
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

.info-label{
  font-weight: 500;
}

.stats-card{
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 20px;
}
</style>