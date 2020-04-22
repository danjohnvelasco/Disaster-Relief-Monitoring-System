<template>
  <div class="about">
    <v-container>
      <!-- <p id="title" class="display-1 px-6 pt-6">About</p> -->
      <p id="title">About</p>
      <p id="sub1" class="px-6 py-6">
        Disaster Response Monitoring System is a web app that aids disaster response teams to 
        streamline its operations. We learned that in relief operations, data updates frequently. 
        It’s a struggle for them to exchange frequently changing data via chat messages and release 
        that data publicly in a consistent, and transparent manner. Our solution provides them a centralized platform to communicate, and track relief operations data within the team and to the public.
      </p>
    </v-container>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond&family=Roboto:wght@100;400&display=swap');
.about{
  background-color: #f7f5e8;
  height: 100%;
}

#title{
  font-family: 'EB Garamond', serif;
  color: #184725;
  font-size: 50px;
}

#sub1{
  font-family: 'Roboto', sans-serif;
  color: #434343;
  font-size: 18px;
}

#sub2{
  font-family: 'Roboto', sans-serif;
  color: #686868;
  font-size: 16px;
}

</style>