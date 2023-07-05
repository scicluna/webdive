import Link from "next/link"
import Image from "next/image"
//static startpage with a button that initializes/routes to the main game
//url pathing to different areas? kind of cool if true
export default function OpeningPage() {
  return (
    <>
      <div className="absolute -z-10" style={{ width: '100dvw', height: '100dvh' }}>
        <Image src={'/backdrops/titlepage1.webp'} fill alt="matrix backdrop" />
      </div>
      <div className="text-white flex flex-col justify-center items-center gap-24">
        <h1 className="text-5xl font-extrabold">WEBDIVE</h1>
        <div className="" >
          <Link href={'/catacombs'} className="h-full w-full text-2xl font-extrabold">Start</Link>
        </div >
      </div >
    </>
  )
}
