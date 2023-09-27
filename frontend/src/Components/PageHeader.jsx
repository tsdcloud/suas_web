import React from 'react'
import "./PageHeader.css"
function PageHeader() {

    
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    let slideIndex = 0;

    function showSlide() {
    carouselSlides.forEach((slide) => {
        slide.classList.remove('active');
    });
    carouselSlides[slideIndex].classList.add('active');
    }

    function nextSlide() {
    slideIndex++;
    if (slideIndex === carouselSlides.length) {
        slideIndex = 0;
    }
    showSlide();
    }

    // Change slide every 2 seconds (adjust timing as needed)
    setInterval(nextSlide, 2000);


  return (
    <div
    className="hero-section">
     <div className="carousel">
       <div className="carousel-slide active">
         <h1>Titre 1</h1>
         <p>Description 1</p>
       </div>
       <div className="carousel-slide">
         <h1>Titre 2</h1>
         <p>Description 2</p>
       </div>
       <div className="carousel-slide">
         <h1>Titre 3</h1>
         <p>Description 3</p>
       </div>
     </div>
   </div>
   
   
  )
}

export default PageHeader