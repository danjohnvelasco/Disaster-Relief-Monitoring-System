<template>
    <v-card class="form">
        <v-card-title>Event Details</v-card-title>
        <v-card-text>
            <v-form
              ref="form"
            >
            <v-text-field
              outlined
              v-model="disaster.title"
              :rules="required_lettersOnly"
              label="Title"
            ></v-text-field>

            <v-text-field
              outlined
              v-model="disaster.type"
              :rules="required_lettersOnly"
              label="Disaster Type"
            ></v-text-field>

            <v-text-field
              outlined
              v-model="disaster.location"
              :rules="required"
              label="Location"
            ></v-text-field>

            <v-textarea
              outlined
              v-model="disaster.description"
              auto-grow
              rows="1"
              :rules="required"
              label="Description"
            ></v-textarea>

            <v-text-field
              outlined
              v-model="disaster.fam_affected"
              :rules="required_numbersOnly"
              label="Families Affected"  
              suffix="families affected"            
            ></v-text-field>

            <v-text-field
              outlined
              v-model="disaster.indiv_affected"
              :rules="required_numbersOnly"
              label="Individuals Affected" 
              suffix="individuals affected"             
            ></v-text-field>

            <v-textarea
              outlined
              v-model="disaster.remarks"
              auto-grow
              rows="4"
              label="Remarks (optional)"
            ></v-textarea>

            <v-subheader>Optional Data</v-subheader>

            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>Evacuation Center Data</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-text-field
                    outlined
                    v-model="disaster.evac_fam_inside"
                    :rules="numbersOnly"
                    label="Families Inside Evacuation Center"          
                    suffix="families inside"    
                  ></v-text-field>

                  <v-text-field
                    outlined
                    v-model="disaster.evac_indiv_inside"
                    :rules="numbersOnly"
                    label="Individuals Inside Evacuation Center"
                    suffix="individuals inside"              
                  ></v-text-field>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>Damage Level Data</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-text-field
                    outlined
                    v-model="disaster.damage_cost"
                    :rules="currency"
                    label="Monetary Value (damage cost)"  
                    prefix="₱"            
                  ></v-text-field>

                  <v-text-field
                    outlined
                    v-model="disaster.structures_damaged"
                    :rules="numbersOnly"
                    label="Structures damaged"
                    suffix="structures damaged"              
                  ></v-text-field>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>Call for Donations</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-radio-group v-model="disaster.donateOption" row>
                    <v-radio label="In-kind" value="in-kind"></v-radio>
                    <v-radio label="Cash" value="cash"></v-radio>
                    <v-radio label="Both" value="both"></v-radio>
                  </v-radio-group>

                  <div v-if="disaster.donateOption === 'in-kind' || disaster.donateOption === 'both'">
                    <v-subheader>In-kind Donations</v-subheader>
                    <v-row dense v-for="(relief, index) in disaster.reliefs" :key="index">
                      <v-col cols="4">
                        <v-text-field
                          outlined
                          v-model=disaster.reliefs[index].item          
                          label="Item"  
                        ></v-text-field>
                      </v-col>

                      <v-col cols="7">
                        <v-text-field
                          outlined
                          v-model=disaster.reliefs[index].spec            
                          label="Specifications" 
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row dense :align="'start'">
                      <v-col cols="4">
                        <v-text-field
                          outlined
                          v-model="item"  
                          hint="ex. water, canned goods, slippers"        
                          label="Item"    
                        ></v-text-field>
                      </v-col>

                      <v-col cols="7">
                        <v-text-field
                          outlined
                          v-model="spec"             
                          hint="ex. 5 liters, atleast 3 months expiration"
                          label="Specifications (Optional)"  
                        ></v-text-field>
                      </v-col>
     
                      <v-col cols="1" :align-self="'start'">
                        <div class="addButton">
                          <v-icon x-large @click="addItem">mdi-plus-circle</v-icon>
                        </div>
                      </v-col>
                    </v-row>
                    
                    <v-row dense>
                      <v-col cols="11"> 
                        <v-alert
                          outlined
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
                        <v-alert
                          outlined
                          dense
                          type="error"
                          v-if="add_item_feedback"
                        >
                          Please input item name.
                        </v-alert>
                      </v-col>
                    </v-row>
                  </div>

                  <div v-if="disaster.donateOption === 'cash' || disaster.donateOption === 'both'">
                    <v-subheader>Cash Donations</v-subheader>
                    <v-textarea
                      outlined
                      v-model="disaster.donation_details"
                      auto-grow
                      rows="4"
                      label="Donation Details"
                    ></v-textarea>
                    <v-subheader>OR</v-subheader>
                    <v-switch v-model="disaster.linkProfile" :label="'Link your profile'"></v-switch>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>

            <v-btn
                :disabled="!valid"
                color="success"
                class="mt-10"
                @click="validate"
            >
                Submit
            </v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      required_lettersOnly: [
        v => !!v || 'This field is required',
        v => /^[A-Za-z]+$/.test(v) || 'Must contain letters only'
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
      disaster: {
        title: null,
        type: null,
        location: null,
        description: null,
        fam_affected: null,
        indiv_affected: null,
        remarks: null,
        evac_fam_inside: null,
        evac_indiv_inside: null,
        damage_cost: null,
        structures_damaged: null,
        donateOption: null,
        donation_details: null,
        linkProfile: true,
        reliefs: []
      },
      item: null,
      spec: null,
      add_item_feedback: false,
    }),

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          console.log(this.disaster);
        }
      },
      addItem() {
        if(this.item) {
          this.disaster.reliefs.push({item: this.item, spec: this.spec});
          this.item = null;
          this.spec = null;
          this.add_item_feedback = false
          console.log(this.disaster.reliefs);
        } else {
          this.add_item_feedback = true
          console.log('Item field is empty.');
        }
      }
    },
  }
</script>

<style>
    .form {
      margin: 2em 8em;
    }

    .addButton {
      padding: 10px 0px;
    }
</style>