<template>

  <v-card>
    
    <div id="gen_info">
    <v-card-title>{{disaster.title}}</v-card-title>
    <v-card-subtitle>Lead School: De La Salle University - Manila</v-card-subtitle>
    <v-card-text>Disaster Type: {{disaster.type}}</v-card-text>
    <v-card-text>Location: {{disaster.location}}</v-card-text>
    <v-card-text>{{disaster.description}}</v-card-text>
    </div>

    <div id="stats">
    
    </div>
    
    <div id="call_for_donations">
    
    </div>

    <div id="photos">
    
    </div>

    <div id="graphs">
    
    </div>

  </v-card>
  
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
        remarks: null,
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
  
</style>