<script setup>
// 数据部分
const stats = [
  { value: '13', unit: '年', label: '行业沉淀' },
  { value: '150', unit: '+', label: '核心专利' },
  { value: '22', unit: '个', label: '覆盖省市' },
  { value: '2000', unit: 'km', label: '应用里程' },
];
</script>

<template>
  <div class="relative">
    <section class="relative h-screen min-h-[600px] flex items-center bg-slate-900 overflow-hidden pt-20">
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1519817914152-22d216bb9170?q=80&w=2072&auto=format&fit=crop" alt="Tunnel Construction" class="w-full h-full object-cover opacity-40" />
        <div class="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-center gap-12">
        <div class="md:w-3/5 text-white">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-brand-light/20 border border-brand-light/30 rounded-full text-blue-200 text-xs mb-6">
            <span class="animate-pulse w-2 h-2 rounded-full bg-brand-light"></span>
            源于经典 · 引领创新 · 融通百科
          </div>
          <h1 class="text-5xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
            做懂行的<br>
            <span class="text-brand-light">隧道智能建造</span><br>
            产业赋能专家
          </h1>
          <p class="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
            面向工程领域企业、职业院校、科研机构，提供软硬件一体化的全流程数字化解决方案。
          </p>
          <div class="flex gap-4">
            <button class="px-8 py-3 bg-brand-light hover:bg-white hover:text-brand-dark text-white font-bold rounded-sm transition duration-300">
              了解解决方案
            </button>
            <button class="px-8 py-3 border border-gray-500 hover:border-white text-gray-300 hover:text-white font-medium rounded-sm transition duration-300">
              联系我们
            </button>
          </div>
        </div>

        <div class="md:w-2/5 hidden md:block">
          <div class="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-lg shadow-2xl relative overflow-hidden group hover:bg-white/15 transition">
            <h3 class="text-brand-light font-bold text-sm tracking-widest uppercase mb-2">技术依托单位</h3>
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-dark font-bold text-2xl shadow-lg">CSU</div>
              <div>
                <div class="text-2xl font-bold text-white">中南大学</div>
                <div class="text-sm text-gray-300">教授团队直接指导 · 产学研深度融合</div>
              </div>
            </div>
            <hr class="border-white/10 mb-6">
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <span class="text-brand-light mt-1">✓</span>
                <p class="text-sm text-gray-200">全要素、全过程、全覆盖的<br><strong class="text-white">分布式感知技术</strong></p>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-brand-light mt-1">✓</span>
                <p class="text-sm text-gray-200">拥有 <strong class="text-white">2400m²</strong> 钻爆法隧道足尺仿真场地</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-brand-dark text-white py-12 relative z-20 -mt-2">
      <div class="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-blue-800/50 text-center">
        <div v-for="stat in stats" :key="stat.label" class="group">
          <div class="text-4xl font-bold mb-1 group-hover:text-brand-light transition">
            {{ stat.value }}<span class="text-lg font-normal">{{ stat.unit }}</span>
          </div>
          <div class="text-xs text-blue-200 uppercase tracking-widest">{{ stat.label }}</div>
        </div>
      </div>
    </section>
  </div>
</template>