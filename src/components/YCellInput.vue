<template>
	<view class="y-cell-input" :class="className">
		<view class="cells">
			<view class="cell-item" v-for="(item, i) in totalArr" :key="i">
				<template v-if="passowrd">
					<view class="circle-dot" v-if="showItems[i]"></view>
				</template>
				<template v-else>
					{{showItems[i] || ''}}
				</template>
			</view>
		</view>
		<input 
			class="y-input" 
			:type="inputType" 
			:maxlength="total" 
			:password="passowrd" 
			:focus="focus" 
			:cursor-spacing="cursorSpacing" :confirm-type="confirmType"
		 v-model="result"
		 @focus="onFocus"
		 @confirm="submit"/>
	</view>
</template>

<script>
	export default {
		props: {
			total: {
				type: Number,
				default: 6
			},
			passowrd: {
				type: Boolean,
				default: false
			},
			inputType: {
				type: String,
				default: 'text'
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
		data() {
			return {
				result: ''
			};
		},
		created () {
			this.result = this.defaultValue;
		},
		computed: {
			showItems () {
				return this.result.split('');
			},
			totalArr () {
				let arr = new Array(this.total);
				arr.fill(0);
				return arr;
			}
		},
		methods: {
			onFocus () {
				this.result = this.result ? this.result : this.defaultValue;
			},
			submit ({detail:{value}}) {
				this.$emit('onSubmit', value);
			},
			getResult () {
				return this.result;
			},
			reset () {
				this.result = this.defaultValue;
			}
		},
		watch: {
			result (v) {
				if (v.length === this.total) {
					uni.hideKeyboard(); // 关闭键盘
					this.$emit('onInputEnd', v);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.y-cell-input{
		position: relative;
		display: flex;
		justify-content: center;
		justify-content: stretch;
		min-width: 600rpx;
		height: 100rpx;
		overflow: hidden;
	}
	.cells {
		flex: 1;
		display: flex;
		justify-content: stretch;
		background: #FFFFFF;
		border: 1px solid #CBCFD6;
		box-sizing: border-box;
		min-width: 600rpx;
		max-width: 750rpx;
		.cell-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid #CBCFD6;
			font-size: 32rpx;
			width: 100rpx;
			&:last-child{
				border-right: none;
			}
			
			.circle-dot{
				width: 20rpx;
				height: 20rpx;
				border-radius: 50%;
				background-color: #353535;
			}
		}
	}
	.y-input{
		position: absolute;
		left: -1200px;
		right: 0;
		top: 0;
		bottom: 0;
		opacity: 0;
		height: 100%;
		width: 2000px;
		text-align: left;
	}
</style>
