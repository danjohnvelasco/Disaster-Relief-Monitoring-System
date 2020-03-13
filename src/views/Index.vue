<template>
  <div class="home">
    <v-btn depressed medium to="/event-form">Add event</v-btn>
  </div>
</template>

<script>

export default {
  name: 'Index',
  methods: {
    addEvent() {
      console.log('Add event');
    }
  }
}
</script>
