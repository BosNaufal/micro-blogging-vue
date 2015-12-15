<template>
	<div id="app" class="col-md-9 col-md-offset-3" :style="{float: flux.sideMenuShow ? 'left' : 'none'}" :class="{ 'main__content-focus-mode' : !flux.sideMenuShow, 'center-block': !flux.sideMenuShow }">

		<div id="content" class="main__content">

			<div class="post__container" v-for="materi in materis | orderBy 'tgl' -1 | limitBy limit offset" v-if="judul == 'all'">
				<h2 class="post__title"><a href="#!/post/{{ materi.judul }}">{{ materi.judul }}</a></h2>
				<p class="post__date">
					<i class="fa fa-calendar"></i> Last Update: {{ materi.tgl }}
					<span class="devider">|</span>
					<i class="fa fa-tags"></i>
						<a v-for="cat in materi.kategori" v-link="{path:'/post/cat-'+cat}" class="post__category">{{ cat }}<span v-if="$index != materi.kategori.length - 1">, </span></a>
				</p>
				<div class="post__body" v-html="materi.content | markdown"></div>
				<hr v-if="$index != materis.length - 1" />
			</div>

			<div class="post__container" v-for="materi in catPosts | orderBy 'tgl' -1 | limitBy limit offset" v-if="catPosts.length != 0">
				<h2 class="post__title"><a href="#!/post/{{ materi.judul }}">{{ materi.judul }}</a></h2>
				<p class="post__date">
					<i class="fa fa-calendar"></i> Last Update: {{ materi.tgl }}
					<span class="devider">|</span>
					<i class="fa fa-tags"></i>
						<a v-for="cat in materi.kategori" v-link="{path:'/post/cat-'+cat}" class="post__category">{{ cat }}<span v-if="$index != materi.kategori.length - 1">, </span></a>
				</p>

				<div class="post__body" v-html="materi.content | markdown"></div>
				<hr v-if="$index != catPosts.length - 1" />
			</div>

			<div class="post__container" v-for="materi in single" v-if="judul != 'all' && single.length != 0 && catPosts == 0">
				<h2 class="post__title">{{ materi.judul }}</h2>
				<p class="post__date"><i class="fa fa-calendar"></i> Last Update: {{ materi.tgl }}
					<span class="devider">|</span>
					<i class="fa fa-tags"></i> <a v-for="cat in materi.kategori" v-link="{path:'/post/cat-'+cat}" class="post__category">{{ cat }}<span v-if="$index != materi.kategori.length - 1">, </span></a>
					<span class="devider">|</span>
					<a href="#" @click.prevent="edit(materi)"> <i class="fa fa-pencil"></i> Edit</a></p>
				<ol class="breadcrumb" :class="{ 'text-center' : !flux.sideMenuShow }">
					<li><a v-link="{path:'/post/all'}">All</a></li>
					<li v-for="cat in materi.kategori"><a v-link="{path:'/post/cat-'+cat}" class="post__category">{{ cat }}</a></li>
					<li><a v-link="{path:'/post/'+materi.judul}">{{ materi.judul }}</a></li>
				</ol>
				<div class="post__body" v-html="materi.content | markdown"></div>
			</div>

			<div class="col-md-3 center-block" style="float:none;margin-top:-50px;" v-show="showPagination">
				<ul class="pagination">
					<li v-for="page in pagination" :class="{ 'active' : $index + 1 == $route.query.page }">
						<a v-link="{ path: page.link }" class="page" >{{ $index + 1 }}</a>
					</li>
				</ul>
			</div>
			<div class="clearfix"></div>
		</div>
	</div>
</template>

