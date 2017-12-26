<template>
  <div class="schedule" v-if="schedule.length > 0">
    <columnHeader title="活动日程 Schedule"></columnHeader>
    <div class="schedule-bd">
      <ul class="schedule-list">
        <li v-for="item in schedule">
          <p class="schedule-content">{{item.name}}</p>
          <p class="schedule-info">{{item.startTime.slice(0,-3)}} - {{item.endTime.slice(0,-3)}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
  .schedule{ margin: 0 0 20px; background-color: #fff; }
  .schedule-bd{ padding: 0 20px; }
  .schedule-list li{ padding-left: 30px; margin: 20px 0 0; background: url(../assets/img/icon_schedule.png) left 1px no-repeat; }
  .schedule-content{ color: #333; }
  .schedule-info{ margin: 8px 0 0; font-size: 12px; color: #afafaf; }
</style>

<script>
import columnHeader from './columnHeader'
import { mapGetters } from 'vuex'

export default {
  name: 'schedule',
  components: {
    columnHeader
  },
  computed: mapGetters({
    schedule: 'schedule'
  })
}
</script>
