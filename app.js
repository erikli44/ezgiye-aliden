const gate=document.getElementById('gate'),begin=document.getElementById('begin'),music=document.getElementById('music'),video=document.getElementById('memoryVideo'),videoPlay=document.getElementById('videoPlay'),confess=document.getElementById('confess'),secret=document.getElementById('secret');
const scenes=[...document.querySelectorAll('.scene')],frames=[...document.querySelectorAll('.frame')];
let player,wantsMusic=false,musicPlaying=false,current=0,frameIndex=0,changing=false;
const labels=['Başlangıç','Seni gördüğüm yer','Anılarımız','Sana söylemek istediğim','Gülüşün','Videomuz','Ufak bir isyan','Bizden kareler','Sözlerim','Kalbim','Daima'];
const dots=document.createElement('div'),chapterLabel=document.createElement('div');
dots.className='chapter-dots';chapterLabel.className='chapter-label';document.body.append(dots,chapterLabel);
scenes.forEach(()=>dots.appendChild(document.createElement('i')));
function paint(){[...dots.children].forEach((d,i)=>d.className=i<current?'done':i===current?'current':'');chapterLabel.textContent=labels[current]||'Biz'}
function showScene(next){if(changing||next<0||next>=scenes.length)return;changing=true;scenes[current].classList.remove('story-active');scenes[current].classList.add('story-past');current=next;scenes[current].classList.remove('story-past');scenes[current].classList.add('story-active');scenes[current].scrollTop=0;paint();setTimeout(()=>changing=false,700)}
scenes.forEach((scene,i)=>{if(i===scenes.length-1)return;const btn=document.createElement('button');btn.className='story-next'+(['02','05','08','09','∞'].includes(scene.dataset.chapter)?' paper-next':'');btn.innerHTML='<span>Devam et</span><b>→</b>';scene.appendChild(btn);if(scene.classList.contains('film')){btn.querySelector('span').textContent='Sonraki fotoğraf';btn.addEventListener('click',()=>{if(frameIndex<frames.length-1){frames[frameIndex].classList.remove('memory-active');frameIndex++;frames[frameIndex].classList.add('memory-active');btn.querySelector('span').textContent=frameIndex===frames.length-1?'Üçünü de gördüm':'Sonraki fotoğraf'}else showScene(i+1)})}else btn.addEventListener('click',()=>showScene(i+1));if(scene.classList.contains('video-scene')){btn.disabled=true;btn.querySelector('span').textContent='Önce videomuzu izle'}});
scenes[0].classList.add('story-active');frames[0]?.classList.add('memory-active');paint();
window.onYouTubeIframeAPIReady=()=>{player=new YT.Player('yt',{height:'1',width:'1',videoId:'wB8x81sXd48',playerVars:{playsinline:1,controls:0,loop:1,playlist:'wB8x81sXd48'},events:{onReady:()=>wantsMusic&&playMusic(),onStateChange:e=>{musicPlaying=e.data===YT.PlayerState.PLAYING;music.classList.toggle('paused',!musicPlaying)}}})};
function playMusic(){if(player?.playVideo){player.playVideo();musicPlaying=true;music.classList.remove('paused')}}
function pauseMusic(){if(player?.pauseVideo){player.pauseVideo();musicPlaying=false;music.classList.add('paused')}}
begin.addEventListener('click',()=>{wantsMusic=true;gate.classList.add('leave');playMusic();burst(22);setTimeout(()=>gate.remove(),1100)});
music.addEventListener('click',()=>musicPlaying?pauseMusic():playMusic());
videoPlay.addEventListener('click',()=>{pauseMusic();video.controls=true;video.play();videoPlay.classList.add('hide')});
video.addEventListener('pause',()=>{if(!video.ended)videoPlay.classList.remove('hide')});
video.addEventListener('ended',()=>{video.controls=false;videoPlay.classList.remove('hide');playMusic();const btn=document.querySelector('.video-scene .story-next');btn.disabled=false;btn.querySelector('span').textContent='Anımızla devam et'});
confess.addEventListener('click',()=>{secret.classList.add('open');confess.closest('.confession').classList.add('letter-open');confess.textContent='İyi ki sen ♡';confess.disabled=true;for(let i=0;i<38;i++)setTimeout(dropTear,i*75)});
function dropTear(){const t=document.createElement('i');t.className='tear';t.style.left=(4+Math.random()*92)+'vw';t.style.setProperty('--speed',(2.2+Math.random()*2.7)+'s');t.style.opacity=.3+Math.random()*.65;document.body.appendChild(t);setTimeout(()=>t.remove(),5200)}
function burst(n){for(let i=0;i<n;i++)setTimeout(()=>{const h=document.createElement('i');h.className='heart';h.textContent=Math.random()>.5?'♥':'♡';h.style.left=(42+Math.random()*16)+'vw';h.style.top='78vh';h.style.fontSize=(12+Math.random()*20)+'px';h.style.setProperty('--x',(-160+Math.random()*320)+'px');document.body.appendChild(h);setTimeout(()=>h.remove(),1900)},i*45)}
document.querySelectorAll('.reveal').forEach(el=>el.classList.add('on'));
document.querySelector('.light-copy')?.insertAdjacentHTML('beforeend','<div class="fun-note">Görev dağılımı: Sen gülümse, ben sebep bulurum. Kötü şaka departmanı da şimdilik bende.</div>');
document.querySelector('.rebellion-copy')?.insertAdjacentHTML('beforeend','<div class="fun-note">Özlemek edebiyatta güzel. Gerçek hayatta gereksiz masraf.</div>');

