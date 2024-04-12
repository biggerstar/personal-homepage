import{j as M,k as V,l as N,m as D,n as j,q as P,a as n,c as u,e as t,r as w,s as d,u as e,b as _,w as r,v as m,x,y as B,E,d as I,z as F,T as q,A,B as K,_ as L,i as W,C as S,o as G,g as H,F as k,D as T,f as y,t as i,p as J,h as O}from"./index-f60fdd95.js";import{T as z}from"./Title-ba93c77d.js";import{F as Q}from"./FixedStick-b776515f.js";const R=M({type:{type:String,values:["success","info","warning","danger",""],default:""},closable:Boolean,disableTransitions:Boolean,hit:Boolean,color:{type:String,default:""},size:{type:String,values:V,default:""},effect:{type:String,values:["dark","light","plain"],default:"light"},round:Boolean}),U={close:a=>a instanceof MouseEvent,click:a=>a instanceof MouseEvent},X=N({name:"ElTag"}),Y=N({...X,props:R,emits:U,setup(a,{emit:b}){const l=a,p=D(),s=j("tag"),g=P(()=>{const{type:o,hit:v,effect:C,closable:c,round:$}=l;return[s.b(),s.is("closable",c),s.m(o),s.m(p.value),s.m(C),s.is("hit",v),s.is("round",$)]}),h=o=>{b("close",o)},f=o=>{b("click",o)};return(o,v)=>o.disableTransitions?(n(),u("span",{key:0,class:d(e(g)),style:F({backgroundColor:o.color}),onClick:f},[t("span",{class:d(e(s).e("content"))},[w(o.$slots,"default")],2),o.closable?(n(),_(e(E),{key:0,class:d(e(s).e("close")),onClick:B(h,["stop"])},{default:r(()=>[m(e(x))]),_:1},8,["class","onClick"])):I("v-if",!0)],6)):(n(),_(q,{key:1,name:`${e(s).namespace.value}-zoom-in-center`,appear:""},{default:r(()=>[t("span",{class:d(e(g)),style:F({backgroundColor:o.color}),onClick:f},[t("span",{class:d(e(s).e("content"))},[w(o.$slots,"default")],2),o.closable?(n(),_(e(E),{key:0,class:d(e(s).e("close")),onClick:B(h,["stop"])},{default:r(()=>[m(e(x))]),_:1},8,["class","onClick"])):I("v-if",!0)],6)]),_:3},8,["name"]))}});var Z=A(Y,[["__file","/home/runner/work/element-plus/element-plus/packages/components/tag/src/tag.vue"]]);const ee=K(Z);const se=a=>(J("data-v-17e31706"),a=a(),O(),a),oe={class:"description background-img",style:{"margin-bottom":"60px"}},te={class:"person-desc"},ne={class:"person-base-info-box"},ae={class:"description-item"},le=se(()=>t("span",null,":",-1)),ce={class:"person-tags-info"},ie={style:{display:"flex","flex-wrap":"wrap"}},re={__name:"Introduction",setup(a){var f;const l=(f=W("useConfig").page)==null?void 0:f.introduction,p=l.stick,s=l.tags.sort(()=>S([-1,0,1])),g=["light","plain"],h=["success","info","warning","danger",""];return G(()=>{H.timeline().from(".person-desc",{y:-50}).from(".person-base-info-box",{x:-50},"<").from(".person-tags-info",{x:50},"<")}),(o,v)=>{const C=ee;return n(),u(k,null,[e(p)?(n(),_(Q,{key:0,color:e(p).color},{default:r(()=>[y(i(e(p).desc),1)]),_:1},8,["color"])):I("",!0),t("div",oe,[t("div",te,[m(z,{"font-size":"1.3rem","underline-bottom":"#3498db"},{default:r(()=>[y(i(e(l).personDescTitle),1)]),_:1}),t("ul",null,[(n(!0),u(k,null,T(e(l).desc,c=>(n(),u("li",null,i(c),1))),256))])]),t("div",ne,[m(z,{"font-size":"1.3rem","underline-bottom":"#3498db"},{default:r(()=>[y(i(e(l).personInfoTitle),1)]),_:1}),(n(!0),u(k,null,T(e(l).personInfo,c=>(n(),u("div",ae,[t("span",null,i(c.type),1),le,t("span",null,i(c.desc),1)]))),256))]),t("div",ce,[m(z,{"font-size":"1.3rem","underline-bottom":"#3498db",class:"shadow-text-line"},{default:r(()=>[y(i(e(l).personTagsTitle),1)]),_:1}),t("div",ie,[(n(!0),u(k,null,T(e(s),c=>(n(),_(C,{type:e(S)(h),effect:e(S)(g),size:"large"},{default:r(()=>[t("div",null,i(c),1)]),_:2},1032,["type","effect"]))),256))])])])],64)}}},fe=L(re,[["__scopeId","data-v-17e31706"]]);export{fe as default};
