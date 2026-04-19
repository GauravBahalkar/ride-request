import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      <Navbar />
      <main className="mx-auto w-full max-w-[1280px] px-6 py-6">
        <Outlet />
      </main>
    </div>
  )
}