// Her bölümün sonunda açılan kısa, farklı mini oyunlar
const games=[
 {q:'Kalbin yönünü bulalım',hint:'Sence Ali’nin kalbi hangi tarafa gidiyor?',choices:['← Uzağa','→ Ezgi’ye','↻ Kararsız'],ok:1,win:'Doğru. Navigasyon hiç şaşmadı ♡'},
 {q:'Bir yükü birlikte bırakalım',hint:'Bugün hangisini burada bırakıyoruz?',choices:['Kaygıları','Ezgi’yi','Sarılmayı'],ok:0,win:'Tamamdır. Onu artık beraber taşıyoruz.'},
 {q:'Fotoğraf testi',hint:'Bu karede en güzel şey ne?',choices:['Işık','Arka plan','Biz'],ok:2,win:'Cevap fazla kolaydı, kabul ediyorum.'},
 {q:'Sessizlik çevirmeni',hint:'“İyiyim” bazen ne demektir?',choices:['Kahve getir','Yanımda kal','Hiçbir şey'],ok:1,win:'Ben de tam bunu söylemek istemiştim.'},
 {q:'Gülüş görevi',hint:'Ezgi gülerse Ali ne yapar?',choices:['Bir daha güldürür','Kaçar','Fatura keser'],ok:0,win:'Kötü şakalar ücretsiz, sarılmalar sınırsız.'},
 {q:'Anı kilidi',hint:'Videomuzun şifresi hangisi?',choices:['1234','Biz','Wi‑Fi çekmiyor'],ok:1,win:'Anılarımız başarıyla açıldı ♡'},
 {q:'Ufak isyan sınavı',hint:'Özlemek mi, yanında olmak mı?',choices:['Özlemek','Yanında olmak','Gurur yapmak'],ok:1,win:'Edebiyat kaybetti, biz kazandık.'},
 {q:'Kareleri tamamla',hint:'Altı fotoğraf + bir video = ?',choices:['7 dosya','Bir sürü anı','Depolama sorunu'],ok:1,win:'Doğru. Daha çoğunu biriktireceğiz.'},
 {q:'Söz seçimi',hint:'Zor bir günde en iyi cümle?',choices:['Geçer','Abartma','Ben buradayım'],ok:2,win:'Bazen en güzel yardım iki kelime.'},
 {q:'Son kalp kontrolü',hint:'Ali’nin kalbi şu an kimde?',choices:['Kendisinde','Ezgi’de','Kayıp eşya bürosunda'],ok:1,win:'Teslim tutanağına gerek yok. Hep sende.'}
];
const cleared=new WeakSet();let gameOpen=false;
document.addEventListener('click',e=>{const btn=e.target.closest('.story-next');if(!btn||btn.disabled)return;const scene=btn.closest('.scene');if(!scene||cleared.has(scene)||gameOpen)return;e.preventDefault();e.stopImmediatePropagation();openGame(scene,btn)},true);
function openGame(scene,trigger){
 gameOpen=true;const data=games[Math.min(current,games.length-1)],overlay=document.createElement('div');overlay.className='game-overlay';overlay.innerHTML='<div class="game-sheet" role="dialog" aria-modal="true"><span class="game-kicker">MİNİ GÖREV · '+String(current+1).padStart(2,'0')+'</span><h3>'+data.q+'</h3><p>'+data.hint+'</p><div class="game-choices">'+data.choices.map((x,i)=>'<button data-choice="'+i+'">'+x+'</button>').join('')+'</div><small>Doğru cevabı bulunca hikâye devam edecek.</small></div>';document.body.appendChild(overlay);requestAnimationFrame(()=>overlay.classList.add('show'));
 overlay.querySelectorAll('[data-choice]').forEach(choice=>choice.addEventListener('click',()=>{if(Number(choice.dataset.choice)!==data.ok){choice.classList.remove('wrong');void choice.offsetWidth;choice.classList.add('wrong');overlay.querySelector('small').textContent='Olmadı 😄 Bir daha düşün.';return}choice.classList.add('right');overlay.querySelector('small').textContent=data.win;burst(12);setTimeout(()=>{cleared.add(scene);overlay.classList.remove('show');setTimeout(()=>{overlay.remove();gameOpen=false;trigger.click()},280)},850)}));
}
