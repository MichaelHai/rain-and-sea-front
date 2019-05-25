<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-data-table
      :items="data"
      :rows-per-page-items="[{text: 'All', value: -1}, 50, 20]"
  >
    <template v-slot:headers="props">
      <tr>
        <th>#</th>
        <th v-for="player in players" class="text-md-center" colspan="2">
          {{ player.name }}
        </th>
      </tr>
    </template>
    <template v-slot:items="props">
      <tr>
        <td class="text-md-center">{{ props.index }}</td>
        <td v-for="player in players" class="text-md-center" colspan="2">
          {{ props.item[player.name] }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Player} from '@/components/gan_deng_yan/index';

  @Component({})
  export default class ScoreTable extends Vue {
    private players: Array<Player> = [
      {
        name: 'Wang Hai',
        inGame: true,
        winCount: 2,
        score: 100,
      }, {
        name: 'Chen Xiaoyu',
        inGame: true,
        winCount: 2,
        score: 200,
      }, {
        name: 'zbw',
        inGame: true,
        winCount: 2,
        score: 300,
      }
    ];
    private data: Array<any> = [{
      "Wang Hai": 100,
      "Chen Xiaoyu": 200,
      "zbw": 300
    }, {
      "Wang Hai": 100,
      "Chen Xiaoyu": 200,
      "zbw": 300
    }, {
      "Wang Hai": 100,
      "Chen Xiaoyu": 200,
      "zbw": 300
    }];

    protected budgeColor(player: Player): string {
      const sorted: Array<number> = this.players.map((player) => player.score).sort();
      if (player.score === sorted[0]) {
        return 'error';
      } else if (player.score === sorted[sorted.length - 1]) {
        return 'success';
      } else {
        return 'primary';
      }
    }
  }
</script>

<style scoped lang="less">

</style>