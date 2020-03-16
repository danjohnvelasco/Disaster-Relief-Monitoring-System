<template>

  <v-app>

    <v-content>

      <v-container id="gen_info">
        <h1 class="display-3 text-center">{{disaster.title}}</h1>
        <v-card>
          <v-card-title>General Information</v-card-title>
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


        <v-card>
        <v-card-title>Statistics</v-card-title>
        
        </v-card>

        <v-col>
          <v-row
          :align="center"
          justify="center"
          style="height: 200px;">
          
            <v-card class="stats_cards">
              <v-card-title>Individuals Affected</v-card-title>
              <v-card-text>1756</v-card-text>
            </v-card>

            <v-card class="stats_cards">
              <v-card-title>Families Affected</v-card-title>
              <v-card-text>1756</v-card-text>
            </v-card>
          </v-row>
      
        </v-col>

      </v-container>


      <v-container id="call_for_donations">
      
      </v-container>

      <v-container id="photos">
      
      </v-container>

      <v-container id="graphs">
      
      </v-container>
    
    </v-content>

  </v-app>
  
</template>

<script>
export default {
  data(){
    return{
      disaster: {
        title: 'Leveriza Fire',
        type: 'Fire',
        location: 'Leveriza St, Malate, Manila, 1004 Metro Manila',
        description: 'I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta who moved my cheese babybel boursin.',
        fam_affected: null,
        indiv_affected: null,
        remarks: 'This is the remarks of the disaster',
        evac_fam_inside: null,
        evac_indiv_inside: null,
        damage_cost: null,
        structures_damaged: null,
        donateOption: null,
        donation_details: null,
        linkProfile: true,
        reliefs: []
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