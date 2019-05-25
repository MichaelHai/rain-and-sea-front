<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container>
    <h1>GanDengYan</h1>
    <v-layout>
      <v-flex xs2>
        <score-board v-model="players" @save="saveGame"></score-board>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import ScoreBoard from '@/components/gan_deng_yan/ScoreBoard/ScoreBoard.vue';

  @Component({
    components: {ScoreBoard},
  })
  export default class GanDengYan extends Vue {
    private players: Array<{name: string, inGame: boolean}> = [];

    protected saveGame(param: any) {
      // TODO
    }
  }
</script>

<style scoped lang="less">
  h1 {
    margin-bottom: 20px;
  }
</style>