let scr_body = document.querySelector('body');
let scr_blocks = document.querySelectorAll('._scr-sector');
let scr_items = document.querySelectorAll('._scr-item');
let scr_fix_block = document.querySelectorAll('._side-wrapper');
let scr_min_height = 750;

let scrolling = true;
let scrolling_full = true;

let scrollDirection = 0;

let currentScroll;

//ScrollOnScroll
window.addEventListener('scroll', scroll_scroll);
function scroll_scroll() {
	let src_value = currentScroll = pageYOffset;
	let header = document.querySelector('header.header');
	if (header !== null) {
		if (src_value > 10) {
			header.classList.add('_scroll');
		} else {
			header.classList.remove('_scroll');
		}
	}
	if (scr_blocks.length > 0) {
		for (let index = 0; index < scr_blocks.length; index++) {
			let block = scr_blocks[index];
			let block_offset = offset(block).top;
			let block_height = block.offsetHeight;

			/*
			if ((src_value > block_offset - block_height) && src_value < (block_offset + block_height) && window.innerHeight > scr_min_height && window.innerWidth > 992) {
				let scrProcent = (src_value - block_offset) / block_height * 100;
				scrParallax(block, scrProcent, block_height);
			}
			*/

			if ((pageYOffset > block_offset - window.innerHeight / 1.5) && pageYOffset < (block_offset + block_height) - window.innerHeight / 5) {
				block.classList.add('_scr-sector_active');
			} else {
				if (block.classList.contains('_scr-sector_active')) {
					block.classList.remove('_scr-sector_active');
				}
			}
			if ((pageYOffset > block_offset - window.innerHeight / 2) && pageYOffset < (block_offset + block_height) - window.innerHeight / 5) {
				if (!block.classList.contains('_scr-sector_current')) {
					block.classList.add('_scr-sector_current');
				}
			} else {
				if (block.classList.contains('_scr-sector_current')) {
					block.classList.remove('_scr-sector_current');
				}
			}
		}
	}
	if (scr_items.length > 0) {
		for (let index = 0; index < scr_items.length; index++) {
			let scr_item = scr_items[index];
			let scr_item_offset = offset(scr_item).top;
			let scr_item_height = scr_item.offsetHeight;


			let scr_item_point = window.innerHeight - (window.innerHeight - scr_item_height / 3);
			if (window.innerHeight > scr_item_height) {
				scr_item_point = window.innerHeight - scr_item_height / 3;
			}

			if ((src_value > scr_item_offset - scr_item_point) && src_value < (scr_item_offset + scr_item_height)) {
				scr_item.classList.add('_active');
				scroll_load_item(scr_item);
			} else {
				scr_item.classList.remove('_active');
			}
			if (((src_value > scr_item_offset - window.innerHeight))) {
				if (scr_item.querySelectorAll('._lazy').length > 0) {
					scroll_lazy(scr_item);
				}
			}
		}
	}
	if (scr_fix_block.length > 0) {
		fix_block(scr_fix_block, src_value);
	}
	let custom_scroll_line = document.querySelector('._custom-scroll__line');
	if (custom_scroll_line) {
		let window_height = window.innerHeight;
		let content_height = document.querySelector('.wrapper').offsetHeight;
		let scr_procent = (pageYOffset / (content_height - window_height)) * 100;
		let custom_scroll_line_height = custom_scroll_line.offsetHeight;
		custom_scroll_line.style.transform = "translateY(" + (window_height - custom_scroll_line_height) / 100 * scr_procent + "px)";
	}
	if (src_value > scrollDirection) {
		// downscroll code
	} else {
		// upscroll code
	}
	scrollDirection = src_value <= 0 ? 0 : src_value;
}
setTimeout(function () {
	//document.addEventListener("DOMContentLoaded", scroll_scroll);
	scroll_scroll();
}, 100);

