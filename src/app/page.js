import Header from '@/app/components/Header/Header'
import Banner from '@/app/components/Banner/Banner'
import FeaturedProducts from './components/FeaturedProducts/FeaturedProducts';

export default function Home() {

  return (
    <main >
      <Header />
      <Banner />
      <FeaturedProducts />
    </main>
  );
}
