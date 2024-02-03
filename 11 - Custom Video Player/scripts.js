const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = document.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = document.querySelectorAll('.player__slider')

function togglePlay() {
  if (video.paused) {
    video.play()
  }
  else {
    video.pause()

  }
}
function updateButton() {
  const icon = this.paused ? '►' : '&#10074;&#10074'
  console.log('Ti changes icon')
  toggle.innerHTML = icon
}
function dataSkip(){
  console.log('this is skiped')
  console.log(this.dataset.skip)
  video.currentTime+=parseFloat(this.dataset.skip)
  
}
function handeRangeUpdate(){
  video[this.name]=this.value;
  console.log(this.name)
  console.log(this.value)
}
//now the biggest task is to update the progress bar
function handleProgress(){
  //flex basis is used to update the progress bar
  let perc=(video.currentTime/video.duration)*100;
  progressBar.style.flexBasis=`${perc}%`;
}
function scrub(e){
  let scrub=(e.offsetX/progress.offsetWidth)*video.duration;
  video.currentTime=scrub
  console.log(e.offsetX)
}
// we are going to click on the progress bar
// function setPlayBackRate(){
//   video.playbackrate=rate
// }

// //grab a slider value in both the steps fastVideo and n the volume option
// function setVolume(volume) {
//     // Ensure the volume value is between 0 and 1
//     video.volume = Math.max(0, Math.min(1, volume));
// }
// function forwardVideo(){
//   video.currentTime+=25
// }
// $("#negative").click(function() { // button function for rewind
//    intervalRewind = setInterval(function(){
//        video.playbackRate = 1.0;
//        if(video.currentTime == 0){
//            clearInterval(intervalRewind);
//            video.pause();
//        }
//        else{
//            video.currentTime += -.1;
//        }
//                 },30);
// });

video.addEventListener('click', togglePlay)
toggle.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
toggle.addEventListener('play', updateButton)
toggle.addEventListener('pause', updateButton)
skipButtons.forEach(button=>
  button.addEventListener('click',dataSkip))
ranges.forEach(range=>range.addEventListener('change',handeRangeUpdate))
ranges.forEach(range=>range.addEventListener('mousemove',handeRangeUpdate))
video.addEventListener('timeupdate',handleProgress)

//how to handle drag event
let mousedown=false
progress.addEventListener('click',scrub)
progress.addEventListener('mousemove',(e)=>mousedown && scrub(e))
progress.addEventListener('mousedown',()=>mousdown=true)

progress.addEventListener('mouseup',()=>mousdown=false)
