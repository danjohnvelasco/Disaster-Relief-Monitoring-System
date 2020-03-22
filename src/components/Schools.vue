<template>
  <div class="schools" align="center">
    <h1>List of Schools</h1>
  
    <v-container id="schoolcard">
      <v-layout row wrap>
        
        <v-flex sm8 md6 lg6 xl2 v-for="school in schools" :key="school.name">
          <v-hover>
            <template v-slot="{ hover }">
              
              <v-card max-width="520" max-height="400" :elevation="hover ? 24 : 2"
                      class="mx-auto pa-2" id="card">
                <v-img :src="school.img" height="200px"> </v-img>
                <v-card-title id="title"> {{school.name}} </v-card-title>
                <v-card-subtitle id="sub"> {{school.add}} </v-card-subtitle>

                <!-- FULL SCREEN -->                
                <!-- <v-card-actions> -->
                <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <template v-slot:activator="{ on }">
                <v-btn color=#184725 @click="toggleInfo"  dark v-on="on"> VISIT </v-btn>
                </template>      
                        <!-- <SchoolDetails v-if="dialog" @close="toggleInfo"></SchoolDetails> -->
              
                <!-- SCHOOL INFO   -->
                <v-card class="info">
                <v-row>
                <v-col class="col-md-2 col-lg-2 mb-2">
                        <v-container id="short_intro">
                        <v-layout column align-center>
                        <v-img :src="school.img" height="270px" width="270px"> </v-img>
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
                <v-col class="col-md-7 col-lg-7 mb-7">
                        <v-container id="info">
                        <h1 id="schoolname">{{school.name}}</h1>
                        <v-divider></v-divider>
                        <br> <br>
                        <p>
                        {{school.info}}
                        </p>
                        </v-container>
                </v-col>  
                </v-row>

    <v-card-actions>
       <v-btn @click="closeInfo"> Close </v-btn>
    </v-card-actions>
  </v-card>
                </v-dialog>
                <!-- </v-card-actions> -->

              </v-card>
           </template>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>
  </div>

</template>

