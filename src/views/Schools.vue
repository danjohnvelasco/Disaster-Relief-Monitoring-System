<template>
  <div class="schools" align="center">
    <h1>List of Schools</h1>
  
    <v-container id="schoolcard">
      <v-layout row wrap>
        
        <v-flex sm8 md6 lg6 xl4 v-for="school in schools" :key="school.name">
          <v-hover>
              <template v-slot="{ hover }">
              
              <v-card max-width="520" max-height="400" :elevation="hover ? 24 : 2"
                      class="mx-auto pa-2" id="card">
                <v-img :src="school.img" height="200px"> </v-img>
                <v-card-title id="title"> {{school.name}} </v-card-title>
                <v-card-subtitle id="sub"> {{school.add}} </v-card-subtitle>

                <!-- FULL SCREEN -->                
                <v-card-actions>
                <v-dialog v-model="dialog" max-width="1000" id="info">
                <template v-slot:activator="{ on }">
                <v-btn id="vbt" color=#184725 dark v-on="on"> VISIT </v-btn>
                </template>      

                <!-- SCHOOL INFO  -->
                <v-card class="body" id="body">

                <v-row>
                <v-col align="center" class="col-md-4 col-lg-4 mb-4">
                        <v-container id="short_intro">
                        <v-layout column align-center>
                        <v-img :src="school.logo" height="200px" width="200px"> </v-img>
                        </v-layout>
                        <h1 id="con"> Contact Us </h1>
                        <h3>{{school.contactnum}}</h3>
                        <h3>{{school.contactperson}}</h3>
                        <h4>{{school.email}}</h4>
                        <br>
                        <h5>{{school.address}} </h5>
                        <br> 
                        <h3 id="web">{{school.webpage}} </h3>
                        </v-container>
                </v-col>
                <v-col class="col-md-7 col-lg-7 mb-7">
                        <v-container id="info">
                        <h1 id="schoolname">{{school.name}}</h1>
                        <v-divider></v-divider>
                        <br>
                        <h2 id="don"> Donation Details </h2> <br>
                        <p>
                        {{school.info}}
                        </p>
                        </v-container>
                </v-col>  
                </v-row>

                </v-card> 
                </v-dialog>
                </v-card-actions>
              </v-card>
           </template>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>
  </div>

</template>

