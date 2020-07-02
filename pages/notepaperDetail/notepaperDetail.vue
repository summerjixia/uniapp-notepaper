<template>
  <div  class="content">
	  <div class="title_div">
		  <span class="H1logo">H1</span>
		  <textarea  class="title" auto-height v-model="item.title" />
	  </div>
    <textarea auto-height v-model="item.words" class="content_div" style="margin-top:10px;margin-left: 15px;"/>
    <bottomNav></bottomNav>
  </div>
</template>

<script>
import bottomNav from "@/components/bottomNav";
import {} from "@/utils/addNotepaperMixin"
export default {
  data() {
    return {
		item:getApp().globalData.notepaper
     }
  },
  components: {
    bottomNav
  },
  computed: {
  },
  methods: {
  }
};
</script>

<style scoped>
	.title_div{
		display: flex;
		flex-direction: row;
	}
.title{
  font-size: 18px;
  font-weight: bold;
}
.content{
  font-size: 16px;
}

.content_div{
}
</style>
