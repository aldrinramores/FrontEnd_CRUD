import React from 'react'
import {Link} from 'react-router-dom'


const Home = () => {
  // Wave animation
  const animateWave = (x) => {
    const wrapper = document.getElementById('wave-wrapper')
    const wave = document.createElement("div")
    wave.className = "wave"
    wave.style.left = `${x}px`
    wrapper.appendChild(wave)
    setTimeout(() => wrapper.removeChild(wave),600)
  }
  window.onmousemove = (e) => {
    animateWave(e.clientX)
    console.log(e)
  } 
  

  

  return (
    <div class="h-100 d-flex align-items-center justify-content-center">
        <div id="wave-wrapper"></div>
        <div className='text-center wrapper'>
            <div className="container"> 
                <h1 className='archivo display-1'>
                    <button className='text_animate'><span >A</span></button> 
                    <button className='text_animate'><span >L</span></button> 
                    <button className='text_animate'><span >D</span></button> 
                    <button className='text_animate'><span >R</span></button> 
                    <button className='text_animate'><span >I</span></button> 
                    <button className='text_animate'><span >N</span></button> 
                    <button className='text_animate'><span >.</span></button> 
                    <br />
                    <button className='text_animate'><span >R</span></button> 
                    <button className='text_animate'><span >A</span></button> 
                    <button className='text_animate'><span >M</span></button> 
                    <button className='text_animate'><span >O</span></button> 
                    <button className='text_animate'><span >R</span></button> 
                    <button className='text_animate'><span >E</span></button> 
                    <button className='text_animate'><span >S</span></button> 
                </h1>

                <p className='my-5 email  mail_me'>
                    <a href="mailto:aldrinramores43@gmail.com" style={{textDecoration: 'none'}} className="text-white underlined">&#x2192; aldrinramores43@gmail.com &#x2190;</a>  
                </p>
                <Link to={"/users"} style={{ textDecoration: 'none' }}>
                     <button type='submit' className='btn_users ' outline>
                         <span>View Users</span>  
                     </button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Home