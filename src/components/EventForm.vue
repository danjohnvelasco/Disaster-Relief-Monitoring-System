<template>
    <v-card class="form">
      <v-alert type="success" v-if="form_status === 'success'">Submit successful! Reloading page...</v-alert>
      <v-card-title>
        Event Details
        <v-spacer></v-spacer>
        <v-btn icon color="#427f50" @click="closeForm" :disabled="form_status !== 'fillup'">
              <v-icon large>mdi-close</v-icon>
        </v-btn>
        <v-progress-linear
          v-if="form_status === 'submitting'"
          :height='6'
          rounded
          indeterminate
          color="green"
        ></v-progress-linear>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <!--Required data fields starts here-->
          <v-subheader>General Information</v-subheader>
          <v-text-field
            outlined
            color="#427f50"
            v-model="disaster.title"
            :rules="required"
            hint="e.g. Typhoon Maria Relief Operation"
            label="Title"
          ></v-text-field>
          <v-text-field
            outlined
            color="#427f50"
            v-model="disaster.type"
            :rules="required_lettersOnly"
            hint="e.g. Typhoon, Fire"
            label="Disaster Type"
          ></v-text-field>
          <v-text-field
            outlined
            color="#427f50"
            v-model="disaster.location"
            :rules="required"
            hint="CALABARZON area, Tondo area"
            label="Location"
          ></v-text-field>
          <v-textarea
            outlined
            color="#427f50"
            v-model="disaster.description"
            auto-grow
            rows="1"
            :rules="required"
            hint="e.g. Families in the CALABARZON area, specifically Cavite were affected by Typhoon Maria. The relief operations aim to provide assistance to families in Cavite."
            label="Description"
          ></v-textarea>
          <v-textarea
            outlined
            color="#427f50"
            v-model="disaster.remarks"
            auto-grow
            rows="4"
            label="Remarks (optional)"
          ></v-textarea>
          <v-row>
            <v-col>
              <v-subheader>National/Local Statistics</v-subheader>
              <v-text-field
                outlined
                color="#427f50"
                v-model="disaster.general_fam_affected"
                :rules="required_numbersOnly"
                label="Number of Families Affected"  
                suffix="families"            
              ></v-text-field>
              <v-text-field
                outlined
                color="#427f50"
                v-model="disaster.general_indiv_affected"
                :rules="required_numbersOnly"
                label="Number of Individuals Affected" 
                suffix="individuals"             
              ></v-text-field>
            </v-col>
            <v-col>
              <v-subheader>Beneficiaries Statistics</v-subheader>
              <v-text-field
                outlined
                color="#427f50"
                v-model="disaster.beneficiary_fam_affected"
                label="Number of Beneficiary Families (optional)"  
                suffix="families"            
              ></v-text-field>
              <v-text-field
                outlined
                color="#427f50"
                v-model="disaster.beneficiary_indiv_affected"
                label="Number of Beneficiary Individuals (optional)" 
                suffix="individuals"             
              ></v-text-field>
            </v-col>
          </v-row>
          <v-subheader>Upload Photos</v-subheader>
          <!-- Upload field -->
          <v-file-input v-model="files" prepend-icon="mdi-camera" chips multiple outlined color="#427f50" label="Click to upload one or more photos (optional)"></v-file-input>
          <!--Optional data fields starts here-->
          <v-subheader>Optional Data</v-subheader>
          <v-expansion-panels :multiple="true" :hover="true">
            <v-expansion-panel> <!--Group 1-->
              <v-expansion-panel-header>Evacuation Center Data (optional)</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-text-field
                  outlined
                  color="#427f50"
                  v-model="disaster.evac_fam_inside"
                  :rules="numbersOnly"
                  label="Number of Families Inside Evacuation Center"          
                  suffix="families inside"    
                ></v-text-field>
                <v-text-field
                  outlined
                  color="#427f50"
                  v-model="disaster.evac_indiv_inside"
                  :rules="numbersOnly"
                  label="Number of Individuals Inside Evacuation Center"
                  suffix="individuals inside"              
                ></v-text-field>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel> <!--Group 2-->
              <v-expansion-panel-header>Damage Level Data (optional)</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-text-field
                  outlined
                  color="#427f50"
                  v-model="disaster.damage_cost"
                  :rules="currency"
                  hint="e.g. 330000 or 330,000 or 330,000.15 or 3300.01"
                  persistent-hint
                  label="Estimated Damage Cost"  
                  prefix="₱"            
                ></v-text-field>
                <v-textarea
                  outlined
                  color="#427f50"
                  v-model="disaster.damage_cost_additional_details"
                  auto-grow
                  rows="4"
                  label="Additional details"
                ></v-textarea>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel> <!--Group 3-->
              <v-expansion-panel-header>Call for Donations Data (optional)</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row no-gutters :align="'center'">
                  <v-col :cols='1'>
                    <label>Options: </label>
                  </v-col>
                  <v-col :cols='1'>
                    <v-checkbox label="Cash" v-model="disaster.is_cash"></v-checkbox>
                  </v-col>
                  <v-col :cols='1'>
                    <v-checkbox label="In-kind" v-model="disaster.is_inkind"></v-checkbox>
                  </v-col> 
                </v-row>
                <!-- Cash Donation Form -->
                <div v-if="disaster.is_cash">
                  <v-divider></v-divider>
                  <v-subheader>Cash Donations</v-subheader>
                  <v-textarea
                    outlined
                    color="#427f50"
                    v-model="disaster.donation_details"
                    :rules="required"
                    auto-grow
                    rows="4"
                    label="Donation Details"
                  ></v-textarea>
                </div>
                <!-- In-kind Donation Form -->
                <div v-if="disaster.is_inkind">
                  <v-divider></v-divider>
                  <v-subheader>In-kind Donations</v-subheader>
                  <v-row dense v-for="(relief, index) in disaster.reliefs" :key="index">
                    <v-col cols="4">
                      <v-text-field
                        outlined
                        color="#427f50"
                        v-model=disaster.reliefs[index].item          
                        label="Item"  
                      ></v-text-field>
                    </v-col>
                    <v-col cols="7">
                      <v-text-field
                        outlined
                        color="#427f50"
                        v-model=disaster.reliefs[index].spec            
                        label="Specifications" 
                      ></v-text-field>
                    </v-col>
                    <v-col cols="1" :align-self="'start'">
                      <div class="listButton">
                        <v-icon x-large @click="deleteItem(index)">mdi-delete</v-icon>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col cols="4">
                      <v-text-field
                        outlined
                        color="#427f50"
                        v-model="item"  
                        hint="e.g. water, canned goods, slippers"   
                        persistent-hint 
                        :rules="forgotToAddItem"
                        label="Item"    
                      ></v-text-field>
                    </v-col>
                    <v-col cols="7">
                      <v-text-field
                        outlined
                        color="#427f50"
                        v-model="spec"             
                        hint="e.g. 5 liters, for adults/kids"
                        persistent-hint
                        label="Specifications (Optional)"  
                      ></v-text-field>
                    </v-col>
                    <v-col cols="1" :align-self="'start'">
                      <div class="listButton">
                        <v-icon x-large @click="addItem">mdi-plus-circle</v-icon>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col cols="11">
                      <v-alert
                        outlined
                        color="#427f50"
                        dense
                        type="error"
                        v-if="add_item_feedback"
                      >
                        Please input item name.
                      </v-alert>
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col cols="11"> 
                      <v-alert
                        outlined
                        color="#427f50"
                        dense
                        dismissible
                        type="info"
                        text
                      >
                        You must press the '+' button to add an item.
                      </v-alert>
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col cols="11">
                      <v-textarea
                        outlined
                        color="#427f50"
                        v-model="disaster.in_kind_general_specs"
                        auto-grow
                        rows="4"
                        hint="e.g. at least 5 months before expiration"
                        persistent-hint
                        label="General Specifications (optional)"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col cols="11">
                      <v-textarea
                        outlined
                        color="#427f50"
                        v-model="disaster.in_kind_dropoff_instructions"
                        auto-grow
                        rows="4"
                        hint="e.g. You may drop your donations to the following address: Center for Social Concern and Action Office 2nd Floor Br. Gabriel Connon Hall De La Salle University 2401 Taft Avenue, Manila"
                        persistent-hint
                        :rules="required"
                        label="Donation Instructions"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel> <!--Group 4-->
              <v-expansion-panel-header>Donations Received Data (optional)</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-text-field
                  outlined
                  color="#427f50"
                  v-model="disaster.total_cash_donations_received"
                  :rules="currency"
                  hint="e.g. 330000 or 330,000 or 330,000.15 or 3300.01"
                  label="Total Cash Donations"  
                  prefix="₱"            
                ></v-text-field>
                <v-text-field
                  outlined
                  color="#427f50"
                  v-model="disaster.total_relief_packs_distributed"
                  :rules="numbersOnly"
                  persistent-hint
                  label="Total Number of Relief Packs Distributed"    
                  suffix="relief packs distributed"       
                ></v-text-field>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn 
          @click="createDisasterEvent"
          v-if="editing === false"
          :disabled="form_status !== 'fillup'"
          class="white--text"
          color="#184725"
        > 
          Submit 
        </v-btn>
        <v-btn 
          @click="update"
          v-if="editing === true"
          :disabled="form_status !== 'fillup'"
          class="white--text"
          color="#184725"
        > 
          Update
        </v-btn>
        <!-- Emits an event back to parent component -->
        <v-btn 
          @click="closeForm"
          :disabled="form_status !== 'fillup'"
        > 
          Close 
        </v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
