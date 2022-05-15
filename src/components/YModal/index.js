import Vue from 'vue'
import YModal from '@/components/YModal/YModal.vue'

const YDialogConstructor = Vue.extend(YModal)

const DiaLog = (data) => {
	let instance = new YDialogConstructor({
			data
		}).$mount();
	document.body.appendChild(instance.$el)
	Vue.nextTick(() => {
		instance.open();
	})
	return instance;
}

export default {
	install: Vue => {
		Vue.prototype.$ymodal = DiaLog
	}
}