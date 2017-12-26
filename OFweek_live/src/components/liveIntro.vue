<template>
  <div class="live-intro">

    <!-- 联系方式 -->
    <el-popover width="250" ref="popover1" placement="right" trigger="click">
      <div class="contacts-content">
        <dl class="clear" v-if="contacts.name">
          <dt>姓<i class="em2"></i>名：</dt>
          <dd v-html="contacts.name"></dd>
        </dl>
        <dl class="clear" v-if="contacts.mobilePhone">
          <dt>手机号码：</dt>
          <dd v-html="contacts.mobilePhone"></dd>
        </dl>
        <dl class="clear" v-if="contacts.telephone">
          <dt>电话号码：</dt>
          <dd v-html="contacts.telephone"></dd>
        </dl>
        <dl class="clear" v-if="contacts.department">
          <dt>部<i class="em2"></i>门：</dt>
          <dd v-html="contacts.department"></dd>
        </dl>
        <dl class="clear" v-if="contacts.job">
          <dt>职<i class="em2"></i>位：</dt>
          <dd v-html="contacts.job"></dd>
        </dl>
        <dl class="clear" v-if="contacts.address">
          <dt>地<i class="em2"></i>址：</dt>
          <dd v-html="contacts.address"></dd>
        </dl>
        <dl class="clear" v-if="contacts.fax">
          <dt>传<i class="em2"></i>真：</dt>
          <dd v-html="contacts.fax"></dd>
        </dl>
        <dl class="clear" v-if="contacts.url">
          <dt>网<i class="em2"></i>址：</dt>
          <dd v-html="contacts.url"></dd>
        </dl>
        <dl class="clear" v-if="contacts.email">
          <dt>邮<i class="em2"></i>箱：</dt>
          <dd v-html="contacts.email"></dd>
        </dl>
      </div>
    </el-popover>

    <columnHeader title="直播介绍"></columnHeader>
    <div class="live-intro-bd">
      <dl class="clear">
        <dt>主<i class="em2"></i>题：</dt>
        <dd v-html="room.name"></dd>
      </dl>
      <dl class="clear">
        <dt>举办公司：</dt>
        <dd v-html="room.company"></dd>
        <dd class="look-over-contact" v-show="room.contactShow === 0" v-popover:popover1>查看联系方式</dd>
      </dl>
      <dl class="clear">
        <dt>举办时间：</dt>
        <dd v-if="room.startTime">{{room.startTime | date}} 至 {{room.endTime | date}}</dd>
      </dl>
      <dl class="clear">
        <dt>直播内容：</dt>
        <dd v-html="room.detail"></dd>
      </dl>
    </div>

  </div>
</template>

<style>
  .live-intro{ color: #333; background-color: #fff; }
  .live-intro-bd{ padding: 15px 30px; margin: 0 0 20px; }
  .live-intro dl{ margin-top: 5px; line-height: 24px; }
  .live-intro dt, .live-intro dd{ float: left; }
  .live-intro dd{ max-width: 660px; }
  .look-over-contact{ margin-left: 1em; color: #2e8ded; cursor: pointer; }
  .look-over-contact:hover{ color: #549fea; }

  .contacts-content dl{ margin-top: 5px; font-size: 14px; line-height: 24px; }
  .contacts-content dt, .contacts-content dd{ float: left; }
</style>

<script>
import columnHeader from './columnHeader'
import { mapGetters } from 'vuex'

export default {
  name: 'liveIntro',
  components: {
    columnHeader
  },
  computed: mapGetters(['room', 'contacts'])
}
</script>
