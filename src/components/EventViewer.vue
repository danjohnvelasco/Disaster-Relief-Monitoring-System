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
      <!-- statistics section -->
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
      <!-- call for donation section -->
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
      </v-container>
      <!-- gallery section -->
      <v-container id="gallery" v-if="file_URLs != undefined && file_URLs.length > 0">
        <h2 class="headline text-center">Gallery</h2>
          <v-container class='pl-5 pr-5 pb-5 text-center'>
            <v-carousel cycle height="auto" style="width: 700px; margin: auto;" hide-delimiter-background show-arrows-on-hover>
              <v-carousel-item v-for="(url, i) in file_URLs" :key="i" :src="url">
              </v-carousel-item>
            </v-carousel>
          </v-container>
      </v-container>
      <!-- historical data section -->
      <v-container id="historical_data" >
        <h2 class="headline text-center">Historical Data</h2>
        <v-card style="width: 800px; margin: auto;" class="mt-4">
          <v-simple-table class="">
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

</style>