<template>
	<aside class="col-md-3 transition aside" :class="{ 'slide' : !flux.sideMenuShow }">
		<div class="aside__content row">
			<input type="text" id="search" class="aside__search-bar center-block" placeholder="Cari Materi">

			<ul class="aside__list scroll">

				<li v-if="tags.length == 0"><a v-link="{path:'/editor'}">Buat Post Pertama</a></li>

				<li v-for="tag in tags">
					<a v-link="{path:'/post/cat-'+tag}">{{ tag | capitalize }}</a>

					<ul id="materi" class="aside__list materi__list">
						<li v-for="materi in materis" v-if="materi.catWords.indexOf(tag+', ') != -1"><a v-link="{path:'/post/'+materi.id}">{{ materi.judul }}</a></li>
					</ul>

				</li>
			</ul>

		</div>
	</aside>
</template>

<script>
	export default {

		data() {
			return{
				flux: Flux.store,
				materis: Flux.store.materis,
				tags: [],
			};
		},

		created() {
			let self = this;

			// Category
			let cats = [];

			this.materis.forEach(materi => {
				let tags = materi.kategori;
				cats.push(tags);

				// Grouping each title to each tag
				materi.catWords = tags.join(', ');
				if(materi.catWords.indexOf(', ')){
					materi.catWords += ', ';
				}

			});

			// Make a category list
			let tags = [];
			cats.forEach(cat => {
				cat.forEach(tag => {
					tags.push(tag);
				})
			});

			this.tags = _.uniq(tags);

		},

		ready() {

			$('#search').fastLiveFilter('.materi__list');

			let $scroll = $('ul.scroll');

			initScroll();

			function initScroll(){
				$scroll.slimscroll({
					position: "left",
					height: window.innerHeight - 230
				});
			}

			$(window).on('resize', () => {
				$scroll.closest('.slimScrollDiv').replaceWith($scroll);
				$scroll.attr('style','');
				initScroll();
			});
		}

	};
</script>
