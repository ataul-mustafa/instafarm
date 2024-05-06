import Header from '@/app/components/Header/Header'
import Banner from '@/app/components/Banner/Banner'
import FeaturedProducts from './components/FeaturedProducts/FeaturedProducts';
import MobileNavBar from './components/MobileComp/MobileNavBar';
import Footer from './components/Footer/Footer';

export default function Home() {

  return (
    <main >
      <Header />
      <Banner />
      <FeaturedProducts />
      <MobileNavBar/>
      <Footer />
    </main>
  );
}
