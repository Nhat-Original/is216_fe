import Image from 'next/image'
const Hero = () => {
  return (
    <div className="hero min-h-[500px] bg-base-200 relative">
      <Image
        src="/images/hero.png"
        alt="hero"
        fill
        quality={100}
        sizes="100vw"
        style={{
          objectFit: 'cover',
        }}
      />
      <div className="hero-content text-center ">
        <div className="max-w-md ">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In
            deleniti eaque aut repudiandae et a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
        <Image src={'/images/foodShowcasePlaceholder.png'} quality={100} alt="food's image" width={300} height={300} />
      </div>
    </div>
  )
}
export default Hero
