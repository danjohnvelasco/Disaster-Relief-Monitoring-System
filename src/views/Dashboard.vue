<template>
  <v-app>
    <v-row>
      <v-col class="col-md-3 col-lg-3 mb-3">
        <EventList :activeTopLevelDocs="activeTopLevelDocs" @displayEvent="displayEvent"></EventList>
      </v-col>
      <v-col class="col-md-9 col-lg-9 mb-9" v-show="showEventViewer">
        <EventViewer :latestDisasterDocs="latestDisasterDocs" :doc_id="doc_id"></EventViewer>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import EventList from '@/components/EventList'
import EventViewer from '@/components/EventViewer'
import {db, storage} from '@/firebase/init'

export default {
  name: 'Dashboard',
  components: {
    EventList,
    EventViewer
  },
  data() {
    return {
      doc_id: '',
      activeTopLevelDocs: [],
      latestDisasterDocs: {},
      showEventViewer: false
    }
  },
  methods: {
    displayEvent: function (firebase_doc_id) { 
      this.doc_id = firebase_doc_id;
      this.showEventViewer = true;
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
    getLatestDisasterDoc: function (doc_id) { 
      db.collection('disasters2')
        .doc(doc_id)
        .collection('history')
        .orderBy('created_at')
        .get()
        .then(doc => {
          if (doc) {
            // rearranges disaster historical data array into latest first
            var disasterDocs = doc.docs.reverse()
            // grabs latest data in history subcollection
            var disaster = disasterDocs[0].data();
            // converts timestamp data type into Date
            disaster.created_at = this.timestampToDate(disaster.created_at)
            // nest the doc inside an object w/ it's doc id as key
            this.latestDisasterDocs[doc_id] = disaster;
          } else {
            console.log('no doc found')
          }
        }).catch(err => {
          console.log("Error: " + err)
        })
    },
    getLatestActiveData: function() {
      db.collection("disasters2")
        .where("archived", "==", false) // change to active later
        .orderBy('last_updated', 'desc')
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            // retrieve top level doc
            var topLevelDoc = doc.data();
            topLevelDoc.id = doc.id;
            topLevelDoc.last_updated = this.timestampToDate(topLevelDoc.last_updated);
            this.activeTopLevelDocs.push(topLevelDoc);
            // get latest data inside 'history' subcollection
            this.getLatestDisasterDoc(doc.id);
          });
        })
        .catch((error) => {
          console.log("Error getting top-level documents: ", error);
        });
    }
  },
  created() {
    console.log('Dashboard created');
    this.getLatestActiveData();
  }
}
</script>