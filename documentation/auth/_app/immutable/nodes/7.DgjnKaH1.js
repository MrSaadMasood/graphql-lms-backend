import{d as v,e as y,f as P}from"../chunks/pages.C1yzUioW.js";import{e as w}from"../chunks/index.D1XTZfZp.js";import{s as B,b as c,h as N,d as p,c as u,l as d}from"../chunks/scheduler.BZkyrStM.js";import{S as O,i as T,c as _,a as g,m as $,t as b,b as S,d as h}from"../chunks/index.BLFDKRva.js";import{F as j,Q as x}from"../chunks/FieldDetails.D3WwSHra.js";import{P as C}from"../chunks/PreviousNextPage.DID6LrID.js";const F=v(),I=({params:n,url:a})=>{const s=y(n.subscription),t=P(a.pathname);if(!s||!t)throw w(404,`Subscription ${n.subscription} not found.`);return{field:s,page:t}},U=Object.freeze(Object.defineProperty({__proto__:null,load:I,prerender:F},Symbol.toStringTag,{value:"Module"}));function Q(n){let a,s,t,r,i,f;return document.title=a="Subscription - "+n[0].field.name,t=new j({props:{field:n[0].field,type:x.SUBSCRIPTION}}),i=new C({props:{page:n[0].page}}),{c(){s=c(),_(t.$$.fragment),r=c(),_(i.$$.fragment)},l(e){N("svelte-40g4xm",document.head).forEach(p),s=u(e),g(t.$$.fragment,e),r=u(e),g(i.$$.fragment,e)},m(e,o){d(e,s,o),$(t,e,o),d(e,r,o),$(i,e,o),f=!0},p(e,[o]){(!f||o&1)&&a!==(a="Subscription - "+e[0].field.name)&&(document.title=a);const m={};o&1&&(m.field=e[0].field),t.$set(m);const l={};o&1&&(l.page=e[0].page),i.$set(l)},i(e){f||(b(t.$$.fragment,e),b(i.$$.fragment,e),f=!0)},o(e){S(t.$$.fragment,e),S(i.$$.fragment,e),f=!1},d(e){e&&(p(s),p(r)),h(t,e),h(i,e)}}}function q(n,a,s){let{data:t}=a;return n.$$set=r=>{"data"in r&&s(0,t=r.data)},[t]}class k extends O{constructor(a){super(),T(this,a,q,Q,B,{data:0})}}export{k as component,U as universal};
