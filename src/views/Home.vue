<template>
  <v-container>
    <h1>Welcome to Rain And Sea's Home</h1>
    <img src="@/assets/home.jpg" width="1000px" alt=""/>
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component({})
  export default class Home extends Vue {
  }
</script>

<style scoped lang="less">
  h1 {
    margin-bottom: 20px;
  }
</style>