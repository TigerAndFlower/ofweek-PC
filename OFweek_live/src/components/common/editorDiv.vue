<template>
  <div class="editor-div"
      v-html="innerText"
      :contenteditable="canEdit"
      @focus="isLocked = true"
      @blur="isLocked = false"
      @input="changeText">
  </div>
</template>

<style>
  .editor-div{ overflow-x: hidden; overflow-y: auto; width: 100%; height: 100%; padding: 8px 14px; text-align: left; word-break: break-all; outline: none; 
      user-select: text; white-space: pre-wrap; box-sizing: border-box; }
</style>

<script>
export default{
  name: 'editorDiv',
  props: {
    value: {
      type: String,
      default: ''
    },
    canEdit: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      innerText: this.value,
      isLocked: false
    }
  },
  watch: {
    'value' () {
      if (!this.isLocked || !this.innerText) {
        this.innerText = this.value
      }
    }
  },
  methods: {
    changeText () {
      this.$emit('input', this.$el.innerHTML)
    }
  }
}
</script>
