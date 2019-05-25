<template>
  <v-card class="dashboard">
    <v-card-title>Dashboard</v-card-title>
    <v-layout>
      <v-flex xs2>
        <v-card light>
          <v-card-title>Rank</v-card-title>
          <v-divider></v-divider>
          <v-list>
            <v-list-tile v-for="player in sortedPlayers">
              <v-list-tile-avatar>
                <v-icon x-large>person</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ player.name }}
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  {{ player.score }}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {Player} from '@/components/gan_deng_yan/index';

  @Component({})
  export default class Dashboard extends Vue {
    @Prop() private players!: Array<Player>;

    protected get sortedPlayers() {
      return new Array(...this.players).sort((p1: Player, p2: Player) => p2.score - p1.score);
    }
  }
</script>

<style scoped lang="less">
  .dashboard {
    padding: 0 16px 16px 16px;
  }
</style>