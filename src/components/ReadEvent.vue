<template>
  <v-app>
    <v-content class="ml-2">

      <v-container id="gen_info">
        <h1 class="display-2 pb-0">{{disaster.title}}</h1>
        <h3 class="subtitle-2 grey--text mb-3 ml-1">Last Updated: 00/00/0000</h3>
        <h2 class="headline mb-2">General Information</h2>
        <v-card>
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

      <v-container id="stats" class="pb-5">
        
          <h2 class="headline ">Statistics Overview</h2>

          <v-row wrap class="mx-8">

            <v-col cols="6" align="center">
              <v-card class="  text-center" width='280'>
                <v-icon size='70' class='mt-3'>mdi-account</v-icon>
                <v-card-text class="display-2 font-weight-bold">{{disaster.indiv_affected}}</v-card-text>
                <v-card-text class="title pt-0">Individuals Affected</v-card-text>
              </v-card>
            </v-col>

            <v-col cols="6" align="center">
              <v-card class="text-center" width="280">
                <v-icon size='70' class='mt-3'>mdi-account-group</v-icon>
                <v-card-text class="display-2 font-weight-bold">{{disaster.fam_affected}}</v-card-text>
                <v-card-text class="title pt-0">Families Affected</v-card-text>
              </v-card>
            </v-col>

            <v-col cols="6" align="center" v-if="disaster.evac_indiv_inside != null">
              <v-card class="text-center" width="280">
                <v-icon size='70' class='mt-3'>mdi-home-variant</v-icon>
                <v-card-text class="display-2 font-weight-bold">{{disaster.evac_indiv_inside}}</v-card-text>
                <v-card-text class="title pt-0">Individuals in Evac Centers</v-card-text>
              </v-card>
            </v-col>

            <v-col cols="6" align="center" v-if="disaster.evac_fam_inside != null">
              <v-card class="text-center" width="280">
                <v-icon size='70' class='mt-3'>mdi-home-group</v-icon>
                <v-card-text class="display-2 font-weight-bold">{{disaster.evac_fam_inside}}</v-card-text>
                <v-card-text class="title pt-0">Families In Evac Centers</v-card-text>
              </v-card>
            </v-col>

            <v-col cols="6" align="center" v-if="disaster.damage_cost != null">
              <v-card class="text-center" width="280">
                <v-icon size='70' class='mt-3'>mdi-cash</v-icon>
                <v-card-text class="display-2 font-weight-bold">{{disaster.damage_cost}}</v-card-text>
                <v-card-text class="title pt-0">Damage Cost (PHP)</v-card-text>
              </v-card>
            </v-col>

            <v-col cols="6" align="center" v-if="disaster.structures_damaged != null">
              <v-card class="text-center" width="280">
                <v-icon size='70' class='mt-3'>mdi-domain</v-icon>
                <v-card-text class="display-2 font-weight-bold">{{disaster.structures_damaged}}</v-card-text>
                <v-card-text class="title pt-0">Structures Damaged</v-card-text>
              </v-card>
            </v-col>
          </v-row>

        
      </v-container>


      <v-container id="call_for_donations">
        <h2 class="headline">Call for Donations</h2>
       <!--
        <v-row wrap class="ml-4 mr-4">

          <v-col cols="12" align="center">
            <v-card class="text-center" width='600'>
            <v-card-text class="title pt-0">Cash:</v-card-text>
            <v-card-text align="left" width="400"><pre>{{disaster.donation_details}}</pre></v-card-text>
              
            </v-card>
          </v-col>

        </v-row>

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
        -->

      
      </v-container>

      <v-container id="gallery">

        <h2 class="headline">Gallery</h2>
          <v-container class='pl-5 pr-5 pb-5'>
            <v-carousel
              cycle
              height="400"
              hide-delimiter-background
              show-arrows-on-hover
            >
              <v-carousel-item
                v-for="(slide, i) in slides"
                :key="i"
              >
                <v-sheet
                  :color="colors[i]"
                  height="100%"
                >
                  <v-row
                    class="fill-height"
                    align="center"
                    justify="center"
                  >
                    <div class="display-3">{{ slide }} Slide</div>
                  </v-row>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
          </v-container>
      
      </v-container>

      <v-container id="graphs">

        <h2 class="headline">Historical Graphs</h2>

      
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
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ]
      
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