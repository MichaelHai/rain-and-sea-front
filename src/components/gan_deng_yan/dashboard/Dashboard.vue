<template>
  <v-card class="dashboard">
    <v-card-title>Dashboard</v-card-title>
    <v-layout>
      <v-flex xs2 class="dashboard-item">
        <ranking-list
            :players="players"
            orderName="Score"
            orderProp="score"
            :order="desc"
        ></ranking-list>
      </v-flex>
      <v-flex xs2 class="dashboard-item">
        <ranking-list
            :players="players"
            orderName="Win"
            orderProp="winCount"
            :order="desc">
        </ranking-list>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {Order, Player} from '@/components/gan_deng_yan';
  import RankingList from '@/components/gan_deng_yan/dashboard/RankingList.vue';

  @Component({
    components: {RankingList},
  })
  export default class Dashboard extends Vue {
    @Prop() private players!: Array<Player>;

    protected get desc(): Order {
      return Order.DESC;
    }
  }
</script>

<style scoped lang="less">
  .dashboard {
    padding: 0 8px 16px 8px;
  }

  .dashboard-item {
    padding: 0 16px;
  }
</style>