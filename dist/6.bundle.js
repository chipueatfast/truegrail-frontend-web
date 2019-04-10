(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{987:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t.n(r),o=t(571),c=t(568),u=t(416);function i(){var e=function(e,n){n||(n=e.slice(0));return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}(["\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    flex-direction: column;\n    height: 200px;\n\n"]);return i=function(){return e},e}var s=u.b.div(i()),d=t(548),l=function(){var e="http://localhost:2190";return{getFactory:function(n){return"".concat(e,"/factory/").concat(n)},createFactory:function(){return"".concat(e,"/factory")}}},f=function(e){if(e.status>=200&&e.status<=300||400===e.status)return e;var n=new Error(e.statusText);throw n.response=e,n},v=function(e){return 204===e.status?{}:e.json()},m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.url,t=e.method,r=void 0===t?"GET":t,a=e.body,o=void 0===a?null:a,c=e.options,u=(void 0===c?{}:c)||{};return u.method=r,u.mode="cors",u.headers=new Headers({Accept:"application/json","Content-Type":"application/json"}),o&&(u.body=JSON.stringify(o)),fetch(n,u).then(f).then(v).then(function(e){if(e.error&&e.error.message)throw new Error(e.error.message);return e}).catch(function(e){return{err:e}})},p=t(18),h=t(398),y=t(380),b=t.n(y);function w(){var e=E(["\n    flex-direction: row;\n    justify-content: space-around;\n    align-items: center;\n"]);return w=function(){return e},e}function g(){var e=E(["\n    font-size: 16px;\n    text-align: center;\n"]);return g=function(){return e},e}function x(){var e=E(["\n    justify-content: center;\n    flex-direction: column;\n    align-items: center;\n"]);return x=function(){return e},e}function E(e,n){return n||(n=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}var k=u.b.div(x()),A=u.b.span(g()),j=u.b.div(w());function C(e,n,t,r,a,o,c){try{var u=e[o](c),i=u.value}catch(e){return void t(e)}u.done?n(i):Promise.resolve(i).then(r,a)}function F(e){return function(){var n=this,t=arguments;return new Promise(function(r,a){var o=e.apply(n,t);function c(e){C(o,r,a,c,u,"next",e)}function u(e){C(o,r,a,c,u,"throw",e)}c(void 0)})}}var O=function(){var e=F(regeneratorRuntime.mark(function e(){var n,t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,window.ethereum.enable();case 2:n=e.sent,t=n[0],h.a.eth.defaultAccount=t;case 5:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();var T=function(e){var n=e.message,t=e.onAcceptCallback,r=e.close,o=void 0===r?p.a.closeModal:r;return a.a.createElement(k,null,a.a.createElement(A,null,n),a.a.createElement(j,null,a.a.createElement(b.a,{variant:"contained",color:"primary",onClick:F(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O();case 2:t();case 3:case"end":return e.stop()}},e)}))},"Accept"),a.a.createElement(b.a,{variant:"contained",color:"secondary",onClick:function(){return o()}},"Deny")))};function _(e,n,t,r,a,o,c){try{var u=e[o](c),i=u.value}catch(e){return void t(e)}u.done?n(i):Promise.resolve(i).then(r,a)}var P=function(e,n){p.a.showModal({_modalTitle:"Add factory",_renderModalContent:function(){return a.a.createElement(T,{message:"Are you sure you want to add this address as a factory?",onAcceptCallback:function(){return R(e,n)}})}})},R=function(){var e,n=(e=regeneratorRuntime.mark(function e(n,t){var r,a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.deployed();case 2:return r=e.sent,e.next=5,m({url:l().getFactory(n),method:"GET"});case 5:if(!((a=e.sent)&&a.err&&a.err.response&&404===a.err.response.status)){e.next=22;break}return e.prev=7,e.next=10,r.addFactory(n,{from:h.a.eth.defaultAccount});case 10:return e.next=12,m({url:l().addFactory(),method:"POST",body:{blockchainAddress:n,brand:t}});case 12:e.sent.err,e.next=20;break;case 16:e.prev=16,e.t0=e.catch(7),console.log(e.t0),p.a.showNotice({_message:"The factory has been added",_variant:"info",_duration:5e3});case 20:e.next=23;break;case 22:p.a.showNotice({_message:"The factory has already been added",_variant:"error",_duration:5e3});case 23:case"end":return e.stop()}},e,null,[[7,16]])}),function(){var n=this,t=arguments;return new Promise(function(r,a){var o=e.apply(n,t);function c(e){_(o,r,a,c,u,"next",e)}function u(e){_(o,r,a,c,u,"throw",e)}c(void 0)})});return function(e,t){return n.apply(this,arguments)}}();n.default=function(){return a.a.createElement(s,null,a.a.createElement("span",null,"Creator"),a.a.createElement(o.b,{initialValues:{address:"0x8909969a0deA718d996eb1e82e67B484F831909f",brand:"vans"},onSubmit:function(e,n){(0,n.setSubmitting)(!0),P(e.address,e.brand)}},function(e){var n=e.values,t=e.handleChange,r=e.handleSubmit;return a.a.createElement(a.a.Fragment,null,a.a.createElement(c.d,{value:n.brand,name:"address",onChange:t,label:"Factory Address"}),a.a.createElement(c.d,{value:n.address,name:"address",onChange:t,label:"Factory Address"}),a.a.createElement(c.a,{variant:"contained",color:"primary",onClick:r},"Add Factory"))}))}}}]);