function scroll_lazy(scr_item) {
	let lazy_src = scr_item.querySelectorAll('*[data-src]');
	if (lazy_src.length > 0) {
		for (let index = 0; index < lazy_src.length; index++) {
			const el = lazy_src[index];
			if (!el.classList.contains('_loaded')) {
				el.setAttribute('src', el.getAttribute('data-src'));
				el.classList.add('_loaded');
			}
		}
	}
	let lazy_srcset = scr_item.querySelectorAll('*[data-srcset]');
	if (lazy_srcset.length > 0) {
		for (let index = 0; index < lazy_srcset.length; index++) {
			const el = lazy_srcset[index];
			if (!el.classList.contains('_loaded')) {
				el.setAttribute('srcset', el.getAttribute('data-srcset'));
				el.classList.add('_loaded');
			}
		}
	}
}
function scroll_load_item(scr_item) {
	if (scr_item.classList.contains('_load-map') && !scr_item.classList.contains('_loaded-map')) {
		let map_item = document.getElementById('map');
		if (map_item) {
			scr_item.classList.add('_loaded-map');
			map();
		}
	}
}
function scrParallax(block, scrProcent, blockHeight) {
	let prlxItems = block.querySelectorAll('._prlx-item');
	if (prlxItems.length > 0) {
		for (let index = 0; index < prlxItems.length; index++) {
			const prlxItem = prlxItems[index];
			let prlxItemAttr = (prlxItem.dataset.prlx) ? prlxItem.dataset.prlx : 3;
			const prlxItemValue = -1 * (blockHeight / 100 * scrProcent / prlxItemAttr);
			prlxItem.style.cssText = `transform: translateY(${prlxItemValue}px);`;
		}
	}
}
//FullScreenScroll
if (scr_blocks.length > 0 && !isMobile.any()) {
	disableScroll();
	window.addEventListener('wheel', full_scroll);

	let swiperScrolls = document.querySelectorAll('._swiper_scroll');

	if (swiperScrolls.length > 0) {
		for (let index = 0; index < swiperScrolls.length; index++) {
			const swiperScroll = swiperScrolls[index];
			swiperScroll.addEventListener("mouseenter", function (e) {
				window.removeEventListener('wheel', full_scroll);
			});
			swiperScroll.addEventListener("mouseleave", function (e) {
				window.addEventListener('wheel', full_scroll);
			});
		}
	}
}
function getPrevBlockPos(current_block_prev) {
	let viewport_height = window.innerHeight;
	let current_block_prev_height = current_block_prev.offsetHeight;
	let block_pos = offset(current_block_prev).top;

	if (current_block_prev_height >= viewport_height) {
		block_pos = block_pos + (current_block_prev_height - viewport_height);
	}
	return block_pos;
}
function full_scroll(e) {
	let viewport_height = window.innerHeight;
	if (viewport_height >= scr_min_height) {
		if (scrolling_full) {
			let current_block = document.querySelector('._scr-sector._scr-sector_current');
			let current_block_pos = offset(current_block).top;
			let current_block_height = current_block.offsetHeight;
			let current_block_next = current_block.nextElementSibling;
			let current_block_prev = current_block.previousElementSibling;
			if (e.keyCode == 40 || e.keyCode == 34 || e.deltaX > 0 || e.deltaY < 0) {
				if (current_block_height <= viewport_height) {
					if (current_block_prev) {
						full_scroll_to_sector(getPrevBlockPos(current_block_prev));
					}
				} else {
					enableScroll();
					if (currentScroll <= current_block_pos) {
						if (current_block_prev) {
							full_scroll_to_sector(getPrevBlockPos(current_block_prev));
						}
					}
				}
			} else if (e.keyCode == 38 || e.keyCode == 33 || e.deltaX < 0 || e.deltaY > 0) {
				if (current_block_height <= viewport_height) {
					if (current_block_next) {
						let block_pos = offset(current_block_next).top;
						full_scroll_to_sector(block_pos);
					}
				} else {
					enableScroll();
					if (current_block_next) {
						let block_pos = offset(current_block_next).top;
						if (currentScroll >= block_pos - viewport_height) {
							full_scroll_to_sector(block_pos);
						}
					}
				}
			}
		} else {
			disableScroll();
		}
	} else {
		enableScroll();
	}
}
function full_scroll_to_sector(pos) {
	disableScroll();
	scrolling_full = false;
	_goto(pos, 800);

	let scr_pause = 500;
	if (navigator.appVersion.indexOf("Mac") != -1) {
		scr_pause = 1000;
	};
	setTimeout(function () {
		scrolling_full = true;
	}, scr_pause);
}
function full_scroll_pagestart() { }
function full_scroll_pageend() { }

