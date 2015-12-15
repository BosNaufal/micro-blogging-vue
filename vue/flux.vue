<script>
	module.exports = {
		store: {
			materis: [],
			single: {},
			catPosts: [],
			sideMenuShow: true,
		},
		updateMateris: function (materis,cb) {
			this.store.materis = materis;
			if(cb != null){
				cb({
					type: "VIEW",
					materis: materis
				});
			}
			log('flux','updateMateris() :', materis);
		},
		updateSingle: function (single) {
			this.store.single = single;
			log('flux','updateSingle() :', single);
		},
		updateCatPosts: function (catPosts) {
			this.store.catPosts = catPosts;
			log('flux','updateCatPosts() :', catPosts);
		},
		updateSideMenuShow: function () {
			this.store.sideMenuShow = !this.store.sideMenuShow;
			log('flux','updateSideMenuShow() :', this.store.sideMenuShow);
		}
	};
</script>
