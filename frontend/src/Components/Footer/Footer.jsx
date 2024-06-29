import logo from "./hanger.png";
import "./footer.css";

export default function Footer() {
  return (
    <footer id="contact" className="bg-white mt-24 border-t-2 border-gray-200">
      <div className="max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-start lg:gap-8">
          <div className="text-teal-600">
            <img
              src={logo}
              className="footer-img w-28 h-28"
              alt="Company Logo"
            />
          </div>

          <div>
            <div className="">
              <div>
                <h2 id="contact" className="text-2xl font-bold text-gray-900">
                  Get the latest news!
                </h2>
                <p className="mt-4 text-gray-500">
                  Your Dream Home, One Rental at a Time. Enjoy luxury living
                  without the commitment. Affordable, stylish, and delivered to
                  your door!
                </p>
              </div>
            </div>

            <div className="mt-4">
              <form className="w-full">
                <label htmlFor="UserEmail" className="sr-only">
                  Email
                </label>
                <div className="border border-gray-100 p-2 sm:flex sm:items-center sm:gap-4">
                  <input
                    type="email"
                    id="UserEmail"
                    placeholder="Bob@gmail.com"
                    className="w-full focus:border-none focus:outline-none sm:text-sm"
                  />
                  <button className="mt-1 w-full bg-[#7F493F] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-none hover:bg-[#3e82f0] duration-150 sm:mt-0 sm:w-auto sm:shrink-0">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>

            <div className="footer-details mt-4">
              <div>
                <p className="font-medium text-gray-900">Company</p>
                <ul className="footer-items mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="/shop"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Shop
                    </a>
                  </li>
                  <li>
                    <a
                      href="/shop/chair"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      chair
                    </a>
                  </li>
                  <li>
                    <a
                      href="/shop/table"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Table
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Offers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Best
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-gray-900">Company</p>
                <ul className="footer-items mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Partners
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-gray-900">Resources</p>
                <ul className="footer-items mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Support
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      Call-help
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      guidance
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <ul className="mt-8 flex justify-start gap-6 lg:col-span-5 lg:justify-end">
              <li>
                <a
                  href="https://www.instagram.com/aymaanpathan5/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.138.353-.299.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.467.398.8.748 1.15.35.35.683.566 1.15.748.353.138.882.299 1.857.344 1.023.047 1.351.058 3.807.058h.468c2.456 0 2.784-.011 3.807-.058.975-.045 1.504-.207 1.857-.344.467-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.138-.353.299-.882.344-1.857.047-1.023.058-1.351.058-3.807v-.468c0-2.456-.011-2.784-.058-3.807-.045-.975-.207-1.504-.344-1.857a3.098 3.098 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.138-.882-.299-1.857-.344-1.023-.047-1.351-.058-3.807-.058zm0 1.654a6.36 6.36 0 100 12.721 6.36 6.36 0 000-12.721zm0 1.802a4.558 4.558 0 110 9.117 4.558 4.558 0 010-9.117zm5.441-.385a1.486 1.486 0 100 2.973 1.486 1.486 0 000-2.973z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="https://x.com/Aymaan827796"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.29 20.251c7.547 0 11.675-6.155 11.675-11.494 0-.175 0-.349-.012-.522A8.18 8.18 0 0022 5.92a8.14 8.14 0 01-2.357.635 4.076 4.076 0 001.804-2.222 8.194 8.194 0 01-2.605.978A4.075 4.075 0 0016.616 4c-2.26 0-4.098 1.815-4.098 4.055 0 .318.036.627.104.923-3.403-.17-6.422-1.78-8.443-4.223a3.991 3.991 0 00-.555 2.038c0 1.404.719 2.645 1.813 3.372a4.103 4.103 0 01-1.857-.511v.05c0 1.96 1.404 3.594 3.27 3.964a4.078 4.078 0 01-1.85.07c.52 1.608 2.028 2.777 3.814 2.812a8.192 8.192 0 01-5.043 1.727c-.327 0-.654-.018-.978-.057a11.56 11.56 0 006.29 1.833"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="https://github.com/AymaanPathan"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <span className="sr-only">GitHub</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2a10 10 0 00-3.162 19.497c.5.09.682-.215.682-.48 0-.237-.008-.868-.013-1.704-2.781.605-3.369-1.34-3.369-1.34-.454-1.144-1.11-1.45-1.11-1.45-.908-.62.068-.608.068-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.518 2.341 1.08 2.91.826.092-.647.349-1.08.635-1.329-2.22-.251-4.555-1.108-4.555-4.936 0-1.09.39-1.983 1.03-2.683-.104-.252-.447-1.268.098-2.64 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844a9.56 9.56 0 012.503.337c1.909-1.295 2.748-1.025 2.748-1.025.547 1.372.204 2.388.1 2.64.64.7 1.028 1.593 1.028 2.683 0 3.837-2.338 4.683-4.566 4.93.36.31.68.927.68 1.87 0 1.35-.012 2.44-.012 2.774 0 .268.18.574.688.477A10 10 0 0012 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
