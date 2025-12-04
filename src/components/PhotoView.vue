<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
// 导入核心模块
import { Viewer, DualFisheyeAdapter, utils } from '@photo-sphere-viewer/core'
import '@photo-sphere-viewer/core/index.css'
// 导入虚拟漫游插件（多场景切换）
import { VirtualTourPlugin } from '@photo-sphere-viewer/virtual-tour-plugin'
import '@photo-sphere-viewer/virtual-tour-plugin/index.css'
// 导入标记插件（热点）
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin'
import '@photo-sphere-viewer/markers-plugin/index.css'

import { AutorotatePlugin } from '@photo-sphere-viewer/autorotate-plugin'

import { CubemapAdapter } from '@photo-sphere-viewer/cubemap-adapter'

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
    name: '隧道洞口',
    panorama: '/scene-1.jpg',
    markers: [
      {
        id: 'marker-1',
        html: getMarkerContent('arrow', '二衬养护区'),
        position: {
          yaw: 5.796742238036393,
          pitch: -0.07873119086209468
        },
        data: {
          type: 'link',
          linkNodeId: 'scene-2'
        }
      },
      {
        id: 'video',
        videoLayer: '/rick.webm',
        position: [
          { yaw: 2.90978, pitch: 0.25583 },
          { yaw: 3.20036, pitch: 0.2522 },
          { yaw: 3.20567, pitch: -0.28784 },
          { yaw: 2.92182, pitch: -0.31297 }
        ],
        style: {
          cursor: 'pointer'
        },
        tooltip: 'Play / Pause'
      }
      // {
      //   id: 'marker-2',
      //   html: getMarkerContent('right-arrow', '跟随镜头右转'),
      //   position: {
      //     yaw: 0.36782480787154204,
      //     pitch: -0.2830344045594404
      //   },
      //   data: {
      //     type: 'link',
      //     linkNodeId: 'scene-3'
      //   }
      // },
      // {
      //   id: 'marker-3',
      //   html: getMarkerContent('dot', '点击查看详情'),
      //   position: {
      //     yaw: 0.45776822721072474,
      //     pitch: -0.039817935248553926
      //   },
      //   data: {
      //     type: 'preview',
      //     images: [
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ]
      //   }
      // }
    ]
  },
  {
    id: 'scene-2',
    name: '二衬养护区',
    panorama: '/scene-2.jpg',
    markers: [
      {
        id: 'marker-1',
        html: getMarkerContent('arrow', '二衬浇筑区'),
        position: {
          yaw: 6.028405405016546,
          pitch: -0.054364160270455875
        },
        data: {
          type: 'link',
          linkNodeId: 'scene-3'
        }
      }
    ]
  },
  {
    id: 'scene-3',
    name: '二衬浇筑区',
    panorama: '/scene-3.jpg',
    markers: [
      {
        id: 'marker-1',
        html: getMarkerContent('arrow', '钢筋绑扎区段'),
        position: {
          yaw: 6.127033879230398,
          pitch: -0.23810474050989283
        },
        data: {
          type: 'link',
          linkNodeId: 'scene-4'
        }
      }
    ]
  },
  {
    id: 'scene-4',
    name: '钢筋绑扎区段',
    panorama: '/scene-4.jpg',
    markers: [
      {
        id: 'marker-1',
        html: getMarkerContent('arrow', '防水层铺挂区段'),
        position: {
          yaw: 6.129206964476406,
          pitch: -0.13961896806402319
        },
        data: {
          type: 'link',
          linkNodeId: 'scene-5'
        }
      }
    ]
  },
  {
    id: 'scene-5',
    name: '防水层铺挂区段',
    panorama: '/scene-5.jpg',
    markers: [
      {
        id: 'marker-1',
        html: getMarkerContent('arrow', '仰拱施工区段'),
        position: {
          yaw: 6.129206964476406,
          pitch: -0.13961896806402319
        },
        data: {
          type: 'link',
          linkNodeId: 'scene-6'
        }
      }
    ]
  },
  {
    id: 'scene-5',
    name: '防水层铺挂区段',
    panorama: '/scene-5.jpg',
    markers: [
      {
        id: 'marker-1',
        html: getMarkerContent('arrow', '仰拱施工区段'),
        position: {
          yaw: 6.129206964476406,
          pitch: -0.13961896806402319
        },
        data: {
          type: 'link',
          linkNodeId: 'scene-6'
        }
      }
    ]
  },
  {
    id: 'scene-6',
    name: '仰拱施工区段',
    panorama: '/scene-6.jpg',
    markers: [
      {
        id: 'marker-1',
        html: getMarkerContent('arrow', '开挖初支区段'),
        position: {
          yaw: 6.129206964476406,
          pitch: -0.13961896806402319
        },
        data: {
          type: 'link',
          linkNodeId: 'scene-7'
        }
      }
    ]
  },
  {
    id: 'scene-7',
    name: '开挖初支区段',
    panorama: '/scene-7.jpg',
    markers: [
      {
        id: 'marker-1',
        html: getMarkerContent('arrow', '返回洞口'),
        position: {
          yaw: 6.129206964476406,
          pitch: -0.13961896806402319
        },
        data: {
          type: 'link',
          linkNodeId: 'scene-1'
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

    // 双鱼眼适配器
    // adapter: DualFisheyeAdapter,

    // adapter: CubemapAdapter, // 立方体贴图适配器
    // panorama: {
    //   left: '/scene-1/six_l.jpg',
    //   front: '/scene-1/six_f.jpg',
    //   right: '/scene-1/six_r.jpg',
    //   back: '/scene-1/six_b.jpg',
    //   top: '/scene-1/six_u.jpg',
    //   bottom: '/scene-1/six_d.jpg'
    // },
    // 默认适配器
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
        autostartDelay: null, // 延迟后自动开始旋转
        autostartOnIdle: true, // 空闲状态自动旋转
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
const viewerReady = () => {
  setTimeout(() => {
    if (isInit) {
      intro(animatedValues.pitch.end, animatedValues.pitch.end)
    }
  }, 5000)
}

// 加载场景标记
const loadMarkers = () => {
  const markersPlugin = viewer.getPlugin(MarkersPlugin) // 正确获取插件
  markersPlugin.setMarkers(sceneList[0].markers)
  markersPlugin.addEventListener('select-marker', ({ marker }) => {
    const markerData = marker.data
    if (marker.id === 'video') {
      if (marker.video.paused) {
        marker.video.play()
      } else {
        marker.video.pause()
      }
    }
    if (markerData.type === 'link') {
      const linkNodeId = markerData.linkNodeId
      const linkNode = sceneList.find((scene) => scene.id === linkNodeId)
      if (linkNode) {
        markersPlugin.clearMarkers()
        viewer.setPanorama(linkNode.panorama).then(() => {
          markersPlugin.setMarkers(linkNode.markers)
        })
      }
    } else if (markerData.type === 'preview') {
      imagePreview.value.show(markerData.images)
    }
  })
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
