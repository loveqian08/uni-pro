<template>
	<y-cell-input :className="'y-password ' + className" 
		ref="yCellInput"
		:total="total"
		:passowrd="true"
		inputType="number" :focus="focus"
		:default-value="defaultValue"
		:cursor-spacing="cursorSpacing" :confirm-type="confirmType" @onInputEnd="onInputEnd" @onSubmit="onSubmit"/>
</template>

<script>
	import YCellInput from './YCellInput.vue';
	import { Keyboard } from '@/common/keyou-crypto-min.js';
	export default {
		components: {
			YCellInput
		},
		props: {
			total: {
				type: Number,
				default: 6
			},
			focus: {
				type: Boolean,
				default: false
			},
			cursorSpacing: {
				type: Number,
				default: 0
			},
			confirmType: {
				type: String,
				default: ''
			},
			defaultValue: {
				type: String,
				default: ''
			},
			className: {
				type: String,
				default: ''
			}
		},
		created () {
			this.keyboard = new Keyboard(6, true, false);
		},
		data() {
			return {
				
			};
		},
		methods: {
			onSubmit (v) {
				if (v && v.length === 6) {
					let val = this.keyboard.getCipherWithSM2(this.$global.publicKey, false, v).ciphertext;
					this.$emit('onSubmit', val);
				} else {
					this.$emit('onSubmit', v);
				}
			},
			onInputEnd (v) {
				let val = this.keyboard.getCipherWithSM2(this.$global.publicKey, false, v).ciphertext;
				this.$emit('onInputEnd', val);
			},
			/**
			 * 返回原始结果
			 */
			getResult () {
				return this.$refs.yCellInput.getResult();
			},
			/**
			 * 返回加密后的结果
			 */
			getTransResult () {
				return this.keyboard.getCipherWithSM2(this.$global.publicKey, false, this.getResult()).ciphertext;
			},
			/**
			 * 对数据加密
			 * @param {Object} v
			 */
			encryption (v) {
				return this.keyboard.getCipherWithSM2(this.$global.publicKey, false, v).ciphertext;
			},
			/**
			 * 重置
			 */
			reset () {
				this.$refs.yCellInput.reset();
			}
		}
	}
</script>

<style lang="scss">

</style>
