import React from 'react'
import "../Components/home.css"

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

      <section className="share" id="share">
        <div className="share-h2-div">
          <h2>Share your ideas</h2>
        </div>
        <div className="share-p-div">
          <p>Your ideas can be greater than you think</p>
        </div>
      </section>
      
      <section className="make" id="make">
        <div>
          <h2>Make ideas reality</h2>
        </div>
        <div>
          <p>Work with the experts of out community and make of your ideas a reality</p>
        </div>
      </section>
            
      <section className="get" id="get">
        <div>
          <h2>Get inspired and inspire others</h2>
        </div>
        <div>
          <p>It happens to the best of us, good ideas come the momment you lest expeect and not when you need it</p>
          </div>
        </section>
      
      
      <section className="crazy" id="crazy">
        <div>
          <h2>Crazy idea? crazy good or just plain carzy</h2>
        </div>
        <div>
          <p>it doesn't matter, one man's trash can be another man's tresure, a crazy idea can lead to a chain of thoughts that can end in someting awe inspireing</p>
        </div>
      </section>
      
     
      <section className="turn" id="turn">
        <div>
          <h2>Turn ideas to reality with our community</h2>
        </div>
        <div>
            <p>You can be part of our evergrowing community and help ideas become reality</p>
        </div>
      </section>
      
     
      <h4>so dont dismiss this website, who knows the next startup can start inspired here</h4>
    </div>
  )
}

export default home