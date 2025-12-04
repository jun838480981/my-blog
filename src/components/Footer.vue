<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type {
  FooterConfig,
  FooterColumn,
  FooterBlock,
  FooterTextBlock,
  FooterLinkBlock,
  FooterQrBlock,
  FooterLogoTitleBlock
} from '../utils/footer'

const footerConfig = ref<FooterConfig | null>(null)

const fetchFooter = async () => {
  try {
    const response = await fetch('/api/footer')
    const data = await response.json()
    footerConfig.value = data
  } catch (error) {
    console.error('Failed to load footer config:', error)
  }
}

const sortedColumns = computed<FooterColumn[]>(() => {
  if (!footerConfig.value) return []
  return [...footerConfig.value.columns].sort((a, b) => a.order - b.order)
})

const isTextBlock = (block: FooterBlock): block is FooterTextBlock =>
  block.type === 'text'
const isLinkBlock = (block: FooterBlock): block is FooterLinkBlock =>
  block.type === 'link'
const isQrBlock = (block: FooterBlock): block is FooterQrBlock =>
  block.type === 'qr'
const isLogoTitleBlock = (block: FooterBlock): block is FooterLogoTitleBlock =>
  block.type === 'logoTitle'

onMounted(async () => {
  await fetchFooter()
})
</script>

<template>
  <footer
    class="bg-[#2a2a2a] text-gray-400 py-16 border-t border-brand-dark/30 font-sans"
  >
    <!-- 顶部多列区域 -->
    <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
      <template v-for="col in sortedColumns" :key="col.id">
        <div :class="[col.widthClass || 'md:col-span-1', col.columnClass]">
          <template
            v-for="block in col.items"
            :key="block.type + '-' + block.order"
          >
            <!-- 文本块 -->
            <p
              v-if="isTextBlock(block)"
              :class="block.textClass || 'text-sm space-y-3'"
            >
              <span
                v-for="(line, idx) in block.text.split('\n')"
                :key="idx"
                class="block"
              >
                {{ line }}
              </span>
            </p>

            <!-- 链接块 -->
            <div
              v-else-if="isLinkBlock(block)"
              :class="block.wrapperClass || 'text-sm mb-2'"
            >
              <a
                :href="block.href"
                :target="block.target"
                :class="block.linkClass || 'hover:text-brand-light transition'"
              >
                <span v-if="block.icon" class="mr-1">{{ block.icon }}</span>
                {{ block.label }}
              </a>
            </div>

            <!-- 二维码块 -->
            <div
              v-else-if="isQrBlock(block)"
              class="flex flex-col items-center md:items-end"
            >
              <div
                :class="
                  block.imageWrapperClass ||
                  'w-32 h-32 bg-white p-2 rounded-sm mb-2'
                "
              >
                <img
                  :src="block.imageUrl"
                  alt="QR Code"
                  :class="block.imageClass || 'w-full h-full'"
                />
              </div>
              <p
                v-if="block.caption"
                :class="
                  block.captionClass || 'text-xs text-center md:text-right'
                "
                v-html="block.caption.replace(/\n/g, '<br>')"
              />
            </div>

            <!-- Logo + 标题块 -->
            <a
              v-else-if="isLogoTitleBlock(block)"
              :href="block.href || undefined"
              :class="
                block.wrapperClass ||
                'flex items-center gap-2 mb-6 cursor-default'
              "
            >
              <div
                :class="
                  block.imageWrapperClass ||
                  'w-8 h-8 bg-brand-dark flex items-center justify-center text-white font-bold rounded-sm'
                "
              >
                <img
                  :src="block.logoImage || '/favicon.svg'"
                  alt="Logo"
                  :class="block.imageClass || 'w-full h-full object-contain'"
                />
              </div>
              <div class="flex flex-col">
                <span
                  :class="block.titleClass || 'text-white font-bold text-lg'"
                >
                  {{ block.title }}
                </span>
                <span
                  v-if="block.subtitle"
                  :class="block.subtitleClass || 'text-xs text-gray-400'"
                >
                  {{ block.subtitle }}
                </span>
              </div>
            </a>
          </template>
        </div>
      </template>
    </div>

    <!-- 底部版权区域 -->
    <div :class="footerConfig?.bottomBackgroundClass">
      <div
        :class="
          footerConfig?.bottomWrapperClass ||
          'max-w-7xl mx-auto px-4 border-t border-gray-700 text-xs text-center'
        "
      >
        <span :class="footerConfig?.bottomTextClass || 'text-gray-600'">
          {{
            footerConfig?.copyright ||
            'Copyright © 2025 长沙普氏科技发展有限公司 版权所有'
          }}
        </span>

        <template v-if="footerConfig?.icpText">
          <span class="mx-1">|</span>
          <a
            v-if="footerConfig.icpLink"
            :href="footerConfig.icpLink"
            target="_blank"
            rel="noreferrer"
            :class="footerConfig.bottomTextClass || 'text-gray-600'"
          >
            {{ footerConfig.icpText }}
          </a>
          <span v-else :class="footerConfig.bottomTextClass || 'text-gray-600'">
            {{ footerConfig.icpText }}
          </span>
        </template>

        <template v-if="footerConfig?.policeText">
          <span class="mx-1">|</span>
          <a
            v-if="footerConfig.policeLink"
            :href="footerConfig.policeLink"
            target="_blank"
            rel="noreferrer"
            :class="footerConfig.bottomTextClass || 'text-gray-600'"
          >
            {{ footerConfig.policeText }}
          </a>
          <span v-else :class="footerConfig.bottomTextClass || 'text-gray-600'">
            {{ footerConfig.policeText }}
          </span>
        </template>
      </div>
    </div>
  </footer>
</template>
