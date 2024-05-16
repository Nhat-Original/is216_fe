import Image from 'next/image'
const Carousel = () => {
  return (
    <div className="max-w-6xl carousel w-full flex flex-nowrap whitespace-nowrap mx-auto overflow-x-scroll">
      <div className="carousel-item">
        <Image
          src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
          alt="Burger"
          width={200}
          height={200}
        />
      </div>
      <div className="carousel-item">
        <Image
          src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
          alt="Burger"
          width={200}
          height={200}
        />
      </div>
      <div className="carousel-item">
        <Image
          src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
          alt="Burger"
          width={200}
          height={200}
        />
      </div>
      <div className="carousel-item">
        <Image
          src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg"
          alt="Burger"
          width={200}
          height={200}
        />
      </div>
      <div className="carousel-item">
        <Image
          src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg"
          alt="Burger"
          width={200}
          height={200}
        />
      </div>
      <div className="carousel-item">
        <Image
          src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg"
          alt="Burger"
          width={200}
          height={200}
        />
      </div>
      <div className="carousel-item">
        <Image
          src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg"
          alt="Burger"
          width={200}
          height={200}
        />
      </div>
    </div>
  )
}
export default Carousel
