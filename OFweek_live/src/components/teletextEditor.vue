<template>
  <div>

    <div class="teletext-editor">
      <editor-div v-model="content"></editor-div>
    </div>

    <div class="clear mt10">
      <el-button class="fr ml10" type="primary" v-on:click="issue">发布</el-button>
      <el-button class="fr" type="info" v-on:click="dialogPreview = true">预览</el-button>
      <el-upload
        class="fr upload-demo"
        multiple
        accept="image/*"
        :action="action"
        :disabled="allowUpload"
        :show-file-list="false"
        :file-list="imageList"
        :before-upload="beforeUpload"
        :on-progress="handleProgress"
        :on-success="handleSuccess"
        :on-error="handleError">
        <el-button :loading="uploadStatus">上传图片</el-button>
      </el-upload>
    </div>

    <!-- 预览 -->
    <el-dialog title="预览" class="dialog-preview-teletext" :visible.sync="dialogPreview">
      <div class="teletext-bd">
        <teletext-message :message="previewMessage"></teletext-message>
      </div>
    </el-dialog>
  </div>
</template>

<style>
  .teletext-editor{ height: 300px; border: 1px solid #ccc; border-radius: 3px; resize: none; }
  .dialog-preview-teletext .el-dialog--small{ width: 800px; }
  .dialog-preview-teletext .teletext-bd{ margin: 0; }
</style>

<script>
import { mapGetters } from 'vuex'
import teletextMessage from './teletextMessage'
import editorDiv from './common/editorDiv'

export default {
  name: 'teletextEditor',
  data () {
    return {
      content: '',
      contentId: null,
      dialogPreview: false,
      imageList: [],
      uploadStatus: false,
      allowUpload: false
    }
  },
  props: ['message', 'messageId'],
  components: {
    teletextMessage,
    editorDiv
  },
  computed: {
    previewMessage () {
      return {
        content: this.content,
        createDate: new Date().getTime()
      }
    },
    action () {
      return '/sys/file/secretRoomUpload?__sid=' + this.room.sessionId + '&var=' + new Date().getTime()
    },
    ...mapGetters(['room'])
  },
  methods: {
    issue () {
      const content = this.content
      const id = this.contentId

      // 预览模式不能发布
      if (this.room.mode === 1) {
        return
      }
      if (content) {
        this.$store.dispatch('issueTeletext', { id, content })
        this.content = ''
        this.contentId = null
      }
    },
    // 上传前
    // 设置上传按钮的状态：加载中&禁用
    beforeUpload (file) {
      this.uploadStatus = true
      this.allowUpload = true
    },
    // 上传中
    handleProgress (event, file, fileList) {
      // console.log(event)
      // console.log(file)
    },
    // 上传成功
    // 插入图片到编辑内容里
    // 重置上传按钮状态
    handleSuccess (response, file, fileList) {
      this.content += '<img src=' + response.url + '>'
      this.uploadStatus = false
      this.allowUpload = false
    },
    // 上传失败
    // 提示失败信息
    // 重置上传按钮状态
    handleError (err, file, fileList) {
      console.log(err)
      this.uploadStatus = false
      this.allowUpload = false
    }
  },
  watch: {
    message: function (a, b) {
      this.content = a
    },
    messageId: function (a, b) {
      this.contentId = a
    }
  }
}
</script>
