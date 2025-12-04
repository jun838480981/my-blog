<script setup>
import { ref, reactive } from 'vue';

// 表单响应式数据
const formData = reactive({
  name: '',
  phone: '',
  company: '',
  product: '钻爆法隧道智能建造综合管控系统', // 默认选中旗舰产品
  remark: ''
});

// 提交状态管理
const isSubmitting = ref(false);
const submitStatus = ref(null); // 'success' | 'error' | null

// 产品选项列表
const productOptions = [
  '钻爆法隧道智能建造综合管控系统',
  '衬砌浇筑防脱空监控传感器',
  '卫界哨兵主动安全监控系统',
  '防排水综合管养系统',
  '产业工人积分管理平台',
  '其他'
];

// 提交处理函数
const handleSubmit = async () => {
  // 简单的校验逻辑
  if (!formData.name || !formData.phone || !formData.company) {
    alert('请填写所有必填项');
    return;
  }

  isSubmitting.value = true;
  submitStatus.value = null;

  try {
    // TODO: 这里替换为真实的 API 调用
    // await axios.post('/api/contact', formData);
    
    // 模拟网络请求延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    submitStatus.value = 'success';
    alert('提交成功！我们会尽快与您联系。');
    
    // 重置表单
    formData.name = '';
    formData.phone = '';
    formData.company = '';
    formData.remark = '';
  } catch (error) {
    console.error(error);
    submitStatus.value = 'error';
    alert('提交失败，请稍后重试或直接拨打热线。');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px] font-sans">
    
    <div class="md:w-1/2 p-8 md:p-16">
      <h1 class="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
        请留下您的联系方式
        <span class="text-sm font-normal text-slate-400 ml-2">(带 * 为必填项)</span>
      </h1>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">姓名 <span class="text-red-500">*</span></label>
          <input 
            v-model="formData.name"
            type="text" 
            required
            class="w-full px-4 py-3 rounded border border-gray-300 focus:border-brand-dark focus:ring-1 focus:ring-brand-dark outline-none transition placeholder-gray-400" 
            placeholder="请输入您的姓名" 
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">手机号码 <span class="text-red-500">*</span></label>
          <input 
            v-model="formData.phone"
            type="tel" 
            required
            pattern="^1[3-9]\d{9}$"
            class="w-full px-4 py-3 rounded border border-gray-300 focus:border-brand-dark focus:ring-1 focus:ring-brand-dark outline-none transition placeholder-gray-400" 
            placeholder="请输入您的手机号码" 
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">单位/企业名称 <span class="text-red-500">*</span></label>
          <input 
            v-model="formData.company"
            type="text" 
            required
            class="w-full px-4 py-3 rounded border border-gray-300 focus:border-brand-dark focus:ring-1 focus:ring-brand-dark outline-none transition placeholder-gray-400" 
            placeholder="请输入单位全称" 
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">意向产品</label>
          <div class="relative">
            <select 
              v-model="formData.product"
              class="w-full px-4 py-3 rounded border border-gray-300 focus:border-brand-dark focus:ring-1 focus:ring-brand-dark outline-none transition bg-white appearance-none cursor-pointer"
            >
              <option v-for="opt in productOptions" :key="opt" :value="opt">{{ opt }}</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <div>
           <label class="block text-sm font-medium text-slate-700 mb-1">备注</label>
           <textarea 
             v-model="formData.remark"
             rows="3" 
             class="w-full px-4 py-3 rounded border border-gray-300 focus:border-brand-dark focus:ring-1 focus:ring-brand-dark outline-none transition placeholder-gray-400"
             placeholder="请输入您的具体需求或问题..."
           ></textarea>
        </div>

        <div class="text-xs text-gray-400 mt-4 mb-6 leading-relaxed">
            普氏企业非常重视客户隐私保护，我们承诺您留下的信息仅用于商务对接，绝不会对外传播。
        </div>

        <button 
          type="submit" 
          :disabled="isSubmitting"
          class="w-full bg-brand-dark text-white font-bold py-4 rounded shadow-lg hover:bg-brand-light hover:shadow-xl transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span v-if="isSubmitting" class="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
          {{ isSubmitting ? '正在提交...' : '立即提交' }}
        </button>
      </form>
    </div>

    <div class="md:w-1/2 bg-slate-50 p-8 md:p-16 flex flex-col items-center justify-center text-center border-l border-gray-100 relative overflow-hidden">
         <div class="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 -translate-y-1/2"></div>
         <div class="absolute bottom-0 left-0 w-64 h-64 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 translate-y-1/2"></div>

         <div class="relative z-10 mb-10">
             <div class="text-brand-dark font-bold text-3xl md:text-4xl flex items-center justify-center gap-3 font-mono tracking-tight">
                 <svg class="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.057 15.057 0 01-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1.01A11.36 11.36 0 018.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/></svg>
                 400-066-0388
             </div>
             <p class="text-slate-500 mt-3 font-medium">在线时间：周一到周五，9:00 - 18:00</p>
         </div>

         <div class="relative z-10 bg-white p-6 rounded-xl shadow-lg border border-gray-100 group hover:shadow-xl transition duration-300">
             <div class="w-48 h-48 bg-gray-100 rounded mb-4 overflow-hidden">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Service" alt="WeChat Service" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
             </div>
             <div class="flex items-center justify-center gap-2 text-slate-700 font-bold text-sm">
                 <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                 扫码添加专属客服
             </div>
         </div>
         
         <div class="relative z-10 mt-12 grid grid-cols-2 gap-8 text-left w-full max-w-sm">
             <div>
                 <h4 class="font-bold text-slate-900 mb-1">总部地址</h4>
                 <p class="text-xs text-slate-500 leading-relaxed">长沙市岳麓区湘江智谷人工智能科技城</p>
             </div>
             <div>
                 <h4 class="font-bold text-slate-900 mb-1">商务邮箱</h4>
                 <p class="text-xs text-slate-500">cspstech@csps.com</p>
             </div>
         </div>
    </div>

  </div>
</template>