import React from 'react'
import "../Components/home.scss"
import{Link} from 'react-router-dom'
const home = () => {
  return (
    <div className="bg">
      <main>
        <section className="hero" id="hero">
          <div>
            <div>
              <h1>Inspiration</h1>
            </div>
          </div>
        </section>
      </main>
      <div className="transition1">
        <Link to="/signup">Sign Up</Link>
        <p>Together we achive more</p>
      </div>
      <section className="share" id="share">
        <div className="text-div">
          <div>
            <h2>Share your ideas</h2>
          </div>
          <div>
            <p>Your ideas can be greater than you think</p>
          </div>
        </div>
        <img src="/images/fistbump.jpg" alt="fistbump"></img>
      </section>
      
      <section className="make" id="make">
        <img src="/images/virtual.jpg"alt="virtualreaity"></img>
        <div className="text-div">
          <div>
            <h2>Make ideas reality</h2>
          </div>
          <div>
            <p>Work with the experts of out community and make of your ideas a reality</p>
          </div>
        </div>
      </section>
            
      <section className="get" id="get">
        <div className="text-div">
          <div>
            <h2>Get inspired and inspire others</h2>
          </div>
          <div>
            <p>Good ideas are hard to come and they dont come the momment you need it</p>
          </div>
        </div>
        <img src="/images/inspire.jpg" alt="revese scene"></img>
      </section>
      
      
      <section className="crazy" id="crazy">
        <img src="/images/crazy2.jpg" alt=""></img>
        <div className="text-div">
          <div>
            <h2>Crazy idea? Crazy good or just plain carzy</h2>
          </div>
          <div>
            <p>It doesn't matter, one man's trash can be another man's tresure, a crazy idea can lead to a chain of thoughts that can end in someting awe inspireing</p>
          </div>
        </div>
      </section>
      
     
      <section className="turn" id="turn">
        <div className="text-div">
          <div>
            <h2>Turn ideas to reality with our community</h2>
          </div>
          <div>
              <p>You can be part of our evergrowing community and help ideas become reality</p>
          </div>
        </div>
        <img src="/images/community2.jpg" alt=""></img>
      </section>
      
     
      {/* <h4>so dont dismiss this website, who knows the next startup can start inspired here</h4> */}
    </div>
  )
}

export default home