import BlogCard from "./BlogCard";
import sofaBlog1 from "./blog_1.jpg";
import sofaBlog2 from "./blog_2.jpg";
import sofaBlog3 from "./blog_3.jpg";
import "./blog.css";

export default function Blog() {
  return (
    <div className="mt-24 p-8" id="/blog">
      <div className="text-center grid gap-3">
        <span className="text-gray-500 font-bold text-lg" id="blog">
          News & Blog
        </span>
        <span className="blog-heading text-2xl font-semibold">
          Our Latest News & Blogs
        </span>
      </div>
      <div className="blog-main grid grid-cols-3 gap-12 items-center mt-4">
        <BlogCard
          img={sofaBlog1}
          date="July 23, 2023"
          company="FurnitureCo"
          title="Choosing the Perfect Sofa"
          body="Explore our guide to choosing the perfect sofa for your living room, featuring comfort, style, and durability tips."
        />
        <BlogCard
          img={sofaBlog2}
          date="July 23, 2023"
          company="FurnitureCo"
          title="Trends in Sofa Design"
          body="Discover the latest trends in sofa design, from modern minimalism to classic elegance, and find the right fit for your home."
        />
        <BlogCard
          img={sofaBlog3}
          date="July 23, 2023"
          company="FurnitureCo"
          title="Maintaining Your Sofa"
          body="Learn essential tips for maintaining your sofa's beauty and longevity, ensuring it remains a centerpiece in your home for years to come."
        />
      </div>
    </div>
  );
}
