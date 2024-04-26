import Navbar from '@/components/global/Navbar'
import Footer from '@/components/global/Footer'
import Content from '@/components/home/Content'

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="divider-start divider"></div>
      <Content />
      <div className="divider-end divider"></div>
      <Footer />
    </div>
  )
}
export default HomePage
