import Hero from "../Hero/Hero";
import Category from "../Category/Category";
import Offer from "../Offers/Offer";
// import Deal from "../Deal/Deal";
import Blog from "../Blogs/Blog";
import Faq from "../Faq/Faq";
import NewsLetter from "../NewsLetter/NewsLetter";
import Footer from "../Footer/Footer";
import Best from "../Best/Best";

function Shop() {
  return (
    <main>
      <div className="overflow-hidden">
        <Hero />
        <Category />
        <Best />
        <Offer />
        {/* <Deal /> */}
        <Blog />
        <NewsLetter />
      </div>
      <Faq />
      <Footer />
    </main>
  );
}

export default Shop;
