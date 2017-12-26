<template>
  <div class="teletext-message">
    <!-- 确认删除 -->
    <el-popover
        ref="popover1"
        placement="top"
        width="160"
        v-model="popoverPreview">
      <p>确定删除这条图文信息吗？（删除后不能恢复）</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="popoverPreview = false">取消</el-button>
        <el-button type="primary" size="mini" @click="deleteTeletext">确定</el-button>
      </div>
    </el-popover>

    <div class="clear bar">
      <i class="iconfont icon-shizhong"></i>
      <span class="time">{{message.createDate | date('hh:mm:ss')}}</span>
      <span class="date">{{message.createDate | date('YYYY-MM-DD')}}</span>
      <div class="fr teletext-control" v-if="isLecturer || isService">
        <span title="编辑" class="iconfont icon-bianji" v-on:click="reedit"></span>
        <span title="删除" class="iconfont icon-shanchu" v-popover:popover1 v-on:click="popoverPreview = true"></span>
      </div>
    </div>
    <div class="ql-editor content" v-html="message.content"></div>
  </div>
</template>

<style>
  .teletext-message{ position: relative; padding-bottom: 20px; }
  .teletext-message:before{ position: absolute; left: 10px; top: 0; width: 2px; height: 100%; content: ''; background: #dfdfdf; }
  .teletext-message .icon-shizhong{ position: absolute; left: 2px; top: 6px; z-index: 1; font-size: 18px; font-weight: bold; 
      line-height: 1; color: #c60000; background-color: #fff; }
  .teletext-message .bar{ height: 30px; line-height: 30px; }
  .teletext-message .time{ margin: 0 15px 0 30px; font-size: 20px; }
  .teletext-message .date{ font-size: 16px; }
  .teletext-message .content{ padding: 12px 0; margin-left: 30px; }
  .teletext-control{ overflow: hidden; height: 30px; }
  .teletext-control .iconfont{ margin-left: 5px; font-size: 22px; line-height: 30px; cursor: pointer; }
  .teletext-control .icon-shanchu{ font-size: 23px; }
  .teletext-control .iconfont:hover{ color: #000; }
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'teletextMessage',
  data () {
    return {
      popoverPreview: false
    }
  },
  props: ['message'],
  computed: mapGetters([
    'isLecturer',
    'isService'
  ]),
  methods: {
    deleteTeletext () {
      this.$store.dispatch('deleteTeletext', this.message.id)
    },
    reedit () {
      this.$emit('reedit')
      document.querySelector('.teletext-editor div').click()
    }
  }
}
</script>

