import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createIcons, Castle, Sun, Moon, CircleHelp, Plus, Minus, Scan, Sparkles, X, ArrowUpRight, ArrowDownRight, Compass, MousePointer2, LogOut } from 'lucide';
import './style.css';

const $ = (id) => document.getElementById(id);
const icons = { Castle, Sun, Moon, CircleHelp, Plus, Minus, Scan, Sparkles, X, ArrowUpRight, ArrowDownRight, Compass, MousePointer2, LogOut };
const TAU = Math.PI * 2;
const rides = [
 {id:'coaster', name:'云霄列车', english:'SKY EXPRESS', tag:'一点勇气，满分心跳', kind:'心跳加速', duration:36, color:'#d8b5a2', tint:'#f5e8df', position:[-15,0,-5], label:[-18,8,-7], description:'穿过青葱树林，越过起伏的山丘。让风掠过耳边，把所有烦恼留在身后。', icon:'coaster'},
 {id:'wheel', name:'星空摩天轮', english:'STAR WHEEL', tag:'把风景慢慢收藏', kind:'悠然观景', duration:30, color:'#b3c4c8', tint:'#e7eef0', position:[16,0,-8], label:[17,17,-8], description:'缓缓升向天空，从云端俯瞰整个奇境。最高处的风景，值得你慢一点。', icon:'wheel'},
 {id:'carousel', name:'梦幻旋转木马', english:'DREAM CAROUSEL', tag:'童心永远不过期', kind:'温柔浪漫', duration:30, color:'#d5bac0', tint:'#f3e7e9', position:[-11,0,12], label:[-11,7,12], description:'坐上属于你的童话木马，在金色灯光与缤纷穹顶下，转进一段无忧无虑的时光。', icon:'carousel'},
 {id:'swings', name:'微风飞椅', english:'BREEZE SWINGS', tag:'和微风一起兜个圈', kind:'轻盈飞翔', duration:30, color:'#bbc6a3', tint:'#ebefdf', position:[13,0,12], label:[13,9,12], description:'双脚离开地面，跟着微风轻轻飞扬。伸展心情，在绿意与天空之间自由旋转。', icon:'swings'},
];

function thumbnail(type){
 const top='<svg viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">';
 const end='</svg>';
 if(type==='wheel') return top+'<path d="M21 62 35 32 49 62" stroke="#809f9e" stroke-width="3"/><circle cx="35" cy="29" r="22" stroke="#b99272" stroke-width="2"/><circle cx="35" cy="29" r="18" stroke="#c5cfc9"/><path d="m35 7 0 44M13 29h44M19 13l32 32M19 45l32-32" stroke="#b9b3a0"/>'+Array.from({length:8},(_,i)=>{const a=i*TAU/8;return `<rect x="${31+Math.cos(a)*22}" y="${27+Math.sin(a)*22}" width="8" height="9" rx="2" fill="${i%2?'#dbb2a2':'#91afa9'}"/>`}).join('')+'<circle cx="35" cy="29" r="4" fill="#a1816a"/><path d="M16 63h39" stroke="#91aaa3" stroke-width="3"/>'+end;
 if(type==='coaster')return top+'<path d="M10 57V39m12 18V24m14 33V38m14 19V21m10 36V37" stroke="#aab6a2" stroke-width="2"/><path d="M7 44C15 44 16 20 24 20S32 48 40 44 48 15 56 23s4 20 9 16" stroke="#cb9175" stroke-width="4"/><path d="M7 49C15 49 16 25 24 25S32 53 40 49 48 20 56 28s4 20 9 16" stroke="#e1b49a" stroke-width="2"/><rect x="18" y="13" width="12" height="7" rx="2" fill="#799c8c" transform="rotate(-8 24 17)"/><path d="M7 59h56" stroke="#b4c1ac" stroke-width="3"/>'+end;
 if(type==='carousel')return top+'<ellipse cx="35" cy="58" rx="27" ry="7" fill="#bc9f83"/><path d="M12 51h46v8H12z" fill="#d8bca3"/><path d="M35 8 8 30h54L35 8Z" fill="#c898a6"/><path d="m35 8-10 22h20L35 8Z" fill="#faead1"/><path d="M35 7V2l9 4-9 3" fill="#c7a16d"/><path d="M16 31v23m19-23v23m19-23v23" stroke="#ba9668" stroke-width="2"/><path d="m12 31 5 5 6-5 6 5 6-5 6 5 6-5 6 5 6-5" fill="#eed8be"/><path d="M22 43h9v6h-9zM41 42h9v6h-9z" fill="#fff8e7"/><path d="m24 47-2 5m7-6 2 5m12-5-2 5m7-5 2 5" stroke="#fff8e7" stroke-width="2"/>'+end;
 return top+'<ellipse cx="35" cy="60" rx="24" ry="6" fill="#c4c9a2"/><path d="M31 24h8v34h-8z" fill="#b4bd99"/><path d="M35 8 9 27h52L35 8Z" fill="#a6b697"/><path d="m35 8-9 19h18L35 8Z" fill="#f2dfb4"/><path d="M12 28 7 46m15-18-4 23m30-23 4 23m6-23 6 18" stroke="#aa9478"/><rect x="3" y="45" width="9" height="6" rx="2" fill="#d1a47d"/><rect x="14" y="50" width="9" height="6" rx="2" fill="#b6909b"/><rect x="48" y="50" width="9" height="6" rx="2" fill="#b6909b"/><rect x="59" y="45" width="9" height="6" rx="2" fill="#d1a47d"/><circle cx="35" cy="7" r="3" fill="#c2a468"/>'+end;
}
$('ride-cards').innerHTML=rides.map((r,i)=>`<button class="ride-card" data-ride="${r.id}" style="--tint:${r.tint}" aria-label="查看${r.name}"><div class="ride-art">${thumbnail(r.icon)}</div><div class="ride-info"><small>0${i+1} / ${r.english}</small><h3>${r.name}</h3><p>正在运行</p></div><i data-lucide="arrow-up-right" class="card-arrow"></i></button>`).join('');
createIcons({icons});

