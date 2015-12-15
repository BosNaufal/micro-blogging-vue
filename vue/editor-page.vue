<template>
	<aside class="col-md-6 cubic aside" v-show="!focus">
		<div class="h100p row editor__container">
			<input type="text" v-model="judul" class="w100p editor__title" placeholder="Judul Post">
			<input type="text" v-model="cat" class="w100p editor__cat" placeholder="tags, tags-2, tags-3">
			<textarea class="w100p editor__" v-model="inputan" placeholder="Post Content"></textarea>
		</div>
	</aside>

	<div class="col-md-6 col-md-offset-6" v-show="!focus">
		<h1>{{ judul }}</h1>
		<p><i class="fa fa-tags"></i> Tags: <span v-for="tag in category" track-by="$index" class="post__category">{{ tag }}, </span></p>
		<hr />
		<div id="preview" class="editor__preview post__body" v-html="inputan | markdown"></div>
	</div>

	<div id="app" class="col-md-9 col-md-offset-3" :style="{float: !focus ? 'left' : 'none'}" :class="{ 'main__content-focus-mode' : focus, 'center-block': focus }">

		<div id="content" class="main__content">
			<div class="post__container" v-show="focus">
				<h2 class="post__title">{{ judul }}</h2>
				<p class="post__date"><i class="fa fa-calendar"></i> Last Update: {{ tgl }} | <i class="fa fa-tags"></i> <a v-for="tag in category" v-link="{path:'/post/cat-'+tag}" class="post__category">{{ tag }}<span v-if="$index != category.length - 1">, </span></a></p>
				<ol class="breadcrumb" :class="{ 'text-center' : focus}">
					<li><a v-link="{path:'/post/all'}">All</a></li>
					<li v-for="tag in category"><a v-link="{path:'/post/cat-'+cat}" class="post__category">{{ tag }}</a></li>
					<li><a v-link="{path:'/post/'+judul}">{{ judul }}</a></li>
				</ol>
				<div class="post__body" v-html="inputan | markdown"></div>
			</div>
		</div>

	</div>



	<div class="bottom-nav">
		<ol class="breadcrumb">
			<li><a href="#!/post/all">Home</a></li>
			<li><a href="#" @click.prevent="save">{{ $route.query.for == 'edit' ? 'Update' : 'Publish' }}</a></li>
			<li v-if="$route.query.for == 'edit'"><a href="#" @click.prevent="hapus(id)">Delete</a></li>
			<li><a href="#" @click.prevent="showCode">Show Correctly</a></li>
			<li><a href="#" @click.prevent="focusMode">{{ focus ? 'Edit' : 'Focus' }} Mode</a></li>
		</ol>
	</div>
</template>

<script>
	module.exports = {
		data: function () {
			return{
				flux: Flux.store,
				focus: false,
				id: "",
				judul: "",
				tgl: moment().format('DD-MM-YYYY'),
				cat: "",
				category: [],
				inputan: "",
			};
		},
		watch: {
			cat: function (val,old) {
				var self = this;
				if(val != ""){
					var category = val.split(', ');
					var last = _.last(category);
					var cekKoma = last.indexOf(',');

					if(cekKoma != -1 && cekKoma == last.length - 1){
						this.cat += " ";
						if(cekKoma == last.length - 1){
							var newLast = last.substr(0,last.length - 1);
							category[category.length-1] = newLast;
							console.log(category[category.length-1]);
						}
					}else{
						if(cekKoma != - 1){
							var awal = self.cat.substr(0,self.cat.lastIndexOf(','));
							var akhir = last.substr(cekKoma+1,self.cat.length-1);
							var newLast = last.substr(cekKoma+1,self.cat.length-1);
							setTimeout(function () {
								self.cat = awal + ', ' +akhir;
							});
						}
					}
					if(_.last(category) == ""){
						category.splice(category.length - 1);
					}

					this.category = category;
				}else{
					this.category = "";
				}
			}
		},
		methods: {
			focusMode: function () {
				this.focus = !this.focus;
				if(focus){
					$.getScript('./js/prism.js');
					Prism.highlightAll();
				}
			},
			showCode:function () {
				$.getScript('./js/prism.js');
				Prism.highlightAll();
			},
			save: function () {
				var self = this;
				if(!this.judul && !this.content && !this.cat){
					alert('Isi Sepenuhnya');
					return false;
				}
				var y = confirm('Selesai Mengedit?');
				if(!y){
					return false;
				}
				var kategori = self.cat.split(', ');
				if(_.last(kategori) == ""){
					kategori.splice(kategori.length - 1);
				}
				var post = {
					judul: self.judul,
					tgl: moment().format('DD-MM-YYYY'),
					kategori: _.uniq(kategori),
					content: this.inputan
				};
				if(this.$route.query.for == "edit"){
					db.materi.update(self.id,post).then(function () {
						router.go('/post/'+post.judul);
						log('component','editor-page update:',post);
					});
				}else{
					db.materi.add(post).then(function () {
						router.go('/post/'+post.judul);
						log('component','editor-page save:',post);
					});
				}
			},
			hapus: function (id) {
				var y = confirm('Selesai Mengedit?');
				if(!y){
					return false;
				}
				db.materi.where("id").equals(id).delete().then(function () {
					router.go('/post/all');
				});
			},
		},
		created: function () {
			if(this.$route.query.for == "edit"){
				this.id = this.flux.single.id;
				this.judul = this.flux.single.judul;
				this.cat = this.flux.single.kategori.join(", ");
				this.inputan = this.flux.single.content;
			}
		}
	};
</script>
