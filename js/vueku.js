
global.Vue = require('./vue.min');
global.marked = require('./marked');
global.moment = require('./moment.min');
global.Dexie = require('./Dexie.min');

global.db = new Dexie('perpusku');
db.version(1).stores({
	materi: "++id,judul,tgl,kategori,content"
});

db.open();

db.materi.count(function (jmlh) {
	if( jmlh == 0 ){
		db.materi.add({
			judul: "Ikut Ngembangin",
			kategori: ["doc"],
			tgl: "15-12-2015",
			content: "## Vue.js↵Saya menggunakan [vue.js](http://vuejs.org/) dan modular vue filenya ada di folder **vue** tapi maaf belum well commented. dan pada bagian component \"*content.vue*\" disitu bloating code banget, saya mau simpelkan. Tapi takut entar nggak ke upload - upload. mungkin lain kali ( jika tidak malas ).↵↵## NPM↵Afdolnya setiap project harus diawali ```npm init``` dan ```install --save-dev``` biar bisa dikembangin oleh developer lainnya. tapi karena memakan kuota internet, jadi saya nggak pake ```npm install --save-dev ``` melainkan menggunakan ```npm install -g``` yang kemudian saya link ```npm link``` sekali install untuk waktu yang panjang :D ↵↵## Sass↵Project ini saya buat dengan SASS, jadi untuk yang ingin edit tampilannya bisa di akses di folder **sass**. Silahkan di oprek sesuka hati.↵↵Oke Sekian Terima Kasih...~↵"
		});
		db.materi.add({
			judul: "Penulisan Post",
			kategori: ["doc"],
			tgl: "15-12-2015",
			content: "## Markdown↵Penulisan postnya atau notesnya menggunakan bahasa markdown. Markdown parser yang saya gunakan adalah [marked.js](https://github.com/chjj/marked). Bisa disesuain API nya↵↵## Code Snippet↵Untuk syntax highlighternya saya menggunakan [prism.js](prismjs.com) tapi belum bisa seperti github yang langsung backtic+bahasanya. untuk di note ini sementara menggunakan↵<pre><code class=\"language-html\">&lt;pre&gt;↵ &lt;code data-src=\"./filenya\"&gt;&lt;/code&gt;↵&lt;/pre&gt;↵</code></pre>↵↵Atau bisa juga menggunakan↵↵<pre><code class=\"language-html\">&lt;pre&gt;↵ &lt;code class=\"language-bahasanya\"&gt;↵ Code Goes Here...↵ *) Jangan Lupa di Encode Jika HTML↵ &lt;/code&gt;↵&lt;/pre&gt;↵</code></pre>↵↵Oke Sekian...~ Selamat Menikmati..."
		});
		db.materi.add({
			judul: "Akhirnya Selesai Juga!",
			tgl: "15-12-2015",
			kategori: ["doc"],
			content: "## Akhirnya↵Alhamdulillah... akhirnya bisa bikin notes jugak...~ Setelah Beberapa kesibukkan yang menumpuk, akhirnya sempet juga membuat mini blogging system yang masih jauh dari sempurna ini.↵↵## Motivasi↵Motivasi saya membuat project ini adalah karena pada dasarnya saya adalah bukan tipe programmer yang bisa mengingat seluruh API dari plugin yang saya pakai, sekaligus bukan orang yang sudah mempunyai internet tanam di rumahnya...↵↵Karena alasan untuk mengurangi penggunaan kuota internet, saya membuat project ini. ↵↵Project ini terinspirasi oleh project2 yang lebih sempurna yang telah ada sebelumnya yaitu :↵↵- medium↵- devdocs↵- gitbook↵- dan github itu sendiri↵↵Saya tau project ini masih jauh dari daftar di atas, tapi saya cukup senang bisa membuat hal yang bermanfaat. minimal untuk diri saya sendiri. dan syukur - syukur kalau bisa di pakai oleh banyak orang.↵↵Jadi, saya terinspirasi desain dari gitbook yang simple dan medium post yang readable, serta devdocs yang menyimpan kontennya di dalam localstorage HTML 5 dari web browser client, dan tentunya, karena banyak dokumentasi github menggunakan bahasa markdown, maka saya memutuskan untuk metode penulisannya menggunakan bahasa markdown. biar bisa langsung kopas bila ada dokumentasi github yang perlu di catat secara offline.↵↵Project ini dibuat menggunakan vue.js. tujuannya untuk improve pemahaman saya tentang javascript dan implementasi framework javascript vue.js.↵↵Next, saya bakal rebuilding project ini menggunakan react.js dan kalau tidak malas, saya bakal membangun project ini dengan Angular.js. Tujuannya sama, untuk improve skill saya dalam coding javascript.↵↵Oke Sekian dari saya, untuk membaca dokumentasi dari project ini bisa ke [sini](#!/post/cat-doc).↵↵### Mohon Bimbingannya :)"
		});
	}
	db.materi.count(function (jmlh) {
		log('component', '[Vueku.js] Pastikan Angka > 0:', jmlh);
	})
});


var VueRouter = require('./vue-router.min');

Vue.use(VueRouter);

global.router = new VueRouter();

global.Flux = require('../vue/flux.vue');


Vue.config.debug = true;


Vue.filter('markdown', function (value) {
	var md = marked(value);
	return md;
});

Vue.filter('previewEditor', function (value) {
	var text = JSON.stringify(value);
	text = text.replace(/"/g,"");
	var md = micromarkdown.parse(text);
	console.log(md);
	return md;
});

router.map({
	'/': {
		component: require('../vue/main.vue'),
		subRoutes: {
			'post/:judul': {
				component: require('../vue/main.vue'),
			},
			'post/cat/:cat': {
				component: require('../vue/main.vue'),
			}
		}
	},
	'/editor': {
		component: require('../vue/editor-page.vue')
	},
});

router.redirect({
	'*' : '/'
});

var App = Vue.extend({});
router.start(App,'body');
