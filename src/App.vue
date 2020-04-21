<template>
  <v-app>
    <Navbar/>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond&family=Roboto:wght@100;400&display=swap');

::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
::-webkit-scrollbar-thumb {
  background: rgb(165, 165, 165); 
}
::-webkit-scrollbar-thumb:hover {
  background: rgb(100, 100, 100); 
}
</style>
