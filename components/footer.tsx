import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
  className="relative  bg-cover bg-center bg-no-repeat text-white py-16"
  style={{ backgroundImage: "url('/images/eventum-img1.jpg')" }}
>
  <div className="absolute  inset-0 bg-black/80 z-0"></div>
  <div className="max-w-6xl mx-auto px-4">
     <div className="relative z-10  grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Column: Logo + Description */}
        <div className="max-w-7xl mx-auto px-4">
          <img src="/images/fitlogo.png" alt="Fitness Fest Logo" className="h-25 sm:h-20" />
          <p className="text-sm mb-5 text-gray-300">
            Empowering healthier lifestyles through movement, community, and inspiration.

          </p>
          <div className="flex gap-3">
            <a href="#" className="bg-[#fa0368] p-3 rounded-full hover:bg-pink-700">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-[#fa0368] p-3 rounded-full hover:bg-pink-700">
              <FaTwitter />
            </a>
            <a href="#" className="bg-[#fa0368] p-3 rounded-full hover:bg-pink-700">
              <FaInstagram />
            </a>
            <a href="#" className="bg-[#fa0368] p-3 rounded-full hover:bg-pink-700">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="px-4">
          <h3 className="text-lg font-semibold mb-4">QUICK LINKS</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#"> About the Festival</a></li>
            <li><a href="#">Schedule </a></li>
            <li><a href="#">Wellness Updates</a></li>
            <li><a href="#">Partners </a></li>
            <li><a href="#">Terms & Policies

</a></li>
          </ul>
        </div>

        {/* Other Pages */}
        <div className="px-4">
          <h3 className="text-lg font-semibold mb-4">OTHER PAGES</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#">Support</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Fitness Community</a></li>
            <li><a href="#">Organiser</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="">
          <h3 className="text-lg font-semibold mb-4">JOIN OUR NEWSLETTER</h3>
          <p className="text-sm text-gray-300 mb-4">
            Subscribe to receive the latest updates, event news, and exclusive fitness tips straight to your inbox.
          </p>
          <input
            type="email"
            placeholder="Your Email.."
            className="w-full rounded-full px-4 py-3 mb-3 text-gray-900 bg-white"
          />
          <button className="w-full bg-[#fa0368] hover:bg-pink-700 rounded-full px-4 py-3 font-semibold text-white">
            SUBSCRIBE NOW
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
       <div className="relative max-w-7xl mx-auto px-4 z-10 mt-10 border-t border-gray-700 pt-6 text-sm text-gray-400 flex flex-col md:flex-row justify-between px-6 max-w-7xl mx-auto gap-3">
        <div className="flex gap-6">
          <a href="#" className="hover:text-white">PRIVACY POLICY</a>
          <a href="#" className="hover:text-white">TERMS & CONDITION</a>
          <a href="#" className="hover:text-white">SUPPORT</a>
        </div>
        <div>
          © 2025 <span className="font-semibold">Maxx Business Media Pvt.Ltd.,</span> All Rights Reserved.
        </div>
      </div>
      </div>
    </footer>
  );
}
