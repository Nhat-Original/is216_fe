import carousel1 from '../assets/carousel1.jpg'
import carousel2 from '../assets/carousel2.jpg'
import carousel3 from '../assets/carousel3.jpg'
import carousel4 from '../assets/carousel4.jpg'
import carousel5 from '../assets/carousel5.jpg'
import carousel6 from '../assets/carousel6.jpg'
import carousel7 from '../assets/carousel7.jpg'

const Carousel = () => {
  return (
    <div className="max-w-6xl carousel w-full flex flex-nowrap whitespace-nowrap mx-auto">
      <div className="carousel-item">
        <img src={carousel1.src} alt="carousel showcase image" className="w-[300px] aspect-square" />
      </div>
      <div className="carousel-item">
        <img src={carousel2.src} alt="carousel showcase image" className="w-[300px] aspect-square" />
      </div>
      <div className="carousel-item">
        <img src={carousel3.src} alt="carousel showcase image" className="w-[300px] aspect-square" />
      </div>
      <div className="carousel-item">
        <img src={carousel4.src} alt="carousel showcase image" className="w-[300px] aspect-square" />
      </div>
      <div className="carousel-item">
        <img src={carousel5.src} alt="carousel showcase image" className="w-[300px] aspect-square" />
      </div>
      <div className="carousel-item">
        <img src={carousel6.src} alt="carousel showcase image" className="w-[300px] aspect-square" />
      </div>
      <div className="carousel-item">
        <img src={carousel7.src} alt="carousel showcase image" className="w-[300px] aspect-square" />
      </div>
    </div>
  )
}
export default Carousel