<script>
	module.exports = {
		data: function () {
			return{
				flux: Flux.store,
				size: 3,
				judul: this.$route.params.judul,
				materis: Flux.store.materis,
				cat: "",
				single: {},
				catPosts: [],
				limit: 5,
				offest: 0,
				pagination: [],
				showPagination: true,
			};
		},
		watch:{
			'flux.sideMenuShow': function (val,old) {
				if(val){
					this.size = 3;
				}else{
					this.size = 0;
				}
			},
			'$route.query.page': function (val,old) {
				var self = this;
				var page = parseFloat(val);
				if(page == 1 || page == 0){
					self.limit = 5;
					self.offset = 0;
				}else{
					self.limit = ( page - 1 ) * 5;
					self.offset = ( page - 1 ) * 5;
				}
				$.getScript('./js/prism.js', function () {
					Prism.highlightAll();
				});
			},
			'$route.params.judul': function (val,old) {
				var self = this;
				this.judul = val;
				var page = this.$route.query.page;
				if(page == undefined && val == 'all'){
					router.go({path:'/post/all?page=1'});
				}
				if(val == 'all'){
					self.pagination = [];
					var jumlahPage = self.materis.length / 5;
					jumlahPage = Math.ceil(jumlahPage);

					for(var i = 0; i < jumlahPage; i++){
						self.pagination.push({
							link: '/post/all?page='+(i+1)
						});
					}
					self.showPagination = true;
				}
				var cat = val.indexOf('cat-');
				if( cat != -1){
					var catPosts = [];
					for(var i in this.materis){
						var materi = this.materis[i];
						var cat = materi.kategori;
						for(var i in cat){
							if(cat[i] == val.substr(4)){
								catPosts.push(materi);
							}
						}
					}
					self.catPosts = catPosts;

					var jumlahPage = self.catPosts.length / 5;
					jumlahPage = Math.ceil(jumlahPage);

					self.pagination = [];

					for(var i = 0; i < jumlahPage; i++){
						self.pagination.push({
							link: '/post/'+val+'?page='+(i+1)
						});
					}

					Flux.updateCatPosts(catPosts);

					if(self.$route.query.page == undefined){
						router.go({path:'/post/'+val+'?page=1'});
					}

					self.showPagination = true;

				}else{
					self.catPosts = [];
					var single = _(this.materis).where({judul:this.judul}).value();
					this.single = single;
					Flux.updateSingle(single);
					self.showPagination = false;
				}

				$.getScript('./js/prism.js', function () {
					Prism.highlightAll();
				});
				setTimeout(function () {
					$('pre').hide();
				});
				setTimeout(function () {
					$('pre').show();
					$('pre').addClass('animated fadeIn');
				},450);
			},
		},
		methods:{
			edit: function (materi) {
				Flux.updateSingle(materi);
				router.go('/editor?for=edit');
			}
		},
		created: function () {
			var self = this;

			var jumlahPage = self.materis.length / 5;
			jumlahPage = Math.ceil(jumlahPage);

			for(var i = 0; i < jumlahPage; i++){
				self.pagination.push({
					link: '/post/all?page='+(i+1)
				});
			}

			var page = this.$route.query.page;
			var judul = this.$route.params.judul;
			if(page == undefined && judul == "all"){
				router.go({path:'/post/all?page=1'});
			}
			page = parseFloat(page);
			if(page == 1){
				self.limit = 5;
				self.offset = 0;
			}else{
				self.limit = ( page - 1 ) * 5;
				self.offset = ( page - 1 ) * 5;
			}

			var val = this.$route.params.judul;
			var cat = val.indexOf('cat-');
			if( cat != -1){
				var catPosts = [];
				for(var i in this.materis){
					var materi = this.materis[i];
					var cat = materi.kategori;
					for(var i in cat){
						if(cat[i] == val.substr(4)){
							catPosts.push(materi);
						}
					}
				}
				self.catPosts = catPosts;
				Flux.updateCatPosts(catPosts);
			}
			var single = _(this.materis).where({judul:this.judul}).value();
			this.single = single;
		},
		ready: function () {
			$.getScript('./js/prism.js',function () {
				Prism.highlightAll();
			});
			setTimeout(function () {
				$('pre').hide();
			})
			setTimeout(function () {
				$('pre').show();
				$('pre').addClass('animated fadeIn');
			},750)
		}
	}
</script>
