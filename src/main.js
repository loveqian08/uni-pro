import Vue from 'vue'
import App from './App'
import store from './store/store.js';
import flyRequest from './common/request.js';
import { Global } from '@/common/global.js';
import Format from '@/common/format.js';
Vue.config.productionTip = false
// filters
import { filters } from '@/filters/filters.js';
// 注册全局组件
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
Vue.component('mescroll-uni', MescrollUni);

import YFormItem from '@/components/YFormItem.vue';
// import track from '@/common/track.js';

Vue.component('y-form-item', YFormItem);

Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key]);
});
Vue.prototype.$store = store;
Vue.prototype.$http = flyRequest;
Global.init();
Vue.prototype.$global = Global;

Vue.Format = Format;
Vue.prototype.$format = Format;
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
