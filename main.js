import Vue from 'vue'
import App from './App'
import api from "./data/api"

Vue.mixin({
	beforeCreate() {
		this.$api = api;
	}
})

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
