<template>
  <v-app>
    <v-content class="ml-2">
      <!--EventForm edit mode dialog-->
      
      <v-dialog v-model="dialog" scrollable persistent>
        <EventForm v-if="editing" @close="toggleEdit" :populateWith="disaster" :editing="editing" :doc_id="doc_id"></EventForm>
      </v-dialog>
      <!-- Disaster Event Content-->
      <v-container id="gen_info" align="center">
        <h1 class="display-2 pb-0 ml-9" style="color: #184725;">
          {{disaster.title}}
          <v-btn depressed medium @click="toggleEdit()" color="#184725" dark class="mt-3 ml-3 mb-3 edit">Update</v-btn>
          <v-btn depressed medium @click="archiveEvent(doc_id)" color="#184725" dark class="mt-3 ml-3 mb-3 edit">Archive</v-btn>
        </h1>
        <h3 class="subtitle-2 grey--text mb-3 ml-9 mr-9">Last Updated: {{disaster.created_at}}</h3>
        <v-divider class="ml-7 mr-7"></v-divider>
        <h2 class="headline mb-2 mt-7 ml-9 label-heading">General Information</h2>
       
          <table class="ml-9" style="height:auto; margin: 0px auto;">
            <tr>
              <td class="text-left label px-0 py-1"><span class="info-label">Lead School</span></td> 
              <td class="px-0 py-1">De La Salle University</td>
            </tr>
            <tr>
              <td class="text-left label px-0 py-1"><span class="info-label">Disaster Type</span></td>
              <td class="px-0 py-1">{{disaster.type}}</td>
            </tr>
            <tr>
              <td class="text-left label px-0 py-1"><span class="info-label">Location</span></td> 
              <td class="px-0 py-1">{{disaster.location}}</td>
            </tr>
            <tr>
              <td class="text-left label px-0 py-1"><span class="info-label">Description</span></td> 
              <td class="px-0 py-1">{{disaster.description}}</td>
            </tr>
            <tr v-if="disaster.remarks != null">
              <td class="text-left label px-0 py-1"><span class="info-label">Additional Remarks</span></td> 
              <td class="px-0 py-1">{{disaster.remarks}}</td>
            </tr>
          </table>

      </v-container>

      <!-- statistics section -->
      <v-container id="stats" class="pb-5">
        <h2 class="headline ml-9 label-heading">National / Local Statistics</h2>
        <v-row wrap class="mx-6">
            <v-col v-for="(stat,i) in stats" v-bind:key="i" class="col-md-6 col-lg-6 mb-6" align="center">
              <v-card class="text-center" id="rounded-card" outlined v-if="stat.value != null">
                <v-row>
                 <v-col class="col-md-8 col-lg-8 ">
                    <v-card-text class="title pb-0 text-left ml-4 mt-3">{{stat.title}}</v-card-text>
                    <v-card-text class="headline text-left ml-4">{{stat.value}}</v-card-text>
                  </v-col>
                  <v-col class="col-md-4 col-lg-4">
                    <v-icon size='70' class="stats-card card-icon mr-5">{{stat.icon}}</v-icon>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
        </v-row> 
      </v-container>

      <!-- damage level data -->
      <v-container id="damage_level_data" v-if="disaster.damage_cost != null || disaster.structures_damaged != null" > <!-- || disaster.ADDITIONAL DETAILS != null -->
        <h2 class="headline ml-9 label-heading">Damage Level</h2>
        <v-row wrap class="mx-6">
            <!-- ESTIMATED DAMAGE COST -->
            <v-col class="col-md-6 col-lg-6 mb-6" align="center" v-if="disaster.damage_cost != null">
              <v-card class="text-center" id="rounded-card" outlined>
                <v-row>
                 <v-col class="col-md-8 col-lg-8">
                    <v-card-text class="title pb-0 text-left ml-4 mt-3">Estimated Damage Cost</v-card-text>
                    <v-card-text class="headline text-left ml-4">$$$</v-card-text>
                  </v-col>
                  <v-col class="col-md-4 col-lg-4">
                    <v-icon size='70' class="stats-card card-icon mr-5">mdi-cash</v-icon>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <!-- STRUCTURES DAMAGED -->
            <v-col class="col-md-6 col-lg-6 mb-6" align="center" v-if="disaster.structures_damaged != null">
              <v-card class="text-center" id="rounded-card" outlined>
                <v-row>
                 <v-col class="col-md-8 col-lg-8 ">
                    <v-card-text class="title pb-0 text-left ml-4 mt-3">No. of Structures Damaged</v-card-text>
                    <v-card-text class="headline text-left ml-4">$$$</v-card-text>
                  </v-col>
                  <v-col class="col-md-4 col-lg-4">
                    <v-icon size='70' class="stats-card card-icon mr-5">mdi-domain</v-icon>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <!-- ADDITIONAL DETAILS -->
            <v-card class="ma-2  pa-3" id="donation-card"> <!-- v-if="disaster.ADDITIONAL DETAILS != null" -->
              <p class="title mb-1">Additional Details</p>
              <p class="subtitle-1 mb-0 pre-formatted">// ADDITIONAL DETAILS HERE</p>
          </v-card>
        </v-row>
      </v-container>

      <!-- beneficiaries section -->
      <v-container id="beneficiaries">
        <h2 class="headline ml-9 label-heading">Beneficiaries</h2>
      </v-container>

      <!-- call for donation section -->
      <v-container id="call_for_donations" class="px-0" v-if="disaster.donate_option != null">
        <h2 class="headline label-heading ml-11">Call for Donations</h2>

        <v-container v-if="disaster.donate_option == 'cash'">
          <v-card class="ma-2 mx-8 pa-3" id="donation-card">
            <p class="title mb-1">Cash</p>
            <p class="subtitle-1 pre-formatted" v-html="disaster.donation_details"></p>
          </v-card>
          
        </v-container>

        <v-container v-else-if="disaster.donate_option == 'in-kind'">
          <v-card class="ma-2 mx-8 pa-3" id="donation-card">
            <p class="title mb-1">In-kind</p>
            <p class="subtitle-1 mb-0">Items:</p>
            <p class="subtitle-1 mb-0" v-for="item in disaster.reliefs" v-bind:key="item.item">- {{item.item}} <span v-if="item.spec != null">({{item.spec}})</span></p>
            <br>
            <p class="subtitle-1 mb-0">Instructions:</p>
            <p class="subtitle-1 mb-0 pre-formatted">// INSTRUCTIONS HERE</p>
          </v-card>
        </v-container>

        <v-container v-else>
          <v-row wrap class="mx-0">
            <v-col class="col-md-6 col-lg-6 mb-6 px-0" >
              <v-card class="ma-2 ml-8 pa-3" id="donation-card">
                <p class="title mb-1">Cash</p>
                <p class="subtitle-1 pre-formatted">{{disaster.donation_details}}</p>
              </v-card>
            </v-col>
            <v-col class="col-md-6 col-lg-6 mb-6">
              <v-card class="ma-2 mr-6 pa-3" id="donation-card">
                <p class="title mb-1">In-kind</p>
                <p class="subtitle-1 mb-0">Items:</p>
                <p class="subtitle-1 mb-0" v-for="item in disaster.reliefs" v-bind:key="item.item">- {{item.item}} <span v-if="item.spec != null">({{item.spec}})</span></p>
                <br>
                <p class="subtitle-1 mb-0">Instructions:</p>
                <p class="subtitle-1 mb-0 pre-formatted">// INSTRUCTIONS HERE</p>
                
              </v-card>
            </v-col>
          </v-row>
          
        </v-container>

      </v-container>

      <!-- gallery section  vh vw-->
      <v-container id="gallery" v-if="file_URLs != undefined && file_URLs.length > 0">
        <h2 class="headline ml-9 mb-4 label-heading">Gallery</h2>

        <v-card class="ml-8 mr-8 m pa-4" id="rounded-card" background="#ecf5ee" style="">
          <v-carousel>
            <v-carousel-item class="gallery-item" v-for="(url, i) in file_URLs" :key="i" hide-delimiter-background show-arrows-on-hover>
              <img :src="url">
            </v-carousel-item>
          </v-carousel>

        </v-card>

      </v-container>

      <!-- historical data section -->
      <v-container id="historical_data">
        <h2 class="headline ml-9 label-heading mb-3 mt-6">History</h2>
        <!--<v-card id="rounded-card" class=" mx-8 pa-2" background="#ecf5ee">-->
          <v-card class="ma-4 mx-8" id="rounded-card" style="margin: auto; max-width:100%;">
          <v-simple-table class="pa-4">
            <thead>
              <tr>
                <th class="text-left">Date</th>
                <th class="text-right">Individuals Affected</th>
                <th class="text-right">Families Affected</th>
                <th class="text-right">Total Cash Donations</th>
                <th class="text-right">Total No. of Relief Packs Distributed</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, i) in history" :key="i">
                <td class="text-left">{{data.date}}</td>
                <td class="text-right">{{data.indiv_affected}}</td>
                <td class="text-right">{{data.fam_affected}}</td>
                <td class="text-right">// DISASTER.CASHDONATIONS</td>
                <td class="text-right">// DISASTER.RELIEFPACKS</td>
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
import firebase from 'firebase/app'
import EventForm from '@/components/EventForm'

