const gate=document.getElementById('gate'),begin=document.getElementById('begin'),music=document.getElementById('music'),video=document.getElementById('memoryVideo'),videoPlay=document.getElementById('videoPlay'),confess=document.getElementById('confess'),secret=document.getElementById('secret'),bar=document.getElementById('progressBar'),chapterNo=document.getElementById('chapterNo');
let player,wantsMusic=false,musicPlaying=false;
window.onYouTubeIframeAPIReady=()=>{player=new YT.Player('yt',{height:'1',width:'1',videoId:'wB8x81sXd48',playerVars:{playsinline:1,controls:0,loop:1,playlist:'wB8x81sXd48'},events:{onReady:()=>wantsMusic&&playMusic(),onStateChange:e=>{musicPlaying=e.data===YT.PlayerState.PLAYING;music.classList.toggle('paused',!musicPlaying)}}})};
function playMusic(){if(player?.playVideo){player.playVideo();musicPlaying=true;music.classList.remove('paused')}}
function pauseMusic(){if(player?.pauseVideo){player.pauseVideo();musicPlaying=false;music.classList.add('paused')}}
begin.addEventListener('click',()=>{wantsMusic=true;gate.classList.add('leave');playMusic();burst(22);setTimeout(()=>gate.remove(),1100)});
music.addEventListener('click',()=>musicPlaying?pauseMusic():playMusic());
videoPlay.addEventListener('click',()=>{pauseMusic();video.controls=true;video.play();videoPlay.classList.add('hide')});
video.addEventListener('pause',()=>{if(!video.ended)videoPlay.classList.remove('hide')});
video.addEventListener('ended',()=>{video.controls=false;videoPlay.classList.remove('hide');playMusic()});
confess.addEventListener('click',()=>{secret.classList.add('open');confess.textContent='İyi ki sen ♡';confess.disabled=true;for(let i=0;i<38;i++)setTimeout(dropTear,i*75)});
function dropTear(){const t=document.createElement('i');t.className='tear';t.style.left=(4+Math.random()*92)+'vw';t.style.setProperty('--speed',(2.2+Math.random()*2.7)+'s');t.style.opacity=.3+Math.random()*.65;document.body.appendChild(t);setTimeout(()=>t.remove(),5200)}
function burst(n){for(let i=0;i<n;i++)setTimeout(()=>{const h=document.createElement('i');h.className='heart';h.textContent=Math.random()>.5?'♥':'♡';h.style.left=(42+Math.random()*16)+'vw';h.style.top='78vh';h.style.fontSize=(12+Math.random()*20)+'px';h.style.setProperty('--x',(-160+Math.random()*320)+'px');document.body.appendChild(h);setTimeout(()=>h.remove(),1900)},i*45)}
const reveals=new IntersectionObserver(entries=>entries.forEach(e=>e.isIntersecting&&e.target.classList.add('on')),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>reveals.observe(el));
const chapters=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)chapterNo.textContent=e.target.dataset.chapter}),{threshold:.5});document.querySelectorAll('[data-chapter]').forEach(el=>chapters.observe(el));
addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight,p=max?scrollY/max*100:0;if(matchMedia('(max-width:480px)').matches){bar.style.width=p+'%';bar.style.height='3px'}else{bar.style.height=p+'%';bar.style.width='2px'}},{passive:true});