let renderer;
try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});}catch(e){
 document.body.classList.add('error');$('loading').querySelector('h2').textContent='这个浏览器暂时无法开启奇境';$('loading-text').textContent='请开启浏览器硬件加速，或使用支持 WebGL 的新版 Chrome、Edge、Safari 再试一次。';throw e;
}
renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));
renderer.setSize(innerWidth,Math.max(innerHeight,560));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;
$('scene').appendChild(renderer.domElement);$('loading-progress').style.width='25%';
const scene=new THREE.Scene();scene.background=new THREE.Color('#e7ece1');scene.fog=new THREE.Fog('#e7ece1',210,320);
const camera=new THREE.PerspectiveCamera(36,innerWidth/Math.max(innerHeight,560),.1,360);
const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.dampingFactor=.065;controls.enablePan=false;controls.minDistance=26;controls.maxDistance=108;controls.minPolarAngle=.25;controls.maxPolarAngle=Math.PI*.46;controls.rotateSpeed=.65;controls.zoomSpeed=.7;
const isMobile=()=>innerWidth<650;
function home(){controls.maxDistance=isMobile()?190:108;controls.target.set(0,1,2);camera.position.set(isMobile()?88:61,isMobile()?88:55,isMobile()?121:77);controls.update();}
home();
const ambient=new THREE.HemisphereLight('#fffcdf','#69847a',2.5);scene.add(ambient);
const sun=new THREE.DirectionalLight('#fff0d7',3.6);sun.position.set(-35,60,30);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-47,right:47,top:47,bottom:-47,near:1,far:150});sun.shadow.normalBias=.05;sun.shadow.bias=-.0002;scene.add(sun);
const fill=new THREE.DirectionalLight('#c6daef',.6);fill.position.set(30,20,-25);scene.add(fill);
const matCache=new Map(),geoCache=new Map(),glows=[];
function mat(color,options={}){const key=color+JSON.stringify(options);if(!matCache.has(key))matCache.set(key,new THREE.MeshStandardMaterial({color,roughness:.8,...options}));return matCache.get(key);}
function geometry(type,args){if(args.some(a=>typeof a==='object'))return new THREE[type](...args);const key=type+args.join(',');if(!geoCache.has(key))geoCache.set(key,new THREE[type](...args));return geoCache.get(key);}
function mesh(parent,type,args,color,x=0,y=0,z=0,options={}){const m=new THREE.Mesh(geometry(type,args),typeof color==='string'?mat(color,options):color);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
function box(p,w,h,d,c,x=0,y=0,z=0){return mesh(p,'BoxGeometry',[w,h,d],c,x,y,z);}
function cyl(p,rt,rb,h,c,x=0,y=0,z=0,n=32){return mesh(p,'CylinderGeometry',[rt,rb,h,n],c,x,y,z);}
function ball(p,r,c,x=0,y=0,z=0){return mesh(p,'SphereGeometry',[r,12,10],c,x,y,z);}
function group(p,x=0,y=0,z=0){const g=new THREE.Group();g.position.set(x,y,z);p.add(g);return g;}
function beam(p,a,b,r,c){const va=new THREE.Vector3(...a),vb=new THREE.Vector3(...b),m=cyl(p,r,r,va.distanceTo(vb),c);m.position.copy(va).add(vb).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),vb.sub(va).normalize());return m;}
function torus(p,r,t,c,x=0,y=0,z=0){return mesh(p,'TorusGeometry',[r,t,6,64],c,x,y,z);}
function glowMaterial(color){const m=mat(color,{emissive:color,emissiveIntensity:.18});glows.push(m);return m;}
const bulb=glowMaterial('#ffe2a0'),windowMat=glowMaterial('#ffcd7d');
let seed=42;function rand(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
const park=group(scene,0,-.8,0);
// A floating miniature landscape, with a visible layered edge.
cyl(park,32.3,30.9,1.7,'#c6b99b',0,-.1,0,96);cyl(park,32.6,32.1,.55,'#92ad7c',0,.9,0,96);cyl(park,32.35,32.35,.1,'#a9bd8b',0,1.2,0,96);
const ground=mesh(scene,'PlaneGeometry',[600,600],'#e7ece1',0,-2,0);ground.rotation.x=-Math.PI/2;
function disk(x,z,r,color,y=.5){return cyl(scene,r,r,.075,color,x,y,z,64);}
disk(0,2,10,'#ded5b8');disk(0,2,8.9,'#eae0c5',.55);const ring=mesh(scene,'RingGeometry',[21,23,96],'#ded5b8',0,.54,0);ring.rotation.x=-Math.PI/2;
function path(a,b,width=2.8){const av=new THREE.Vector3(a[0],.52,a[1]),bv=new THREE.Vector3(b[0],.52,b[1]);const m=box(scene,width,.07,av.distanceTo(bv),'#e7dcc1');m.position.copy(av).add(bv).multiplyScalar(.5);m.rotation.y=Math.atan2(bv.x-av.x,bv.z-av.z);}
path([0,0],[0,29],4.5);path([-22,0],[22,0],3.4);path([-11,12],[-17,16],2.4);path([13,12],[18,15],2.4);path([0,-6],[0,-23],3);
for(let i=0;i<12;i++){box(scene,.09,.03,1.3,'#c9bca0',-1.2,.6,10+i*1.5);box(scene,.09,.03,1.3,'#c9bca0',1.2,.6,10+i*1.5);}
// Castle: warm stone, scalloped walls, pastel roofs, pennants, and glowing windows.
const castle=group(scene,0,.55,-5);
disk(0,-5,7.3,'#b2bd91',.57);
box(castle,10,1,6,'#d6c5ad',0,.5,0);box(castle,8.4,5.2,4.8,'#f0ddc6',0,3.2,0);box(castle,7.8,.35,5.1,'#d2ae9b',0,5.9,0);
box(castle,4,7.6,3.6,'#f5e7d4',0,5.8,-.9);const mainRoof=cyl(castle,0,3.2,3.8,'#8581a3',0,11.5,-.9,4);mainRoof.rotation.y=Math.PI/4;
function flag(p,x,y,z,color='#c98d88'){beam(p,[x,y,z],[x,y+1.4,z],.045,'#c2a161');const shape=new THREE.Shape();shape.moveTo(0,0);shape.lineTo(.85,-.26);shape.lineTo(0,-.55);const f=new THREE.Mesh(new THREE.ShapeGeometry(shape),mat(color,{side:THREE.DoubleSide}));f.position.set(x,y+1.35,z);p.add(f);}
function tower(x,z,h,r=1.3){cyl(castle,r*1.08,r*1.1,.5,'#cdb29f',x,.4,z);cyl(castle,r,r,h,'#f3e0c9',x,h/2+.4,z);cyl(castle,r*1.16,r,.6,'#d5b4a4',x,h+.4,z);cyl(castle,0,r*1.45,3,'#8981a8',x,h+2.1,z,12);cyl(castle,0,.21,.6,'#c4a169',x,h+3.9,z,8);flag(castle,x,h+4.2,z);box(castle,.42,1.1,.12,windowMat,x,h-.9,z+r);for(let i=0;i<6;i++){const a=i*TAU/6;box(castle,.38,.55,.38,'#f3e0c9',x+Math.cos(a)*r,h+.7,z+Math.sin(a)*r);}}
tower(-4.5,2.1,5.8);tower(4.5,2.1,5.8);tower(-3.7,-2.2,8.1,1.1);tower(3.7,-2.2,8.1,1.1);tower(0,-1,11,.85);
for(let x=-3;x<=3;x+=1){box(castle,.48,.7,.5,'#f3e0c9',x,6.3,2.4);}
// Rounded gate and inset door.
const arch=new THREE.Shape();arch.moveTo(-1,0);arch.lineTo(-1,1.7);arch.absarc(0,1.7,1,Math.PI,0,true);arch.lineTo(1,0);arch.closePath();const door=new THREE.Mesh(new THREE.ShapeGeometry(arch),mat('#8b746e'));door.position.set(0,.8,2.43);castle.add(door);for(let x=-.65;x<=.65;x+=.33)box(castle,.05,2.05,.04,'#b9a08b',x,1.8,2.48);
for(const x of [-2.5,2.5]){box(castle,.65,1.3,.08,windowMat,x,4.25,2.46);box(castle,.08,1.3,.1,'#c6aa90',x,4.25,2.52);}
const clock=mesh(castle,'CircleGeometry',[.65,32],'#f9eaca',0,8.2,1);beam(castle,[0,8.2,1.02],[0,8.65,1.02],.04,'#8f817a');beam(castle,[0,8.2,1.03],[.3,8.05,1.03],.04,'#8f817a');
// Flower beds, trees, hedges, a lake and a little bridge.
function tree(x,z,s=1){const g=group(scene,x,.56,z);cyl(g,.12*s,.19*s,1.9*s,'#9a8065',0,.95*s,0,7);ball(g,1.1*s,['#7d9d6a','#92ab75','#688c68'][Math.floor(rand()*3)],0,2.35*s,0).scale.set(.9,1.23,.9);return g;}
for(let i=0;i<78;i++){const a=rand()*TAU,r=24+rand()*6.5;let x=Math.cos(a)*r,z=Math.sin(a)*r;if(z>23&&Math.abs(x)<5)continue;tree(x,z,.6+rand()*.5);}
for(const [x,z] of [[-7,4],[7,4],[-6,10],[6,10],[-4,-18],[4,-18],[23,4],[-23,7]])tree(x,z,.65);
function flowers(x,z,r=1.5){disk(x,z,r,'#7f9c70',.6);for(let i=0;i<16;i++){const a=rand()*TAU,d=rand()*r*.85;ball(scene,.15,['#f3d3a5','#db9da2','#e8b798'][i%3],x+Math.cos(a)*d,.85,z+Math.sin(a)*d);}}
for(const [x,z] of [[-5,6],[5,6],[-4,17],[4,17],[-8,-14],[8,-14],[0,23]])flowers(x,z,1.3);
const lake=disk(22,2,5.2,'#83bdc0',.56);lake.scale.set(.8,1,1.35);const waterRipples=[];for(let i=0;i<4;i++){const r=torus(scene,.8+i*.5,.025,'#b5d9d3',22,.62,2);r.rotation.x=-Math.PI/2;r.scale.set(.8,1.3,1);waterRipples.push(r);}
for(let i=0;i<11;i++){const z=-.6+i*.34;box(scene,2.6,.13,.3,'#d2b795',22,.9+Math.sin(i/10*Math.PI)*.35,z);}for(const x of [20.8,23.2]){beam(scene,[x,1.7,-.6],[x,1.7,2.8],.055,'#b29a78');for(const z of [-.6,1.1,2.8])cyl(scene,.065,.065,1.2,'#b29a78',x,1.2,z);}
// Fountain at the central avenue.
const fountain=group(scene,0,.6,7);cyl(fountain,2.3,2.4,.4,'#c9c4aa',0,.2,0);cyl(fountain,2.05,2.05,.08,'#8abec1',0,.43,0);cyl(fountain,.7,1.1,1.1,'#dfd3b8',0,.7,0);cyl(fountain,1.15,.6,.2,'#dfd3b8',0,1.3,0);cyl(fountain,.07,.1,1.1,'#b2d8d1',0,1.9,0);ball(fountain,.19,'#b2d8d1',0,2.5,0);
for(let i=0;i<8;i++){const a=i*TAU/8;const curve=new THREE.QuadraticBezierCurve3(new THREE.Vector3(0,2.5,0),new THREE.Vector3(Math.cos(a),2.6,Math.sin(a)),new THREE.Vector3(Math.cos(a)*1.6,.45,Math.sin(a)*1.6));mesh(fountain,'TubeGeometry',[curve,16,.028,4,false],'#c1e3d8');}
const lamps=[];for(let i=0;i<18;i++){const a=i*TAU/18,x=Math.cos(a)*20,z=Math.sin(a)*20;const g=group(scene,x,.55,z);cyl(g,.06,.1,2.4,'#6c7c64',0,1.2,0);cyl(g,.21,.26,.12,'#6c7c64',0,2.4,0);ball(g,.23,bulb,0,2.64,0);cyl(g,0,.32,.3,'#6c7c64',0,2.98,0);if(i%3===0){const light=new THREE.PointLight('#ffc47c',0,8,2);light.position.set(x,3,z);scene.add(light);lamps.push(light);}}
function kiosk(x,z,color){const g=group(scene,x,.55,z);box(g,2.2,2,1.8,'#f3dfbd',0,1,0);box(g,1.6,.8,.05,'#867c6a',0,1.3, .93);box(g,2.5,.16,.7,'#e8c9a2',0,.78,1.1);const roof=cyl(g,0,2,1.2,color,0,2.6,0,4);roof.rotation.y=Math.PI/4;flag(g,0,3.2,0,color);return g;}
kiosk(-5,25,'#b89c9d');kiosk(5,25,'#99ab92');
// Entrance arch and benches.
for(const x of [-2.9,2.9]){cyl(scene,.2,.25,3,'#d3bea0',x,2,27.5);ball(scene,.3,bulb,x,3.65,27.5);}box(scene,6.2,.85,.32,'#a8b296',0,3.3,27.5);
for(const [x,z] of [[-6,19],[6,19],[-9,4],[9,4],[-20,10]]){box(scene,1.8,.15,.6,'#bda486',x,1,z);box(scene,1.8,.6,.12,'#bda486',x,1.4,z-.32);for(const dx of [-.65,.65])box(scene,.12,.6,.5,'#6a7c65',x+dx,.7,z);}
$('loading-progress').style.width='50%';
// Attractions share a pickable root and a moving passenger anchor.
const rideRoots=[];
for(const r of rides){r.root=group(scene,...r.position);r.root.userData.rideId=r.id;rideRoots.push(r.root);r.root.position.y=.6;}
const coaster=rides[0];
const curve=new THREE.CatmullRomCurve3([
 new THREE.Vector3(-8,1.5,4),new THREE.Vector3(-9,3.2,-2),new THREE.Vector3(-6,8,-7),new THREE.Vector3(0,9,-8),new THREE.Vector3(6,4,-5),new THREE.Vector3(7,2,0),new THREE.Vector3(5,5.6,5),new THREE.Vector3(0,3.5,7),new THREE.Vector3(-5,1.5,6)
],true,'catmullrom',.45);
coaster.curve=curve;const up=new THREE.Vector3(0,1,0);
for(const side of [-1,1]){const pts=Array.from({length:181},(_,i)=>{const t=i/180,p=curve.getPointAt(t),tan=curve.getTangentAt(t),n=new THREE.Vector3().crossVectors(tan,up).normalize();return p.addScaledVector(n,side*.44);});const rail=new THREE.CatmullRomCurve3(pts);mesh(coaster.root,'TubeGeometry',[rail,240,.11,6,false],'#c98f70');}
for(let i=0;i<120;i++){const t=i/120,p=curve.getPointAt(t),tan=curve.getTangentAt(t),n=new THREE.Vector3().crossVectors(tan,up).normalize();beam(coaster.root,p.clone().addScaledVector(n,-.6).toArray(),p.clone().addScaledVector(n,.6).toArray(),.06,'#d8af88');if(i%5===0){for(const side of [-1,1]){const q=p.clone().addScaledVector(n,side*.58);beam(coaster.root,[q.x,0,q.z],q.toArray(),.09,'#859e83');cyl(coaster.root,.24,.3,.15,'#d0ccb1',q.x,.1,q.z);} }}
coaster.cars=[];for(let i=0;i<3;i++){const g=group(coaster.root);box(g,1.1,.55,1.5,i===0?'#be7b62':'#d3a082',0,.35,0);box(g,.9,.65,.23,'#758c75',0,.75,-.48);box(g,.9,.2,.85,'#7e8271',0,.62,0);for(const x of [-.54,.54])for(const z of [-.45,.45])ball(g,.17,'#586a5c',x,.07,z);coaster.cars.push(g);}
coaster.anchor=group(coaster.cars[0],0,1.4,.1);coaster.look=group(coaster.cars[0],0,1.2,8);
box(coaster.root,3,.5,3,'#d4c2a1',-7,.2,5);kiosk(-24,5,'#b39c88');
// Ferris wheel is built in a vertical plane; cabins remain level.
const wheel=rides[1];disk(16,-8,5.1,'#c2cbb0');for(const z of [-1,1])for(const x of [-3.3,3.3])beam(wheel.root,[x,0,z],[0,8,z*.5],.22,'#90a9a0');beam(wheel.root,[0,8,-1.4],[0,8,1.4],.24,'#bba380');
wheel.rotor=group(wheel.root,0,8,0);for(const z of [-.55,.55]){torus(wheel.rotor,6.5,.13,'#f0ddba',0,0,z);torus(wheel.rotor,6.2,.06,'#b4bfb0',0,0,z);}
wheel.cabins=[];for(let i=0;i<12;i++){const a=i*TAU/12,x=Math.cos(a)*6.5,y=Math.sin(a)*6.5;beam(wheel.rotor,[0,0,0],[x,y,0],.055,'#d1b994');const pivot=group(wheel.rotor,x,y,0);const cabin=group(pivot,0,-.7,0);box(cabin,1.2,.65,.95,i%2?'#bb9694':'#8faea5',0,0,0);box(cabin,1.22,.15,1.03,'#e8d5b2',0,1,0);for(const xx of [-.5,.5])for(const zz of [-.37,.37])beam(cabin,[xx,.2,zz],[xx,1,zz],.045,'#e9d7b7');box(cabin,.9,.15,.7,'#d5c4a6',0,.38,0);ball(wheel.rotor,.12,bulb,x,y,.62);wheel.cabins.push(pivot);}
cyl(wheel.rotor,.45,.45,.5,'#bd9a75',0,0,0).rotation.x=Math.PI/2;wheel.anchor=group(wheel.cabins[0],0,.15,.25);wheel.look=group(wheel.cabins[0],-10,-1,15);
// Carousel canopy with alternating candy-colored panels.
function canopy(p,r,y,colors){for(let i=0;i<12;i++){const geom=new THREE.CylinderGeometry(0,r,1.9,1,1,false,i*TAU/12,TAU/12);const m=new THREE.Mesh(geom,mat(colors[i%colors.length]));m.position.y=y;m.castShadow=true;p.add(m);}cyl(p,r,r,.35,colors[0],0,y-.96,0);for(let i=0;i<24;i++){const a=i*TAU/24;ball(p,.14,bulb,Math.cos(a)*r,y-1.12,Math.sin(a)*r);}flag(p,0,y+1,0,colors[0]);}
const carousel=rides[2];cyl(carousel.root,4.1,4.3,.5,'#cbb398',0,.25,0);cyl(carousel.root,3.85,3.85,.15,'#ecd8b7',0,.6,0);cyl(carousel.root,.5,.65,4.5,'#d9bd96',0,2.7,0);carousel.rotor=group(carousel.root,0,.7,0);canopy(carousel.root,4.2,5.3,['#bd969f','#f5dfb9']);carousel.horses=[];
for(let i=0;i<8;i++){const a=i*TAU/8,x=Math.cos(a)*2.8,z=Math.sin(a)*2.8;cyl(carousel.rotor,.045,.045,3.8,'#bb9766',x,1.9,z);const horse=group(carousel.rotor,x,1.3,z);horse.rotation.y=-a;ball(horse,.46,'#f6e8d2',0,0,0).scale.set(1.4,.7,.65);beam(horse,[.4,0,0],[.6,.7,0],.17,'#f6e8d2');ball(horse,.23,'#f6e8d2',.68,.65,0).scale.set(1.2,.8,.7);box(horse,.35,.15,.6,i%2?'#b9939a':'#96ae9b',0,.27,0);for(const xx of [-.35,.3])for(const zz of [-.2,.2])beam(horse,[xx,-.15,zz],[xx+.1,-.65,zz],.07,'#eee0c8');beam(horse,[-.48,.1,0],[-.72,-.2,0],.09,'#bfa482');carousel.horses.push(horse);}
carousel.anchor=group(carousel.horses[0],0,1.05,0);carousel.look=group(carousel.horses[0],9,1,0);
const swings=rides[3];cyl(swings.root,3.4,3.6,.45,'#c8c8a2',0,.25,0);cyl(swings.root,.55,.95,6.5,'#acb59a',0,3.3,0);for(let i=0;i<8;i++){const a=i*TAU/8;box(swings.root,.12,5,.12,'#e4d6aa',Math.cos(a)*.55,3.3,Math.sin(a)*.55);}swings.rotor=group(swings.root,0,6.8,0);canopy(swings.rotor,3.7,.2,['#9eae8d','#f0dbb0']);swings.seats=[];
for(let i=0;i<10;i++){const a=i*TAU/10;const g=group(swings.rotor,0,0,0);g.rotation.y=a;const seat=group(g,4.45,-2.9,0);for(const z of [-.32,.32])beam(g,[3.2,-.7,z],[4.45,-2.7,z],.03,'#aa9a7b');box(seat,.8,.18,.8,i%2?'#b99393':'#ddba8d');box(seat,.15,.7,.8,'#8c9d82',.35,.4,0);beam(seat,[-.35,.4,-.4],[-.35,.4,.4],.04,'#b9a783');swings.seats.push(seat);}
swings.anchor=group(swings.seats[0],0,.95,0);swings.look=group(swings.seats[0],0,.9,-10);
// Tiny visitors, with deterministic colors and circular strolls.
const guests=[];for(let i=0;i<34;i++){const g=group(scene);const color=['#b6949e','#ddbc8b','#8ba7a2','#d1d0b7','#87977f'][i%5];cyl(g,.13,.17,.45,color,0,.5,0,7);ball(g,.14,'#dcb999',0,.88,0);for(const x of [-.075,.075])box(g,.07,.28,.09,'#737a6b',x,.15,0);guests.push({g,a:rand()*TAU,r:19.4+rand()*2.1,speed:.012+rand()*.008});}
const clouds=[];for(const [x,y,z,s] of [[-30,20,-24,1],[26,24,-27,.9],[-22,18,23,.6]]){const g=group(scene,x,y,z);for(let i=0;i<4;i++)ball(g,1.7,'#f9f7e9',i*1.5,Math.sin(i)*.5,0).scale.set(1, .5, .7);g.scale.setScalar(s);clouds.push(g);}
const labels=rides.map(r=>{const el=document.createElement('div');el.className='map-label';el.textContent=r.name;$('labels').appendChild(el);return {el,position:new THREE.Vector3(...r.label)};});
$('loading-progress').style.width='85%';
let selected=null,riding=null,night=false,elapsed=0,restoreView=null;
const clockTime=new THREE.Clock(),v1=new THREE.Vector3(),v2=new THREE.Vector3(),raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();
let toastTimer;
function toast(message){$('toast').textContent=message;$('toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),3200);}
function selectRide(id){if(riding)return;selected=rides.find(r=>r.id===id);if(!selected)return;$('detail').hidden=false;document.querySelector('.intro').style.visibility='hidden';$('detail-number').textContent=`EXPERIENCE / 0${rides.indexOf(selected)+1}`;$('detail-name').textContent=selected.name;$('detail-description').textContent=selected.description;$('detail-kind').textContent=selected.kind;$('detail-duration').textContent=`${selected.duration} 秒旅程`;document.querySelectorAll('.ride-card').forEach(b=>{b.classList.toggle('active',b.dataset.ride===id);b.setAttribute('aria-pressed',String(b.dataset.ride===id));});}
function closeDetail(){$('detail').hidden=true;document.querySelector('.intro').style.visibility='';document.querySelectorAll('.ride-card').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false');});selected=null;}
document.querySelectorAll('.ride-card').forEach(b=>b.addEventListener('click',()=>selectRide(b.dataset.ride)));
$('close-detail').onclick=closeDetail;
let pointerDown=null;
renderer.domElement.addEventListener('pointerdown',e=>{pointerDown={x:e.clientX,y:e.clientY,id:e.pointerId,moved:false};});
renderer.domElement.addEventListener('pointermove',e=>{if(pointerDown&&Math.hypot(e.clientX-pointerDown.x,e.clientY-pointerDown.y)>6)pointerDown.moved=true;});
renderer.domElement.addEventListener('pointercancel',()=>pointerDown=null);
renderer.domElement.addEventListener('pointerup',e=>{if(!pointerDown||pointerDown.id!==e.pointerId||pointerDown.moved||riding){pointerDown=null;return;}pointerDown=null;const rect=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(pointer,camera);const hit=raycaster.intersectObjects(rideRoots,true)[0];if(hit){let obj=hit.object;while(obj&&!obj.userData.rideId)obj=obj.parent;if(obj)selectRide(obj.userData.rideId);}else closeDetail();});
function startRide(){if(!selected||riding)return;const r=selected;controls.update();restoreView={position:camera.position.clone(),target:controls.target.clone()};controls.enabled=false;controls.enableDamping=false;riding={ride:r,start:elapsed};resize();closeDetail();document.body.classList.add('riding');$('help').hidden=true;$('ride-hud').hidden=false;$('riding-name').textContent=r.name;$('exit-ride').focus();}
function exitRide(complete=false){if(!riding)return;const id=riding.ride.id;riding=null;resize();document.body.classList.remove('riding');$('ride-hud').hidden=true;camera.position.copy(restoreView.position);controls.target.copy(restoreView.target);controls.enabled=true;controls.enableDamping=true;controls.update();document.querySelector(`[data-ride="${id}"]`).focus({preventScroll:true});if(complete)toast('旅程结束，下一份快乐正在等你。');}
$('start-ride').onclick=startRide;$('exit-ride').onclick=()=>exitRide();
window.addEventListener('keydown',e=>{if(e.key==='Escape'){if(riding)exitRide();else{closeDetail();$('help').hidden=true;}}});
function setNight(value){night=value;document.body.classList.toggle('night',night);$('day-toggle').setAttribute('aria-pressed',String(night));$('day-toggle').setAttribute('aria-label',night?'切换至白昼':'切换至夜晚');$('day-toggle').querySelector('span').textContent=night?'夜晚':'白昼';$('time-label').textContent=night?'星夜 · 20:00':'晴日 · 14:00';const bg=night?'#192c42':'#e7ece1';scene.background.set(bg);scene.fog.color.set(bg);ground.material=mat(bg);ambient.intensity=night?.75:2.5;sun.intensity=night?.55:3.6;sun.color.set(night?'#a3b9e9':'#fff0d7');fill.intensity=night?.8:.6;renderer.toneMappingExposure=night?1.05:1.25;glows.forEach(m=>m.emissiveIntensity=night?2.6:.18);lamps.forEach(l=>l.intensity=night?11:0);}
$('day-toggle').onclick=()=>setNight(!night);
$('help-toggle').onclick=()=>{$('help').hidden=!$('help').hidden;};$('close-help').onclick=()=>{$('help').hidden=true;$('help-toggle').focus();};
function zoom(scale){if(riding)return;v1.copy(camera.position).sub(controls.target);v1.setLength(THREE.MathUtils.clamp(v1.length()*scale,controls.minDistance,controls.maxDistance));camera.position.copy(controls.target).add(v1);controls.update();}
$('zoom-in').onclick=()=>zoom(.82);$('zoom-out').onclick=()=>zoom(1.2);$('reset-view').onclick=()=>{if(!riding){home();closeDetail();}};
// Each launch is one finite show. Particle buffers are released at the end.
let fireworkShow=null;const bursts=[];
function burst(x,y,z,color){const count=90,positions=new Float32Array(count*3),velocities=[];for(let i=0;i<count;i++){const d=new THREE.Vector3(rand()-.5,rand()-.5,rand()-.5).normalize().multiplyScalar(3+rand()*4);velocities.push(d);positions.set([x,y,z],i*3);}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(positions,3));const m=new THREE.PointsMaterial({color,size:.2,transparent:true,opacity:1,depthWrite:false,blending:THREE.AdditiveBlending});const points=new THREE.Points(g,m);points.frustumCulled=false;scene.add(points);bursts.push({points,velocities,age:0});}
$('fireworks').onclick=()=>{if(fireworkShow)return;if(!night){setNight(true);toast('夜幕降临，愿你的心愿在此刻绽放。');}fireworkShow={start:elapsed,next:0};$('fireworks').disabled=true;};
function updateFireworks(dt){if(fireworkShow){const t=elapsed-fireworkShow.start;if(t>=fireworkShow.next*.8&&fireworkShow.next<7){burst(-12+rand()*24,17+rand()*9,-12+rand()*8,['#ffdda0','#efbbd9','#b1dce7','#cfe7a3'][fireworkShow.next%4]);fireworkShow.next++;}if(t>8){fireworkShow=null;$('fireworks').disabled=false;}}for(let j=bursts.length-1;j>=0;j--){const b=bursts[j];b.age+=dt;const a=b.points.geometry.attributes.position;for(let i=0;i<b.velocities.length;i++){const v=b.velocities[i];v.y-=dt*1.7;a.array[i*3]+=v.x*dt;a.array[i*3+1]+=v.y*dt;a.array[i*3+2]+=v.z*dt;}a.needsUpdate=true;b.points.material.opacity=Math.max(0,1-b.age/3);if(b.age>3){scene.remove(b.points);b.points.geometry.dispose();b.points.material.dispose();bursts.splice(j,1);}}}
function updateRides(){const t=elapsed;coaster.cars.forEach((car,i)=>{const phase=((t/36-i*.024)%1+1)%1;const p=curve.getPointAt(phase),tangent=curve.getTangentAt(phase);car.position.copy(p);car.lookAt(p.clone().add(tangent));});wheel.rotor.rotation.z=t*.12;wheel.cabins.forEach(c=>c.rotation.z=-wheel.rotor.rotation.z);carousel.rotor.rotation.y=t*.3;carousel.horses.forEach((h,i)=>h.position.y=1.3+Math.sin(t*1.7+i)*.22);swings.rotor.rotation.y=-t*.45;}
let mobileLayout=isMobile();
function resize(){const w=$('app').clientWidth,h=$('app').clientHeight;camera.aspect=w/h;camera.fov=riding?65:(isMobile()?50:36);camera.updateProjectionMatrix();renderer.setSize(w,h);if(mobileLayout!==isMobile()&&!riding){home();mobileLayout=isMobile();}}
window.addEventListener('resize',resize);resize();
let frameCount=0;
function animate(){requestAnimationFrame(animate);const dt=Math.min(clockTime.getDelta(),.05);if(document.hidden)return;elapsed+=dt;updateRides();guests.forEach(p=>{const a=p.a+elapsed*p.speed;p.g.position.set(Math.cos(a)*p.r,.6,Math.sin(a)*p.r);p.g.rotation.y=-a;p.g.rotation.z=Math.sin(elapsed*5+p.a)*.04;});clouds.forEach((c,i)=>c.position.x+=Math.sin(elapsed*.08+i)*dt*.13);waterRipples.forEach((r,i)=>r.material.roughness=.4+Math.sin(elapsed+i)*.1);updateFireworks(dt);scene.updateMatrixWorld(true);
 if(riding){const r=riding.ride;r.anchor.getWorldPosition(v1);r.look.getWorldPosition(v2);camera.position.copy(v1);camera.lookAt(v2);const remaining=Math.max(0,Math.ceil(r.duration-(elapsed-riding.start)));$('ride-countdown').textContent=`${remaining}s`;if(elapsed-riding.start>=r.duration)exitRide(true);}else controls.update();
 if(!riding&&frameCount%2===0){labels.forEach(({el,position})=>{v1.copy(position).project(camera);const x=(v1.x*.5+.5)*$('app').clientWidth,y=(-v1.y*.5+.5)*$('app').clientHeight;el.style.transform=`translate(${x}px,${y}px) translate(-50%,-50%)`;el.style.display=v1.z>1||v1.z< -1||y>$('app').clientHeight-205||y<95?'none':'';});}
 renderer.render(scene,camera);frameCount++;
 if(frameCount===3){$('loading-progress').style.width='100%';setTimeout(()=>{$('loading').style.opacity='0';setTimeout(()=>$('loading').hidden=true,650);},250);}
}
renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();$('loading').hidden=false;$('loading').style.opacity='1';document.body.classList.add('error');$('loading').querySelector('h2').textContent='画面暂时休息了';$('loading-text').textContent='图形连接已中断，请刷新页面重新进入乐园。';});
animate();