<script>
  export default {
  data() {
    return {
      schools: [
        {name: 'De La Salle Andres Soriano Memorial College', add: 'Toledo City, Cebu',
                img:'https://images.unsplash.com/photo-1527891751199-7225231a68dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
                logo: 'https://images.squarespace-cdn.com/content/v1/5d09ea045609c00001987da2/1568341161488-G8SYQ6PG4WI0UCJ1T17W/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0topjEaZcWjtmMYdCWL4dkGbxs35J-ZjFa9s1e3LsxrX8g4qcOj2k2AL08mW_Htcgg/DLSASMC.png?format=300w',
                contactnum:'204-516-6296',
                contactperson:'Mr. Holmes Billany',
                email:'dlsasmc@dlsu.edu.ph',
                webpage:'www.dlsasmc.edu.ph',
                address:'Lutopan, Toledo City, Cebu',
                info:'Contact Mr. Holmes via email',
                },
        {name: 'De La Salle Araneta University', add:'Malabon, Metro Manila',
                img:'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
                logo:'https://images.squarespace-cdn.com/content/v1/5d09ea045609c00001987da2/1568341174374-EBXXVUEBLAPNEBIEITL2/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0topjEaZcWjtmMYdCWL4dkGbxs35J-ZjFa9s1e3LsxrX8g4qcOj2k2AL08mW_Htcgg/DLSAU.png?format=300w',
                contactnum:'749-165-1532',
                contactperson:'Ms. Dorolice Gerger',
                email:'dlsau@dlsu.edu.ph',
                webpage:'dlsau.edu.ph',
                address:'Salvador Araneta Campus, 303 Victoneta Ave, Potrero, Malabon, 1475 Metro Manila',
                info:'Contact the head of DLSAU for inquiries.',
                },
        {name: 'De La Salle-College of Saint Benilde', add: 'Taft Ave, Metro Manila',
                img:'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=752&q=80',
                logo:'https://images.squarespace-cdn.com/content/v1/5d09ea045609c00001987da2/1568341203229-CW8KDTKYXI3FDGI65N7R/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0topjEaZcWjtmMYdCWL4dkGbxs35J-ZjFa9s1e3LsxrX8g4qcOj2k2AL08mW_Htcgg/Benilde.png?format=300w',
                contactnum:'565-112-1837',
                contactperson:'Ms. Roselle McCue',
                email:'dls-csb@dlsu.edu.ph',
                webpage:'www.benilde.edu.ph',
                address:'2544 Taft Ave, Malate, Manila, 1004 Metro Manila',
                info:'Send an email to Ms. Roselle McCue before making any donations',},
        {name: 'De La Salle John Bosco College', add:'Mangagoy, Bislig City, Surigao del Sur',
                img:'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
                logo:'https://images.squarespace-cdn.com/content/v1/5d09ea045609c00001987da2/1568341244186-9EPM4UWZOKB2DMGPEHX1/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0topjEaZcWjtmMYdCWL4dkGbxs35J-ZjFa9s1e3LsxrX8g4qcOj2k2AL08mW_Htcgg/DLSJBC.png?format=300w',
                contactnum:'633-885-4699',
                contactperson:'Ms. Zorina Pedican',
                email:'dlsjbc@dlsu.edu.ph',
                webpage:'www.dlsjbc.edu.ph',
                address:'John Bosco Dist., Mangagoy, Bislig, 8311 Surigao del Sur',
                info:'Redirect to DLSU-M for donations.',},
        {name: 'De La Salle Lipa', add: 'Lipa, Batangas',
                img:'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
                logo:'https://images.squarespace-cdn.com/content/v1/5d09ea045609c00001987da2/1568341790823-91FL2190TB4J0VE43585/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0topjEaZcWjtmMYdCWL4dkGbxs35J-ZjFa9s1e3LsxrX8g4qcOj2k2AL08mW_Htcgg/DLSL.png?format=300w',
                contactnum:'468-963-5332',
                contactperson:'Mr. Ephrayim Cowwell',
                email:'dlsl@dlsu.edu.ph',
                webpage:'www.dlsl.edu.ph',
                address:'1962 J.P. Laurel National Highway, Mataas na Lupa, 4217, Batangas',
                info:'In-kind donations can be dropped off under Mr. Ephrayim Cowwell.',},
        {name: 'De La Salle Medical and Health Sciences Institute', add:'Dasmariñas, Cavite',
                img:'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjIxMTIzfQ&auto=format&fit=crop&w=750&q=80',
                logo:'https://images.squarespace-cdn.com/content/v1/5d09ea045609c00001987da2/1568341224797-04CIUJT63PHAY14K9GH9/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0topjEaZcWjtmMYdCWL4dkGbxs35J-ZjFa9s1e3LsxrX8g4qcOj2k2AL08mW_Htcgg/DLSMHSI.png?format=300w',
                contactnum:'123-253-6181',
                contactperson:'Mr. Leonid Fessby',
                email:'dlsmhsi@dlsu.edu.ph',
                webpage:'www.dlshsi.edu.ph',
                address:'Governor, D. Mangubat St, Avenue, Dasmariñas, 4114 Cavite',
                info:'Contact number provided will redirect donation drop-offs.',},
        {name: 'De La Salle University', add: 'Taft Ave, Metro Manila',
                img:'https://images.unsplash.com/photo-1516635707594-6949bdca3538?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
                logo:'https://images.squarespace-cdn.com/content/v1/5d09ea045609c00001987da2/1568341861491-WPMTHDNJ4GGVV7IOZCAT/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0topjEaZcWjtmMYdCWL4dkGbxs35J-ZjFa9s1e3LsxrX8g4qcOj2k2AL08mW_Htcgg/DLSU.png?format=300w',
                contactnum:'130-977-2582',
                contactperson:'Mr. Gabbey Cogan',
                email:'dlsu@dlsu.edu.ph',
                webpage:'www.dlsu.edu.ph',
                address:'2401 Taft Ave, Malate, Manila, 1004 Metro Manila',
                info:'Please contact Mr. Gabbey Cogan before making any drop-offs at the campus.',},
        {name: 'De La Salle University - Dasmariñas', add:'Dasmariñas, Cavite',
                img:'https://images.unsplash.com/photo-1507738978512-35798112892c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
                logo:'https://images.squarespace-cdn.com/content/v1/5d09ea045609c00001987da2/1568341837782-N7LLMZNCNMKHYGWYO99C/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0topjEaZcWjtmMYdCWL4dkGbxs35J-ZjFa9s1e3LsxrX8g4qcOj2k2AL08mW_Htcgg/DLSU-D.png?format=300w',
                contactnum:'472-330-4446',
                contactperson:'Mr. Jabez Scarbarrow',
                email:'dlsud@dlsu.edu.ph',
                webpage:'www.dlsud.edu.ph',
                address:'DBB-B, 4115 West Ave, Dasmariñas, Cavite',
                info:'Donors are free to drop-off their in-kind donations from 9AM to 5PM on weekdays.',},
       ]
    }
   },
}
</script>

<style scoped>
h1{
        text-align: center;
        font-family: 'EB Garamond', serif;
        color: #184725;
        font-size: 30px;
        padding: 20px 0 20px 0;
}

h2{
        text-align: left;
        font-family: 'EB Garamond', serif;
        color: #184725;
}

#con
{
        font-size: 25px;
        font-family: 'EB Garamond', serif;
        color: #184725;
}

h3{
        font-size: 18px;
        font-family: 'Roboto', sans-serif;
        color: #252525;
}

#web{
        color: #427f50;
}

h4{
        font-size: 15px;
        font-family: 'Roboto', sans-serif;
        color: #616161;
}

h5{
        font-size: 12px;
        font-family: 'Roboto', sans-serif;
        color: #7d7d7d;
}

#title{
        text-align: left;
        font-family: 'Roboto', sans-serif;
        font-size: 20px;
}
#sub{
        text-align: left;
        font-family: 'Roboto', sans-serif;
        font-size: 15px;
}

#card{
        border-radius:12px;
        margin: 10px;
}

#schoolname{
  text-align: left;
}

#toolbar{
  background-color:#427f50;
}

#info, #body{
  background-color:#EAEDEC;
  overflow-x: hidden;
  border-radius: 13px;
}
</style>