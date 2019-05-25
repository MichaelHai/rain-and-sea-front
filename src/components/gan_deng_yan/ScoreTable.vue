<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-data-table
      :items="scores"
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
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {Player} from '@/components/gan_deng_yan/index';

  @Component({})
  export default class ScoreTable extends Vue {
    @Prop() private players!: Array<Player>;
    @Prop() private scores!: Array<{ [player: string]: number }>;
  }
</script>

<style scoped lang="less">

</style>