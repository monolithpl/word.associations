!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.pako=e()}}(function(){return function e(t,i,n){function a(o,s){if(!i[o]){if(!t[o]){var f="function"==typeof require&&require;if(!s&&f)return f(o,!0);if(r)return r(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var d=i[o]={exports:{}};t[o][0].call(d.exports,function(e){var i=t[o][1][e];return a(i?i:e)},d,d.exports,e,t,i,n)}return i[o].exports}for(var r="function"==typeof require&&require,o=0;o<n.length;o++)a(n[o]);return a}({1:[function(e,t,i){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;i.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var i=t.shift();if(i){if("object"!=typeof i)throw new TypeError(i+"must be non-object");for(var n in i)i.hasOwnProperty(n)&&(e[n]=i[n])}}return e},i.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var a={arraySet:function(e,t,i,n,a){if(t.subarray&&e.subarray)return void e.set(t.subarray(i,i+n),a);for(var r=0;n>r;r++)e[a+r]=t[i+r]},flattenChunks:function(e){var t,i,n,a,r,o;for(n=0,t=0,i=e.length;i>t;t++)n+=e[t].length;for(o=new Uint8Array(n),a=0,t=0,i=e.length;i>t;t++)r=e[t],o.set(r,a),a+=r.length;return o}},r={arraySet:function(e,t,i,n,a){for(var r=0;n>r;r++)e[a+r]=t[i+r]},flattenChunks:function(e){return[].concat.apply([],e)}};i.setTyped=function(e){e?(i.Buf8=Uint8Array,i.Buf16=Uint16Array,i.Buf32=Int32Array,i.assign(i,a)):(i.Buf8=Array,i.Buf16=Array,i.Buf32=Array,i.assign(i,r))},i.setTyped(n)},{}],2:[function(e,t,i){"use strict";function n(e,t){if(65537>t&&(e.subarray&&o||!e.subarray&&r))return String.fromCharCode.apply(null,a.shrinkBuf(e,t));for(var i="",n=0;t>n;n++)i+=String.fromCharCode(e[n]);return i}var a=e("./common"),r=!0,o=!0;try{String.fromCharCode.apply(null,[0])}catch(s){r=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(s){o=!1}for(var f=new a.Buf8(256),l=0;256>l;l++)f[l]=l>=252?6:l>=248?5:l>=240?4:l>=224?3:l>=192?2:1;f[254]=f[254]=1,i.string2buf=function(e){var t,i,n,r,o,s=e.length,f=0;for(r=0;s>r;r++)i=e.charCodeAt(r),55296===(64512&i)&&s>r+1&&(n=e.charCodeAt(r+1),56320===(64512&n)&&(i=65536+(i-55296<<10)+(n-56320),r++)),f+=128>i?1:2048>i?2:65536>i?3:4;for(t=new a.Buf8(f),o=0,r=0;f>o;r++)i=e.charCodeAt(r),55296===(64512&i)&&s>r+1&&(n=e.charCodeAt(r+1),56320===(64512&n)&&(i=65536+(i-55296<<10)+(n-56320),r++)),128>i?t[o++]=i:2048>i?(t[o++]=192|i>>>6,t[o++]=128|63&i):65536>i?(t[o++]=224|i>>>12,t[o++]=128|i>>>6&63,t[o++]=128|63&i):(t[o++]=240|i>>>18,t[o++]=128|i>>>12&63,t[o++]=128|i>>>6&63,t[o++]=128|63&i);return t},i.buf2binstring=function(e){return n(e,e.length)},i.binstring2buf=function(e){for(var t=new a.Buf8(e.length),i=0,n=t.length;n>i;i++)t[i]=e.charCodeAt(i);return t},i.buf2string=function(e,t){var i,a,r,o,s=t||e.length,l=new Array(2*s);for(a=0,i=0;s>i;)if(r=e[i++],128>r)l[a++]=r;else if(o=f[r],o>4)l[a++]=65533,i+=o-1;else{for(r&=2===o?31:3===o?15:7;o>1&&s>i;)r=r<<6|63&e[i++],o--;o>1?l[a++]=65533:65536>r?l[a++]=r:(r-=65536,l[a++]=55296|r>>10&1023,l[a++]=56320|1023&r)}return n(l,a)},i.utf8border=function(e,t){var i;for(t=t||e.length,t>e.length&&(t=e.length),i=t-1;i>=0&&128===(192&e[i]);)i--;return 0>i?t:0===i?t:i+f[e[i]]>t?i:t}},{"./common":1}],3:[function(e,t,i){"use strict";function n(e,t,i,n){for(var a=65535&e|0,r=e>>>16&65535|0,o=0;0!==i;){o=i>2e3?2e3:i,i-=o;do a=a+t[n++]|0,r=r+a|0;while(--o);a%=65521,r%=65521}return a|r<<16|0}t.exports=n},{}],4:[function(e,t,i){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],5:[function(e,t,i){"use strict";function n(){for(var e,t=[],i=0;256>i;i++){e=i;for(var n=0;8>n;n++)e=1&e?3988292384^e>>>1:e>>>1;t[i]=e}return t}function a(e,t,i,n){var a=r,o=n+i;e^=-1;for(var s=n;o>s;s++)e=e>>>8^a[255&(e^t[s])];return-1^e}var r=n();t.exports=a},{}],6:[function(e,t,i){"use strict";function n(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}t.exports=n},{}],7:[function(e,t,i){"use strict";var n=30,a=12;t.exports=function(e,t){var i,r,o,s,f,l,d,u,c,h,b,w,m,k,_,g,v,p,x,y,S,E,B,Z,A;i=e.state,r=e.next_in,Z=e.input,o=r+(e.avail_in-5),s=e.next_out,A=e.output,f=s-(t-e.avail_out),l=s+(e.avail_out-257),d=i.dmax,u=i.wsize,c=i.whave,h=i.wnext,b=i.window,w=i.hold,m=i.bits,k=i.lencode,_=i.distcode,g=(1<<i.lenbits)-1,v=(1<<i.distbits)-1;e:do{15>m&&(w+=Z[r++]<<m,m+=8,w+=Z[r++]<<m,m+=8),p=k[w&g];t:for(;;){if(x=p>>>24,w>>>=x,m-=x,x=p>>>16&255,0===x)A[s++]=65535&p;else{if(!(16&x)){if(0===(64&x)){p=k[(65535&p)+(w&(1<<x)-1)];continue t}if(32&x){i.mode=a;break e}e.msg="invalid literal/length code",i.mode=n;break e}y=65535&p,x&=15,x&&(x>m&&(w+=Z[r++]<<m,m+=8),y+=w&(1<<x)-1,w>>>=x,m-=x),15>m&&(w+=Z[r++]<<m,m+=8,w+=Z[r++]<<m,m+=8),p=_[w&v];i:for(;;){if(x=p>>>24,w>>>=x,m-=x,x=p>>>16&255,!(16&x)){if(0===(64&x)){p=_[(65535&p)+(w&(1<<x)-1)];continue i}e.msg="invalid distance code",i.mode=n;break e}if(S=65535&p,x&=15,x>m&&(w+=Z[r++]<<m,m+=8,x>m&&(w+=Z[r++]<<m,m+=8)),S+=w&(1<<x)-1,S>d){e.msg="invalid distance too far back",i.mode=n;break e}if(w>>>=x,m-=x,x=s-f,S>x){if(x=S-x,x>c&&i.sane){e.msg="invalid distance too far back",i.mode=n;break e}if(E=0,B=b,0===h){if(E+=u-x,y>x){y-=x;do A[s++]=b[E++];while(--x);E=s-S,B=A}}else if(x>h){if(E+=u+h-x,x-=h,y>x){y-=x;do A[s++]=b[E++];while(--x);if(E=0,y>h){x=h,y-=x;do A[s++]=b[E++];while(--x);E=s-S,B=A}}}else if(E+=h-x,y>x){y-=x;do A[s++]=b[E++];while(--x);E=s-S,B=A}for(;y>2;)A[s++]=B[E++],A[s++]=B[E++],A[s++]=B[E++],y-=3;y&&(A[s++]=B[E++],y>1&&(A[s++]=B[E++]))}else{E=s-S;do A[s++]=A[E++],A[s++]=A[E++],A[s++]=A[E++],y-=3;while(y>2);y&&(A[s++]=A[E++],y>1&&(A[s++]=A[E++]))}break}}break}}while(o>r&&l>s);y=m>>3,r-=y,m-=y<<3,w&=(1<<m)-1,e.next_in=r,e.next_out=s,e.avail_in=o>r?5+(o-r):5-(r-o),e.avail_out=l>s?257+(l-s):257-(s-l),i.hold=w,i.bits=m}},{}],8:[function(e,t,i){"use strict";function n(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function a(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new _.Buf16(320),this.work=new _.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function r(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=D,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new _.Buf32(we),t.distcode=t.distdyn=new _.Buf32(me),t.sane=1,t.back=-1,z):C}function o(e){var t;return e&&e.state?(t=e.state,t.wsize=0,t.whave=0,t.wnext=0,r(e)):C}function s(e,t){var i,n;return e&&e.state?(n=e.state,0>t?(i=0,t=-t):(i=(t>>4)+1,48>t&&(t&=15)),t&&(8>t||t>15)?C:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=i,n.wbits=t,o(e))):C}function f(e,t){var i,n;return e?(n=new a,e.state=n,n.window=null,i=s(e,t),i!==z&&(e.state=null),i):C}function l(e){return f(e,_e)}function d(e){if(ge){var t;for(m=new _.Buf32(512),k=new _.Buf32(32),t=0;144>t;)e.lens[t++]=8;for(;256>t;)e.lens[t++]=9;for(;280>t;)e.lens[t++]=7;for(;288>t;)e.lens[t++]=8;for(x(S,e.lens,0,288,m,0,e.work,{bits:9}),t=0;32>t;)e.lens[t++]=5;x(E,e.lens,0,32,k,0,e.work,{bits:5}),ge=!1}e.lencode=m,e.lenbits=9,e.distcode=k,e.distbits=5}function u(e,t,i,n){var a,r=e.state;return null===r.window&&(r.wsize=1<<r.wbits,r.wnext=0,r.whave=0,r.window=new _.Buf8(r.wsize)),n>=r.wsize?(_.arraySet(r.window,t,i-r.wsize,r.wsize,0),r.wnext=0,r.whave=r.wsize):(a=r.wsize-r.wnext,a>n&&(a=n),_.arraySet(r.window,t,i-n,a,r.wnext),n-=a,n?(_.arraySet(r.window,t,i-n,n,0),r.wnext=n,r.whave=r.wsize):(r.wnext+=a,r.wnext===r.wsize&&(r.wnext=0),r.whave<r.wsize&&(r.whave+=a))),0}function c(e,t){var i,a,r,o,s,f,l,c,h,b,w,m,k,we,me,ke,_e,ge,ve,pe,xe,ye,Se,Ee,Be=0,Ze=new _.Buf8(4),Ae=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return C;i=e.state,i.mode===X&&(i.mode=W),s=e.next_out,r=e.output,l=e.avail_out,o=e.next_in,a=e.input,f=e.avail_in,c=i.hold,h=i.bits,b=f,w=l,ye=z;e:for(;;)switch(i.mode){case D:if(0===i.wrap){i.mode=W;break}for(;16>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if(2&i.wrap&&35615===c){i.check=0,Ze[0]=255&c,Ze[1]=c>>>8&255,i.check=v(i.check,Ze,2,0),c=0,h=0,i.mode=F;break}if(i.flags=0,i.head&&(i.head.done=!1),!(1&i.wrap)||(((255&c)<<8)+(c>>8))%31){e.msg="incorrect header check",i.mode=ce;break}if((15&c)!==U){e.msg="unknown compression method",i.mode=ce;break}if(c>>>=4,h-=4,xe=(15&c)+8,0===i.wbits)i.wbits=xe;else if(xe>i.wbits){e.msg="invalid window size",i.mode=ce;break}i.dmax=1<<xe,e.adler=i.check=1,i.mode=512&c?q:X,c=0,h=0;break;case F:for(;16>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if(i.flags=c,(255&i.flags)!==U){e.msg="unknown compression method",i.mode=ce;break}if(57344&i.flags){e.msg="unknown header flags set",i.mode=ce;break}i.head&&(i.head.text=c>>8&1),512&i.flags&&(Ze[0]=255&c,Ze[1]=c>>>8&255,i.check=v(i.check,Ze,2,0)),c=0,h=0,i.mode=L;case L:for(;32>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}i.head&&(i.head.time=c),512&i.flags&&(Ze[0]=255&c,Ze[1]=c>>>8&255,Ze[2]=c>>>16&255,Ze[3]=c>>>24&255,i.check=v(i.check,Ze,4,0)),c=0,h=0,i.mode=H;case H:for(;16>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}i.head&&(i.head.xflags=255&c,i.head.os=c>>8),512&i.flags&&(Ze[0]=255&c,Ze[1]=c>>>8&255,i.check=v(i.check,Ze,2,0)),c=0,h=0,i.mode=M;case M:if(1024&i.flags){for(;16>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}i.length=c,i.head&&(i.head.extra_len=c),512&i.flags&&(Ze[0]=255&c,Ze[1]=c>>>8&255,i.check=v(i.check,Ze,2,0)),c=0,h=0}else i.head&&(i.head.extra=null);i.mode=j;case j:if(1024&i.flags&&(m=i.length,m>f&&(m=f),m&&(i.head&&(xe=i.head.extra_len-i.length,i.head.extra||(i.head.extra=new Array(i.head.extra_len)),_.arraySet(i.head.extra,a,o,m,xe)),512&i.flags&&(i.check=v(i.check,a,m,o)),f-=m,o+=m,i.length-=m),i.length))break e;i.length=0,i.mode=K;case K:if(2048&i.flags){if(0===f)break e;m=0;do xe=a[o+m++],i.head&&xe&&i.length<65536&&(i.head.name+=String.fromCharCode(xe));while(xe&&f>m);if(512&i.flags&&(i.check=v(i.check,a,m,o)),f-=m,o+=m,xe)break e}else i.head&&(i.head.name=null);i.length=0,i.mode=P;case P:if(4096&i.flags){if(0===f)break e;m=0;do xe=a[o+m++],i.head&&xe&&i.length<65536&&(i.head.comment+=String.fromCharCode(xe));while(xe&&f>m);if(512&i.flags&&(i.check=v(i.check,a,m,o)),f-=m,o+=m,xe)break e}else i.head&&(i.head.comment=null);i.mode=Y;case Y:if(512&i.flags){for(;16>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if(c!==(65535&i.check)){e.msg="header crc mismatch",i.mode=ce;break}c=0,h=0}i.head&&(i.head.hcrc=i.flags>>9&1,i.head.done=!0),e.adler=i.check=0,i.mode=X;break;case q:for(;32>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}e.adler=i.check=n(c),c=0,h=0,i.mode=G;case G:if(0===i.havedict)return e.next_out=s,e.avail_out=l,e.next_in=o,e.avail_in=f,i.hold=c,i.bits=h,N;e.adler=i.check=1,i.mode=X;case X:if(t===Z||t===A)break e;case W:if(i.last){c>>>=7&h,h-=7&h,i.mode=le;break}for(;3>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}switch(i.last=1&c,c>>>=1,h-=1,3&c){case 0:i.mode=J;break;case 1:if(d(i),i.mode=ie,t===A){c>>>=2,h-=2;break e}break;case 2:i.mode=$;break;case 3:e.msg="invalid block type",i.mode=ce}c>>>=2,h-=2;break;case J:for(c>>>=7&h,h-=7&h;32>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if((65535&c)!==(c>>>16^65535)){e.msg="invalid stored block lengths",i.mode=ce;break}if(i.length=65535&c,c=0,h=0,i.mode=Q,t===A)break e;case Q:i.mode=V;case V:if(m=i.length){if(m>f&&(m=f),m>l&&(m=l),0===m)break e;_.arraySet(r,a,o,m,s),f-=m,o+=m,l-=m,s+=m,i.length-=m;break}i.mode=X;break;case $:for(;14>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if(i.nlen=(31&c)+257,c>>>=5,h-=5,i.ndist=(31&c)+1,c>>>=5,h-=5,i.ncode=(15&c)+4,c>>>=4,h-=4,i.nlen>286||i.ndist>30){e.msg="too many length or distance symbols",i.mode=ce;break}i.have=0,i.mode=ee;case ee:for(;i.have<i.ncode;){for(;3>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}i.lens[Ae[i.have++]]=7&c,c>>>=3,h-=3}for(;i.have<19;)i.lens[Ae[i.have++]]=0;if(i.lencode=i.lendyn,i.lenbits=7,Se={bits:i.lenbits},ye=x(y,i.lens,0,19,i.lencode,0,i.work,Se),i.lenbits=Se.bits,ye){e.msg="invalid code lengths set",i.mode=ce;break}i.have=0,i.mode=te;case te:for(;i.have<i.nlen+i.ndist;){for(;Be=i.lencode[c&(1<<i.lenbits)-1],me=Be>>>24,ke=Be>>>16&255,_e=65535&Be,!(h>=me);){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if(16>_e)c>>>=me,h-=me,i.lens[i.have++]=_e;else{if(16===_e){for(Ee=me+2;Ee>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if(c>>>=me,h-=me,0===i.have){e.msg="invalid bit length repeat",i.mode=ce;break}xe=i.lens[i.have-1],m=3+(3&c),c>>>=2,h-=2}else if(17===_e){for(Ee=me+3;Ee>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}c>>>=me,h-=me,xe=0,m=3+(7&c),c>>>=3,h-=3}else{for(Ee=me+7;Ee>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}c>>>=me,h-=me,xe=0,m=11+(127&c),c>>>=7,h-=7}if(i.have+m>i.nlen+i.ndist){e.msg="invalid bit length repeat",i.mode=ce;break}for(;m--;)i.lens[i.have++]=xe}}if(i.mode===ce)break;if(0===i.lens[256]){e.msg="invalid code -- missing end-of-block",i.mode=ce;break}if(i.lenbits=9,Se={bits:i.lenbits},ye=x(S,i.lens,0,i.nlen,i.lencode,0,i.work,Se),i.lenbits=Se.bits,ye){e.msg="invalid literal/lengths set",i.mode=ce;break}if(i.distbits=6,i.distcode=i.distdyn,Se={bits:i.distbits},ye=x(E,i.lens,i.nlen,i.ndist,i.distcode,0,i.work,Se),i.distbits=Se.bits,ye){e.msg="invalid distances set",i.mode=ce;break}if(i.mode=ie,t===A)break e;case ie:i.mode=ne;case ne:if(f>=6&&l>=258){e.next_out=s,e.avail_out=l,e.next_in=o,e.avail_in=f,i.hold=c,i.bits=h,p(e,w),s=e.next_out,r=e.output,l=e.avail_out,o=e.next_in,a=e.input,f=e.avail_in,c=i.hold,h=i.bits,i.mode===X&&(i.back=-1);break}for(i.back=0;Be=i.lencode[c&(1<<i.lenbits)-1],me=Be>>>24,ke=Be>>>16&255,_e=65535&Be,!(h>=me);){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if(ke&&0===(240&ke)){for(ge=me,ve=ke,pe=_e;Be=i.lencode[pe+((c&(1<<ge+ve)-1)>>ge)],me=Be>>>24,ke=Be>>>16&255,_e=65535&Be,!(h>=ge+me);){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}c>>>=ge,h-=ge,i.back+=ge}if(c>>>=me,h-=me,i.back+=me,i.length=_e,0===ke){i.mode=fe;break}if(32&ke){i.back=-1,i.mode=X;break}if(64&ke){e.msg="invalid literal/length code",i.mode=ce;break}i.extra=15&ke,i.mode=ae;case ae:if(i.extra){for(Ee=i.extra;Ee>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}i.length+=c&(1<<i.extra)-1,c>>>=i.extra,h-=i.extra,i.back+=i.extra}i.was=i.length,i.mode=re;case re:for(;Be=i.distcode[c&(1<<i.distbits)-1],me=Be>>>24,ke=Be>>>16&255,_e=65535&Be,!(h>=me);){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if(0===(240&ke)){for(ge=me,ve=ke,pe=_e;Be=i.distcode[pe+((c&(1<<ge+ve)-1)>>ge)],me=Be>>>24,ke=Be>>>16&255,_e=65535&Be,!(h>=ge+me);){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}c>>>=ge,h-=ge,i.back+=ge}if(c>>>=me,h-=me,i.back+=me,64&ke){e.msg="invalid distance code",i.mode=ce;break}i.offset=_e,i.extra=15&ke,i.mode=oe;case oe:if(i.extra){for(Ee=i.extra;Ee>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}i.offset+=c&(1<<i.extra)-1,c>>>=i.extra,h-=i.extra,i.back+=i.extra}if(i.offset>i.dmax){e.msg="invalid distance too far back",i.mode=ce;break}i.mode=se;case se:if(0===l)break e;if(m=w-l,i.offset>m){if(m=i.offset-m,m>i.whave&&i.sane){e.msg="invalid distance too far back",i.mode=ce;break}m>i.wnext?(m-=i.wnext,k=i.wsize-m):k=i.wnext-m,m>i.length&&(m=i.length),we=i.window}else we=r,k=s-i.offset,m=i.length;m>l&&(m=l),l-=m,i.length-=m;do r[s++]=we[k++];while(--m);0===i.length&&(i.mode=ne);break;case fe:if(0===l)break e;r[s++]=i.length,l--,i.mode=ne;break;case le:if(i.wrap){for(;32>h;){if(0===f)break e;f--,c|=a[o++]<<h,h+=8}if(w-=l,e.total_out+=w,i.total+=w,w&&(e.adler=i.check=i.flags?v(i.check,r,w,s-w):g(i.check,r,w,s-w)),w=l,(i.flags?c:n(c))!==i.check){e.msg="incorrect data check",i.mode=ce;break}c=0,h=0}i.mode=de;case de:if(i.wrap&&i.flags){for(;32>h;){if(0===f)break e;f--,c+=a[o++]<<h,h+=8}if(c!==(4294967295&i.total)){e.msg="incorrect length check",i.mode=ce;break}c=0,h=0}i.mode=ue;case ue:ye=R;break e;case ce:ye=O;break e;case he:return I;case be:default:return C}return e.next_out=s,e.avail_out=l,e.next_in=o,e.avail_in=f,i.hold=c,i.bits=h,(i.wsize||w!==e.avail_out&&i.mode<ce&&(i.mode<le||t!==B))&&u(e,e.output,e.next_out,w-e.avail_out)?(i.mode=he,I):(b-=e.avail_in,w-=e.avail_out,e.total_in+=b,e.total_out+=w,i.total+=w,i.wrap&&w&&(e.adler=i.check=i.flags?v(i.check,r,w,e.next_out-w):g(i.check,r,w,e.next_out-w)),e.data_type=i.bits+(i.last?64:0)+(i.mode===X?128:0)+(i.mode===ie||i.mode===Q?256:0),(0===b&&0===w||t===B)&&ye===z&&(ye=T),ye)}function h(e){if(!e||!e.state)return C;var t=e.state;return t.window&&(t.window=null),e.state=null,z}function b(e,t){var i;return e&&e.state?(i=e.state,0===(2&i.wrap)?C:(i.head=t,t.done=!1,z)):C}function w(e,t){var i,n,a,r=t.length;return e&&e.state?(i=e.state,0!==i.wrap&&i.mode!==G?C:i.mode===G&&(n=1,n=g(n,t,r,0),n!==i.check)?O:(a=u(e,t,r,r))?(i.mode=he,I):(i.havedict=1,z)):C}var m,k,_=e("../utils/common"),g=e("./adler32"),v=e("./crc32"),p=e("./inffast"),x=e("./inftrees"),y=0,S=1,E=2,B=4,Z=5,A=6,z=0,R=1,N=2,C=-2,O=-3,I=-4,T=-5,U=8,D=1,F=2,L=3,H=4,M=5,j=6,K=7,P=8,Y=9,q=10,G=11,X=12,W=13,J=14,Q=15,V=16,$=17,ee=18,te=19,ie=20,ne=21,ae=22,re=23,oe=24,se=25,fe=26,le=27,de=28,ue=29,ce=30,he=31,be=32,we=852,me=592,ke=15,_e=ke,ge=!0;i.inflateReset=o,i.inflateReset2=s,i.inflateResetKeep=r,i.inflateInit=l,i.inflateInit2=f,i.inflate=c,i.inflateEnd=h,i.inflateGetHeader=b,i.inflateSetDictionary=w,i.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":1,"./adler32":3,"./crc32":5,"./inffast":7,"./inftrees":9}],9:[function(e,t,i){"use strict";var n=e("../utils/common"),a=15,r=852,o=592,s=0,f=1,l=2,d=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],u=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],c=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],h=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,i,b,w,m,k,_){var g,v,p,x,y,S,E,B,Z,A=_.bits,z=0,R=0,N=0,C=0,O=0,I=0,T=0,U=0,D=0,F=0,L=null,H=0,M=new n.Buf16(a+1),j=new n.Buf16(a+1),K=null,P=0;for(z=0;a>=z;z++)M[z]=0;for(R=0;b>R;R++)M[t[i+R]]++;for(O=A,C=a;C>=1&&0===M[C];C--);if(O>C&&(O=C),0===C)return w[m++]=20971520,w[m++]=20971520,_.bits=1,0;for(N=1;C>N&&0===M[N];N++);for(N>O&&(O=N),U=1,z=1;a>=z;z++)if(U<<=1,U-=M[z],0>U)return-1;if(U>0&&(e===s||1!==C))return-1;for(j[1]=0,z=1;a>z;z++)j[z+1]=j[z]+M[z];for(R=0;b>R;R++)0!==t[i+R]&&(k[j[t[i+R]]++]=R);if(e===s?(L=K=k,S=19):e===f?(L=d,H-=257,K=u,P-=257,S=256):(L=c,K=h,S=-1),F=0,R=0,z=N,y=m,I=O,T=0,p=-1,D=1<<O,x=D-1,e===f&&D>r||e===l&&D>o)return 1;for(var Y=0;;){Y++,E=z-T,k[R]<S?(B=0,Z=k[R]):k[R]>S?(B=K[P+k[R]],Z=L[H+k[R]]):(B=96,Z=0),g=1<<z-T,v=1<<I,N=v;do v-=g,w[y+(F>>T)+v]=E<<24|B<<16|Z|0;while(0!==v);for(g=1<<z-1;F&g;)g>>=1;if(0!==g?(F&=g-1,F+=g):F=0,R++,0===--M[z]){if(z===C)break;z=t[i+k[R]]}if(z>O&&(F&x)!==p){for(0===T&&(T=O),y+=N,I=z-T,U=1<<I;C>I+T&&(U-=M[I+T],!(0>=U));)I++,U<<=1;if(D+=1<<I,e===f&&D>r||e===l&&D>o)return 1;p=F&x,w[p]=O<<24|I<<16|y-m|0}}return 0!==F&&(w[y+F]=z-T<<24|64<<16|0),_.bits=O,0}},{"../utils/common":1}],10:[function(e,t,i){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],11:[function(e,t,i){"use strict";function n(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}t.exports=n},{}],"/lib/inflate.js":[function(e,t,i){"use strict";function n(e){if(!(this instanceof n))return new n(e);this.options=s.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;t.raw&&t.windowBits>=0&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(t.windowBits>=0&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),t.windowBits>15&&t.windowBits<48&&0===(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new u,this.strm.avail_out=0;var i=o.inflateInit2(this.strm,t.windowBits);if(i!==l.Z_OK)throw new Error(d[i]);this.header=new c,o.inflateGetHeader(this.strm,this.header)}function a(e,t){var i=new n(t);if(i.push(e,!0),i.err)throw i.msg;return i.result}function r(e,t){return t=t||{},t.raw=!0,a(e,t)}var o=e("./zlib/inflate"),s=e("./utils/common"),f=e("./utils/strings"),l=e("./zlib/constants"),d=e("./zlib/messages"),u=e("./zlib/zstream"),c=e("./zlib/gzheader"),h=Object.prototype.toString;n.prototype.push=function(e,t){var i,n,a,r,d,u,c=this.strm,b=this.options.chunkSize,w=this.options.dictionary,m=!1;if(this.ended)return!1;n=t===~~t?t:t===!0?l.Z_FINISH:l.Z_NO_FLUSH,"string"==typeof e?c.input=f.binstring2buf(e):"[object ArrayBuffer]"===h.call(e)?c.input=new Uint8Array(e):c.input=e,c.next_in=0,c.avail_in=c.input.length;do{if(0===c.avail_out&&(c.output=new s.Buf8(b),c.next_out=0,c.avail_out=b),i=o.inflate(c,l.Z_NO_FLUSH),i===l.Z_NEED_DICT&&w&&(u="string"==typeof w?f.string2buf(w):"[object ArrayBuffer]"===h.call(w)?new Uint8Array(w):w,i=o.inflateSetDictionary(this.strm,u)),i===l.Z_BUF_ERROR&&m===!0&&(i=l.Z_OK,m=!1),i!==l.Z_STREAM_END&&i!==l.Z_OK)return this.onEnd(i),this.ended=!0,!1;c.next_out&&(0===c.avail_out||i===l.Z_STREAM_END||0===c.avail_in&&(n===l.Z_FINISH||n===l.Z_SYNC_FLUSH))&&("string"===this.options.to?(a=f.utf8border(c.output,c.next_out),r=c.next_out-a,d=f.buf2string(c.output,a),c.next_out=r,c.avail_out=b-r,r&&s.arraySet(c.output,c.output,a,r,0),this.onData(d)):this.onData(s.shrinkBuf(c.output,c.next_out))),0===c.avail_in&&0===c.avail_out&&(m=!0)}while((c.avail_in>0||0===c.avail_out)&&i!==l.Z_STREAM_END);return i===l.Z_STREAM_END&&(n=l.Z_FINISH),n===l.Z_FINISH?(i=o.inflateEnd(this.strm),this.onEnd(i),this.ended=!0,i===l.Z_OK):n===l.Z_SYNC_FLUSH?(this.onEnd(l.Z_OK),c.avail_out=0,!0):!0},n.prototype.onData=function(e){this.chunks.push(e)},n.prototype.onEnd=function(e){e===l.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=s.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},i.Inflate=n,i.inflate=a,i.inflateRaw=r,i.ungzip=a},{"./utils/common":1,"./utils/strings":2,"./zlib/constants":4,"./zlib/gzheader":6,"./zlib/inflate":8,"./zlib/messages":10,"./zlib/zstream":11}]},{},[])("/lib/inflate.js")});
!function(r){function e(r){ret="";for(var e=0;e<r.length;e++)ret+=String.fromCharCode(r[e]);return ret}function n(r,e){var n=new Uint8Array(r.byteLength+e.byteLength);return n.set(new Uint8Array(r),0),n.set(new Uint8Array(e),r.byteLength),n.buffer}function t(r,n){for(var t="",a=1;!0;a++){n-=t.length;var i=new Uint8Array(r.slice(n,n+1024*a)),o=Array.prototype.indexOf.call(i,0);if(-1==o&&(o=i.length,0==o))throw new Error("Unexpected end of buffer");if(t+=e(i.subarray(0,o)),o<i.length)break}return t}function a(r){var e=2,n=4,a=8,i=16,o=0,f=new Uint8Array(r,o,10),u={ID1:0,ID2:0,CM:0,FLG:0,MTIME:0,XFL:0,OS:0,FEXTRA:{XLEN:0,SUBFIELDS:[]},FNAME:"",FCOMMENT:"",FHCRC:""};if(31!=f[0]||139!=f[1])throw new Error("Not a gzip header.");if(u.ID1=f[0],u.ID2=f[1],u.CM=f[2],u.FLG=f[3],u.MTIME=f[4]<<0,u.MTIME|=f[5]<<8,u.MTIME|=f[6]<<16,u.MTIME|=f[7]<<24,u.XFL=f[8],u.OS=f[9],o+=10,0!=(u.FLG&n)){for(f=new Uint16Array(r,o,2),u.FEXTRA.XLEN=f[0],o+=2,f=new Uint8Array(r,o,u.FEXTRA.XLEN);;){var h=f[2]+256*f[3];if(subfield={SI1:String.fromCharCode(f[0]),SI2:String.fromCharCode(f[1]),LEN:h,DATA:f.subarray(4,4+h)},u.FEXTRA.SUBFIELDS.push(subfield),f=f.subarray(4+h),0==f.length)break}o+=u.FEXTRA.XLEN}return 0!=(u.FLG&a)&&(u.FNAME=t(r,o),o+=u.FNAME.length),0!=(u.FLG&i)&&(u.FCOMMENT=t(r,o),length+=u.FCOMMENT.length),0!=(u.FLG&e)&&(f=new Uint16Array(r,o,2),u.FHCRC=f[0],o+=2),u.LENGTH=o+1,u}var i=function(){var r=function(r,e){function t(r){i=a(r);for(var e,n=i.FEXTRA.SUBFIELDS,t=!1,f=0;f<n.length;f++)if(e=n[f],"R"==e.SI1||"A"==e.SI2){t=!0;break}if(t){var u=e.DATA;o=u[0]+256*u[1],E=u[2]+256*u[3],l=u[4]+256*u[5];for(var f=0,c=0;l>f&&2*f+6<u.length;f++){var A=u[2*f+6]+256*u[2*f+7];F.push([c,A]),c+=A}return h=!0,!0}throw new Error("Not a dictzip header.")}var i,o,f=r,u=e,h=!1,E=0,l=0,F=[];if(!(u instanceof Function))throw new Error("Given gunzip_func is not a function.");this.load=function(){return new Promise(function(r,e){var n=new FileReader;n.onload=function(n){try{t(n.target.result),r()}catch(a){e(a)}},n.readAsArrayBuffer(f)})},this.read=function(r,e){return new Promise(function(t,a){h||a(new Error("Read attempt before loadend.1")),"undefined"==typeof r&&(r=0),"undefined"==typeof e&&(e=E*F.length);var o=Math.min(Math.floor(r/E),F.length-1),l=Math.min(Math.floor((r+e)/E),F.length-1),c=r-o*E,A=c+e,d=new FileReader;d.onload=function(r){for(var e=new ArrayBuffer(0),a=r.target.result,i=o,f=0;l>=i&&f<a.byteLength;f+=F[i][1],i++){var h=a.slice(f,f+F[i][1]),E=u(h,0,h.byteLength);e=n(e,E)}t(e.slice(c,A))},d.readAsArrayBuffer(f.slice(i.LENGTH+F[o][0],i.LENGTH+F[l][0]+F[l][1]))})}};return r}();r.DictZipFile=i}(this);
!function(n){function t(n,t){0>t&&(t=n.length+t),out=0;for(var r=t;t+4>r;r++)out<<=8,out|=255&n[r];return out}function r(n,t,r){if("undefined"==typeof t&&(t=0),"undefined"==typeof r&&(r=-1),".dz"==n.type.substr(-3)){var e=new DictZipFile(n,pako.inflateRaw);return r>=0?e.load().then(function(){return e.read(t,r)},function(n){console.error("DictZipFile load error: "+n.message)}):e.read(t)}var e=new FileReader;return new Promise(function(i,o){r>=0?e.readAsArrayBuffer(n.slice(t,t+r)):e.readAsArrayBuffer(n.slice(t)),e.onload=function(n){i(n.target.result)}})}function e(n,t,e){return r(n,t,e).then(function(n){return o(new Uint8Array(n))})}const i=25;var o=function(){var n=new TextDecoder("utf-8");return function(t){return n.decode(t)}}(),u=function(){var n=function(){function n(n){if(["idx","syn","dict","ifo","rifo","ridx","rdic"].forEach(function(t){s[t]=null;for(var r=0;r<n.length;r++){var e=n[r].type;(e.substr(-1-t.length)=="."+t||e.substr(-4-t.length)=="."+t+".dz")&&(s[t]=n[r],n.splice(r,1))}}),s.res=n,null==s.dict)throw new Error("Missing *.dict(.dz) file!");if(null==s.idx)throw new Error("Missing *.idx(.dz) file!");if(null==s.ifo)throw new Error("Missing *.ifo(.dz) file!")}function u(n){var t=n.split("\n");if("StarDict's dict ifo file"!=t.shift())throw new Error("Not a proper ifo file");t.forEach(function(n){w=n.split("="),"synwordcount"==w[0]&&null==s.syn&&(w[1]=0),c[w[0]]=w[1]})}function f(n){var t=n.split("\n");if("StarDict's storage ifo file"!=t.shift())throw new Error("Not a proper rifo file");t.forEach(function(n){w=n.split("="),console.log("rifo: "+w[0]+"="+w[1])})}var s={},c={version:"",bookname:"",wordcount:"",synwordcount:"0",idxfilesize:"",sametypesequence:""};this.load=function(t){return new Promise(function(r,i){try{n(t),e(s.ifo).then(function(n){u(n),null!=s.rifo?e(s.rifo).then(function(n){f(n),r()}):r()})}catch(o){i(o)}})},this.keyword=function(n){return c[n]},this.resource=function(n){function e(){for(var t=0;t<s.res.length;t++){var r=s.res[t].type;if(n==r.substring(r.lastIndexOf("/")+1))return s.res[t]}return null}function i(r){for(var e=new Uint8Array(r),i=0,u=0;i<e.length;i++)if(o(e.subarray(u,i))==n)return[t(e,i+1),t(e,i+5)];return null}return n=n.replace(/^\x1E/,"").replace(/\x1F$/,""),new Promise(function(n,t){var o=e();null!=o?n(o):null!=s.ridx?r(s.ridx).then(function(t){var e=i(t);null!=e?r(s.rdic,e[0],e[1]).then(function(t){n(new Blob([t]))}):n(null)}):n(null)})},this.entry=function(n){var t=n[0],r=n[1];return e(s.dict,t,r)},this.synonyms=function(n){function e(r,e){var i={};return n.include_term&&(i.term=o(r.subarray(0,-5))),n.include_wid&&(i.wid=t(r,-4)),n.include_offset&&(i.offset=e),i}function u(n,t,o){return"undefined"==typeof o&&(o=i),new Promise(function(f,c){if(0>=t||s.syn.size<=n)return void f([]);var a=t*o;r(s.syn,n,a).then(function(r){for(var s=new Uint8Array(r),c=[],a=0,l=0;l<s.length&&t>c.length;l++)0==s[l]&&(c.push(e(s.subarray(a,l+5),n+a)),l+=5,a=l);u(n+a,t-c.length,o+i).then(function(n){f(c.concat(n))})})})}if(null==s.syn)return[];"undefined"==typeof n&&(n={});var f={count:-1,start_offset:0,include_term:!0,include_wid:!0,include_offset:!1};for(var c in f)"undefined"==typeof n[c]&&("count"==c&&"undefined"!=typeof n.start_offset?n.count=1:n[c]=f[c]);return n.count<0&&(n.count=parseInt(this.keyword("synwordcount"))),u(n.start_offset,n.count)},this.index=function(n){function e(r,e){var i={};return n.include_term&&(i.term=o(r.subarray(0,-9))),n.include_dictpos&&(i.dictpos=[t(r,-8),t(r,-4)]),n.include_offset&&(i.offset=e),i}function u(n,t,o){return"undefined"==typeof o&&(o=i),new Promise(function(f,c){if(0>=t||s.idx.size<=n)return void f([]);var a=t*o;r(s.idx,n,a).then(function(r){for(var s=new Uint8Array(r),c=[],a=0,l=0;l<s.length-8&&t>c.length;l++)0==s[l]&&(c.push(e(s.subarray(a,l+9),n+a)),l+=9,a=l);u(n+a,t-c.length,o+i).then(function(n){f(c.concat(n))})})})}"undefined"==typeof n&&(n={});var f={count:-1,start_offset:0,include_term:!0,include_dictpos:!0,include_offset:!1};for(var c in f)"undefined"==typeof n[c]&&("count"==c&&"undefined"!=typeof n.start_offset?n.count=1:n[c]=f[c]);return n.count<0&&(n.count=parseInt(this.keyword("wordcount"))),u(n.start_offset,n.count)},this.oft=function(n){"undefined"==typeof n&&(n="index");var t=("synonyms"==n?"syn":"idx")+".oft",e=parseInt(this.keyword(("synonyms"==n?"syn":"")+"wordcount"));return null==s[t]?new Promise(function(t,r){this.iterable(n).then(function(n){for(var r=n.next(),i=0,o=new Uint32Array(e);null!=r;)o[i++]=r,r=n.next();t(o.buffer)})}):r(s[t])},this.iterable=function(n){"undefined"==typeof n&&(n="index");var e=function(r){return new function(){function e(n){for(var t=n;t<r.length;t++)if(0==r[t])return t;return-1}var i=0;this.data=function(i){return"synonyms"==n?t(r,e(i)+1):[t(r,e(i)+1),t(r,e(i)+5)]},this.term=function(n){return o(r.subarray(n,e(n)))},this.next=function(){for(var t=i,e=null,o="synonyms"==n?4:8;i<r.length;i++)if(0==r[i]){e=t,i+=o+1;break}return e},this.view=r}},i="synonyms"==n?"syn":"idx";return new Promise(function(n,t){null==s[i]?n(e([])):r(s[i]).then(function(t){n(e(new Uint8Array(t)))})})}};return n}();n.StarDict=u}(this);