<script>
// import SchoolDetails from '@/components/SchoolDetails'

  export default {
//   components: {
//     SchoolDetails
//   },
  data() {
    return {
      schools: [
        {name: 'De La Salle Andres Soriano Memorial College', add: 'Lutopan, Toledo City, Cebu',
                img:'https://images.squarespace-cdn.com/content/v1/51ac48dae4b04c1c5aacf799/1372235999068-GBR9ZR4XK74ZEE4XJJ49/ke17ZwdGBToddI8pDm48kL3VKmwKI3leYB51VJjLFB8UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcgK5SGg9Ovb1yloBBOHcruw_mYLfAhRzzgArFCB07Dw0L8n4JypuoE5Tg6Wg5Oyvs/DLSASMC.jpg?format=1500w',
                logo: 'https://images.squarespace-cdn.com/content/v1/5d09ea045609c00001987da2/1568341161488-G8SYQ6PG4WI0UCJ1T17W/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0topjEaZcWjtmMYdCWL4dkGbxs35J-ZjFa9s1e3LsxrX8g4qcOj2k2AL08mW_Htcgg/DLSASMC.png?format=300w',
                contactnum:'',
                contactperson:'',
                email:'',
                webpage:'',
                address:'',
                info:'',
                },
        {name: 'De La Salle Araneta University', add:'Malabon, Metro Manila',
                img:'https://www.pacu.org.ph/wordpress/wp-content/uploads/2017/05/De-La-Salle-University-Malabon-City.jpg',
                logo:'',
                contactnum:'',
                contactperson:'',
                email:'',
                webpage:'',
                address:'',
                info:'',
                },
        {name: 'De La Salle-College of Saint Benilde', add: 'Taft Ave, Metro Manila',
                img:'https://balitangviral.com/wp-content/uploads/2015/07/mark.space_.4goo.net_.jpg',
                logo:'',
                contactnum:'',
                contactperson:'',
                email:'',
                webpage:'',
                address:'',
                info:'',},
        {name: 'De La Salle John Bosco College', add:'Mangagoy, Bislig City, Surigao del Sur',
                img:'https://1.bp.blogspot.com/_vee8AfR9RzE/SGOdLegiQEI/AAAAAAAAAA8/RsQLb9TD9Qk/s320/800px-Dlsadmin2.jpg',
                logo:'',
                contactnum:'',
                contactperson:'',
                email:'',
                webpage:'',
                address:'',
                info:'',},
        {name: 'De La Salle Lipa', add: 'Lipa, Batangas',
                img:'https://www.finduniversity.ph/_resources/business/7702/dlsl-116.jpg',
                logo:'',
                contactnum:'',
                contactperson:'',
                email:'',
                webpage:'',
                address:'',
                info:'',},
        {name: 'De La Salle Medical and Health Sciences Institute', add:'Dasmariñas, Cavite',
                img:'https://www.fenceabroad.com/blogs/wp-content/uploads/2016/12/AKMRC1-469x312.jpg',
                logo:'',
                contactnum:'',
                contactperson:'',
                email:'',
                webpage:'',
                address:'',
                info:'',},
        {name: 'De La Salle University', add: 'Taft Ave, Metro Manila',
                img:'https://miro.medium.com/max/3840/1*s0F0i9hHCwc756pbaYCWrQ.png',
                logo:'',
                contactnum:'',
                contactperson:'',
                email:'',
                webpage:'',
                address:'',
                info:'',},
        {name: 'De La Salle University - Dasmariñas', add:'Dasmariñas, Cavite',
                img:'https://www.dlsud.edu.ph/facilities/assets/img/uls/1.png',
                logo:'',
                contactnum:'',
                contactperson:'',
                email:'',
                webpage:'',
                address:'',
                info:'',},
        {name: 'De La Salle Santiago Zobel School', add: 'Muntinlupa, Metro Manila',
                img:'https://photos.wikimapia.org/p/00/00/13/89/75_big.jpg',
                logo:'',
                contactnum:'',
                contactperson:'',
                email:'',
                webpage:'',
                address:'',
                info:'',},
        {name: 'La Salle Acedemy', add:'Iligan City, Lanao del Norte',
                img:'https://pbs.twimg.com/media/D0FSyluU0AAX4Pu.jpg',
                logo:'',
                contactnum:'',
                contactperson:'',
                email:'',
                webpage:'',
                address:'',
                info:'',},
        {name: 'La Salle College Antipolo', add: 'Antipolo City, Rizal',
                img:'https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/e35/68768771_484292805726089_761454849528390755_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=105&_nc_ohc=XjVPlJWuqmMAX87ZMkK&se=7&oh=aba88102a339fb9df8642e079e516671&oe=5ED88C41&ig_cache_key=MjExNjAwMzg4NTQ1MDUwMjAzOQ%3D%3D.2',
                logo:'',
                contactnum:'',
                contactperson:'',
                email:'',
                webpage:'',
                address:'',
                info:'',},
        {name: 'La Salle Green Hills', add:'Mandaluyong, Metro Manila',
                img:'https://primer.com.ph/study/wp-content/uploads/sites/8/2016/02/LaSalle_Featured.jpg',
                logo:'',
                contactnum:'',
                contactperson:'',
                email:'',
                webpage:'',
                address:'',
                info:'',},
        {name: 'La Salle University', add: 'Ozamiz City, Misamis Occidental',
                img:'https://lh3.ggpht.com/1zzFnXlIH2A3lukS0pG3o6EruOxD99FnR9hdgP4tzXDp6MLVraWdwoccQJ1RbRhZm_1TKJsRn-2yFfOcNsqM',
                logo:'',
                contactnum:'',
                contactperson:'',
                email:'',
                webpage:'',
                address:'',
                info:'',},
        {name: 'St. Josephs School-La Salle', add:'Bacolod City, Negros Occidental',
                img:'https://miro.medium.com/max/3840/1*s0F0i9hHCwc756pbaYCWrQ.png',
                logo:'',
                contactnum:'',
                contactperson:'',
                email:'',
                webpage:'',
                address:'',
                info:'',},
        {name: 'St. Jaime Hilario School - De La Salle Bataan', add: 'Bagac, Bataan',
                img:'https://miro.medium.com/max/3840/1*s0F0i9hHCwc756pbaYCWrQ.png',
                logo:'',
                contactnum:'',
                contactperson:'',
                email:'',
                webpage:'',
                address:'',
                info:'',},
        {name: 'University of St. La Salle', add:'Bacolod, Negros Occidental',
                img:'https://miro.medium.com/max/3840/1*s0F0i9hHCwc756pbaYCWrQ.png',
                logo:'',
                contactnum:'',
                contactperson:'',
                email:'',
                webpage:'',
                address:'',
                info:'',},
      ]
    }
  },

   methods: {
    toggleInfo() {
      this.dialog = !this.dialog;
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
        border-radius:20px;
        margin: 10px;
}

h1{
  text-align: center;
}

#schoolname{
  text-align: left;
}
</style>