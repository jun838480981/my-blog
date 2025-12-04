<script setup>
import { api as viewerApi } from 'v-viewer'
import 'viewerjs/dist/viewer.css'

// 默认预览配置（官网常用）
const options = {
  // 基本设置
  backdrop: true, // 是否显示背景遮罩
  button: false, // 是否显示关闭按钮
  navbar: true, // 是否显示导航栏
  title: false, // 是否显示标题
  toolbar: {
    zoomIn: {
      show: true,
      size: 'large'
    }, // 放大按钮（0-隐藏，1-显示，4-显示在左侧）
    zoomOut: {
      show: true,
      size: 'large'
    }, // 缩小按钮
    reset: {
      show: true,
      size: 'large'
    }, // 重置按钮
    prev: {
      show: true,
      size: 'large'
    }, // 上一张按钮
    next: {
      show: true,
      size: 'large'
    } // 下一张按钮
  }, // 是否显示工具栏

  // 交互设置
  keyboard: true, // 是否支持键盘操作
  movable: true, // 图片是否可拖动
  zoomable: true, // 图片是否可缩放
  rotatable: true, // 图片是否可旋转
  scalable: true, // 图片是否可翻转
  transition: true, // 是否使用过渡动画

  // 显示设置
  fullscreen: true, // 是否支持全屏
  loop: true, // 是否循环浏览
  minZoomRatio: 0.01, // 最小缩放比例
  maxZoomRatio: 100 // 最大缩放比例
}

const show = (images) => {
  const viewer = viewerApi({
    images,
    options
  })
}

defineExpose({
  show
})
</script>

<template>
  <div class=""></div>
</template>

<style lang="scss" scoped></style>
