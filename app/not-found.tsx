import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="h-[calc(100vh-301px)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-primary font-bold text-4xl">KHÔNG TÌM THẤY TRANG</h1>
        <Link href="/">
          <button className="btn btn-lg">Quay về trang chủ</button>
        </Link>
      </div>
    </div>
  )
}
