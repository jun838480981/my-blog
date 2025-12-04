<script setup>
// 这里可以快速调整 LOGO 数量或图片路径
const logos = Array(10).fill({ name: '中国铁建', code: 'CRCC' });
</script>

<template>
  <section id="cases" class="py-16 bg-white border-t border-slate-100 font-sans">
    <div class="max-w-7xl mx-auto px-4 text-center">
      <p class="text-slate-400 text-sm font-bold tracking-widest uppercase mb-10">Trusted By Industry Leaders</p>
      
      <div class="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
        <div v-for="(item, index) in logos" :key="index" class="flex flex-col items-center justify-center gap-2 group cursor-pointer">
          <div class="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100 group-hover:border-brand-dark transition">
            <span class="text-brand-dark font-bold text-xl">{{ item.code }}</span>
          </div>
          <span class="text-xs font-bold text-slate-500 group-hover:text-brand-dark">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>