import {db, storage} from '@/firebase/init'
import firebase from 'firebase/app'
export default {
  props: { // can be changed by parent component
    populateWith: {
      type: Object,
      default: () => {
        return {};
      }
    },
    editing: { 
      type: Boolean,
      default: false
    },
    doc_id: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    files: null,
    valid: true,
    required_lettersOnly: [
      v => !!v || 'This field is required',
      v => /^\w+(\s\w+)*$/.test(v) || 'Alphanumeric only. Please remove trailing spaces'
    ],
    required_numbersOnly: [
      v => !!v || 'This field is required',
      v => /^[0-9]*$/.test(v) || 'Must contain numbers only'
    ],
    required: [
      v => !!v || 'This field is required'
    ],
    numbersOnly: [
      v => /^(null|$|[0-9]*)$/.test(v) || 'Must contain numbers only'
    ],
    currency: [
      v => /^(null|$|\d+(,\d{3})*(\.\d*)?)$/.test(v) || 'Invalid format'
    ],
    forgotToAddItem: [
      v => !v || 'You forgot to add this item. Please click add button on the right. If you don\'t wish to add this item, please leave this field blank.'
    ],
    disaster: { // Don't include data the the user doesn't directly manipulates.
      title: null,
      type: null,
      location: null,
      description: null, 
      remarks: null,
      donate_option: null,
      is_inkind: false,
      is_cash: false,
      donation_details: null,
      link_profile: true,
      reliefs: [],
      general_fam_affected: null,
      general_indiv_affected: null,
      evac_fam_inside: null,
      evac_indiv_inside: null,
      damage_cost: null,
      damage_cost_additional_details: null,
      in_kind_dropoff_instructions: null,
      in_kind_general_specs: null,
      img_URLs: [],
      beneficiary_fam_affected: null,
      beneficiary_indiv_affected: null,
      total_cash_donations_received: null,
      total_relief_packs_distributed: null
    },
    item: null,
    spec: null,
    add_item_feedback: false,
    form_status: 'fillup' // form_status_options: ['fillup', 'submitting', 'success', 'fail]
  }),
  methods: {
    changeFormStatus(status) {
      this.form_status = status;
    },
    addDocToHistorySubcollection (parentDoc) {
      // Create subcollection and create document inside parentDoc
      parentDoc.collection("history").add(this.disaster)
      .then(() => {
        // success & reload
        this.changeFormStatus('success');
        this.reloadPage();
      }).catch((error) => {
        throw error;
      });
    },
    createDisasterEvent () {
      if (this.$refs.form.validate()) {
        // Change form status to reflect progress bar
        this.changeFormStatus('submitting');
        // Create doc with auto-id
        var parentDoc = db.collection("disasters2").doc();
        var timestamp = firebase.firestore.FieldValue.serverTimestamp();
        this.disaster.created_at = timestamp; // add date from timestamp
        // Add top level data
        parentDoc.set({
          title: this.disaster.title,
          type: this.disaster.type,
          last_updated: timestamp,
          archived: false
        }).then(() => {
          // Upload images (if any)
          if (this.files !== null) {
            return this.uploadImages(parentDoc.id); 
          } 
        }).then(() => {
          this.addDocToHistorySubcollection(parentDoc);
        })
        .catch(function(error) {
          throw error;
        }); 
      }
    },
    update() {
      if (this.$refs.form.validate()) {
        // Change form status to reflect progress bar
        this.changeFormStatus('submitting');
        // Create doc with auto-id
        var parentDoc = db.collection("disasters2").doc(this.doc_id);
        var timestamp = firebase.firestore.FieldValue.serverTimestamp();
        this.disaster.created_at = timestamp; // add date from timestamp
        parentDoc.set({
          title: this.disaster.title,
          type: this.disaster.type,
          last_updated: timestamp,
          archived: false
        }).then(() => {
          // Upload images (this might not be the best UX decision)
          if (this.files !== null) {
            return this.uploadImages(parentDoc.id); 
          } 
        }).then(() => {
          this.addDocToHistorySubcollection(parentDoc);
        })
        .catch((error) => {
          throw error;
        });
      }
    },
    addItem() {
      if (this.item) {
        // Add items to array
        this.disaster.reliefs.push({item: this.item, spec: this.spec});
        // Reset variables
        this.item = null;
        this.spec = null;
        // Remove item feedback
        this.add_item_feedback = false;
      } else {
        // Show item feedback
        this.add_item_feedback = true;
        throw "Item list is empty.";
      }
    },
    deleteItem(item_index) {
      if (item_index !== null) {
        this.disaster.reliefs.splice(item_index, 1);
      } else {
        throw "Error deleting item";
      }
    },
    closeForm() { // emits close event to parent component
      this.$emit('close');
    },
    reloadPage() {
      window.location.reload()
    },
    saveImageName(file_name) { 
      this.disaster.img_URLs.push(file_name);
    },
    putImage(doc_id, file) { // PUT one image to db
      // Create storage ref
      var storageRef = storage.ref(`${doc_id}/${file.name}`); 
      // Upload file, return a promise
      return storageRef.put(file)
      .then(() => {
        this.saveImageName(file.name); // save img name 
      })
      .catch((error) => {
        throw "One image upload failed " + error;
      });
    },
    uploadImages(doc_id) {
      // Convert object to array
      var files = Object.values(this.files);
      return Promise.all(
        // Array of "Promises"
        files.map(file => this.putImage(doc_id, file))
      )
      .then(() => {
         // Reset files
        this.files = null;
      })
      .catch((error) => {
        throw "Some uploads failed" + error; 
      });
    }
  },
  created() { // receives the data (if it exists) from parent component --only applies to editing
    if (Object.keys(this.populateWith).length !== 0) {
      // Don't use 'this.disaster = this.populateWith;' because it references to the obj from parent. Use Object.assign instead.
      Object.assign(this.disaster, this.populateWith); 
    } else {
      throw "populateWith is empty";
    }
  }
}
</script>

<style scoped>
.listButton {
  padding: 10px 0px;
}
</style>