<template>
    <v-card class="body" id="body">
      <v-toolbar id="toolbar">               
        <v-btn  @click="closeInfo()" id="close"> CLOSE </v-btn>
        </v-toolbar>
          
          <v-row>
            <v-col align="center" class="col-md-4 col-lg-4 mb-4">
              <v-container id="short_intro">
                <v-layout column align-center>
                  <v-img :src="school.logo" height="230px" width="230px"> </v-img>
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
            <v-col class="col-md-6 col-lg-6 mb-6">
              <v-container id="info">
                <h1 id="schoolname">{{school.name}}</h1>
                <v-divider></v-divider>
                <br> <br>
            
                <h2> Contact Details </h2> <br>
                  <p>
                  {{school.info}}
                  </p>
              </v-container>
            </v-col>  
          </v-row>

    </v-card>
</template>

<script>
  export default {
    props:{
      schools: Array
    },
    methods:{
      closeInfo(){
        this.$emit('close');
      }
    }
  }
</script>

<style scoped>
h1{
        text-align: center;
        font-family: Garamond;
        color: #184725;
        padding: 20px 0 20px 0;
}

h2{
        text-align: left;
        font-family: Garamond;
        color: #184725;
}

#title{
        text-align: left;
        font-family: Roboto;
        font-size: 20px;
}
#sub{
        text-align: left;
        font-family: Roboto;
        font-size: 15px;
}

#card{
        border-radius:12px;
        margin: 10px;
}

h1{
  text-align: center;
}

#schoolname{
  text-align: left;
}

#toolbar{
  background-color:#427f50;
}

#info, #body{
  background-color:#f2f5eb;
}
</style>