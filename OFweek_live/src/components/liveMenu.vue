<template>
  <div class="live-menu">
    <el-tabs v-model="activeLiveType">

      <!-- 摄像头直播 -->
      <el-tab-pane name="live" label="摄像头">
        <div class="live-menu-camera">
          <el-form :model="live" :rules="rules" ref="live" label-width="100px" class="">
            <el-form-item label="麦克风" prop="micIndex">
              <el-select v-model="live.micIndex" placeholder="请选择麦克风">
                <el-option v-for="(item, index) in microphone" :label="item" :key="index" :value="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="摄像头" prop="camIndex">
              <el-select v-model="live.camIndex" placeholder="请选择摄像头">
                <el-option v-for="(item, index) in camera" :label="item" :key="index" :value="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="live-menu-btn">
              <el-button type="primary" @click="begin('live')">确定</el-button>
              <el-button type="info" @click="close">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>

      <!-- PPT直播 -->
      <el-tab-pane name="ppt_live" label="PPT">
        <div class="live-menu-ppt">
          <el-form :model="ppt_live" :rules="rules" ref="ppt_live" label-width="100px" class="">
            <el-form-item label="PPT" prop="pptID">
              <el-select v-model="ppt_live.pptID" placeholder="请选择PPT">
                <el-option v-for="(item, index) in pptList" :label="item.name" :key="item.id" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="麦克风" prop="micIndex">
              <el-select v-model="ppt_live.micIndex" placeholder="请选择麦克风">
                <el-option v-for="(item, index) in microphone" :label="item" :key="index" :value="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="摄像头" prop="camIndex">
              <el-select v-model="ppt_live.camIndex" placeholder="请选择摄像头">
                <el-option v-for="(item, index) in camera" :label="item" :key="index" :value="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="live-menu-btn">
              <el-button type="primary" @click="begin('ppt_live')">确定</el-button>
              <el-button type="info" @click="close">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>

      <!-- 播放视频 -->
      <el-tab-pane name="vod" label="播放视频">
        <div class="live-menu-vod">
          <el-form :model="vod" :rules="rules" ref="vod" label-width="100px" class="">
            <el-form-item label="视频文件" prop="vodVideoInfo">
              <el-select v-model="vod.vodVideoInfo" placeholder="请选择视频">
                <el-option v-for="(item, index) in vodList" :label="item.name" :key="item.id" :value="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="live-menu-btn">
              <el-button type="primary" @click="begin('vod')">确定</el-button>
              <el-button type="info" @click="close">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>

      <!-- 摄像机直播 -->
      <el-tab-pane name="camera_live" label="摄像机">
        <div class="live-menu-dv">
          <el-form :model="camera_live" ref="camera_live" class="">
            <p>您已选择"摄像机"模式，请点击“开启直播”开始直播</p>
            <el-form-item class="live-menu-btn">
              <el-button type="primary" @click="begin('camera_live')">确定</el-button>
              <el-button type="info" @click="close">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>

      <!-- 转播 -->
      <el-tab-pane name="other" label="转播">
        <div class="live-menu-dv">
          <el-form :model="other" ref="other" class="">
            <p>您已选择"转播"模式，请点击“开启直播”开始转播</p>
            <el-form-item class="live-menu-btn">
              <el-button type="primary" @click="begin('other')">确定</el-button>
              <el-button type="info" @click="close">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<style>
  .live-menu .el-tabs__nav{ float: none; }
  .live-menu .el-tabs__item{ width: 20%; text-align: center; }
  .live-menu .el-select{ width: 350px; }
  .live-menu-btn .el-form-item__content{ margin-left: 0 !important; text-align: center; }
  .live-menu-dv .el-form-item__content{ margin-top: 38px; }
  .live-menu-camera{ padding: 44px 0 43px; }
  .live-menu-ppt{ padding: 15px 0 10px; }
  .live-menu-dv{ padding: 75px 0 74px; text-align: center; }
  .live-menu-vod{ padding: 75px 0 74px; }
</style>

<script>
import api from '../api'
import { mapGetters } from 'vuex'

