(()=>{"use strict";var e={mesto_url:"https://nomoreparties.co/v1/wff-cohort-1",headers:{authorization:"41ef9c6d-d7e3-4f75-82a5-f6cacde2dee1","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function n(){return fetch("".concat(e.mesto_url,"/cards"),{headers:e.headers}).then(t)}function o(){return fetch("".concat(e.mesto_url,"/users/me"),{headers:e.headers}).then(t)}function r(n,o){return fetch("".concat(e.mesto_url,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:n,link:o})}).then(t)}function c(n,o){return fetch("".concat(e.mesto_url,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:n,about:o})}).then(t)}function a(n){return fetch("".concat(e.mesto_url,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t)}function i(n){return fetch("".concat(e.mesto_url,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t)}var u=document.querySelector("#card-template").content;function s(n,o){var r,c=n.closest(".card");(r=o,fetch("".concat(e.mesto_url,"/cards/").concat(r),{method:"DELETE",headers:e.headers}).then(t)).then((function(e){c.remove()})).catch((function(e){console.log("".concat(a.name," - ").concat(e))}))}function l(e,t,n){e.classList.contains("card__like-button_is-active")?i(n).then((function(n){e.classList.remove("card__like-button_is-active"),t.textContent=n.likes.length})).catch((function(e){console.log("".concat(i.name," - ").concat(e))})):a(n).then((function(n){e.classList.add("card__like-button_is-active"),t.textContent=n.likes.length})).catch((function(e){console.log("".concat(a.name," - ").concat(e))}))}var d=350;function f(e,t){switch(e.classList.add("popup_is-animated"),t){case"open":setTimeout((function(){e.classList.add("popup_is-opened")}),d);break;case"close":setTimeout((function(){e.classList.remove("popup_is-opened")}),d)}}function p(e){f(e,"open"),document.addEventListener("keydown",_),document.addEventListener("mousedown",v)}function m(e){f(e,"close"),document.removeEventListener("keydown",_),document.removeEventListener("mousedown",v)}function _(e){"Escape"===e.key&&m(document.querySelector(".popup_is-opened"))}function v(e){e.target.classList.contains("popup_is-opened")&&m(e.target)}function y(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),r.classList.remove(o)}function h(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n)):(t.disabled=!0,t.classList.add(n))}function S(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){y(e,n,t.inputErrorClass,t.errorClass)})),o.classList.add(t.inactiveButtonClass)}function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var b=document.querySelector(".page").querySelector(".places__list"),q=document.querySelectorAll(".popup__close"),k=document.querySelector(".popup_type_new-card"),L=document.querySelector(".profile__add-button"),E=document.forms["new-place"],C=E.elements["place-name"],x=E.elements.link,A=document.querySelector(".popup_type_edit"),w=document.querySelector(".profile__edit-button"),T=document.forms["edit-profile"],P=T.elements.name,j=T.elements.description,B=document.querySelector(".profile__title"),O=document.querySelector(".profile__description"),D=document.querySelector(".profile__image"),I=document.querySelector(".popup_type_image"),M=I.querySelector(".popup__image"),N=I.querySelector(".popup__caption"),J=document.querySelector(".popup_type_edit-avatar"),H=document.forms["edit-avatar"],U=H.elements.url,V=document.querySelector(".profile__image-edit"),z=H.querySelector(".popup__button"),$={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},F="",G=[n,o];function K(e){m(e.target.closest(".popup"))}function Q(e){M.src=e.target.src,M.alt=e.target.alt,N.textContent=e.target.alt,p(I)}var R,W,X=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return g(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?g(e,t):void 0}}(e))){n&&(e=n);var o=0,r=function(){};return{s:r,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,a=!0,i=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return a=e.done,e},e:function(e){i=!0,c=e},f:function(){try{a||null==n.return||n.return()}finally{if(i)throw c}}}}(q);try{for(X.s();!(R=X.n()).done;)R.value.addEventListener("click",K)}catch(e){X.e(e)}finally{X.f()}function Y(e){var t=function(e,t,n,o,r){var c=u.querySelector(".card").cloneNode(!0);return c.querySelector(".card__image").alt=e.name,c.querySelector(".card__image").src=e.link,c.querySelector(".card__title").textContent=e.name,c.id=e._id,c.querySelector(".card__like-count").textContent=e.likes.length,c.querySelector(".card__like-button").addEventListener("click",(function(e){var t=e.target;n(t,c.querySelector(".card__like-count"),c.id),e.stopPropagation()})),c.querySelector(".card__delete-button").addEventListener("click",(function(e){var n=e.target;t(n,c.id),e.stopPropagation()})),c.addEventListener("click",o),e.owner._id!=r&&(c.querySelector(".card__delete-button").style.display="none"),e.likes.find((function(e){return e._id===r}))&&c.querySelector(".card__like-button").classList.add("card__like-button_is-active"),c}(e,s,l,Q,F);b.prepend(t)}Promise.all(G).then((function(){console.log(n()),n().then((function(e){e.forEach((function(e){Y(e)}))})).catch((function(e){console.log("".concat(n.name," - ").concat(e))})),console.log(o()),o().then((function(e){F=e._id,console.log(F),B.textContent=e.name,O.textContent=e.about,D.style.backgroundImage="url('".concat(e.avatar,"')"),console.log(e.avatar)})).catch((function(e){console.log("".concat(o.name," - ").concat(e))}))})),w.addEventListener("click",(function(){P.value=B.textContent,j.value=O.textContent,p(A),S(T,$)})),T.addEventListener("submit",(function(e){e.preventDefault(),c(P.value,j.value).then((function(e){B.textContent=e.name,O.textContent=e.about,m(A)})).catch((function(e){console.log("".concat(c.name," - ").concat(e))}))})),L.addEventListener("click",(function(){E.reset(),p(k),S(E,$)})),E.addEventListener("submit",(function(e){e.preventDefault();var t={name:C.value,link:x.value};r(t.name,t.link).then((function(e){Y(e),m(k)})).catch((function(e){console.log("".concat(r.name," - ").concat(e))}))})),V.addEventListener("click",(function(){H.reset(),S(H,$),p(J)})),H.addEventListener("submit",(function n(o){var r;o.preventDefault(),z.textContent="Сохранение...",(r=U.value,fetch("".concat(e.mesto_url,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then(t)).then((function(e){D.style.backgroundImage="url('".concat(e.avatar,"')"),m(J)})).catch((function(e){console.log("".concat(n.name," - ").concat(e))})).finally((function(){z.textContent="Сохранить"}))})),W=$,Array.from(document.querySelectorAll("".concat(W.formSelector))).forEach((function(e){var t,n,o,r,c,a,i,u;t=e,n=W.inputSelector,o=W.submitButtonSelector,r=W.inactiveButtonClass,c=W.inputErrorClass,a=W.errorClass,i=Array.from(t.querySelectorAll(n)),u=t.querySelector(o),h(i,u,r),i.forEach((function(e){e.addEventListener("input",(function(){!function(e,t,n,o){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?y(e,t,n,o):function(e,t,n,o,r){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o),c.textContent=n,c.classList.add(r)}(e,t,t.validationMessage,n,o)}(t,e,c,a),h(i,u,r)}))}))}))})();