<template>
  <div class="broadcast">
    <div class="iconfont icon-jikediancanicon17"></div>
    <ul class="">
      <transition-group name="list-complete" tag="li">
        <li
          v-for="item in broadcast"
          v-bind:key="item"
          class="list-complete-item">
          {{ item }}
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<style>
  .broadcast{ overflow: hidden; position: relative; height: 42px; line-height: 42px; background-color: #fff; }
  .icon-jikediancanicon17{ float: left; width: 50px; text-align: center; font-size: 28px; color: #27aec2; }
  .broadcast ul{ position: absolute; left: 50px; top: 0; width: 300%; }
  .broadcast li{ float: left; margin-right: 30px; }
  .list-complete-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
  }
  .list-complete-enter, .list-complete-leave-active {
    opacity: 0;
    transform: translateY(30px);
  }
  .list-complete-leave-active {
    position: absolute;
  }
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'broadcast',
  computed: mapGetters({
    broadcast: 'broadcast'
  })
}
</script>
