<script setup>
const hardwareList = [
  { title: "衬砌浇筑防脱空监控传感器", desc: "实时监测浇筑饱满度，杜绝质量隐患", icon: "📡" },
  { title: "卫界哨兵主动安全监控系统", desc: "AI 识别危险区域，声光报警联动", icon: "🛡️" },
  { title: "防排水综合管养系统", desc: "智能水位监测，自动排水控制", icon: "💧" }
];
</script>

<template>
  <section id="products" class="py-24 bg-slate-50 font-sans">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <span class="text-brand-dark font-bold tracking-widest uppercase text-sm">Our Products</span>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mt-2">软硬件一体化解决方案</h2>
        <div class="w-20 h-1 bg-brand-light mx-auto mt-4"></div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div class="lg:col-span-7 flex flex-col gap-8">
          <div class="group relative bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200">
            <div class="absolute top-0 right-0 bg-brand-dark text-white text-xs px-3 py-1 z-10">核心产品</div>
            <div class="h-64 overflow-hidden bg-slate-200">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2426&q=80" alt="Dashboard" class="w-full h-full object-cover group-hover:scale-105 transition duration-500 mix-blend-multiply opacity-90">
            </div>
            <div class="p-8">
              <h3 class="text-2xl font-bold text-slate-900 mb-3 group-hover:text-brand-dark transition">钻爆法隧道智能建造综合管控系统</h3>
              <p class="text-slate-600 mb-6 leading-relaxed">
                针对钻爆法隧道建设项目，提供智慧工地和施工管控业务的数字化整体解决方案。集成人员管理、安全监测、质量追溯于一体。
              </p>
              <a href="/products/tunnel-system" class="inline-flex items-center text-brand-light font-bold hover:text-brand-dark">
                查看系统详情 
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
            </div>
          </div>

          <div class="bg-white p-6 rounded-sm shadow-sm border-l-4 border-brand-light hover:shadow-md transition">
            <h4 class="text-lg font-bold text-slate-900 mb-2">产业工人积分管理平台</h4>
            <p class="text-sm text-slate-500">数字化记录工人技能成长与绩效，构建现代化产业工人队伍。</p>
          </div>
        </div>

        <div class="lg:col-span-5 flex flex-col gap-6">
          <div class="bg-brand-dark text-white p-6 rounded-sm">
            <h3 class="text-xl font-bold mb-2">智能感知装备</h3>
            <p class="text-sm text-blue-200">自主研发工业级传感器，适应恶劣隧道环境</p>
          </div>

          <div v-for="item in hardwareList" :key="item.title" class="group bg-white p-6 rounded-sm shadow-sm border border-slate-200 hover:border-brand-light transition cursor-pointer">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-slate-100 rounded-sm flex items-center justify-center text-2xl group-hover:bg-brand-light group-hover:text-white transition">
                {{ item.icon }}
              </div>
              <div>
                <h4 class="text-lg font-bold text-slate-900 mb-1 group-hover:text-brand-light transition">{{ item.title }}</h4>
                <p class="text-sm text-slate-500">{{ item.desc }}</p>
              </div>
            </div>
          </div>
          
          <a href="/products/template" class="block text-center py-3 border-2 border-dashed border-slate-300 text-slate-500 hover:border-brand-dark hover:text-brand-dark font-bold rounded-sm transition">
            + 查看更多硬件产品
          </a>
        </div>
      </div>
    </div>
  </section>
</template>