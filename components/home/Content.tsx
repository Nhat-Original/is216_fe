import Hero from './Hero'
import Carousel from './Carousel'
import Stat from './Stat'
import Timeline from './Timeline'
const Content = () => {
  return (
    <main className="flex flex-col gap-10 ">
      <Hero />
      <Carousel />
      <Stat />
      <Timeline />
    </main>
  )
}
export default Content
