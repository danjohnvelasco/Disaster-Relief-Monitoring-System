<template>
  <v-app>
    <v-content class="ml-2">
      <!--EventForm edit mode dialog-->
      
      <v-dialog v-model="edit_dialog" scrollable persistent>
        <EventForm v-if="editing" @close="toggleEdit" :populateWith="disaster" :editing="editing" :doc_id="doc_id"></EventForm>
      </v-dialog>
      
      <v-dialog v-model="archive_dialog" max-width="700" persistent>
        <v-card v-if="archiving" @close="toggleArchive" rounded>
          <v-alert type="success" v-if="archive_status === 'success' && current_list_type == 'active'" >Archive successful! Reloading page...</v-alert>
          <v-alert type="success" v-if="archive_status === 'success' && current_list_type == 'archived'" >Undo Archive successful! Reloading page...</v-alert>
          <v-card-title>
            <v-progress-linear
            v-if="archive_status === 'submitting'"
            :height='6'
            rounded
            indeterminate
            color="green"
          ></v-progress-linear>
          </v-card-title>
          <v-card-text align="center" class="archive-dialog">
            <v-container v-if="current_list_type == 'active'">
              <h1>Are you sure you want to archive this event?</h1>
              <v-btn dark color="#184725" class="ma-2" @click="changeEventStatus(doc_id, 'to_archive')">Yes</v-btn>
              <v-btn dark color="#D02F3A" class="ma-2" @click="toggleArchive">No</v-btn>
            </v-container>
            <v-container v-else>
              <h1>Are you sure you want to unarchive this event?</h1>
              <v-btn dark color="#184725" class="ma-2" @click="changeEventStatus(doc_id, 'to_unarchive')">Yes</v-btn>
              <v-btn dark color="#D02F3A" class="ma-2" @click="toggleArchive">No</v-btn>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
      
      <!-- Disaster Event Content-->
      <v-container id="gen_info" align="center">
        <v-row>
          <v-col cols="8">
            <!-- <h1 class="display-2 pb-0 ml-9" style="color: #184725;"> -->
            <h1 id="title" class="pb-0 ml-9">
              {{disaster.title}}
            </h1>
          </v-col>
          <v-col align="right" cols="4">
            <div class="mr-9">
              <v-btn 
                depressed 
                medium 
                @click="toggleEdit()" 
                color="#184725" 
                dark 
                class="mt-3 ml-3 mb-3 edit"
              > 
                Update 
              </v-btn>
              <v-btn 
                v-if="current_list_type == 'active'"
                depressed 
                medium 
                @click="toggleArchive()" 
                color="#184725" 
                outlined 
                class="mt-3 ml-3 mb-3 edit" 
              >
                Archive
              </v-btn>
              <v-btn 
                v-else
                depressed 
                medium 
                @click="toggleArchive()" 
                color="#184725"
                outlined
                class="mt-3 ml-3 mb-3 edit" 
              >
                Unarchive
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <h3 class="subtitle-2 grey--text mb-3 ml-9 mr-9">Last Updated: {{disaster.created_at}}</h3>
        <v-divider class="ml-7 mr-7"></v-divider>
        <h2 id="GI" class="mb-2 mt-7 ml-9">General Information</h2>
       
          <table class="ml-9" style="height:auto; margin: 0px auto;">
            <tr>
              <td class="text-left label px-0 py-1"><span class="info-label">Lead School</span></td> 
              <td class="px-0 py-1">Fun University</td>
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
              <td class="px-0 py-1 pre-formatted">{{disaster.description}}</td>
            </tr>
            <tr v-if="disaster.remarks != null && disaster.remarks != ''">
              <td class="text-left label px-0 py-1"><span class="info-label">Additional Remarks</span></td> 
              <td class="px-0 py-1 pre-formatted">{{disaster.remarks}}</td>
            </tr>
          </table>

      </v-container>

      <!-- statistics section -->
      <v-container id="stats" class="pb-5">
        <h2 id="ST" class="ml-9">National / Local Statistics</h2>
        <v-row wrap class="mx-6">
            <v-col v-for="(stat,i) in stats" v-bind:key="i" class="col-md-6 col-lg-6 mb-6" align="center">
              <v-card class="text-center" id="rounded-card" outlined v-if="stat.value != null && stat.value != ''">
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
      <v-container class="mb-5" id="damage_level_data" v-if="disaster.damage_cost != null && disaster.damage_cost != '' || disaster.damage_cost_additional_details != null && disaster.damage_cost_additional_details != ''" >
        <h2 id="DL" class="ml-9 mb-2">Damage Level</h2>

        <table class="ml-9" style="height:auto; margin: 0px auto;">
          <tr>
            <td class="text-left label px-0 py-1"><span class="info-label">Estimated Damage Cost</span></td> 
            <td class="px-0 pl-2 py-1">₱{{disaster.damage_cost}}</td>
          </tr>
          <tr v-if="disaster.damage_cost_additional_details != null && disaster.damage_cost_additional_details != ''">
            <td class="text-left label px-0 py-1"><span class="info-label">Additional Details</span></td> 
            <td class="px-0 pl-2 py-1 pre-formatted">{{disaster.damage_cost_additional_details}}</td>
          </tr>
        </table>
      </v-container>

      <!-- beneficiaries section -->
      <v-container id="beneficiaries" v-if="disaster.beneficiary_indiv_affected != null && disaster.beneficiary_indiv_affected != '' || disaster.beneficiary_fam_affected != null && disaster.beneficiary_fam_affected != ''">
        <h2 id="LSAB" class="ml-9 mb-2">Lead School Assistance Beneficiaries</h2>
        <v-row wrap class="mx-6">

            <v-col class="col-md-6 col-lg-6 mb-6" align="center" v-if="disaster.beneficiary_indiv_affected != null && disaster.beneficiary_indiv_affected != ''">
              <v-card class="text-center" id="rounded-card" outlined>
                <v-row>
                 <v-col class="col-md-8 col-lg-8 ">
                    <v-card-text class="title pb-0 text-left ml-4 mt-3">No. of Individuals</v-card-text>
                    <v-card-text class="headline text-left ml-4">{{disaster.beneficiary_indiv_affected}}</v-card-text>
                  </v-col>
                  <v-col class="col-md-4 col-lg-4">
                    <v-icon size='70' class="stats-card card-icon mr-5">mdi-account</v-icon>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>

            <v-col class="col-md-6 col-lg-6 mb-6" align="center" v-if="disaster.beneficiary_fam_affected != null && disaster.beneficiary_fam_affected != ''">
              <v-card class="text-center" id="rounded-card" outlined>
                <v-row>
                 <v-col class="col-md-8 col-lg-8 ">
                    <v-card-text class="title pb-0 text-left ml-4 mt-3">No. of Families</v-card-text>
                    <v-card-text class="headline text-left ml-4">{{disaster.beneficiary_fam_affected}}</v-card-text>
                  </v-col>
                  <v-col class="col-md-4 col-lg-4">
                    <v-icon size='70' class="stats-card card-icon mr-5">mdi-account-group</v-icon>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            
        </v-row> 
      </v-container>

      <!-- call for donation section -->
      <v-container id="call_for_donations" class="px-0" v-if="disaster.is_cash || disaster.is_inkind">
        <h2 id="CD" class="ml-9 mb-2">Call for Donations</h2>

        <v-container v-if="disaster.is_cash && !disaster.is_inkind">
          <v-card class="ma-2 mx-8 pa-3" id="donation-card">
            <p class="title mb-1">Cash</p>
            <p class="subtitle-1 pre-formatted" v-html="disaster.donation_details"></p>
          </v-card>
          
        </v-container>

        <v-container v-else-if="disaster.is_inkind && !disaster.is_cash">
          <v-card class="ma-2 mx-8 pa-3" id="donation-card">
            <p class="title mb-1">In-kind</p>
            <p class="subtitle-1 mb-0">Donation Instructions:</p>
            <p class="subtitle-1 mb-0 pre-formatted">{{disaster.in_kind_dropoff_instructions}}</p>
            <br>
            <p class="subtitle-1 mb-0" v-if="disaster.in_kind_general_specs != null && disaster.in_kind_general_specs != ''">General Specifications:</p>
            <p class="subtitle-1 mb-0 pre-formatted" v-if="disaster.in_kind_general_specs != null && disaster.in_kind_general_specs != ''">{{disaster.in_kind_general_specs}}</p>
            <br>
            <p class="subtitle-1 mb-0">Items:</p>
            <p class="subtitle-1 mb-0" v-for="item in disaster.reliefs" v-bind:key="item.item">- {{item.item}} <span v-if="item.spec != null && item.spec != ''">({{item.spec}})</span></p>
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
                <p class="subtitle-1 mb-0">Drop-off Instructions:</p>
                <p class="subtitle-1 mb-0 pre-formatted">{{disaster.in_kind_dropoff_instructions}}</p>
                <br>
                <p class="subtitle-1 mb-0" v-if="disaster.in_kind_general_specs != null && disaster.in_kind_general_specs != ''">General Specifications:</p>
                <p class="subtitle-1 mb-0 pre-formatted" v-if="disaster.in_kind_general_specs != null && disaster.in_kind_general_specs != ''">{{disaster.in_kind_general_specs}}</p>
                <br>
                <p class="subtitle-1 mb-0">Items:</p>
                <p class="subtitle-1 mb-0" v-for="item in disaster.reliefs" v-bind:key="item.item">- {{item.item}} <span v-if="item.spec != null && item.spec != ''">({{item.spec}})</span></p>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- gallery section  vh vw-->
      <v-container id="gallery" v-if="file_URLs != undefined && file_URLs.length > 0">
        <h2 id="GL" class="ml-9 mb-2">Gallery</h2>
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
        <h2 id="H" class="ml-9 mb-2">History</h2>
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
                <td class="text-right">{{data.general_indiv_affected}}</td>
                <td class="text-right">{{data.general_fam_affected}}</td>
                <td class="text-right">{{data.total_cash_donations_received}}</td>
                <td class="text-right">{{data.total_relief_packs_distributed}}</td>
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
    latestDisasterDocs: Object,
    list_type: String
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
      // grab stats from disaster object
      this.assignStats(this.disaster)
      // grab current event list type
      this.current_list_type = this.list_type
    }
  },
  data(){
    return{
      disaster: {},
      file_URLs: [],
      history: [],
      edit_dialog: false,
      editing: false,
      archive_dialog: false,
      archiving: false,
      archive_status: '',
      stats: [],
      stats_num: '',
      current_list_type: ''
    }
  },
  methods: {
    toggleEdit: function () {
      this.editing = !this.editing;
      this.edit_dialog = !this.edit_dialog;
    },
    toggleArchive: function() {
      this.archiving = !this.archiving;
      this.archive_dialog = !this.archive_dialog;
    },
    changeEventStatus: function (doc_id, action){
      this.archive_status = 'submitting'
      var doc = db.collection("disasters2").doc(doc_id);
      var timestamp = firebase.firestore.FieldValue.serverTimestamp();
      var archive = false
      if(action == "to_archive"){
        archive = true
      }
      else{
        archive = false
      }
      doc.set({
        title: this.disaster.title,
        type: this.disaster.type,
        last_updated: timestamp,
        archived: archive
      }).then(() => {
        this.archive_status = 'success'
        this.reloadPage()
      }).catch((err) => {
        throw err;
      })
    },
    reloadPage() {
      window.location.reload()
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
        }).catch((err) => {
          throw "Error downloading image " + err;
        })
      })
    },
    assignStats: function(disaster){
      this.stats = []
      this.stats.push({
          title: 'No. of Individuals Affected',
          icon: 'mdi-account',
          value: disaster.general_indiv_affected
      })
      this.stats.push({
          title: 'No. of Families Affected',
          icon: 'mdi-account-group',
          value: disaster.general_fam_affected
      })

      if(disaster.evac_indiv_inside != null && disaster.evac_indiv_inside != "")
        this.stats.push({
          title: 'No. of Individuals in Evacuation Centers',
          icon: 'mdi-home-variant',
          value: disaster.evac_indiv_inside
        })

      if(disaster.evac_fam_inside != null && disaster.evac_fam_inside != "")
        this.stats.push({
          title: 'No. of Families in Evacuation Centers',
          icon: 'mdi-home-group',
          value: disaster.evac_fam_inside
        })

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
            historical_data.general_indiv_affected = doc.data().general_indiv_affected
            historical_data.general_fam_affected = doc.data().general_fam_affected  
            historical_data.total_cash_donations_received = doc.data().total_cash_donations_received
            historical_data.total_relief_packs_distributed = doc.data().total_relief_packs_distributed
            this.history.push(historical_data)
            historical_data = {}
          })
        }).catch((err) => {
          throw "Error getting historical data " + err;
        })
    }
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

#title{
  font-size: 50px;
  font-family: 'EB Garamond', serif;
  color: #184725;
}

.archive-dialog h1{
  color: black;
}

#GI, #ST, #DL, #LSAB, #CD, #GL, #H{
  font-size: 25px;
  font-family: 'EB Garamond', serif;
  color: #427f50;
}
</style>