<template>
  <v-app>
    <v-row>
      <v-col class="col-md-3 col-lg-3 mb-3">
        <EventList :activeTopLevelDocs="activeTopLevelDocs" :archivedTopLevelDocs="archivedTopLevelDocs" @displayEvent="displayEvent"></EventList>
      </v-col>
      <v-col class="col-md-9 col-lg-9 mb-9" id="disaster-event" v-show="showEventViewer">
        <EventViewer :latestDisasterDocs="latestDisasterDocs" :doc_id="doc_id"></EventViewer>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import EventList from '@/components/EventList'
import EventViewer from '@/components/EventViewer'
import {db} from '@/firebase/init'

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
      archivedTopLevelDocs: [],
      latestDisasterDocs: {},
      showEventViewer: false
    }
  },
  methods: {
    displayEvent: function (payloadDocId) { 
      this.doc_id = payloadDocId;
      this.showEventViewer = true;
    },
    timestampToDate: function (timestamp) {
      var date = timestamp.toDate()
      var newdate = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
      return newdate
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
    },
    getLatestArchivedData: function() {
      db.collection("disasters2")
        .where("archived", "==", true) // change to active later
        .orderBy('last_updated', 'desc')
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            // retrieve top level doc
            var topLevelDoc = doc.data();
            topLevelDoc.id = doc.id;
            topLevelDoc.last_updated = this.timestampToDate(topLevelDoc.last_updated);
            this.archivedTopLevelDocs.push(topLevelDoc);
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
    this.getLatestArchivedData();
  }
}
</script>

<style scoped>
#disaster-event{
  padding-top: 0;
}
</style>

