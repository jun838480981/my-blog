<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
// 导入核心模块
import { Viewer, utils } from '@photo-sphere-viewer/core'
import '@photo-sphere-viewer/core/index.css'
// 导入虚拟漫游插件（多场景切换）
import { VirtualTourPlugin } from '@photo-sphere-viewer/virtual-tour-plugin'
import '@photo-sphere-viewer/virtual-tour-plugin/index.css'
// 导入标记插件（热点）
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin'
import '@photo-sphere-viewer/markers-plugin/index.css'

import { AutorotatePlugin } from '@photo-sphere-viewer/autorotate-plugin'

// import { CubemapAdapter } from '@photo-sphere-viewer/cubemap-adapter'

import ImagePreview from './ImagePreview.vue'

const imagePreview = ref()

const panoramaContainer = ref(null)

onMounted(() => {
  initViewer()
})
onUnmounted(() => {
  viewer.destroy()
})

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

const sceneList = [
  {
    id: 'scene-1',
    name: '房间1',
    panorama: '/artist-workshop.jpg',
    markers: [
      {
        id: 'marker-1',
        html: getMarkerContent('left-arrow', '跟随镜头左转'),
        position: {
          yaw: 0.10845705427105304,
          pitch: -0.2918001440370368
        },
        data: {
          type: 'link',
          linkNodeId: 'scene-2'
        }
      },
      {
        id: 'marker-2',
        html: getMarkerContent('right-arrow', '跟随镜头右转'),
        position: {
          yaw: 0.36782480787154204,
          pitch: -0.2830344045594404
        },
        data: {
          type: 'link',
          linkNodeId: 'scene-3'
        }
      },
      {
        id: 'marker-3',
        html: getMarkerContent('dot', '点击查看详情'),
        position: {
          yaw: 0.45776822721072474,
          pitch: -0.039817935248553926
        },
        data: {
          type: 'preview',
          images: [
            'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
            'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
          ]
        }
      }
    ]
  },
  {
    id: 'scene-2',
    name: '房间2',
    panorama: '/key-biscayne.jpg',
    markers: [
      {
        id: 'marker-1',
        html: getMarkerContent('left-arrow', '跟随镜头左转'),
        position: {
          yaw: 0.10845705427105304,
          pitch: -0.2918001440370368
        },
        data: {
          type: 'link',
          linkNodeId: 'scene-1'
        }
      },
      {
        id: 'marker-2',
        html: getMarkerContent('right-arrow', '跟随镜头右转'),
        position: {
          yaw: 0.36782480787154204,
          pitch: -0.2830344045594404
        },
        data: {
          type: 'link',
          linkNodeId: 'scene-3'
        }
      },
      {
        id: 'marker-3',
        html: getMarkerContent('dot', '点击查看详情'),
        position: {
          yaw: 0.45776822721072474,
          pitch: -0.039817935248553926
        },
        data: {
          type: 'preview',
          images: [
            'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
            'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
          ]
        }
      }
    ]
  },
  {
    id: 'scene-3',
    name: '房间3',
    panorama: '/sphere.jpg',
    markers: [
      {
        id: 'marker-1',
        html: getMarkerContent('left-arrow', '跟随镜头左转'),
        position: {
          yaw: 0.10845705427105304,
          pitch: -0.2918001440370368
        },
        data: {
          type: 'link',
          linkNodeId: 'scene-1'
        }
      },
      {
        id: 'marker-2',
        html: getMarkerContent('right-arrow', '跟随镜头右转'),
        position: {
          yaw: 0.36782480787154204,
          pitch: -0.2830344045594404
        },
        data: {
          type: 'link',
          linkNodeId: 'scene-2'
        }
      },
      {
        id: 'marker-3',
        html: getMarkerContent('dot', '点击查看详情'),
        position: {
          yaw: 0.45776822721072474,
          pitch: -0.039817935248553926
        },
        data: {
          type: 'preview',
          images: [
            'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
            'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
          ]
        }
      }
    ]
  }
]
const baseUrl = 'https://photo-sphere-viewer-data.netlify.app/assets/'

