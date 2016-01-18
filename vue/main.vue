<template>
	<sidemenu v-if="doneLoad"></sidemenu>
	<content v-if="doneLoad"></content>

	<a href="#" class="hide-sidemenu" @click.prevent="hideSidemenu" :class="{ 'active' : !flux.sideMenuShow }">
		<i class="fa fa-angle-double-left" v-show="flux.sideMenuShow"></i>
		<i class="fa fa-angle-double-right" v-show="!flux.sideMenuShow"></i>
	</a>
	<div class="bottom-nav">
		<ol class="breadcrumb">
			<li><a v-link="{path: '/post/all'}">Home</a></li>
			<li><a v-link="{path: '/editor'}">Editor</a></li>
		</ol>
	</div>
</template>
<script>

	module.exports = {
		data: function () {
			return{
				flux: Flux.store,
				doneLoad: false,
			};
		},
		components: {
			sidemenu: require('./sidemenu.vue'),
			content: require('./content.vue')
		},
		methods: {
			hideSidemenu: function () {
				Flux['sidemenu:toggle']();
			}
		},
		created: function () {
			var self = this;

			if(this.$route.path == '/'){
				router.go('/post/all');
			}

			db.materi.toArray(function (data) {
				Flux['materis:update'](data,function (data) {
					self.doneLoad = true;
				});
			});

		}
	};
</script>
