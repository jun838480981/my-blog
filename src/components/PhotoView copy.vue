<script setup>
import { ref, onMounted } from 'vue'
// 导入核心模块
import { Viewer } from '@photo-sphere-viewer/core'
import '@photo-sphere-viewer/core/index.css'
// 导入虚拟漫游插件（多场景切换）
import { VirtualTourPlugin } from '@photo-sphere-viewer/virtual-tour-plugin'
import '@photo-sphere-viewer/virtual-tour-plugin/index.css'
// 导入标记插件（热点）
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin'
import '@photo-sphere-viewer/markers-plugin/index.css'

import ImagePreview from './ImagePreview.vue'

const imagePreview = ref()

const panoramaContainer = ref(null)

onMounted(() => {
  initViewer()
})

let viewer = null

// 初始化Viewer
const initViewer = () => {
  viewer = new Viewer({
    container: panoramaContainer.value,
    panorama: '/artist-workshop.jpg',
    navbar: null,
    plugins: [MarkersPlugin]
  })

  viewer.addEventListener('ready', viewerReady)
  // 单击事件
  viewer.addEventListener('click', ({ data }) => {
    console.log('点击了marker信息', data)
  })
  // 双击缩放事件
  viewer.addEventListener('dblclick', ({ data }) => {
    viewer.animate({
      yaw: data.yaw,
      pitch: data.pitch,
      zoom: 100,
      speed: 1000
    })
  })
}
// 查看器准备就绪事件
const viewerReady = (e) => {
  const markersPlugin = viewer.getPlugin(MarkersPlugin) // 正确获取插件
  const markers = [
    {
      id: 'marker-1',
      html: getMarkerContent('arrow', '跟随镜头前进'),
      position: {
        yaw: 0.25,
        pitch: -0.29
      },
      data: {
        id: 'marker-1'
      }
    },
    {
      id: 'marker-2',
      html: getMarkerContent('left-arrow', '跟随镜头左转'),
      position: {
        yaw: 0.10845705427105304,
        pitch: -0.2918001440370368
      },
      data: {
        id: 'marker-2'
      }
    },
    {
      id: 'marker-3',
      html: getMarkerContent('right-arrow', '跟随镜头右转'),
      position: {
        yaw: 0.36782480787154204,
        pitch: -0.2830344045594404
      },
      data: {
        id: 'marker-3'
      }
    },
    {
      id: 'marker-4',
      html: getMarkerContent('dot', '点击查看详情'),
      position: {
        yaw: 0.45776822721072474,
        pitch: -0.039817935248553926
      },
      data: {
        id: 'marker-4'
      }
    }
  ]
  markersPlugin.setMarkers(markers)
  markersPlugin.addEventListener('select-marker', ({ marker }) => {
    imagePreview.value.show([
      'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
    ])
    console.log('点击了marker', marker)
  })
}

/**
 *
 * @param type 标记类型
 * @param text 标记文本
 */
const getMarkerContent = (type, text) => {
  return `
  <div class="marker-element ${type}">
    <div class="marker-text">${text}</div>
  </div>
 `
}
</script>

<template>
  <div ref="panoramaContainer" class="w-screen h-screen"></div>

  <ImagePreview ref="imagePreview" />
</template>

<style>
.marker-element {
  position: relative;
  width: 64px;
  height: 64px;
  background-repeat: no-repeat;
  background-size: 64px 1600px;
  cursor: pointer;
  animation: sprite-animation 1s steps(25) infinite;
}
.marker-element.arrow {
  background-image: url('/gif_arrow.png');
}
.marker-element.left-arrow {
  background-image: url('/gif_left_arrow.png');
}
.marker-element.right-arrow {
  background-image: url('/gif_right_arrow.png');
}
.marker-element.dot {
  background-image: url('/gif_dot.png');
}
.marker-text {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  padding: 5px;
  letter-spacing: 1px;
  border-radius: 5px;
  white-space: nowrap;
}
/* 动画关键帧：逐帧切换背景位置 */
@keyframes sprite-animation {
  0% {
    background-position-y: 0; /* 第1帧（顶部） */
  }
  100% {
    background-position-y: -1600px; /* 最后1帧（底部，总高度的负值） */
  }
}
</style>
