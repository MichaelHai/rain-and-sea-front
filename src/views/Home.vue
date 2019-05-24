<template>
  <v-container>
    <h1>Welcome to Rain And Sea's Home</h1>
    <v-container full-height class="image-container">
      <img src="@/assets/home.jpg" width="1000px"/>
    </v-container>
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component({})
  export default class Home extends Vue {
  }
</script>

<style scoped lang="less">
  .image-container {
    padding-left: 0;
  }
</style>