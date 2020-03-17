<template>
  <v-app>
    <v-content>

      <v-container id="gen_info">
        <h1 class="display-3 text-center">{{disaster.title}}</h1>
        <v-card>
          <v-card-text class="display-1 text-center">General Information</v-card-text>
          <table>
            <tr>
              <td class="text-right label">Lead School:</td> <td>De La Salle University - Manila</td>
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
            <tr>
              <td class="text-right label">Additional Remarks:</td> <td>{{disaster.remarks}}</td>
            </tr>
          </table>
        </v-card>
      </v-container>

      <v-container id="stats">
        <v-card class="pb-5">
          <v-card-text class="display-1 text-center">Statistics</v-card-text>

          <v-row wrap class="ml-4 mr-4">

            <v-col cols="6" align="center">
              <v-card class="text-center" width='350'>
                <v-icon size='70' class='mt-3'>{{icons.mdiAccount}}</v-icon>
                <v-card-text class="headline">Individuals Affected</v-card-text>
                <v-card-text class="display-1">{{disaster.indiv_affected}}</v-card-text>
              </v-card>
            </v-col>

            <v-col cols="6" align="center">
              <v-card class="text-center" width="350">
                <v-icon size='70' class='mt-3'>{{icons.mdiAccountGroup}}</v-icon>
                <v-card-text class="headline">Families Affected</v-card-text>
                <v-card-text class="display-1">{{disaster.fam_affected}}</v-card-text>
              </v-card>
            </v-col>

            <v-col cols="6" align="center" v-if="disaster.evac_indiv_inside != null">
              <v-card class="text-center" width="350">
                <v-icon size='70' class='mt-3'>{{icons.mdiHomeVariant}}</v-icon>
                <v-card-text class="headline">Individuals in Evac Centers</v-card-text>
                <v-card-text class="display-1">{{disaster.evac_indiv_inside}}</v-card-text>
              </v-card>
            </v-col>

            <v-col cols="6" align="center" v-if="disaster.evac_fam_inside != null">
              <v-card class="text-center" width="350">
                <v-icon size='70' class='mt-3'>{{icons.mdiHomeGroup}}</v-icon>
                <v-card-text class="headline">Families In Evac Centers</v-card-text>
                <v-card-text class="display-1">{{disaster.evac_fam_inside}}</v-card-text>
              </v-card>
            </v-col>

            <v-col cols="6" align="center" v-if="disaster.damage_cost != null">
              <v-card class="text-center" width="350">
                <v-icon size='70' class='mt-3'>{{icons.mdiCash}}</v-icon>
                <v-card-text class="headline">Damage Cost</v-card-text>
                <v-card-text class="display-1">Php {{disaster.damage_cost}}</v-card-text>
              </v-card>
            </v-col>

            <v-col cols="6" align="center" v-if="disaster.structures_damaged != null">
              <v-card class="text-center" width="350">
                <v-icon size='70' class='mt-3'>{{icons.mdiDomain}}</v-icon>
                <v-card-text class="headline">Structures Damaged</v-card-text>
                <v-card-text class="display-1">{{disaster.structures_damaged}}</v-card-text>
              </v-card>
            </v-col>
          </v-row>

        </v-card>
      </v-container>


      <v-container id="call_for_donations">

        <v-card align="center">
          <v-card-text class="display-1 text-center">Call for Donations</v-card-text>


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
        
        </v-card>
      
      </v-container>

      <v-container id="gallery">

        <v-card>
          <v-card-text class="display-1 text-center">Gallery</v-card-text>
        
        </v-card>
      
      </v-container>

      <v-container id="graphs">

        <v-card>
          <v-card-text class="display-1 text-center">Historical Graphs</v-card-text>

        
        </v-card>
      
      </v-container>
    
    </v-content>
  </v-app>
</template>

<script>
// icons
import { 
  mdiAccount, mdiAccountGroup, mdiCash, mdiDomain, mdiHomeVariant, mdiHomeGroup
  } from '@mdi/js'


export default {
  data(){
    return{
      disaster: {
        title: 'Leveriza Fire',
        type: 'Fire',
        location: 'Leveriza St, Malate, Manila, 1004 Metro Manila',
        description: 'I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta who moved my cheese babybel boursin.',
        fam_affected: 100,
        indiv_affected: 1777,
        remarks: 'This is the remarks of the disaster',
        evac_fam_inside: 111,
        evac_indiv_inside: 222,
        damage_cost: 123123,
        structures_damaged: 112233,
        donateOption: 'both', // in-kind, cash, both
        donation_details: "UNICEF South Africa:\nBank Name: Nedbank\nAccount Number: 1497216230\nBranch Code: 160445\nBranch Name: Nedbank Pretoria Corporate\nSwift Code: NEDSZAJJ",
        linkProfile: true,
        reliefs: []
      },
      icons: {
        mdiAccount,
        mdiAccountGroup,
        mdiCash,
        mdiDomain,
        mdiHomeVariant,
        mdiHomeGroup
      }
      
      // disaster: {
      //   title: null,
      //   type: null,
      //   location: null,
      //   description: null,
      //   fam_affected: null,
      //   indiv_affected: null,
      //   remarks: null,
      //   evac_fam_inside: null,
      //   evac_indiv_inside: null,
      //   damage_cost: null,
      //   structures_damaged: null,
      //   donateOption: null,
      //   donation_details: null,
      //   linkProfile: true,
      //   reliefs: []
      // }
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

</style>