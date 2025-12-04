<script setup>
// 如果需要，可以在这里添加 JS 逻辑，比如点击复制微信号等
</script>

<template>
  <div class="fixed right-0 top-1/2 -translate-y-1/2 z-[100] group flex flex-row-reverse items-center font-sans">
    <div class="bg-brand-dark text-white p-3 rounded-l-lg shadow-lg cursor-pointer flex flex-col items-center gap-2 border border-blue-800 transition-all duration-300 hover:bg-brand-light">
      <svg class="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
      </svg>
      <div class="writing-vertical-rl text-sm font-medium tracking-widest h-24 flex items-center justify-center">
        联系我们
      </div>
    </div>

    <div class="w-0 overflow-hidden opacity-0 group-hover:w-[300px] group-hover:opacity-100 transition-all duration-500 ease-out mr-[-1px]">
      <div class="bg-brand-dark text-white p-6 rounded-l-xl shadow-2xl border-l border-t border-b border-blue-700 min-w-[300px]">
        <div class="flex items-start gap-4 mb-6 border-b border-blue-700/50 pb-4">
          <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
          </div>
          <div>
            <div class="text-sm text-blue-200 mb-1">销售经理</div>
            <div class="text-lg font-bold">陈伟业</div>
            <div class="text-xl font-bold font-mono mt-1 text-yellow-400">13138111954</div>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
             <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8.5,14.5c-3.3,0-6-2.5-6-5.5s2.7-5.5,6-5.5s6,2.5,6,5.5S11.8,14.5,8.5,14.5z M8.5,5.1c-2.4,0-4.4,1.8-4.4,4s2,1.8,4.4,1.8 s4.4-1.8,4.4-4S10.9,5.1,8.5,5.1z M6.1,8.8C5.8,8.8,5.5,8.6,5.5,8.2s0.3-0.5,0.5-0.5s0.5,0.3,0.5,0.5S6.3,8.8,6.1,8.8z M8.9,8.8 c-0.3,0-0.5-0.3-0.5-0.5s0.3-0.5,0.5-0.5s0.5,0.3,0.5,0.5S9.2,8.8,8.9,8.8z M16.5,18.5c-2.4,0-4.4-1.9-4.4-4.2s2-4.2,4.4-4.2 s4.4,1.9,4.4,4.2S18.9,18.5,16.5,18.5z M16.5,11.5c-1.6,0-3,1.3-3,2.9s1.3,2.9,3,2.9s3-1.3,3-2.9S18.2,11.5,16.5,11.5z M14.9,14.2 c-0.2,0-0.4-0.2-0.4-0.4c0-0.2,0.2-0.4,0.4-0.4c0.2,0,0.4,0.2,0.4,0.4C15.3,14,15.2,14.2,14.9,14.2z M17.2,14.2 c-0.2,0-0.4-0.2-0.4-0.4c0-0.2,0.2-0.4,0.4-0.4c0.2,0,0.4,0.2,0.4,0.4C17.6,14,17.4,14.2,17.2,14.2z"/></svg>
          </div>
          <div class="bg-white p-1 rounded-lg">
             <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=WeChatContact" alt="WeChat QR" class="w-20 h-20" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .writing-vertical-rl {
    writing-mode: vertical-rl;
    text-orientation: upright;
  }
</style>