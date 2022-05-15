<template>
	<uni-icons :type="type" :size="reSize" :color="color" class="ym-icons" :class="className" @tap="onTap"></uni-icons>
</template>

<script>
	export default {
		components: {
			// uniIcons
		},
		props: {
			type: {
				type: String
			},
			size: {
				type: Number,
				default: 32
			},
			color: {
				type: String,
				default: ''
			},
			className: {
				type: String,
				default: ''
			}
		},
        data () {
            return {
                // #ifdef QUICKAPP-WEBVIEW-HUAWEI
                reSize: 16
                // #endif
                
            }
        },
		computed: {
            // #ifndef QUICKAPP-WEBVIEW-HUAWEI
            reSize () {
            	return uni.upx2px(this.size);
            }
            // #endif
			
		},
		methods: {
			onTap () {
				this.$emit('onTap');
			}
		},
        // #ifdef QUICKAPP-WEBVIEW-HUAWEI
        watch: {
            size: {
                handler (v) {
                    this.reSize = uni.upx2px(v);
                },
                immediate: true
            }
        }
        // #endif
	}
</script>

<style lang="scss">

</style>
