/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'cloud\'">' + entity + '</span>' + html;
	}
	var icons = {
		'cloud-bluetooth-default': '&#xe954;',
		'cloud-bluetooth-info': '&#xe955;',
		'cloud-adhibition': '&#xe952;',
		'cloud-bell': '&#xe953;',
		'cloud-userExit': '&#xe94f;',
		'cloud-exitSolid': '&#xe94a;',
		'cloud-passwd': '&#xe94b;',
		'cloud-systemInfo': '&#xe94c;',
		'cloud-addUser': '&#xe94d;',
		'cloud-userCenter': '&#xe94e;',
		'cloud-lastPage': '&#xe948;',
		'cloud-firstPage': '&#xe949;',
		'cloud-password': '&#xe946;',
		'cloud-loginUser': '&#xe947;',
		'cloud-exitPic': '&#xe92a;',
		'cloud-setup': '&#xe92b;',
		'cloud-cachControl': '&#xe92c;',
		'cloud-logControl': '&#xe92d;',
		'cloud-datatrend': '&#xe92e;',
		'cloud-setControl': '&#xe92f;',
		'cloud-dataControl': '&#xe930;',
		'cloud-authControl': '&#xe931;',
		'cloud-phone2': '&#xe932;',
		'cloud-userBrsh': '&#xe933;',
		'cloud-home': '&#xe934;',
		'cloud-balance': '&#xe935;',
		'cloud-book': '&#xe936;',
		'cloud-fold': '&#xe937;',
		'cloud-unfold': '&#xe938;',
		'cloud-import': '&#xe939;',
		'cloud-export': '&#xe93a;',
		'cloud-telList': '&#xe93b;',
		'cloud-volume': '&#xe93d;',
		'cloud-reback': '&#xe93e;',
		'cloud-send': '&#xe93f;',
		'cloud-email2': '&#xe940;',
		'cloud-users': '&#xe941;',
		'cloud-flodPic': '&#xe942;',
		'cloud-printer': '&#xe943;',
		'cloud-menuRight': '&#xe944;',
		'cloud-menuLeft': '&#xe945;',
		'cloud-exit': '&#xe927;',
		'cloud-quit': '&#xe928;',
		'cloud-enter': '&#xe929;',
		'cloud-trash': '&#xe915;',
		'cloud-save': '&#xe916;',
		'cloud-talk': '&#xe917;',
		'cloud-chat': '&#xe918;',
		'cloud-mail': '&#xe919;',
		'cloud-delPic': '&#xe91a;',
		'cloud-phone': '&#xe91b;',
		'cloud-down': '&#xe91c;',
		'cloud-up': '&#xe91d;',
		'cloud-plus': '&#xe91e;',
		'cloud-addition': '&#xe91f;',
		'cloud-minus': '&#xe921;',
		'cloud-del': '&#xe922;',
		'cloud-modify': '&#xe923;',
		'cloud-release': '&#xe924;',
		'cloud-up-load': '&#xe925;',
		'cloud-upload': '&#xe926;',
		'cloud-attach': '&#xe90c;',
		'cloud-print': '&#xe90d;',
		'cloud-educe': '&#xe90e;',
		'cloud-calendarPic': '&#xe90f;',
		'cloud-unitPart': '&#xe911;',
		'cloud-dateline': '&#xe912;',
		'cloud-unselected': '&#xe913;',
		'cloud-selected': '&#xe914;',
		'cloud-arrowTop': '&#xe908;',
		'cloud-arrowLeft': '&#xe909;',
		'cloud-arrowDown': '&#xe90a;',
		'cloud-arrowright': '&#xe90b;',
		'cloud-pulltop': '&#xe904;',
		'cloud-pullleft': '&#xe905;',
		'cloud-pullRight': '&#xe906;',
		'cloud-pullDown': '&#xe907;',
		'cloud-email': '&#xe900;',
		'cloud-unlocked': '&#xe901;',
		'cloud-locked': '&#xe902;',
		'cloud-calendar': '&#xe903;',
		'cloud-yj-yewu': '&#xe9ee;',
		'cloud-alert': '&#xe9ef;',
		'cloud-search': '&#xe910;',
		'cloud-videocam': '&#xe9f7;',
		'cloud-rolePic': '&#xe9f8;',
		'cloud-menuPic': '&#xe9f0;',
		'cloud-logPic': '&#xe9f1;',
		'cloud-cache': '&#xe9f2;',
		'cloud-theme': '&#xe9f3;',
		'cloud-claSearch': '&#xe9e3;',
		'cloud-reRight': '&#xe9dd;',
		'cloud-legend': '&#xe9aa;',
		'cloud-delete': '&#xe957;',
		'cloud-agentMan': '&#xe959;',
		'cloud-capacity': '&#xe95f;',
		'cloud-listEdit': '&#xe920;',
		'cloud-reportUnit': '&#xe93c;',
		'cloud-set': '&#xe966;',
		'cloud-unlock': '&#xe9b5;',
		'cloud-lock': '&#xe9b6;',
		'cloud-add': '&#xe981;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/cloud-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
