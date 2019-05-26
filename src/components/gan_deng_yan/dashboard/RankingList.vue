import {Order} from '../index';
<template>
  <v-card light>
    <v-card-title>Rank by {{ orderName }}</v-card-title>
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
            {{ player[orderProp] }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {Order, Player} from '@/components/gan_deng_yan';

  @Component({})
  export default class RankingList extends Vue {
    @Prop() private players!: Array<Player>;
    @Prop() private orderName!: string;
    @Prop() private orderProp!: string;
    @Prop({default: Order.ASEC}) private order!: Order;

    protected get sortedPlayers() {
      return new Array(...this.players).sort((p1: Player, p2: Player) => {
        let compare = (p1 as any)[this.orderProp] - (p2 as any)[this.orderProp];
        if (this.order === Order.DESC) {
          compare *= -1;
        }
        return compare;
      });
    }
  }
</script>

<style scoped lang="less">

</style>