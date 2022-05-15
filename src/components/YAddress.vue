<template>
	<uni-popup class="y-address" :class="className" ref="addrPopup" type="bottom" :mask-click="false">
		<view class="address-area">
			<view class="title">
				<view>{{title}}</view>
			</view>
			<view class="result-area">
				<text v-if="currProv.PROV_CODE" @tap="changePage(0)">{{currProv.PROV_NAME}}</text>
				<text v-if="currCity.CITY_CODE" @tap="changePage(1)">{{currCity.CITY_NAME}}</text>
				<text class="text-primary" @tap="changePage(-1)">{{showText}}</text>
				<!-- <y-icons type="spinner-cycle" :size="36" color="#68C0CD" className="loading" /> -->
			</view>
			<view class="address-list">
				<scroll-view scroll-y="true" v-if="currPage === 0">
					<view>
						<view class="item" :class="item.PROV_CODE === currProv.PROV_CODE ? 'active':''"
						 v-for="item in provList" :key="item.PROV_CODE"
						 @tap="chooseProv(item)">
							<text>{{item.PROV_NAME}}</text>
							<y-icons v-if="item.PROV_CODE === currProv.PROV_CODE" type="checkmarkempty" />
						</view>
					</view>
				</scroll-view>
				<scroll-view scroll-y="true" v-if="currPage === 1">
					<view>
						<view class="item" :class="item.CITY_CODE === currCity.CITY_CODE ? 'active':''"
						 v-for="item in cityList" :key="item.CITY_CODE"
						 @tap="chooseCity(item)">
							<text>{{item.CITY_NAME}}</text>
							<y-icons v-if="item.CITY_CODE === currCity.CITY_CODE" type="checkmarkempty" />
						</view>
					</view>
				</scroll-view>
				<scroll-view scroll-y="true" v-if="currPage === 2">
					<view>
						<view class="item" :class="item.TOWN_CODE === currTown.TOWN_CODE ? 'active':''"
						 v-for="item in townList" :key="item.TOWN_CODE"
						 @tap="chooseTown(item)">
							<text>{{item.TOWN_NAME}}</text>
							<y-icons v-if="item.TOWN_CODE === currTown.TOWN_CODE" type="checkmarkempty" />
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="close-icon" @tap="close">
				<y-icons type="closeempty" :size="36" color="#353535" />
			</view>
		</view>
	</uni-popup>
</template>

<script>
	import uniPopup from '@/components/YPopup.vue';;
	import YIcons from '@/components/YIcons.vue';
	export default {
		components: {
			uniPopup,
			YIcons
		},
		props: {
			title: {
				type: String,
				default: '选择居住地'
			},
			className: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				currProv: {},
				currCity: {},
				currTown: {},
				provList: [],
				cityList: [],
				townList: [],
				currPage: 0,
				loading: false
			};
		},
		created () {
			this.queryProv();
		},
		methods: {
			open () {
				this.$refs.addrPopup.open();
			},
			close () {
				this.$refs.addrPopup.close();
			},
			queryProv () {
				this.loading = true;
				this.$http.post('/addr/provQuery').then(rsp => {
					this.loading = false;
					if (rsp.STATUS == 1) {
						this.provList = rsp.PROV_LIST || [];
					} else {
						uni.showToast({
							title: rsp.MSG || '查询省份信息失败'
						});
					}
				})
			},
			queryCity () {
				this.loading = true;
				this.$http.post('/addr/cityQuery', {
					PROV_CODE: this.currProv.PROV_CODE
				}).then(rsp => {
					this.loading = false;
					if (rsp.STATUS == 1) {
						this.cityList = rsp.CITY_LIST || [];
					} else {
						uni.showToast({
							title: rsp.MSG || '查询市信息失败'
						});
					}
				})
			},
			queryTown () {
				this.loading = true;
				this.$http.post('/addr/townQuery', {
					CITY_CODE: this.currCity.CITY_CODE
				}).then(rsp => {
					this.loading = false;
					if (rsp.STATUS == 1) {
						this.townList = rsp.TOWN_LIST || [];
					} else {
						uni.showToast({
							title: rsp.MSG || '查询区信息失败'
						});
					}
				})
			},
			chooseProv (prov) {
				this.currProv = prov;
				this.changePage(1);
				this.queryCity();
			},
			chooseCity (city) {
				this.currCity = city;
				this.changePage(2);
				this.queryTown();
			},
			chooseTown (town) {
				this.currTown = town;
				this.$emit('onChoose', {...this.currProv, ...this.currCity, ...this.currTown});
				this.close();
			},
			changePage (page) {
				if (page === -1) {
					let tmpPage = 0;
					if (this.currCity.CITY_CODE) {
						tmpPage = 2;
					} else if (this.currProv.PROV_CODE) {
						tmpPage = 1;
					}
					this.currPage = tmpPage;
				} else {
					this.currPage = page;
				}
			}
		},
		computed: {
			showText () {
				let txt = '选择省份';
				if (this.currCity.CITY_CODE) {
					txt = '选择市区';
				} else if (this.currProv.PROV_CODE) {
					txt = '选择城市';
				}
				return txt;
			}
		},
		watch: {
			currPage (v) {
				if (v === 0) {
					this.currProv = {};
					this.currCity = {};
					this.currTown = {};
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.address-area{
		background-color: #fff;
		display: flex;
		flex-direction: column;
		height: 70%;
		min-height: 800rpx;
		border-radius: 20rpx 20rpx 0 0;
		padding: 60rpx;
	}
	.title{
		font-weight: 500;
		font-size: 32rpx;
		line-height: 44rpx;
		color: #222222;
	}
	.result-area{
		padding: 30rpx 0;
		>text{
			margin-right: 60rpx;
		}
	}
	.address-list{
		flex: 1;
		position: relative;
		scroll-view{
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			height: 100%;
		}
		
		.item{
			display: flex;
			align-items: center;
			height: 70rpx;
			font-size: 28rpx;
			color: #222222;
			text{
				margin-right: 10rpx;
			}
			&.active{
				color: var(--primary);
			}
		}
	}
	.close-icon{
		position: absolute;
		right: 30rpx;
		top: 30rpx;
		padding: 6rpx;
		border-radius: 50%;
		background-color: #f0f0f0;
		width: 54rpx;
		height: 54rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
