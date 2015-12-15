<template>
	<aside class="col-md-3 transition aside" :class="{ 'slide' : size == -100 }">
		<div class="aside__content row">
			<input type="text" id="search" class="aside__search-bar center-block" placeholder="Cari Materi">
			<ul class="aside__list scroll">
				<li v-if="tags.length == 0"><a v-link="{path:'/editor'}">Buat Post Pertama</a></li>
				<li v-for="tag in tags">
					<a v-link="{path:'/post/cat-'+tag}">{{ tag | capitalize }}</a>
					<ul id="materi" class="aside__list">
						<li v-for="materi in materis" v-if="materi.catWords.indexOf(tag+', ') != -1"><a v-link="{path:'/post/'+materi.judul}">{{ materi.judul }}</a></li>
					</ul>
				</li>
			</ul>
		</div>
	</aside>
</template>

<script>
	module.exports = {
		data: function () {
			return{
				flux: Flux.store,
				materis: Flux.store.materis,
				size: 0,
				tags: [],
			};
		},
		watch: {
			'flux.sideMenuShow': function (val,old) {
				if(val){
					this.size = 0;
				}else{
					this.size = -100;
				}
			}
		},
		created: function () {
			var self = this;

			if(self.flux.sideMenuShow){
				this.size = 0;
			}else{
				this.size = -100;
			}

			// Kategori
			var cats = [];
			for(var i in self.materis){
				var tags = self.materis[i].kategori;
				cats.push(tags);
				var noOb = _.uniq(tags);
				self.materis[i].catWords = noOb.join(', ');
				if(self.materis[i].catWords.indexOf(', ')){
					self.materis[i].catWords += ', ';
				}
			}
			var uniq = [];
			for(var i in cats){
				var halo = _.union(cats[i],cats[i+1]);
				for(var j in halo){
					uniq.push(halo[j]);
				}
			}
			self.tags = _.uniq(uniq);
		},
		ready: function () {
			$('#search').fastLiveFilter('#materi');
			var $scroll = $('ul.scroll');
			// $('.aside ul.scroll').css('max-height',window.innerHeight - 230)
			initScroll();
			function initScroll () {
				$scroll.slimscroll({
					position: "left",
					height: window.innerHeight - 230
				});
			}
			$(window).on('resize',function () {
				console.log('ganti ukuran!');
				$scroll.closest('.slimScrollDiv').replaceWith($scroll);
				$scroll.attr('style','');
				initScroll();
			});
		}
	};
</script>
