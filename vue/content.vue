<template>
	<div id="app" class="col-md-9 col-md-offset-3" :style="{float: flux.sideMenuShow ? 'left' : 'none'}" :class="{ 'main__content-focus-mode' : !flux.sideMenuShow, 'center-block': !flux.sideMenuShow }">

		<div id="content" class="main__content">

			<div class="post__container" v-for="content in contents | orderBy 'tgl' -1 | limitBy limit offset">
				<h2 class="post__title"><a href="#!/post/{{ content.id }}">{{ content.judul }}</a></h2>
				<p class="post__date">
					<i class="fa fa-calendar"></i> Last Update: {{ content.tgl }}
					<span class="devider">|</span>
					<i class="fa fa-tags"></i>
					<a v-for="cat in content.kategori" v-link="{path:'/post/cat-'+cat}" class="post__category">{{ cat }}<span v-if="$index != content.kategori.length - 1">, </span></a>
					<span class="devider">|</span>
					<a href="#" @click.prevent="edit(content)"> <i class="fa fa-pencil"></i> Edit</a></p>
				</p>
				<div class="post__body" v-html="content.content | markdown"></div>
				<hr v-if="$index != content.length - 1" />
			</div>

			<div class="col-md-3 center-block text-center pagination__container" v-show="pagination.length != 1">
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
	export default {
		data() {
			return{
				flux: Flux.store,
				judul: this.$route.params.judul,
				materis: Flux.store.materis,
				contents: [],
				cat: "",
				limit: 5,
				offset: 0,
				pagination: [],
			};
		},

		watch:{

			'$route.query.page'(val,old) {
				val ? true : this.$emit('page:check',val);
				this.$emit('page:get',val);
			},

			'$route.params.judul'(val,old) {
				this.$emit('page:change',val);
			},
		},

		methods:{
			edit(materi) {
				Flux['single:update'](materi);
				router.go('/editor?for=edit');
			}
		},

		events: {

			'page:check'(page) {
				if(!parseFloat(this.judul)){
					if(page == undefined){
						router.go('?page=1');
						return false;
					}
				}
			},

			// Handle : when query params is changed
			// Affect : Change the limit and offset for showing the post
			'page:get'(nomor) {
				let self = this;
				let page = parseFloat(nomor);
				if(page == 1 || page == 0 ){
					self.limit = 5;
					self.offset = 0;
				}else{
					self.limit = ( page - 1 ) * 5;
					self.offset = ( page - 1 ) * 5;
				}

				self.$emit('code:highlight');
			},

			'code:highlight'() {
				$('body').animate({scrollTop: 0});

				$.getScript('./js/prism.js', () => {
					Prism.highlightAll();
				});
				setTimeout( () => {
					$('pre').hide();
				});
				setTimeout( () => {
					$('pre').show();
					$('pre').addClass('animated fadeIn');
				},450);
			},

			'page:change'(val) {
				let self = this;

				this.judul = val;
				let page = this.$route.query.page;

				this.$emit('page:check',page);

				this.contents = [];

				// All Posts
				if(val == "all"){
					this.contents = this.materis;
				}

				// Categorizing Posts
				let cat = val.indexOf('cat-');
				if(cat != -1){
					this.materis.forEach(materi => {
						let cats = materi.kategori;
						cats.forEach(cat => {
							if(cat == val.substr(4)){
								this.contents.push(materi);
							}
						});
					});
				}

				// If a Single Post
				let postId = parseFloat(val)
				if(postId){
					if(!page) router.go(this.judul); // Remove Query Params
					this.contents = _(this.materis).where({id:postId}).value();
					Flux['single:update'](this.$get('contents'));
					this.limit = 1;
					this.offset = 0;
				}

				// Make a Pagination
				let jumlahPage = Math.ceil(this.contents.length / 5);
				this.pagination = [];
				if(!postId){
					for(let i = 0; i < jumlahPage; i++){
						this.pagination.push({
							link: '/post/'+val+'?page='+(i+1)
						});
					}
				}

				this.$emit('code:highlight');
			}

		},

		ready() {
			this.$emit('page:change',this.$route.params.judul);
		}

	}
</script>