export default {
  components: {
    EventForm
  },
  props: {
    doc_id: String,
    latestDisasterDocs: Object
  },
  watch: {
    doc_id: function() {
      // ensures clean state
      this.clearData();
      // assign preloaded data to be displayed
      this.disaster = this.latestDisasterDocs[this.doc_id];
      // Download images (lazy loading)
      if(this.disaster.img_URLs != undefined && this.disaster.img_URLs.length > 0)
        this.getImageURLs(this.doc_id, this.disaster.img_URLs);
        
      // get historical data (lazy loading)
      this.getHistoricalData(this.doc_id);

      this.assignStats(this.disaster)
      console.log(this.doc_id)
    }
  },
  data(){
    return{
      disaster: {},
      file_URLs: [],
      history: [],
      dialog: false,
      editing: false,
      stats: [],
      stats_num: ''
    }
  },
  methods: {
    toggleEdit: function () {
      this.editing = !this.editing;
      this.dialog = !this.dialog;
    },
    archiveEvent: function (doc_id) {
      var doc = db.collection("disasters2").doc(doc_id);
      var timestamp = firebase.firestore.FieldValue.serverTimestamp();
      doc.set({
        title: this.disaster.title,
        type: this.disaster.type,
        last_updated: timestamp,
        archived: true
      }).then(() => {
        console.log("Event " + doc_id +  " archived")
      }).catch(err => {
        console.log("Error: " + err)
      })
    },
    clearData: function() {
      this.disaster = {};
      this.file_URLs = [];
      this.history = []
    },
    timestampToDate: function (timestamp) {
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
    assignStats: function(disaster){
      this.stats = []
      this.stats.push({
          title: 'Individuals Affected',
          icon: 'mdi-account',
          value: disaster.indiv_affected
      })
      this.stats.push({
          title: 'Families Affected',
          icon: 'mdi-account-group',
          value: disaster.fam_affected
      })

      if(disaster.evac_indiv_inside != null && disaster.evac_indiv_inside != "")
        this.stats.push({
          title: 'Individuals in Evacuation Centers',
          icon: 'mdi-home-variant',
          value: disaster.evac_indiv_inside
        })

      if(disaster.evac_fam_inside != null && disaster.evac_fam_inside != "")
        this.stats.push({
          title: 'Families in Evacuation Centers',
          icon: 'mdi-home-group',
          value: disaster.evac_fam_inside
        })

      // if(disaster.damage_cost != null && disaster.damage_cost != "")
      //   this.stats.push({
      //     title: 'Estimated Damage Cost',
      //     icon: 'mdi-cash',
      //     value:'₱' + disaster.damage_cost
      //   })

      // if(disaster.structures_damaged != null && disaster.structures_damaged != "")
      //   this.stats.push({
      //     title: 'Structures Damaged',
      //     icon: 'mdi-domain',
      //     value: disaster.structures_damaged
      //   })

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
    getHistoricalData: function(doc_id) {
      var historical_data = {};
      db.collection('disasters2')
        .doc(doc_id)
        .collection('history')
        .orderBy('created_at', 'desc')
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            historical_data.date = this.timestampToDate(doc.data().created_at)
            historical_data.indiv_affected = doc.data().indiv_affected
            historical_data.fam_affected = doc.data().fam_affected  
            // historical_data. CASH DONS = doc.data(). CASH DONS
            // historical_data. RELIEF PACKS DISTRIBUTED = doc.data(). RELIEF PACKS DISTRIBUTED
            this.history.push(historical_data)
            historical_data = {}
          })
        }).catch(err => {
          console.log("Error: " + err)
        })
    }
  },
  created() {
    console.log('EventViewer created');
  },
  beforeUpdate() {
    console.log('EventViewer beforeUpdate');
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

#rounded-card{
  border-radius:18px;
  background-color:#ecf5ee;
  border-style:hidden;
}

#donation-card{
  border-radius:18px;
}

#don-card{
  border-radius:18px;
  border-style:hidden;
}

.card-icon{
  color: black;
}

.edit{
  border-radius:10px;
}

#image{
  border-radius:20px;
}

.label-heading{
  color:#427f50
}

.pre-formatted{
  white-space: pre-wrap;
}

.gallery-item img{
  display: block;
  margin: 0 auto;
  height: 100%;
}
</style>