//ScrollOnClick (Navigation)
let link = document.querySelectorAll('._goto-block');
if (link) {
	let blocks = [];
	for (let index = 0; index < link.length; index++) {
		let el = link[index];
		let block_name = el.getAttribute('href').replace('#', '');
		if (block_name != '' && !~blocks.indexOf(block_name)) {
			blocks.push(block_name);
		}
		el.addEventListener('click', function (e) {
			if (document.querySelector('.menu__body._active')) {
				menu_close();
				body_lock_remove(500);
			}
			let target_block_class = el.getAttribute('href').replace('#', '');
			let target_block = document.querySelector('.' + target_block_class);
			_goto(target_block, 300);
			e.preventDefault();
		})
	}

	window.addEventListener('scroll', function (el) {
		let old_current_link = document.querySelectorAll('._goto-block._active');
		if (old_current_link) {
			for (let index = 0; index < old_current_link.length; index++) {
				let el = old_current_link[index];
				el.classList.remove('_active');
			}
		}
		for (let index = 0; index < blocks.length; index++) {
			let block = blocks[index];
			let block_item = document.querySelector('.' + block);
			if (block_item) {
				let block_offset = offset(block_item).top;
				let block_height = block_item.offsetHeight;
				if ((pageYOffset > block_offset - window.innerHeight / 3) && pageYOffset < (block_offset + block_height) - window.innerHeight / 3) {
					let current_links = document.querySelectorAll('._goto-block[href="#' + block + '"]');
					for (let index = 0; index < current_links.length; index++) {
						let current_link = current_links[index];
						current_link.classList.add('_active');
					}
				}
			}
		}
	})
}
//ScrollOnClick (Simple)
let goto_links = document.querySelectorAll('.anchor');
if (goto_links) {
	for (let index = 0; index < goto_links.length; index++) {
		let goto_link = goto_links[index];
		goto_link.addEventListener('click', function (e) {
			let target_block_class = goto_link.getAttribute('href').replace('#', '');
			let target_block = document.querySelector('.' + target_block_class);
			_goto(target_block, 300);
			e.preventDefault();
			iconMenu.classList.remove("active");
			menuBody.classList.remove("active");
			scr_body.classList.remove("_lock");
		});
	}
}
function _goto(target_block, speed, offset = 0) {
	let header = '';
	//OffsetHeader
	//if (window.innerWidth < 992) {
	//	header = 'header';
	//}
	let options = {
		speedAsDuration: true,
		speed: speed,
		header: header,
		offset: offset,
		easing: 'easeOutQuad',
	};
	let scr = new SmoothScroll();
	scr.animateScroll(target_block, '', options);
}

//SameFunctions
function offset(el) {
	var rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
function disableScroll() {
	if (window.addEventListener) // older FF
		window.addEventListener('DOMMouseScroll', preventDefault, false);
	document.addEventListener('wheel', preventDefault, { passive: false }); // Disable scrolling in Chrome
	window.onwheel = preventDefault; // modern standard
	window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
	window.ontouchmove = preventDefault; // mobile
	document.onkeydown = preventDefaultForScrollKeys;
}
function enableScroll() {
	if (window.removeEventListener)
		window.removeEventListener('DOMMouseScroll', preventDefault, false);
	document.removeEventListener('wheel', preventDefault, { passive: false }); // Enable scrolling in Chrome
	window.onmousewheel = document.onmousewheel = null;
	window.onwheel = null;
	window.ontouchmove = null;
	document.onkeydown = null;
}
function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault)
		e.preventDefault();
	e.returnValue = false;
}
function preventDefaultForScrollKeys(e) {
	/*if (keys[e.keyCode]) {
		preventDefault(e);
		return false;
	}*/
}

