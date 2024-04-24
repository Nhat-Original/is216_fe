import logo from '@/public/images/favicon.ico'
import Image from 'next/image'
import { SocialIcon } from 'react-social-icons'
export const Footer = () => {
  return (
    <footer className="footer p-10  text-base-content gap-40">
      <aside className="">
        <div className="flex size-60  items-center ">
          <Image src={logo} width={50} height={50} alt="Picture of the author" />
          <div className="flex font-bold text-[50px]">
            <div>FoodHub</div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex gap-4 justify-center ">
            <SocialIcon url="https://www.facebook.com/" style={{ height: 25, width: 25 }} />
            <SocialIcon url="https://www.instagram.com/" style={{ height: 25, width: 25 }} />
            <SocialIcon url="https://www.twitter.com/" style={{ height: 25, width: 25 }} />
            <SocialIcon url="https://www.youtube.com/" style={{ height: 25, width: 25 }} />
          </div>
        </div>
      </aside>
      <nav>
        <h6 className="footer-title">Công ty</h6>
        <a className="link link-hover">Giới thiệu</a>
        <a className="link link-hover">Liên hệ đăng ký quán</a>
        <a className="link link-hover">Khiếu nại</a>
        <a className="link link-hover">Trung tâm trợ giúp</a>
      </nav>
      <nav>
        <h6 className="footer-title prose">Địa chỉ</h6>
        <p>
          Công Ty Cổ Phần FoodHub Lầu G, Tòa nhà Jabes 1, số 244 đường Cống Quỳnh, phường Phạm Ngũ Lão, Quận 1, TPHCM
          Giấy CN ĐKDN số: 0311828036 do Sở Kế hoạch và Đầu tư TP.HCM cấp ngày 11/6/2012, sửa đổi lần thứ 23, ngày
          10/12/2020 Chịu trách nhiệm quản lý nội dung: Nguyễn Văn A
        </p>
      </nav>
    </footer>
  )
}
