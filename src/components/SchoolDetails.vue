<template>
  <div class="details">
    <v-row>
      <v-col class="col-md-3 col-lg-3 mb-3">
        <v-container id="short_intro">
          <v-layout column align-center>
          <v-img :src="schools.img" height="270px" width="270px"> </v-img>
          </v-layout>
          <h1> Contact Us </h1>
          <h3>{{school.contactnum}}</h3>
          <h3>{{school.contactperson}}</h3>
          <h4>{{school.email}}</h4>
          <br> <br>
          <h3>{{school.webpage}} </h3>
          <br>
          <h5>{{school.address}} </h5>
        </v-container>
      </v-col>
      <v-col class="col-md-8 col-lg-8 mb-8">
        <v-container id="info">
          <h1 id="schoolname">{{school.name}}</h1>
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
        school: {},
        id: 'DLSU'
    }
  },
  
    created(){
    db.collection('schools')
      .doc(this.id)
  }
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