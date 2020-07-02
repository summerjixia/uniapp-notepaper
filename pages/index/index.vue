<template>
	<div class="main_page">
		<div class="proj_menu" v-for="(item,index) in menuList" :key="index">
			<div class="proj_name">
				<text>{{item.name}}</text>
				<img src="../../static/svg/zhankai.png" alt="">
			</div>
			<div v-if="item.subMenu">
				<div v-for="(subItem,subIndex) in item.subMenu" :key="subIndex" class="sub_menu">
					<navigator :url="'/pages/notepaperList/notepaperList?catalogueId='+subItem.catalogueId" hover-class="hover_class">
						<div class="sub_menu_name">
							<text>{{subItem.name}}</text>
							<img src="../../static/svg/zhankai2.png" alt style="margin-bottom:-8px" @click.stop.prevent="updateTitleName(subItem)" />
						</div>
					</navigator>
				
				</div>
			</div>
		</div>
		<div class="addNotePaper">
			<img src="../../static/svg/biji.png" alt @click="add" />
		</div>
		<!-- <div class="update_title_name" v-if="show">
			<input type="text" placeholder="更改名字" />
		</div> -->
	</div>
</template>
<script>
	export default {
		data() {
			return {
				show: false,
				color: "white",
				menuList: [],
			};
		},

		mounted() {
			this.$api.getMenu().then((res) => {
				this.menuList = res[1].data;
			})
		},
		methods: {
			updateTitleName(obj) {
				let _this = this;
				uni.showActionSheet({
					itemList: ["添加主题", "更改主题名", "删除"],
					success(res) {
						console.log(res.tapIndex);
						res.tapIndex===2 && _this.$api.deleteMenu({id: obj.catalogueId })
					},
					fail(res) {
						console.log(res.errMsg);
					}
				});
			},
			add(){
				uni.navigateTo({
					url:"/pages/notepaperDetail/notepaperDetail"
				})
			}
		}
	};
</script>

<style scoped>
	.proj_menu {
		display: flex;
		flex-direction: column;
	}

	.proj_name {
		height: 50px;
		line-height: 50px;
		background-color: rgb(255, 236, 139, .5);
		text-align: center;
		font-family: "serif", "Times New Roman", Times;
		border: 1px solid #fff;
		box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.6);
	}

	.sub_menu {
		display: flex;
		flex-direction: column;
	}

	.sub_menu_name {
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-family: "serif", "Times New Roman", Times;
	}

	.addNotePaper {
		display: block;
		line-height: 70px;
		text-align: center;
		height: 50px;
		width: 50px;
		background-color: rgba(255, 0, 0, 0.8);
		border-radius: 30px;
		position: fixed;
		bottom: 60px;
		right: 15px;
		color: white;
		box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
	}

	img {
		width: 30px;
		height: 30px;
	}

	.update_title_name {
		position: fixed;
		top: 40%;
		left: 40%;
	}
	
	.hover_class{
		background-color: rgba(140,140,140,.2);
	}
</style>