function fix_block(scr_fix_block, scr_value) {
	let window_width = parseInt(window.innerWidth);
	let window_height = parseInt(window.innerHeight);
	let header_height = parseInt(document.querySelector('header').offsetHeight) + 15;
	for (let index = 0; index < scr_fix_block.length; index++) {
		const block = scr_fix_block[index];
		let block_width = block.getAttribute('data-width');
		const item = block.querySelector('._side-block');
		if (!block_width) { block_width = 0; }
		if (window_width > block_width) {
			if (item.offsetHeight < window_height - (header_height + 30)) {
				if (scr_value > offset(block).top - (header_height + 15)) {
					item.style.cssText = "position:fixed;bottom:auto;top:" + header_height + "px;width:" + block.offsetWidth + "px;left:" + offset(block).left + "px;";
				} else {
					gotoRelative(item);
				}
				if (scr_value > (block.offsetHeight + offset(block).top) - (item.offsetHeight + (header_height + 15))) {
					block.style.cssText = "position:relative;";
					item.style.cssText = "position:absolute;bottom:0;top:auto;left:0px;width:100%";
				}
			} else {
				gotoRelative(item);
			}
		}
	}
	function gotoRelative(item) {
		item.style.cssText = "position:relative;bottom:auto;top:0px;left:0px;";
	}
}

if (!isMobile.any()) {
	//custom_scroll();
	/*
	window.addEventListener('wheel', scroll_animate, {
		capture: true,
		passive: true
	});
	window.addEventListener('resize', custom_scroll, {
		capture: true,
		passive: true
	});
	*/
}
function custom_scroll(event) {
	scr_body.style.overflow = 'hidden';
	let window_height = window.innerHeight;
	let custom_scroll_line = document.querySelector('._custom-scroll__line');
	let custom_scroll_content_height = document.querySelector('.wrapper').offsetHeight;
	let custom_cursor_height = Math.min(window_height, Math.round(window_height * (window_height / custom_scroll_content_height)));
	if (custom_scroll_content_height > window_height) {
		if (!custom_scroll_line) {
			let custom_scroll = document.createElement('div');
			custom_scroll_line = document.createElement('div');
			custom_scroll.setAttribute('class', '_custom-scroll');
			custom_scroll_line.setAttribute('class', '_custom-scroll__line');
			custom_scroll.appendChild(custom_scroll_line);
			scr_body.appendChild(custom_scroll);
		}
		custom_scroll_line.style.height = custom_cursor_height + 'px';
	}
}

let new_pos = pageYOffset;
function scroll_animate(event) {
	let window_height = window.innerHeight;
	let content_height = document.querySelector('.wrapper').offsetHeight;
	let start_position = pageYOffset;
	let pos_add = 100;

	if (event.keyCode == 40 || event.keyCode == 34 || event.deltaX > 0 || event.deltaY < 0) {
		new_pos = new_pos - pos_add;
	} else if (event.keyCode == 38 || event.keyCode == 33 || event.deltaX < 0 || event.deltaY > 0) {
		new_pos = new_pos + pos_add;
	}
	if (new_pos > (content_height - window_height)) new_pos = content_height - window_height;
	if (new_pos < 0) new_pos = 0;

	if (scrolling) {
		scrolling = false;
		_goto(new_pos, 1000);

		let scr_pause = 100;
		if (navigator.appVersion.indexOf("Mac") != -1) {
			scr_pause = scr_pause * 2;
		};
		setTimeout(function () {
			scrolling = true;
			_goto(new_pos, 1000);
		}, scr_pause);
	}
	//If native scroll
	//disableScroll();
}

