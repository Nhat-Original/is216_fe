import Image from 'next/image'
import heroShowcase1 from '../assets/heroShowcase1.png'
import heroShowcase2 from '../assets/heroShowcase2.svg'

const Hero = () => {
  return (
    <div className="hero min-h-[500px] bg-base-200 relative">
      <Image
        src={heroShowcase1.src}
        alt="hero-showcase-1"
        fill
        quality={100}
        sizes="100vw"
        style={{
          objectFit: 'cover',
        }}
        priority={true}
      />
      <div className="hero-content text-center ">
        <div className="max-w-md ">
          <h1 className="text-5xl font-bold">Foodhub</h1>
          <p className="py-6">Đặt các món ăn ngon từ các nhà hàng, quán ăn uy tín nhất</p>
          <button className="btn btn-primary">Đăng nhập ngay</button>
        </div>
        <Image src={heroShowcase2} quality={100} alt="food's image" width={300} height={300} />
      </div>
    </div>
  )
}
export default Hero
