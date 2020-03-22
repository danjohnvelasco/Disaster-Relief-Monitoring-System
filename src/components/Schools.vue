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
                <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" id="info">
                <template v-slot:activator="{ on }">
                <v-btn color=#184725 @click="toggleInfo"  dark v-on="on"> VISIT </v-btn>
                </template>      
                        <!-- <SchoolDetails v-if="dialog" @close="toggleInfo"></SchoolDetails> -->
              
                <!-- SCHOOL INFO   -->
                <v-card class="body" id="body">
                <v-toolbar id="toolbar">
                <!-- <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
                </v-btn> -->

                <v-btn @click="closeForm"> Close </v-btn>
                
                </v-toolbar>

                <v-row>
                <v-col align="center" class="col-md-4 col-lg-4 mb-4">
                        <v-container id="short_intro">
                        <v-layout column align-center>
                        <v-img :src="school.logo" height="270px" width="27 0px"> </v-img>
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

    <!-- <v-card-actions>
       <v-btn @click="closeInfo"> Close </v-btn>
    </v-card-actions> -->
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
      dialog: false,
      schools: [
        {name: 'De La Salle Andres Soriano Memorial College', add: 'Toledo City, Cebu',
                img:'https://images.squarespace-cdn.com/content/v1/51ac48dae4b04c1c5aacf799/1372235999068-GBR9ZR4XK74ZEE4XJJ49/ke17ZwdGBToddI8pDm48kL3VKmwKI3leYB51VJjLFB8UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcgK5SGg9Ovb1yloBBOHcruw_mYLfAhRzzgArFCB07Dw0L8n4JypuoE5Tg6Wg5Oyvs/DLSASMC.jpg?format=1500w',
                logo: 'https://images.squarespace-cdn.com/content/v1/5d09ea045609c00001987da2/1568341161488-G8SYQ6PG4WI0UCJ1T17W/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0topjEaZcWjtmMYdCWL4dkGbxs35J-ZjFa9s1e3LsxrX8g4qcOj2k2AL08mW_Htcgg/DLSASMC.png?format=300w',
                contactnum:'204-516-6296',
                contactperson:'Mr. Holmes Billany',
                email:'dlsasmc@dlsu.edu.ph',
                webpage:'www.dlsasmc.edu.ph',
                address:'Lutopan, Toledo City, Cebu',
                info:'dito mapupunta pera niyo bezzie',
                },
        {name: 'De La Salle Araneta University', add:'Malabon, Metro Manila',
                img:'https://www.pacu.org.ph/wordpress/wp-content/uploads/2017/05/De-La-Salle-University-Malabon-City.jpg',
                logo:'https://images.squarespace-cdn.com/content/v1/5d09ea045609c00001987da2/1568341174374-EBXXVUEBLAPNEBIEITL2/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0topjEaZcWjtmMYdCWL4dkGbxs35J-ZjFa9s1e3LsxrX8g4qcOj2k2AL08mW_Htcgg/DLSAU.png?format=300w',
                contactnum:'749-165-1532',
                contactperson:'Ms. Dorolice Gerger',
                email:'dlsau@dlsu.edu.ph',
                webpage:'dlsau.edu.ph/',
                address:'Salvador Araneta Campus, 303 Victoneta Ave, Potrero, Malabon, 1475 Metro Manila',
                info:'poTPot',
                },
        {name: 'De La Salle-College of Saint Benilde', add: 'Taft Ave, Metro Manila',
                img:'https://balitangviral.com/wp-content/uploads/2015/07/mark.space_.4goo.net_.jpg',
                logo:'https://images.squarespace-cdn.com/content/v1/5d09ea045609c00001987da2/1568341203229-CW8KDTKYXI3FDGI65N7R/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0topjEaZcWjtmMYdCWL4dkGbxs35J-ZjFa9s1e3LsxrX8g4qcOj2k2AL08mW_Htcgg/Benilde.png?format=300w',
                contactnum:'565-112-1837',
                contactperson:'Ms. Roselle McCue',
                email:'dls-csb@dlsu.edu.ph',
                webpage:'www.benilde.edu.ph/',
                address:'2544 Taft Ave, Malate, Manila, 1004 Metro Manila',
                info:'baraATATATATATATTA',},
        {name: 'De La Salle John Bosco College', add:'Mangagoy, Bislig City, Surigao del Sur',
                img:'https://1.bp.blogspot.com/_vee8AfR9RzE/SGOdLegiQEI/AAAAAAAAAA8/RsQLb9TD9Qk/s320/800px-Dlsadmin2.jpg',
                logo:'https://images.squarespace-cdn.com/content/v1/5d09ea045609c00001987da2/1568341244186-9EPM4UWZOKB2DMGPEHX1/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0topjEaZcWjtmMYdCWL4dkGbxs35J-ZjFa9s1e3LsxrX8g4qcOj2k2AL08mW_Htcgg/DLSJBC.png?format=300w',
                contactnum:'633-885-4699',
                contactperson:'Ms. Zorina Pedican',
                email:'dlsjbc@dlsu.edu.ph',
                webpage:'www.dlsjbc.edu.ph/',
                address:'John Bosco Dist., Mangagoy, Bislig, 8311 Surigao del Sur',
                info:'sisig',},
        {name: 'De La Salle Lipa', add: 'Lipa, Batangas',
                img:'https://www.finduniversity.ph/_resources/business/7702/dlsl-116.jpg',
                logo:'https://images.squarespace-cdn.com/content/v1/5d09ea045609c00001987da2/1568341790823-91FL2190TB4J0VE43585/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0topjEaZcWjtmMYdCWL4dkGbxs35J-ZjFa9s1e3LsxrX8g4qcOj2k2AL08mW_Htcgg/DLSL.png?format=300w',
                contactnum:'468-963-5332',
                contactperson:'Mr. Ephrayim Cowwell',
                email:'dlsl@dlsu.edu.ph',
                webpage:'www.dlsl.edu.ph/',
                address:'1962 J.P. Laurel National Highway, Mataas na Lupa, 4217, Batangas',
                info:'liLIPAd',},
        {name: 'De La Salle Medical and Health Sciences Institute', add:'Dasmariñas, Cavite',
                img:'https://www.fenceabroad.com/blogs/wp-content/uploads/2016/12/AKMRC1-469x312.jpg',
                logo:'https://images.squarespace-cdn.com/content/v1/5d09ea045609c00001987da2/1568341224797-04CIUJT63PHAY14K9GH9/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0topjEaZcWjtmMYdCWL4dkGbxs35J-ZjFa9s1e3LsxrX8g4qcOj2k2AL08mW_Htcgg/DLSMHSI.png?format=300w',
                contactnum:'123-253-6181',
                contactperson:'Mr. Leonid Fessby',
                email:'dlsmhsi@dlsu.edu.ph',
                webpage:'www.dlshsi.edu.ph/',
                address:'Governor, D. Mangubat St, Avenue, Dasmariñas, 4114 Cavite',
                info:'south kids',},
        {name: 'De La Salle University', add: 'Taft Ave, Metro Manila',
                img:'https://miro.medium.com/max/3840/1*s0F0i9hHCwc756pbaYCWrQ.png',
                logo:'https://images.squarespace-cdn.com/content/v1/5d09ea045609c00001987da2/1568341861491-WPMTHDNJ4GGVV7IOZCAT/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0topjEaZcWjtmMYdCWL4dkGbxs35J-ZjFa9s1e3LsxrX8g4qcOj2k2AL08mW_Htcgg/DLSU.png?format=300w',
                contactnum:'130-977-2582',
                contactperson:'Mr. Gabbey Cogan',
                email:'dlsu@dlsu.edu.ph',
                webpage:'www.dlsu.edu.ph/',
                address:'2401 Taft Ave, Malate, Manila, 1004 Metro Manila',
                info:'dude pare CHOOOOOOOONG',},
        {name: 'De La Salle University - Dasmariñas', add:'Dasmariñas, Cavite',
                img:'https://www.dlsud.edu.ph/facilities/assets/img/uls/1.png',
                logo:'https://images.squarespace-cdn.com/content/v1/5d09ea045609c00001987da2/1568341837782-N7LLMZNCNMKHYGWYO99C/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0topjEaZcWjtmMYdCWL4dkGbxs35J-ZjFa9s1e3LsxrX8g4qcOj2k2AL08mW_Htcgg/DLSU-D.png?format=300w',
                contactnum:'472-330-4446',
                contactperson:'Mr. Jabez Scarbarrow',
                email:'dlsud@dlsu.edu.ph',
                webpage:'www.dlsud.edu.ph/',
                address:'DBB-B, 4115 West Ave, Dasmariñas, Cavite',
                info:'south kids pt. 2',},
        {name: 'De La Salle Santiago Zobel School', add: 'Muntinlupa, Metro Manila',
                img:'https://photos.wikimapia.org/p/00/00/13/89/75_big.jpg',
                logo:'https://images.squarespace-cdn.com/content/v1/5d09ea045609c00001987da2/1568341878210-03BGX2OHNQYX0HZ9TYTD/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0topjEaZcWjtmMYdCWL4dkGbxs35J-ZjFa9s1e3LsxrX8g4qcOj2k2AL08mW_Htcgg/DLSZ.png?format=300w',
                contactnum:'842-959-3962',
                contactperson:'Dr. Filbert Nutt',
                email:'dlsz@dlsu.edu.ph',
                webpage:'www.dlszobel.edu.ph/',
                address:'University Ave, Ayala Alabang, Muntinlupa, 1780 Metro Manila',
                info:'south kids pt. 3',},
        {name: 'La Salle Acedemy', add:'Iligan City, Lanao del Norte',
                img:'https://pbs.twimg.com/media/D0FSyluU0AAX4Pu.jpg',
                logo:'https://images.squarespace-cdn.com/content/v1/5d09ea045609c00001987da2/1568341889356-AOVHD6ACMNAUY6IFUTSX/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0topjEaZcWjtmMYdCWL4dkGbxs35J-ZjFa9s1e3LsxrX8g4qcOj2k2AL08mW_Htcgg/LSA.png?format=300w',
                contactnum:'621-985-5021',
                contactperson:'Ms. Dorelle Stoate',
                email:'lsa@dlsu.edu.ph',
                webpage:'www.lsa.edu.ph',
                address:'Bro. Raymund Jeffrey, Pala-o, Iligan City, 9200 Lanao del Norte',
                info:'deets',},
        {name: 'La Salle College Antipolo', add: 'Antipolo City, Rizal',
                img:'https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/e35/68768771_484292805726089_761454849528390755_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=105&_nc_ohc=XjVPlJWuqmMAX87ZMkK&se=7&oh=aba88102a339fb9df8642e079e516671&oe=5ED88C41&ig_cache_key=MjExNjAwMzg4NTQ1MDUwMjAzOQ%3D%3D.2',
                logo:'https://images.squarespace-cdn.com/content/v1/5d09ea045609c00001987da2/1568341922982-W96Y0II157TFRHUKC2W0/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0topjEaZcWjtmMYdCWL4dkGbxs35J-ZjFa9s1e3LsxrX8g4qcOj2k2AL08mW_Htcgg/LSCA.png?format=300w',
                contactnum:'336-300-9841',
                contactperson:'Fr. Hildegaard Ryton',
                email:'lsca@dlsu.edu.ph',
                webpage:'www.lsca.edu.ph/',
                address:'1985 La Salle St, Antipolo, 1870 Rizal',
                info:'yes sir',},
        {name: 'La Salle Green Hills', add:'Mandaluyong, Metro Manila',
                img:'https://primer.com.ph/study/wp-content/uploads/sites/8/2016/02/LaSalle_Featured.jpg',
                logo:'https://images.squarespace-cdn.com/content/v1/5d09ea045609c00001987da2/1568341960397-40YB5F3FGX5GMD895RYG/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0topjEaZcWjtmMYdCWL4dkGbxs35J-ZjFa9s1e3LsxrX8g4qcOj2k2AL08mW_Htcgg/LSGH.png?format=300w',
                contactnum:'155-904-3624',
                contactperson:'Ms. Mildrid Bogaert',
                email:'lsgh@dlsu.edu.ph',
                webpage:'/www.lsgh.edu.ph/',
                address:'Holy Cross, Mandaluyong, Metro Manila',
                info:'holy holy',},
        {name: 'La Salle University', add: 'Ozamiz City, Misamis Occidental',
                img:'https://lh3.ggpht.com/1zzFnXlIH2A3lukS0pG3o6EruOxD99FnR9hdgP4tzXDp6MLVraWdwoccQJ1RbRhZm_1TKJsRn-2yFfOcNsqM',
                logo:'https://images.squarespace-cdn.com/content/v1/5d09ea045609c00001987da2/1568341993405-U35Y86MMKQEWDZQULGTM/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0topjEaZcWjtmMYdCWL4dkGbxs35J-ZjFa9s1e3LsxrX8g4qcOj2k2AL08mW_Htcgg/LSU.png?format=300w',
                contactnum:'840-852-4501',
                contactperson:'Ms. Kay Barbey',
                email:'lsu@dlsu.edu.ph',
                webpage:'lsu.edu.ph/',
                address:'St Columban Dr, Ozamiz City, 7200 Misamis Occidental',
                info:'',},
        {name: 'St. Josephs School-La Salle', add:'Bacolod City, Negros Occidental',
                img:'https://miro.medium.com/max/3840/1*s0F0i9hHCwc756pbaYCWrQ.png',
                logo:'https://images.squarespace-cdn.com/content/v1/5d09ea045609c00001987da2/1568342029167-8U7B4PWOXMT5MGMX68RF/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0topjEaZcWjtmMYdCWL4dkGbxs35J-ZjFa9s1e3LsxrX8g4qcOj2k2AL08mW_Htcgg/SJSLS.png?format=300w',
                contactnum:'199-431-8538',
                contactperson:'Fr. Jemmie Forsdyke',
                email:'sjhs@dlsu.edu.ph',
                webpage:'www.sjhs.edu.ph',
                address:'St. Joseph School - La Salle Fr. Gratian Murray Street Villamonte, Bacolod City, 6100 Negros Occidental',
                info:'yyyyyyyyyyyyyyyy',},
        {name: 'St. Jaime Hilario School - De La Salle Bataan', add: 'Bagac, Bataan',
                img:'https://miro.medium.com/max/3840/1*s0F0i9hHCwc756pbaYCWrQ.png',
                logo:'https://images.squarespace-cdn.com/content/v1/5d09ea045609c00001987da2/1568342029167-8U7B4PWOXMT5MGMX68RF/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0topjEaZcWjtmMYdCWL4dkGbxs35J-ZjFa9s1e3LsxrX8g4qcOj2k2AL08mW_Htcgg/SJSLS.png?format=300w',
                contactnum:'414-308-3347',
                contactperson:'Ms. Carney Pratt',
                email:'sjsdlsb@dlsu.edu.ph',
                webpage:'www.sjsdlsb.edu.ph',
                address:'Sitio Looc, Barangay Banawang, Bagac, Bataan',
                info:'lapit na',},
        {name: 'University of St. La Salle', add:'Bacolod, Negros Occidental',
                img:'https://miro.medium.com/max/3840/1*s0F0i9hHCwc756pbaYCWrQ.png',
                logo:'https://images.squarespace-cdn.com/content/v1/5d09ea045609c00001987da2/1568342046838-C9TJP4R8OQXBHQTC4V5J/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0topjEaZcWjtmMYdCWL4dkGbxs35J-ZjFa9s1e3LsxrX8g4qcOj2k2AL08mW_Htcgg/USLS.png?format=300w',
                contactnum:'293-449-6456',
                contactperson:'Mr. Ros Aldersey',
                email:'usls@dlsu.edu.ph',
                webpage:'www.usls.edu.ph/',
                address:'La Salle Avenue, Bacolod 6100,Negros Occidental',
                info:'XD',},
      ]
    }
  },
  methods: {
        closeForm() { // emits close event to parent component
        this.$emit('close');
      },        
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

#toolbar{
  background-color:#427f50;
}

#info, #body{
  background-color:#f2f5eb;
}
</style>