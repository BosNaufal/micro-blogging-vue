/**
	Beauty-log - simple to beautify your Vue or other app logs
	Copyright (c) 2015 - forever, Muhammad Naufal Rabbani. (MIT Licensed)
	https://github.com/bosnaufal
*/
function log(jenis,ket,log){
	var warna;
	switch (jenis) {
		case 'directive':
			warna = '#0D8AD4';
		break;
		case 'component':
			warna = '#01B289';
		break;
		case 'dev':
			warna = '#FFB82E';
		break;
		case 'flux':
			warna = '#F40388';
		break;
		case 'page':
			warna = '#5430C3';
		break;
		case 'error':
			warna = '#FF3838';
		break;
	}

	var style = 'font-size:12px;color:white;padding:7px;padding-top:6px;padding-bottom:2px;margin-bottom:5px;background:'+warna+';';
	console.info('%c'+ket,style,log);
}
