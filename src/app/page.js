import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import HomeMenu from '@/components/layout/HomeMenu';
import SectionHeaders from '@/components/layout/SubHeader';
import MenuPage from '@/components/menu/MenuCategory';
export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      {/* <section className='text-center my-16' id='about'>
        <SectionHeaders 
        // subHeader={'Nossa historia'} 
        mainHeader={'Sobre'} />
        <div className='text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni
            minima odit recusandae. Illum ipsa non repudiandae? Eum ipsam iste
            quos suscipit tempora? Aperiam esse fugiat inventore laboriosam
            officiis quam rem!
          </p>
          <p>
            At consectetur delectus ducimus est facere iure molestias obcaecati
            quaerat vitae voluptate? Aspernatur dolor explicabo iste minus
            molestiae pariatur provident quibusdam saepe?
          </p>
          <p>
            Laborum molestias neque nulla obcaecati odio quia quod reprehenderit
            sit vitae voluptates? Eos, tenetur.
          </p>
        </div>
      </section> */}
      <MenuPage></MenuPage>
      <section className='text-center my-8' id='contact'>
        <SectionHeaders subHeader={''} mainHeader={''} />
        <div className='mt-8'>
          <a className='text-4xl underline text-gray-500'href='tel:+46738123123'
          ></a>
        </div>
      </section>
    </>
  );
}