export default {
  name: 'startLive',
  data () {
    let check = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error(rule.message))
      } else {
        callback()
      }
    }
    return {
      activeLiveType: 'live',
      // 摄像头/麦克风直播
      live: {
        liveMode: 0,
        liveType: 0,
        deviceType: 0,
        pptID: '',
        camIndex: '',
        micIndex: ''
      },
      // 摄像机直播
      camera_live: {
        liveMode: 0,
        liveType: 0,
        deviceType: 1,
        pptID: '',
        camIndex: '',
        micIndex: ''
      },
      // PPT直播
      ppt_live: {
        liveMode: 0,
        liveType: 1,
        deviceType: 0,
        pptID: '',
        camIndex: '',
        micIndex: ''
      },
      // VOD点播
      vod: {
        liveMode: 1,
        liveType: 0,
        deviceType: 0,
        pptID: '',
        camIndex: '',
        micIndex: '',
        vodVideoInfo: ''
      },
      // 转播
      other: {
        liveMode: 0,
        liveType: 0,
        deviceType: 2,
        camIndex: '',
        micIndex: ''
      },
      // 验证规则
      rules: {
        camIndex: [
          { validator: check, message: '请选择摄像头', trigger: 'change' }
        ],
        micIndex: [
          { validator: check, message: '请选择麦克风', trigger: 'change' }
        ],
        pptID: [
          { validator: check, message: '请选择PPT文件', trigger: 'change' }
        ],
        vodVideoInfo: [
          { validator: check, message: '请选择视频文件', trigger: 'change' }
        ]
      }
    }
  },
  props: ['openMode'],
  computed: mapGetters({
    room: 'room',
    liveType: 'liveType',
    camera: 'camera',
    microphone: 'microphone',
    pptList: 'pptList',
    vodList: 'vodList'
  }),
  methods: {
    // 切换直播实际上就是：结束直播 - 开启直播 的过程
    // liveType 是直播类型
    // 预览模式选结束直播不会收到socket通知,所以需要在这里重置直播信息，因为界面是根据直播信息来显示的
    handleSwitchLive (liveType) {
      api.endLive(() => {
        if (this.room.mode === 1) {
          this.$store.commit('resetLiveInfo')
        }
        // 切换直播的时候（关闭直播后立即开启直播）Flash 内部可能响应不过来
        setTimeout(() => {
          this.begin(liveType)
        }, 100)
      })
    },

    // 开启直播
    begin (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 处理切换操作
          if (this.openMode === 2 && this.liveType !== '') {
            this.handleSwitchLive(formName)
            return
          }

          // 处理PPT直播
          if (formName === 'ppt_live') {
            // 设置 PPT 的 ID
            // 因为主播收不到开启直播通知，开启直播回调里面也不会有 PPT 的 ID
            this.$store.commit('setPPTId', this[formName].pptID)

            // 开启 PPT 直播必须允许使用摄像头&麦克风
            // 通过 FLASH 的 API，我们可以知道是否允许使用
            // 对于没有允许的主播用户，立即显示 FLASH 对话框界面
            // 如果没有对话框，可能勾选了 “拒绝” “记住” 。需要右键 - “设置” 勾选 “允许” “记住”
            // 允许后，FLASH 程序会调用一个 JS 函数，这里处理成 api.isEnableWebcamMic 的回调了
            const isEnableWebcamMic = api.isEnableWebcamMic(() => {
              this.begin(formName)
            })
            if (!isEnableWebcamMic) {
              this.$store.commit('setLiveType', 'live')
              this.$emit('closeMenu')
              return false
            }
          }

          // 选择点播视频无法将整个对象提交过来
          // Flash 的接口需要传视频信息对象
          if (formName === 'vod') {
            this[formName].vodVideoInfo = this.vodList[this[formName].vodVideoInfo]
          }

          // 如果房间是正式模式且是预告状态，要先将房间设置进行中状态
          if (this.room.mode === 2 && this.room.status === 0) {
            api.setupRoomActivityStatus(data => {
              if (data.code === 0) {
                api.startLive(this[formName])
                this.$store.commit('setLiveType', formName)
              } else {
                const message = data.message || '还未到直播开始时间点，请耐心等待!'
                this.$confirm(message)
              }
            })
          } else {
            api.startLive(this[formName])
            this.$store.commit('setLiveType', formName)
          }

          this.close()
        } else {
          return false
        }
      })
    },
    close () {
      this.$emit('closeMenu')
    }
  }
}
</script>
