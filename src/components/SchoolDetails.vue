<template>
  <div class="details">
    <v-row>
      <v-col class="col-md-3 col-lg-3 mb-3">
        <v-container id="short_intro">
          <v-layout column align-center>
          <v-img src='https://images.squarespace-cdn.com/content/v1/5d09ea045609c00001987da2/1568341174374-EBXXVUEBLAPNEBIEITL2/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0topjEaZcWjtmMYdCWL4dkGbxs35J-ZjFa9s1e3LsxrX8g4qcOj2k2AL08mW_Htcgg/DLSAU.png?format=300w' height="270px" width="270px"> </v-img>
          </v-layout>
          <h1> Contact Us </h1>
          <h3> {{schools.contactnum}} </h3>
          <h3> {{schools.contactperson}} </h3>
          <h4> {{schools.email}} </h4>
          <br> <br>
          <h3> {{schools.webpage}} </h3>
          <br>
          <h5> {{schools.address}} </h5>
        </v-container>
      </v-col>
      <v-col class="col-md-8 col-lg-8 mb-8">
        <v-container id="info">
          <h1 id="schoolname"> {{schools.name}} </h1>
          <v-divider></v-divider>
          <br> <br>
          <p>
            yes bro
          </p>
        </v-container>
      </v-col>  
    </v-row>
  </div>
</template>

<script>
import {db} from '@/firebase/init'

export default {
    data(){
      return{
        schools: {},
        id: 'DLSU'
        }
  },
}

</script>

<style scoped>
/* #logo{
  background-position: center;
} */

h1{
  text-align: center;
}

#schoolname{
  text-align: left;
}
</style>