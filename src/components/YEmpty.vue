<template>
	<mescroll-empty v-if="show" 
        :option="optEmpty" 
        @emptyclick="emptyClick">
    </mescroll-empty>
    <!-- <mescroll-empty v-if="show" 
        v-bind="$attrs" 
        v-on="$listeners">
    </mescroll-empty> -->
</template>

<script>
    /**
     * 
     * option:
      icon : null ,
      tip : "暂无相关数据",
      btnText : "",     // 如果有此文本，将显示一按钮，点击会回调 emptyclick 事件
      fixed: false,
      top: "100rpx",
      zIndex: 99
      
      
      
      <mescroll-empty v-bind="$attrs" :option="optEmpty" @emptyclick="emptyClick"></mescroll-empty>
     */
    import MescrollEmpty from '@/components/mescroll-uni/components/mescroll-empty.vue';
	export default {
        components: {
            MescrollEmpty
        },
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
		data() {
			return {
				
			};
		},
        methods: {
            emptyClick () {}
        }
	}
</script>

<style lang="scss">

</style>
