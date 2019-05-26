<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container>
    <h1>GanDengYan</h1>
    <v-layout>
      <v-flex xs2>
        <score-board v-model="players" @save="saveGame"></score-board>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs9>
        <dashboard
            class="dashboard"
            :players="players"
        ></dashboard>
        <v-expansion-panel>
          <v-expansion-panel-content>
            <template v-slot:header>
              <div>Detail</div>
            </template>
            <score-table
                :players="players"
                :scores="scores"
            ></score-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import ScoreBoard from '@/components/gan_deng_yan/ScoreBoard.vue';
  import ScoreTable from '@/components/gan_deng_yan/ScoreTable.vue';
  import {Player} from '@/components/gan_deng_yan';
  import Dashboard from '@/components/gan_deng_yan/Dashboard.vue';

  @Component({
    components: {ScoreBoard, ScoreTable, Dashboard},
  })
  export default class GanDengYan extends Vue {
    private players: Array<Player> = [];
    private scores: Array<{ [player: string]: number }> = [];
    private lastWinner: Player | null = null;
    private continusWinningCount: number = 0;

    protected saveGame(result: {remains: {[player: string]: number}, bang: number}) {
      const winner: Player = this.players.find((player: Player) => result.remains[player.name] === 0) as Player;
      if (winner === this.lastWinner) {
        this.continusWinningCount++;
      } else {
        this.lastWinner = winner;
        this.continusWinningCount = 0;
      }
      const multipler = Math.pow(2, result.bang + this.continusWinningCount);

      const score: {[player: string]: number} = {};
      let winningScore: number = 0;
      this.players.forEach((player: Player) => {
        const remainForPlayer = result.remains[player.name];
        let scoreForPlayer = remainForPlayer === 5 ? -10 : -remainForPlayer;
        scoreForPlayer *= multipler;
        if (scoreForPlayer !== 0) {
          winningScore -= scoreForPlayer;
          player.score += scoreForPlayer;
          score[player.name] = scoreForPlayer;
        }
      });
      winner!.score += winningScore;
      winner!.winCount++;
      score[winner!.name] = winningScore;
      this.scores.push(score);
    }
  }
</script>

<style scoped lang="less">
  h1 {
    margin-bottom: 20px;
  }

  .dashboard {
    margin-bottom: 32px;
  }
</style>