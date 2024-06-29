import FaqCard from "./FaqCard";
import "./Faq.css";

const items = [
  {
    title: "How long can I rent the furniture for?",
    content:
      "You can rent our furniture for as short as one month or for as long as you need. We offer flexible rental terms to suit your requirements, whether you need it for a short-term project or an extended period of time. Our goal is to accommodate your specific needs, so feel free to discuss your rental duration preferences with us.",
  },
  {
    title: "Do you offer any discounts or promotions?",
    content:
      "Yes, we frequently offer discounts and promotions to make renting furniture more affordable for our customers. To stay updated on our current deals, we encourage you to sign up for our newsletter or regularly check our website. This way, you won't miss out on any opportunities to save on your furniture rental.",
  },
  {
    title: "What happens if the furniture gets damaged?",
    content:
      "While minor wear and tear are expected with normal use, significant damage may result in additional charges. We recommend that you promptly notify us if any damage occurs during your rental period. Our team will assess the damage and discuss any necessary next steps, ensuring transparency and clarity throughout the process.",
  },
  {
    title: "How can I make payments for my rental?",
    content:
      "We offer convenient payment options to make managing your rental simple and hassle-free. You can choose to pay using credit/debit cards or opt for online payments through your secure account. Additionally, we provide the flexibility of setting up automatic payments for your convenience, or you can make manual payments based on your preference and schedule.",
  },
];

export default function Faq() {
  return (
    <div className="faq_main mt-24  p-8 ">
      <div className="text-center grid gap-3">
        <span className="text-gray-500 font-bold text-lg">FAQ</span>
        <span className="text-2xl font-semibold">Have Queries? Refer Here</span>
      </div>
      <FaqCard items={items} />
    </div>
  );
}
