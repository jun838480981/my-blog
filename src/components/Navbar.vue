<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { MenuItem } from '../utils/menu'
import type { NavbarConfig, NavbarItem } from '../utils/navbar'

const menuItems = ref<MenuItem[]>([])
const navbarConfig = ref<NavbarConfig | null>(null)

const fetchMenu = async () => {
  try {
    const response = await fetch('/api/menu')
    const data = await response.json()
    console.log('🚀 ~ fetchMenu ~ data:', data)
    menuItems.value = data
  } catch (error) {
    console.error('Failed to load menu items:', error)
  }
}

const fetchNavbar = async () => {
  try {
    const response = await fetch('/api/navbar')
    const data = await response.json()
    navbarConfig.value = data
  } catch (error) {
    console.error('Failed to load navbar config:', error)
  }
}

const getItemsByAlign = (align: 'left' | 'center' | 'right'): NavbarItem[] => {
  const cfg = navbarConfig.value
  if (!cfg || !cfg.items) return []
  return [...cfg.items]
    .filter((item) => item.align === align)
    .sort((a, b) => a.order - b.order)
}

onMounted(async () => {
  await Promise.all([fetchMenu(), fetchNavbar()])
})
</script>

<template>
  <nav
    class="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 h-20 flex items-center shadow-sm font-sans"
  >
    <div
      class="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center"
    >
      <!-- 左侧区域：按 align=left & order 渲染多个块 -->
      <div class="flex items-center">
        <template
          v-for="(navItem, idx) in getItemsByAlign('left')"
          :key="'left-' + idx"
        >
          <!-- 左侧：Logo 区域 -->
          <a
            v-if="navItem.type === 'logo'"
            :href="navItem.logo?.href || '/'"
            class="flex items-center gap-3 group mr-4"
          >
            <div
              class="w-10 h-10 bg-brand-dark flex items-center justify-center text-white font-bold rounded-sm group-hover:bg-brand-light transition"
            >
              <img
                :src="navItem.logo?.logoImage || '/favicon.svg'"
                :alt="navItem.logo?.companyName || '普氏企业'"
                class="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1
                class="text-xl font-bold text-brand-dark tracking-wider leading-none"
              >
                {{ navItem.logo?.companyName || '普氏企业' }}
              </h1>
              <span class="text-[10px] text-gray-500 uppercase tracking-widest">
                {{ navItem.logo?.slogan || 'Popular System' }}
              </span>
            </div>
          </a>

          <!-- 左侧：菜单区域 -->
          <div
            v-else-if="navItem.type === 'menu'"
            class="hidden md:flex space-x-2 text-sm font-medium text-slate-600 h-full items-center mr-4"
          >
            <template v-for="item in menuItems" :key="item.id">
              <!-- 页面链接 -->
              <a
                v-if="item.type === 'page'"
                :href="item.path"
                :target="item.target"
                class="hover:text-brand-dark transition h-full flex items-center px-4 relative group"
              >
                {{ item.title }}
                <span
                  class="absolute bottom-0 left-0 w-full h-0.5 bg-brand-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                ></span>
              </a>

              <!-- 外部链接 -->
              <a
                v-else-if="item.type === 'external'"
                :href="item.path"
                :target="item.target"
                class="hover:text-brand-dark transition h-full flex items-center px-4 relative group"
              >
                {{ item.title }}
                <span
                  class="absolute bottom-0 left-0 w-full h-0.5 bg-brand-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                ></span>
              </a>

              <!-- 下拉菜单 -->
              <div
                v-else-if="item.type === 'dropdown'"
                class="relative group h-full flex items-center"
              >
                <button
                  class="relative flex items-center gap-1 hover:text-brand-dark transition cursor-pointer focus:outline-none h-full px-4"
                >
                  {{ item.title }}
                  <svg
                    class="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                  <span
                    class="absolute bottom-0 left-0 w-full h-0.5 bg-brand-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  ></span>
                </button>

                <div
                  class="absolute left-1/2 -translate-x-1/2 top-full pt-0 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out"
                  :class="item.dropdownWidth || 'w-auto'"
                >
                  <div
                    class="bg-white rounded-sm shadow-xl border-t-4 border-brand-dark overflow-hidden mt-1 flex"
                  >
                    <!-- 有分组的下拉菜单 -->
                    <template v-if="item.groups && item.groups.length > 0">
                      <div
                        v-for="group in item.groups"
                        :key="group.id"
                        class="flex-1 p-5 border-r border-gray-100 last:border-r-0"
                        :class="[
                          group.bgColorClass,
                          group.position === 'right' ? 'order-2' : 'order-1'
                        ]"
                      >
                        <div
                          class="flex items-center gap-2 mb-4 text-brand-dark font-bold text-xs uppercase tracking-wider"
                        >
                          <span
                            class="w-1 h-4 block"
                            :class="group.titleColorClass"
                          ></span>
                          {{ group.title }}
                        </div>

                        <div class="space-y-1">
                          <a
                            v-for="subItem in group.items"
                            :key="subItem.id"
                            :href="subItem.path"
                            class="block rounded hover:bg-blue-50/50 transition group/item p-3 hover:shadow-sm hover:bg-white"
                          >
                            <div class="flex items-center gap-3">
                              <span
                                v-if="subItem.icon"
                                class="text-xl grayscale group-hover/item:grayscale-0 flex-shrink-0"
                                >{{ subItem.icon }}</span
                              >
                              <div class="flex-1">
                                <div
                                  class="font-bold text-slate-800 group-hover/item:text-brand-light"
                                >
                                  {{ subItem.title }}
                                </div>
                                <p
                                  v-if="subItem.description"
                                  class="text-xs text-gray-500 mt-1"
                                >
                                  {{ subItem.description }}
                                </p>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </template>

                    <!-- 无分组的下拉菜单 -->
                    <div
                      v-else-if="item.items && item.items.length > 0"
                      class="w-full p-5"
                    >
                      <div class="flex flex-wrap gap-4">
                        <a
                          v-for="subItem in item.items"
                          :key="subItem.id"
                          :href="subItem.path"
                          class="rounded hover:bg-blue-50/50 transition group/item p-3 hover:shadow-sm hover:bg-white flex-1 min-w-max"
                        >
                          <div class="flex items-center gap-3">
                            <span
                              v-if="subItem.icon"
                              class="text-xl grayscale group-hover/item:grayscale-0 flex-shrink-0"
                              >{{ subItem.icon }}</span
                            >
                            <div class="flex-1">
                              <div
                                class="font-bold text-slate-800 group-hover/item:text-brand-light"
                              >
                                {{ subItem.title }}
                              </div>
                              <p
                                v-if="subItem.description"
                                class="text-xs text-gray-500 mt-1"
                              >
                                {{ subItem.description }}
                              </p>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>

          <!-- 左侧：按钮 -->
          <a
            v-else-if="navItem.type === 'button'"
            :href="navItem.button?.href || '/contact'"
            class="hidden md:inline-flex px-6 py-2 bg-brand-dark text-white text-sm font-medium rounded-sm hover:bg-brand-light transition shadow-lg shadow-blue-900/20 mr-2"
          >
            {{ navItem.button?.text || '产品咨询' }}
          </a>
        </template>
      </div>

      <!-- 中间区域：按 align=center & order 渲染多个块 -->
      <div class="hidden md:flex flex-1 justify-center items-center h-full">
        <template
          v-for="(navItem, idx) in getItemsByAlign('center')"
          :key="'center-' + idx"
        >
          <!-- 中间：Logo -->
          <a
            v-if="navItem.type === 'logo'"
            :href="navItem.logo?.href || '/'"
            class="flex items-center gap-3 group mx-4"
          >
            <div
              class="w-10 h-10 bg-brand-dark flex items-center justify-center text-white font-bold rounded-sm group-hover:bg-brand-light transition"
            >
              <img
                :src="navItem.logo?.logoImage || '/favicon.svg'"
                :alt="navItem.logo?.companyName || '普氏企业'"
                class="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1
                class="text-xl font-bold text-brand-dark tracking-wider leading-none"
              >
                {{ navItem.logo?.companyName || '普氏企业' }}
              </h1>
              <span class="text-[10px] text-gray-500 uppercase tracking-widest">
                {{ navItem.logo?.slogan || 'Popular System' }}
              </span>
            </div>
          </a>

          <!-- 中间：菜单 -->
          <div
            v-else-if="navItem.type === 'menu'"
            class="flex space-x-2 text-sm font-medium text-slate-600 h-full items-center mx-4"
          >
            <template v-for="item in menuItems" :key="item.id">
              <!-- 页面链接 -->
              <a
                v-if="item.type === 'page'"
                :href="item.path"
                :target="item.target"
                class="hover:text-brand-dark transition h-full flex items-center px-4 relative group"
              >
                {{ item.title }}
                <span
                  class="absolute bottom-0 left-0 w-full h-0.5 bg-brand-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                ></span>
              </a>

              <!-- 外部链接 -->
              <a
                v-else-if="item.type === 'external'"
                :href="item.path"
                :target="item.target"
                class="hover:text-brand-dark transition h-full flex items-center px-4 relative group"
              >
                {{ item.title }}
                <span
                  class="absolute bottom-0 left-0 w-full h-0.5 bg-brand-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                ></span>
              </a>

              <!-- 下拉菜单 -->
              <div
                v-else-if="item.type === 'dropdown'"
                class="relative group h-full flex items-center"
              >
                <button
                  class="relative flex items-center gap-1 hover:text-brand-dark transition cursor-pointer focus:outline-none h-full px-4"
                >
                  {{ item.title }}
                  <svg
                    class="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                  <span
                    class="absolute bottom-0 left-0 w-full h-0.5 bg-brand-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  ></span>
                </button>

                <div
                  class="absolute left-1/2 -translate-x-1/2 top-full pt-0 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out"
                  :class="item.dropdownWidth || 'w-auto'"
                >
                  <div
                    class="bg-white rounded-sm shadow-xl border-t-4 border-brand-dark overflow-hidden mt-1 flex"
                  >
                    <!-- 有分组的下拉菜单 -->
                    <template v-if="item.groups && item.groups.length > 0">
                      <div
                        v-for="group in item.groups"
                        :key="group.id"
                        class="flex-1 p-5 border-r border-gray-100 last:border-r-0"
                        :class="[
                          group.bgColorClass,
                          group.position === 'right' ? 'order-2' : 'order-1'
                        ]"
                      >
                        <div
                          class="flex items-center gap-2 mb-4 text-brand-dark font-bold text-xs uppercase tracking-wider"
                        >
                          <span
                            class="w-1 h-4 block"
                            :class="group.titleColorClass"
                          ></span>
                          {{ group.title }}
                        </div>

                        <div class="space-y-1">
                          <a
                            v-for="subItem in group.items"
                            :key="subItem.id"
                            :href="subItem.path"
                            class="block rounded hover:bg-blue-50/50 transition group/item p-3 hover:shadow-sm hover:bg-white"
                          >
                            <div class="flex items-center gap-3">
                              <span
                                v-if="subItem.icon"
                                class="text-xl grayscale group-hover/item:grayscale-0 flex-shrink-0"
                                >{{ subItem.icon }}</span
                              >
                              <div class="flex-1">
                                <div
                                  class="font-bold text-slate-800 group-hover/item:text-brand-light"
                                >
                                  {{ subItem.title }}
                                </div>
                                <p
                                  v-if="subItem.description"
                                  class="text-xs text-gray-500 mt-1"
                                >
                                  {{ subItem.description }}
                                </p>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </template>

                    <!-- 无分组的下拉菜单 -->
                    <div
                      v-else-if="item.items && item.items.length > 0"
                      class="w-full p-5"
                    >
                      <div class="flex flex-wrap gap-4">
                        <a
                          v-for="subItem in item.items"
                          :key="subItem.id"
                          :href="subItem.path"
                          class="rounded hover:bg-blue-50/50 transition group/item p-3 hover:shadow-sm hover:bg-white flex-1 min-w-max"
                        >
                          <div class="flex items-center gap-3">
                            <span
                              v-if="subItem.icon"
                              class="text-xl grayscale group-hover/item:grayscale-0 flex-shrink-0"
                              >{{ subItem.icon }}</span
                            >
                            <div class="flex-1">
                              <div
                                class="font-bold text-slate-800 group-hover/item:text-brand-light"
                              >
                                {{ subItem.title }}
                              </div>
                              <p
                                v-if="subItem.description"
                                class="text-xs text-gray-500 mt-1"
                              >
                                {{ subItem.description }}
                              </p>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>

          <!-- 中间：按钮 -->
          <a
            v-else-if="navItem.type === 'button'"
            :href="navItem.button?.href || '/contact'"
            class="px-6 py-2 bg-brand-dark text-white text-sm font-medium rounded-sm hover:bg-brand-light transition shadow-lg shadow-blue-900/20 mx-2"
          >
            {{ navItem.button?.text || '产品咨询' }}
          </a>
        </template>
      </div>

      <!-- 右侧区域：按 align=right & order 渲染多个块 -->
      <div class="flex items-center">
        <template
          v-for="(navItem, idx) in getItemsByAlign('right')"
          :key="'right-' + idx"
        >
          <!-- 右侧：Logo -->
          <a
            v-if="navItem.type === 'logo'"
            :href="navItem.logo?.href || '/'"
            class="hidden md:flex items-center gap-3 group ml-4"
          >
            <div
              class="w-10 h-10 bg-brand-dark flex items-center justify-center text-white font-bold rounded-sm group-hover:bg-brand-light transition"
            >
              <img
                :src="navItem.logo?.logoImage || '/favicon.svg'"
                :alt="navItem.logo?.companyName || '普氏企业'"
                class="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1
                class="text-xl font-bold text-brand-dark tracking-wider leading-none"
              >
                {{ navItem.logo?.companyName || '普氏企业' }}
              </h1>
              <span class="text-[10px] text-gray-500 uppercase tracking-widest">
                {{ navItem.logo?.slogan || 'Popular System' }}
              </span>
            </div>
          </a>

          <!-- 右侧：菜单 -->
          <div
            v-else-if="navItem.type === 'menu'"
            class="hidden md:flex space-x-2 text-sm font-medium text-slate-600 h-full items-center ml-4"
          >
            <template v-for="item in menuItems" :key="item.id">
              <!-- 页面链接 -->
              <a
                v-if="item.type === 'page'"
                :href="item.path"
                :target="item.target"
                class="hover:text-brand-dark transition h-full flex items-center px-4 relative group"
              >
                {{ item.title }}
                <span
                  class="absolute bottom-0 left-0 w-full h-0.5 bg-brand-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                ></span>
              </a>

              <!-- 外部链接 -->
              <a
                v-else-if="item.type === 'external'"
                :href="item.path"
                :target="item.target"
                class="hover:text-brand-dark transition h-full flex items-center px-4 relative group"
              >
                {{ item.title }}
                <span
                  class="absolute bottom-0 left-0 w-full h-0.5 bg-brand-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                ></span>
              </a>

              <!-- 下拉菜单 -->
              <div
                v-else-if="item.type === 'dropdown'"
                class="relative group h-full flex items-center"
              >
                <button
                  class="relative flex items-center gap-1 hover:text-brand-dark transition cursor-pointer focus:outline-none h-full px-4"
                >
                  {{ item.title }}
                  <svg
                    class="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                  <span
                    class="absolute bottom-0 left-0 w-full h-0.5 bg-brand-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  ></span>
                </button>

                <div
                  class="absolute left-1/2 -translate-x-1/2 top-full pt-0 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out"
                  :class="item.dropdownWidth || 'w-auto'"
                >
                  <div
                    class="bg-white rounded-sm shadow-xl border-t-4 border-brand-dark overflow-hidden mt-1 flex"
                  >
                    <!-- 有分组的下拉菜单 -->
                    <template v-if="item.groups && item.groups.length > 0">
                      <div
                        v-for="group in item.groups"
                        :key="group.id"
                        class="flex-1 p-5 border-r border-gray-100 last:border-r-0"
                        :class="[
                          group.bgColorClass,
                          group.position === 'right' ? 'order-2' : 'order-1'
                        ]"
                      >
                        <div
                          class="flex items-center gap-2 mb-4 text-brand-dark font-bold text-xs uppercase tracking-wider"
                        >
                          <span
                            class="w-1 h-4 block"
                            :class="group.titleColorClass"
                          ></span>
                          {{ group.title }}
                        </div>

                        <div class="space-y-1">
                          <a
                            v-for="subItem in group.items"
                            :key="subItem.id"
                            :href="subItem.path"
                            class="block rounded hover:bg-blue-50/50 transition group/item p-3 hover:shadow-sm hover:bg-white"
                          >
                            <div class="flex items-center gap-3">
                              <span
                                v-if="subItem.icon"
                                class="text-xl grayscale group-hover/item:grayscale-0 flex-shrink-0"
                                >{{ subItem.icon }}</span
                              >
                              <div class="flex-1">
                                <div
                                  class="font-bold text-slate-800 group-hover/item:text-brand-light"
                                >
                                  {{ subItem.title }}
                                </div>
                                <p
                                  v-if="subItem.description"
                                  class="text-xs text-gray-500 mt-1"
                                >
                                  {{ subItem.description }}
                                </p>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </template>

                    <!-- 无分组的下拉菜单 -->
                    <div
                      v-else-if="item.items && item.items.length > 0"
                      class="w-full p-5"
                    >
                      <div class="flex flex-wrap gap-4">
                        <a
                          v-for="subItem in item.items"
                          :key="subItem.id"
                          :href="subItem.path"
                          class="rounded hover:bg-blue-50/50 transition group/item p-3 hover:shadow-sm hover:bg-white flex-1 min-w-max"
                        >
                          <div class="flex items-center gap-3">
                            <span
                              v-if="subItem.icon"
                              class="text-xl grayscale group-hover/item:grayscale-0 flex-shrink-0"
                              >{{ subItem.icon }}</span
                            >
                            <div class="flex-1">
                              <div
                                class="font-bold text-slate-800 group-hover/item:text-brand-light"
                              >
                                {{ subItem.title }}
                              </div>
                              <p
                                v-if="subItem.description"
                                class="text-xs text-gray-500 mt-1"
                              >
                                {{ subItem.description }}
                              </p>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>

          <!-- 右侧：按钮 -->
          <a
            v-else-if="navItem.type === 'button'"
            :href="navItem.button?.href || '/contact'"
            class="hidden md:inline-flex px-6 py-2 bg-brand-dark text-white text-sm font-medium rounded-sm hover:bg-brand-light transition shadow-lg shadow-blue-900/20 ml-2"
          >
            {{ navItem.button?.text || '产品咨询' }}
          </a>
        </template>
      </div>
    </div>
  </nav>
</template>