/*! smooth-scroll v16.1.2 | (c) 2020 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(e){var t,n=(this.document||this.ownerDocument).querySelectorAll(e),o=this;do{for(t=n.length;0<=--t&&n.item(t)!==o;);}while(t<0&&(o=o.parentElement));return o}),(function(){if("function"==typeof window.CustomEvent)return;function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}e.prototype=window.Event.prototype,window.CustomEvent=e})(),(function(){for(var r=0,e=["ms","moz","webkit","o"],t=0;t<e.length&&!window.requestAnimationFrame;++t)window.requestAnimationFrame=window[e[t]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[t]+"CancelAnimationFrame"]||window[e[t]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,t){var n=(new Date).getTime(),o=Math.max(0,16-(n-r)),a=window.setTimeout((function(){e(n+o)}),o);return r=n+o,a}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})})(),(function(e,t){"function"==typeof define&&define.amd?define([],(function(){return t(e)})):"object"==typeof exports?module.exports=t(e):e.SmoothScroll=t(e)})("undefined"!=typeof global?global:"undefined"!=typeof window?window:this,(function(q){"use strict";var I={ignore:"[data-scroll-ignore]",header:null,topOnEmptyHash:!0,speed:500,speedAsDuration:!1,durationMax:null,durationMin:null,clip:!0,offset:0,easing:"easeInOutCubic",customEasing:null,updateURL:!0,popstate:!0,emitEvents:!0},F=function(){var n={};return Array.prototype.forEach.call(arguments,(function(e){for(var t in e){if(!e.hasOwnProperty(t))return;n[t]=e[t]}})),n},r=function(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,n=String(e),o=n.length,a=-1,r="",i=n.charCodeAt(0);++a<o;){if(0===(t=n.charCodeAt(a)))throw new InvalidCharacterError("Invalid character: the input contains U+0000.");1<=t&&t<=31||127==t||0===a&&48<=t&&t<=57||1===a&&48<=t&&t<=57&&45===i?r+="\\"+t.toString(16)+" ":r+=128<=t||45===t||95===t||48<=t&&t<=57||65<=t&&t<=90||97<=t&&t<=122?n.charAt(a):"\\"+n.charAt(a)}return"#"+r},L=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},x=function(e){return e?(t=e,parseInt(q.getComputedStyle(t).height,10)+e.offsetTop):0;var t},H=function(e,t,n,o){if(t.emitEvents&&"function"==typeof q.CustomEvent){var a=new CustomEvent(e,{bubbles:!0,detail:{anchor:n,toggle:o}});document.dispatchEvent(a)}};return function(o,e){var A,a,O,C,M={};M.cancelScroll=function(e){cancelAnimationFrame(C),C=null,e||H("scrollCancel",A)},M.animateScroll=function(i,c,e){M.cancelScroll();var s=F(A||I,e||{}),u="[object Number]"===Object.prototype.toString.call(i),t=u||!i.tagName?null:i;if(u||t){var l=q.pageYOffset;s.header&&!O&&(O=document.querySelector(s.header));var n,o,a,m,r,d,f,h,p=x(O),g=u?i:(function(e,t,n,o){var a=0;if(e.offsetParent)for(;a+=e.offsetTop,e=e.offsetParent;);return a=Math.max(a-t-n,0),o&&(a=Math.min(a,L()-q.innerHeight)),a})(t,p,parseInt("function"==typeof s.offset?s.offset(i,c):s.offset,10),s.clip),y=g-l,v=L(),w=0,S=(n=y,a=(o=s).speedAsDuration?o.speed:Math.abs(n/1e3*o.speed),o.durationMax&&a>o.durationMax?o.durationMax:o.durationMin&&a<o.durationMin?o.durationMin:parseInt(a,10)),E=function(e,t){var n,o,a,r=q.pageYOffset;if(e==t||r==t||(l<t&&q.innerHeight+r)>=v)return M.cancelScroll(!0),o=t,a=u,0===(n=i)&&document.body.focus(),a||(n.focus(),document.activeElement!==n&&(n.setAttribute("tabindex","-1"),n.focus(),n.style.outline="none"),q.scrollTo(0,o)),H("scrollStop",s,i,c),!(C=m=null)},b=function(e){var t,n,o;m||(m=e),w+=e-m,d=l+y*(n=r=1<(r=0===S?0:w/S)?1:r,"easeInQuad"===(t=s).easing&&(o=n*n),"easeOutQuad"===t.easing&&(o=n*(2-n)),"easeInOutQuad"===t.easing&&(o=n<.5?2*n*n:(4-2*n)*n-1),"easeInCubic"===t.easing&&(o=n*n*n),"easeOutCubic"===t.easing&&(o=--n*n*n+1),"easeInOutCubic"===t.easing&&(o=n<.5?4*n*n*n:(n-1)*(2*n-2)*(2*n-2)+1),"easeInQuart"===t.easing&&(o=n*n*n*n),"easeOutQuart"===t.easing&&(o=1- --n*n*n*n),"easeInOutQuart"===t.easing&&(o=n<.5?8*n*n*n*n:1-8*--n*n*n*n),"easeInQuint"===t.easing&&(o=n*n*n*n*n),"easeOutQuint"===t.easing&&(o=1+--n*n*n*n*n),"easeInOutQuint"===t.easing&&(o=n<.5?16*n*n*n*n*n:1+16*--n*n*n*n*n),t.customEasing&&(o=t.customEasing(n)),o||n),q.scrollTo(0,Math.floor(d)),E(d,g)||(C=q.requestAnimationFrame(b),m=e)};0===q.pageYOffset&&q.scrollTo(0,0),f=i,h=s,u||history.pushState&&h.updateURL&&history.pushState({smoothScroll:JSON.stringify(h),anchor:f.id},document.title,f===document.documentElement?"#top":"#"+f.id),"matchMedia"in q&&q.matchMedia("(prefers-reduced-motion)").matches?q.scrollTo(0,Math.floor(g)):(H("scrollStart",s,i,c),M.cancelScroll(!0),q.requestAnimationFrame(b))}};var t=function(e){if(!e.defaultPrevented&&!(0!==e.button||e.metaKey||e.ctrlKey||e.shiftKey)&&"closest"in e.target&&(a=e.target.closest(o))&&"a"===a.tagName.toLowerCase()&&!e.target.closest(A.ignore)&&a.hostname===q.location.hostname&&a.pathname===q.location.pathname&&/#/.test(a.href)){var t,n;try{t=r(decodeURIComponent(a.hash))}catch(e){t=r(a.hash)}if("#"===t){if(!A.topOnEmptyHash)return;n=document.documentElement}else n=document.querySelector(t);(n=n||"#top"!==t?n:document.documentElement)&&(e.preventDefault(),(function(e){if(history.replaceState&&e.updateURL&&!history.state){var t=q.location.hash;t=t||"",history.replaceState({smoothScroll:JSON.stringify(e),anchor:t||q.pageYOffset},document.title,t||q.location.href)}})(A),M.animateScroll(n,a))}},n=function(e){if(null!==history.state&&history.state.smoothScroll&&history.state.smoothScroll===JSON.stringify(A)){var t=history.state.anchor;"string"==typeof t&&t&&!(t=document.querySelector(r(history.state.anchor)))||M.animateScroll(t,null,{updateURL:!1})}};M.destroy=function(){A&&(document.removeEventListener("click",t,!1),q.removeEventListener("popstate",n,!1),M.cancelScroll(),C=O=a=A=null)};return (function(){if(!("querySelector"in document&&"addEventListener"in q&&"requestAnimationFrame"in q&&"closest"in q.Element.prototype))throw"Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";M.destroy(),A=F(I,e||{}),O=A.header?document.querySelector(A.header):null,document.addEventListener("click",t,!1),A.updateURL&&A.popstate&&q.addEventListener("popstate",n,!1)})(),M}}));