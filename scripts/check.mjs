import {readFile,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('dist');let count=0,links=0;
async function walk(dir){for(const ent of await readdir(dir,{withFileTypes:true})){if(ent.name==='__qa')continue;const file=path.join(dir,ent.name);if(ent.isDirectory())await walk(file);else if(file.endsWith('.html')){const h=await readFile(file,'utf8');count++;assert.equal((h.match(/<h1[ >]/g)||[]).length,1,`${file}: one h1`);assert(/<title>.+<\/title>/.test(h));assert(!/href=["']#["']/.test(h),`${file}: placeholder link`);for(const [,url]of h.matchAll(/(?:href|src)="([^"]+)"/g)){if(!url.startsWith('/')||url.startsWith('//'))continue;const clean=url.split(/[?#]/)[0];let target=path.join(root,clean);if(clean.endsWith('/'))target=path.join(target,'index.html');await stat(target).catch(()=>{throw Error(`${file}: missing ${url}`)});links++;}for(const tag of h.matchAll(/<img\b[^>]*>/g))assert(/\balt=/.test(tag[0]),`${file}: image alt`);}}}
await walk(root);
assert(count>0,'Build output is empty; run npm run build first');
const projects=JSON.parse(await readFile('content/projects.json','utf8'));assert(projects.filter(x=>x.published).every(x=>x.label&&x.outcome));
function lum(h){return h.match(/\w\w/g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((s,x,i)=>s+x*[.2126,.7152,.0722][i],0)}
for(const[a,b]of [['bdbdb6','080808'],['aaa9a3','080808'],['e0b960','080808'],['805910','f7f6f2'],['53534e','f7f6f2'],['10100e','e0b960']]){const l=[lum(a),lum(b)].sort((a,b)=>b-a),ratio=(l[0]+.05)/(l[1]+.05);assert(ratio>=4.5);console.log(`Contrast #${a} / #${b}: ${ratio.toFixed(2)}:1`);}
console.log(`PASS: ${count} HTML documents, ${links} local link/asset references, primary text contrast pairs, portfolio truth labels.`);

const inventory=JSON.parse(await readFile('content/sources/behance-inventory.json','utf8'));
const creatives=projects.filter(p=>p.source==='behance');
assert.equal(creatives.length,inventory.publicProjectCount,'All source projects represented');
assert.deepEqual(new Set(creatives.map(p=>p.id)),new Set(inventory.projects.map(p=>p.id)),'Source IDs preserved');
assert.equal(new Set(creatives.map(p=>p.slug)).size,creatives.length,'Unique project routes');
for(const p of creatives){assert(p.creator&&p.sourceUrl,'Creator and original link required');if(p.linkOnly)assert(!p.cover&&!p.gallery.length&&!p.videos.length,'Gated projects must remain link-only');for(const video of p.videos)assert.equal(new URL(video).origin,'https://www-ccv.adobe.io');}
console.log(`PASS: ${creatives.length} source projects; unique routes, creator credits, gated media and video origins verified.`);
