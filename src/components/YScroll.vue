<template>
	<!-- 小程序不支持  v-bind="$attrs" v-on="$listeners" -->
	<!-- <mescroll-uni 
	ref="mescrollRef" 
	@init="mescrollInit" 
	@down="downCallback" 
	@up="upCallback" 
	:up="upOption" 
	v-bind="$attrs" 
	v-on="$listeners"> -->
	
	<mescroll-uni 
        ref="mescrollRef" 
        @init="mescrollInit" 
        @down="downCallback" 
        @up="upCallback" 
		:fixed="fixed"
        :up="upOption">
        <slot :list="list" :response="response"></slot>
    </mescroll-uni>
</template>

<script>
    /**
     * mescroll 使用文档
     * http://www.mescroll.com/uni.html#mescrolluni
     * 
     * 当前组件部分配置是改在 @/components/mescroll-uni/mescroll-uni-option.js 全局配置
     */
    // 事件：loadData: 每次请求数据后都会触发  success：只有在第一页时才会触发
    // 
    // 引入mescroll-mixins.js
    import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
        mixins: [MescrollMixin],
        props: {
            pageStartField: {
                type: String,
                default: 'NEXT_KEY'
            },
            pageLimitField: {
                type: String,
                default: 'PAGE_SIZE'
            },
            dataField: {
                type: String,
                default: 'LIST'
            },
            // 总计数据条数字段，会用于计算当前列表是否已全部加载
            totalField: {
                type: String,
                default: 'TotLineNum'
            },
            // 计算是否还有更有的数据，返回值为 true/false  
            computeHasMore: {
                type: Function,
                default: null
            },
            url: {
                type: String,
                required: true
            },
            params: {
                type: Object,
                default () {
                    return {};
                }
            },
			fixed: {
				type: Boolean,
				default: false
			}
        },
		data() {
			return {
                // 此次请求的原始响应的数据
                response: null,
				list: [],
                loading: false,
                upOption: {}
			};
		},
        methods: {
            refresh () {
                this.mescroll.resetUpScroll();
            },
            upCallback (page) {
                if (this.loading) return;
                this.loading = true;
                let pageNum = page.num; // 页码, 默认从1开始
                let pageSize = page.size; // 页长, 默认每页10条
                this.$http.post(this.url, {
                    ...this.params,
                    [this.pageLimitField]: pageSize + '',
                    [this.pageStartField]: pageNum + ''
                }).then(rsp => {
                    this.response = rsp;
                    pageNum === 1 && this.$emit('success', rsp);
                    this.$emit('loadData', rsp);
                    if (rsp.STATUS == 1) {
                        let datas = this.dataField ? (rsp[this.dataField] || []) : rsp;
                        let list = [];
                        if (pageNum != 1) {
                            list = [ ...this.list, ...datas ];
                        } else {
                            list = [ ...datas ];
                        }
                        this.list = list;
                        const hasMore = this._hasMore(pageNum, rsp);
                        this.mescroll.endSuccess(this.list.length, hasMore);
                    } else {
                        // this.$native.alertInfo(rsp.MSG || '加载失败');
						uni.showToast({
							title: rsp.MSG || '加载失败',
							icon: 'none'
						})
                        this.mescroll.endErr();
                    }
                }, e => {
                    this.mescroll.endErr();
                }).catch(e => {
                    this.mescroll.endErr();
                }).finally(() => {
                    this.loading = false;
                });
            },
            _hasMore (pageNum, rst) {
                if (typeof this.computeHasMore === 'function') {
                    return this.computeHasMore(pageNum, rst, this.list);
                }
                let hasMore = true;
                let nextKey = rst[this.pageStartField];
                if (rst[this.totalField] !== undefined) {
                    hasMore = this.list.length - rst[this.totalField] < 0;
                } else if (nextKey == "" || nextKey == null || nextKey == -1) {
                    hasMore = false;
                } else {
                    hasMore = true;
                }
                return hasMore;
            },
            resetUpScroll () {
                setTimeout(() => {
                    this.mescroll.resetUpScroll();
                }, 0);
            },
            cleanList () {
                this.list = []
            }
        }
	}
</script>

<style lang="scss">

</style>
