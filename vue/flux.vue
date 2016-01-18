<script>
	module.exports = {
		store: {
			materis: [],
			single: {},
			catPosts: [],
			sideMenuShow: true,
		},
		'materis:update': function (materis,cb) {
			this.store.materis = materis;
			if(cb != null){
				cb({
					type: "VIEW",
					materis: materis
				});
			}
			log('flux','materis:update() :', materis);
		},
		'single:update': function (single) {
			this.store.single = single;
			log('flux','single:update() :', single);
		},
	
		'sidemenu:toggle': function () {
			this.store.sideMenuShow = !this.store.sideMenuShow;
			log('flux','sidemenu:toggle() :', this.store.sideMenuShow);
		}
	};
</script>
