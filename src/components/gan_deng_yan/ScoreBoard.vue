<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-card>
    <v-card-title primary-title>
      <v-icon large left>style</v-icon>
      <span>Score Board</span>
      <v-spacer></v-spacer>
      <v-menu
          v-model="addingPlayerDialogShown"
          :close-on-content-click="false"
          offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn fab small v-on="on">
            <v-icon>add</v-icon>
          </v-btn>
        </template>
        <v-card
            @keypress.enter="addPlayer"
            class="adding-player-card"
        >
          <v-list>
            <v-list-tile-action>
              <v-text-field
                  v-model="addingPlayerName"
                  label="Player Name"
                  placeholder=" "
                  hide-details
                  ref="addingPlayerNameInput"
                  class="player-name-input"
              ></v-text-field>
            </v-list-tile-action>
          </v-list>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small @click="addPlayer">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-card-title>
    <v-list>
      <template v-for="player in players">
        <v-list-tile class="list-item">
          <v-list-tile-avatar>
            <v-icon x-large>person</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ player.name }}
            </v-list-tile-title>
            <v-list-tile-sub-title>
              <v-rating
                  v-model="remains[player.name]"
                  clearable
                  dense
                  :readonly="!player.inGame"
                  :color="player.inGame ? 'primary' : '#bdbdbd'"
                  :background-color="player.inGame ? 'accent' : 'rgba(255,255,255,0.3)'"
              ></v-rating>
            </v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-switch v-model="player.inGame"></v-switch>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="save">Save</v-btn>
    </v-card-actions>
    <v-snackbar
        v-model="errorInfoShown"
        :timeout="5000"
    >
      {{ errorInfo }}
    </v-snackbar>
  </v-card>
</template>

<script lang="ts">
  import {Component, Emit, Model, Vue, Watch} from 'vue-property-decorator';
  import {Player} from '@/components/gan_deng_yan/index';

  @Component({})
  export default class ScoreBoard extends Vue {
    @Model('newPlayer') private players!: Array<Player>;

    private remains: { [player: string]: number } = {};
    private addingPlayerDialogShown: boolean = false;
    private addingPlayerName: string = '';

    private errorInfoShown: boolean = false;
    private errorInfo: string = '';

    @Watch('players')
    public playersChanged() {
      this.players.forEach((player: Player) => {
        if (!this.remains[player.name]) {
          this.$set(this.remains, player.name, 0);
        }
      });
    }

    @Watch('addingPlayerDialogShown')
    public addingPlayerDialogShownChanged() {
      if (this.addingPlayerDialogShown) {
        this.addingPlayerName = '';
        setTimeout((this.$refs.addingPlayerNameInput as any).focus, 100);
      }
    }

    @Emit('newPlayer')
    protected addPlayer() {
      const newPlayerList = new Array(...this.players);
      if (this.addingPlayerName) {
        newPlayerList.push({
          name: this.addingPlayerName,
          inGame: true,
          winCount: 0,
          score: 0,
        });
      }
      this.addingPlayerName = '';
      return newPlayerList;
    }

    protected save() {
      if (this.validateRemains()) {
        this.$emit('save', this.remains);
        this.players.forEach((player: Player) => this.$set(this.remains, player.name, 0));
      }
    }

    private validateRemains(): boolean {
      const remainsZeroPlayers = [];
      let inGamePlayerCount: number = 0;
      for (const player of this.players) {
        if (player.inGame) {
          inGamePlayerCount++;
          if (this.remainForPlayer(player.name) === 0) {
            remainsZeroPlayers.push(player.name);
          }
        }
      }

      if (inGamePlayerCount <= 1) {
        this.errorInfo = 'At least two players in game required.';
      } else if (remainsZeroPlayers.length === 1) {
        return true;
      } else if (remainsZeroPlayers.length === 0) {
        this.errorInfo = 'Some one should be a winner!';
      } else if (remainsZeroPlayers.length > 1) {
        this.errorInfo = 'The following players have no records: ' + remainsZeroPlayers.join(', ');
      }

      this.errorInfoShown = true;
      return false;
    }

    private remainForPlayer(player: string): number {
      if (this.remains[player]) {
        return this.remains[player];
      } else {
        return 0;
      }
    }
  }
</script>

<style scoped lang="less">
  .list-item {
    padding-bottom: 12px;
  }

  .player-name-input {
    padding: 0 8px;
  }

  .adding-player-card {
    padding-top: 8px;
  }
</style>