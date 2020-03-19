<template>
  <div class="schools" align="center">
  <h1 align="center" class="subheading grey--text">List of Schools</h1>
  
  <v-container class="16_schools">
  
  <v-layout row wrap>
  <v-flex v-for="school in schools" :key="school.name">
          
  <v-card max-width="500" max-height="400">
    <v-img :src="school.img" height="200px"> </v-img>

    <v-card-title> {{school.name}} </v-card-title>

    <v-card-subtitle> {{school.add}} </v-card-subtitle>

    <v-card-actions>
      <v-btn color=#184725 text> VISIT </v-btn>

    </v-card-actions>

  </v-card>
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
        {name: 'De La Salle Andres Soriano Memorial College', add: 'Lutopan, Toledo City, Cebu',
                img:'https://images.squarespace-cdn.com/content/v1/51ac48dae4b04c1c5aacf799/1372235999068-GBR9ZR4XK74ZEE4XJJ49/ke17ZwdGBToddI8pDm48kL3VKmwKI3leYB51VJjLFB8UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcgK5SGg9Ovb1yloBBOHcruw_mYLfAhRzzgArFCB07Dw0L8n4JypuoE5Tg6Wg5Oyvs/DLSASMC.jpg?format=1500w'},
        {name: 'De La Salle Araneta University', add:'Malabon, Metro Manila',
                img:'https://www.pacu.org.ph/wordpress/wp-content/uploads/2017/05/De-La-Salle-University-Malabon-City.jpg'},
        {name: 'De La Salle-College of Saint Benilde', add: 'Taft Ave, Metro Manila',
                img:'https://balitangviral.com/wp-content/uploads/2015/07/mark.space_.4goo.net_.jpg'},
        {name: 'De La Salle John Bosco College', add:'Mangagoy, Bislig City, Surigao del Sur',
                img:'https://1.bp.blogspot.com/_vee8AfR9RzE/SGOdLegiQEI/AAAAAAAAAA8/RsQLb9TD9Qk/s320/800px-Dlsadmin2.jpg'},
        {name: 'De La Salle Lipa', add: 'Lipa, Batangas',
                img:'https://www.finduniversity.ph/_resources/business/7702/dlsl-116.jpg'},
        {name: 'De La Salle Medical and Health Sciences Institute', add:'Dasmariñas, Cavite',
                img:'https://www.fenceabroad.com/blogs/wp-content/uploads/2016/12/AKMRC1-469x312.jpg'},
        {name: 'De La Salle University', add: 'Taft Ave, Metro Manila',
                img:'https://miro.medium.com/max/3840/1*s0F0i9hHCwc756pbaYCWrQ.png'},
        {name: 'De La Salle University - Dasmariñas', add:'Dasmariñas, Cavite',
                img:'https://www.dlsud.edu.ph/facilities/assets/img/uls/1.png'},
        {name: 'De La Salle Santiago Zobel School', add: 'Muntinlupa, Metro Manila',
                img:'https://photos.wikimapia.org/p/00/00/13/89/75_big.jpg'},
        {name: 'La Salle Acedemy', add:'Iligan City, Lanao del Norte',
                img:'https://pbs.twimg.com/media/D0FSyluU0AAX4Pu.jpg'},
        {name: 'La Salle College Antipolo', add: 'Antipolo City, Rizal',
                img:'https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/e35/68768771_484292805726089_761454849528390755_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=105&_nc_ohc=XjVPlJWuqmMAX87ZMkK&se=7&oh=aba88102a339fb9df8642e079e516671&oe=5ED88C41&ig_cache_key=MjExNjAwMzg4NTQ1MDUwMjAzOQ%3D%3D.2'},
        {name: 'La Salle Green Hills', add:'Mandaluyong, Metro Manila',
                img:'https://primer.com.ph/study/wp-content/uploads/sites/8/2016/02/LaSalle_Featured.jpg'},
        {name: 'La Salle University', add: 'Ozamiz City, Misamis Occidental',
                img:'https://lh3.ggpht.com/1zzFnXlIH2A3lukS0pG3o6EruOxD99FnR9hdgP4tzXDp6MLVraWdwoccQJ1RbRhZm_1TKJsRn-2yFfOcNsqM'},
        {name: 'St. Josephs School-La Salle', add:'Bacolod City, Negros Occidental',
                img:'https://miro.medium.com/max/3840/1*s0F0i9hHCwc756pbaYCWrQ.png'},
        {name: 'St. Jaime Hilario School - De La Salle Bataan', add: 'Bagac, Bataan',
                img:'https://miro.medium.com/max/3840/1*s0F0i9hHCwc756pbaYCWrQ.png'},
        {name: 'University of St. La Salle', add:'Bacolod, Negros Occidental',
                img:'https://miro.medium.com/max/3840/1*s0F0i9hHCwc756pbaYCWrQ.png'},
      ]
    }
  }
}
</script>