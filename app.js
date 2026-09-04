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

// Oyun 1: Ezgi'nin gülüşü için kaçan kalpleri yakala
const lightScene=document.querySelector('.light'),lightCopy=document.querySelector('.light-copy'),lightNext=lightScene?.querySelector('.story-next');
if(lightCopy&&lightNext){
  lightCopy.insertAdjacentHTML('beforeend','<div class="mini-game" id="heartGame"><div class="game-title"><b>Kalbimi yakala</b><span>0 / 5</span></div><div class="heart-arena"><button class="game-heart" aria-label="Kalbi yakala">♥</button></div><p class="game-status">Biraz hızlı olabilir; seni görünce heyecanlanıyor.</p></div>');
  lightNext.disabled=true;lightNext.querySelector('span').textContent='Önce kalbimi yakala';
  const game=document.getElementById('heartGame'),heart=game.querySelector('.game-heart'),counter=game.querySelector('.game-title span'),status=game.querySelector('.game-status');let caught=0;
  const moveHeart=()=>{heart.style.setProperty('--x',Math.floor(Math.random()*78)+3);heart.style.setProperty('--y',Math.floor(Math.random()*55)+7)};
  moveHeart();heart.addEventListener('click',()=>{caught++;counter.textContent=caught+' / 5';burst(4);if(caught<5){status.textContent=caught===3?'Az kaldı… Kalbim zaten sende sayılır.':'Yakaladın! Bir tane daha ♡';moveHeart()}else{heart.remove();status.textContent='Tamam, itiraf: Zaten hep sendeydi. ♡';lightNext.disabled=false;lightNext.querySelector('span').textContent='Kalbi teslim aldım'}});
}

// Oyun 2: Birlikte taşımak için yükleri hafiflet
const letterScene=document.querySelector('.letter'),letterBody=document.querySelector('.letter-body'),letterNext=letterScene?.querySelector('.story-next');
if(letterBody&&letterNext){
  letterBody.insertAdjacentHTML('beforeend','<div class="mini-game light-game" id="burdenGame"><div class="game-title"><b>Bugünün yüklerini hafiflet</b><span>dokun ve bırak</span></div><div class="burdens"><button class="burden">Yorgunluk</button><button class="burden">Kaygılar</button><button class="burden">Kırgınlıklar</button><button class="burden">“İyiyim” deme mecburiyeti</button></div><p class="relief">Bunların hepsini tek başına taşımak zorunda değilsin.</p></div>');
  letterNext.disabled=true;letterNext.querySelector('span').textContent='Yükleri beraber hafifletelim';
  const burdens=[...document.querySelectorAll('.burden')],relief=document.querySelector('.relief');let released=0;
  burdens.forEach(item=>item.addEventListener('click',()=>{if(item.classList.contains('gone'))return;item.classList.add('gone');released++;if(released===burdens.length){relief.classList.add('show');letterNext.disabled=false;letterNext.querySelector('span').textContent='Birlikte devam edelim';burst(10)}}));
}
