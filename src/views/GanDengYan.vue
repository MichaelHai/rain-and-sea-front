<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container>
    <h1>GanDengYan</h1>
    <v-layout>
      <v-flex xs2>
        <score-board v-model="players" @save="saveGame"></score-board>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs9>
        <score-table></score-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import ScoreBoard from '@/components/gan_deng_yan/ScoreBoard.vue';
  import ScoreTable from '@/components/gan_deng_yan/ScoreTable.vue';
  import {Player} from '@/components/gan_deng_yan';

  @Component({
    components: {ScoreBoard, ScoreTable},
  })
  export default class GanDengYan extends Vue {
    private players: Array<Player> = [];

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