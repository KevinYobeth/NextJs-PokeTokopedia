import Navbar from '../components/Navbar'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main
        className='pt-24 mx-auto 
        sm:max-w-screen-sm 
        md:max-w-screen-md 
        lg:max-w-screen-lg 
        px-5'
      >{children}</main>
    </>
  );
}