const animatedValues = {
  pitch: { start: -Math.PI / 2, end: 0 },
  yaw: { start: Math.PI / 2, end: 0 },
  zoom: { start: 0, end: 50 },
  maxFov: { start: 130, end: 90 },
  fisheye: { start: 2, end: 0 }
}
let isInit = true
// 定义Viewer实例
let viewer = null
// 初始化Viewer
const initViewer = () => {
  viewer = new Viewer({
    container: panoramaContainer.value,
    // adapter: CubemapAdapter, // 立方体贴图适配器
    // panorama: {
    //   left: baseUrl + 'cubemap/px.jpg',
    //   front: baseUrl + 'cubemap/nz.jpg',
    //   right: baseUrl + 'cubemap/nx.jpg',
    //   back: baseUrl + 'cubemap/pz.jpg',
    //   top: baseUrl + 'cubemap/py.jpg',
    //   bottom: baseUrl + 'cubemap/ny.jpg'
    // },
    panorama: '/artist-workshop.jpg',
    loadingImg:
      'https://photo-sphere-viewer-data.netlify.app/assets/loader.gif',
    navbar: null,
    defaultTransition: {
      speed: 1500,
      rotation: true,
      effect: 'fade'
    },
    plugins: [
      MarkersPlugin,
      VirtualTourPlugin,
      AutorotatePlugin.withConfig({
        autostartDelay: null,
        autostartOnIdle: false,
        autorotatePitch: 0
      })
    ],
    defaultPitch: animatedValues.pitch.start,
    defaultYaw: animatedValues.yaw.start,
    defaultZoomLvl: animatedValues.zoom.start,
    maxFov: animatedValues.maxFov.start,
    fisheye: animatedValues.fisheye.start
  })

  viewer.addEventListener('ready', viewerReady)
  viewer.addEventListener('click', ({ data }) => {
    if (isInit) {
      intro(data.pitch, data.yaw)
    }
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
const viewerReady = ({ data }) => {
  console.log('🚀 ~ viewerReady ~ data:', data)
  if (isInit) {
    intro(data.pitch, data.yaw)
  }
}

// 加载场景标记
const loadMarkers = () => {
  const markersPlugin = viewer.getPlugin(MarkersPlugin) // 正确获取插件

  markersPlugin.setMarkers(sceneList[0].markers)
  markersPlugin.addEventListener('select-marker', ({ marker }) => {
    const markerData = marker.data
    if (markerData.type === 'link') {
      const linkNodeId = markerData.linkNodeId
      const linkNode = sceneList.find((scene) => scene.id === linkNodeId)
      if (linkNode) {
        markersPlugin.clearMarkers()
        viewer.setPanorama(linkNode.panorama)
        markersPlugin.setMarkers(linkNode.markers)
      }
    } else if (markerData.type === 'preview') {
      imagePreview.value.show(markerData.images)
    }
  })
}

// 清除所有标记
const clearMarkers = () => {
  const markersPlugin = viewer.getPlugin(MarkersPlugin) // 正确获取插件
  markersPlugin.clearMarkers()
}

// 执行介绍动画
function intro(pitch, yaw) {
  const autorotate = viewer.getPlugin(AutorotatePlugin)

  isInit = false
  loadMarkers()
  autorotate.stop()

  new utils.Animation({
    properties: {
      ...animatedValues,
      pitch: { start: animatedValues.pitch.start, end: pitch },
      yaw: { start: animatedValues.yaw.start, end: yaw }
    },
    duration: 2500,
    easing: 'inOutQuad',
    onTick: (properties) => {
      viewer.setOptions({
        fisheye: properties.fisheye,
        maxFov: properties.maxFov
      })
      viewer.rotate({ yaw: properties.yaw, pitch: properties.pitch })
      viewer.zoom(properties.zoom)
    }
  }).then(() => {
    autorotate.start()
    viewer.setOptions({
      mousemove: true,
      mousewheel: true
    })
  })
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
