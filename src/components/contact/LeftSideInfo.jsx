import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { FaSquareWhatsapp } from 'react-icons/fa6';
import { ADDRESS, EMAIL, PHONE, WHATSAPP_URL } from '../lib/constants';
import RevealOnScroll from '../shared/revealOnScroll/RevealOnScroll';
import SocialLinks from '../shared/socialLinks/SocialLinks';

const LeftSideInfo = () => {
  return (
    <div className="lg:col-span-4 bg-[#0d0d0d] border border-gray-800 p-6 sm:p-8 rounded-3xl flex flex-col">
      <RevealOnScroll>
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-1.5">Contact Information</h3>
          <p className="text-gray-500 text-sm mb-8">Feel free to reach out through any channel</p>

          <div className="space-y-6">
            <a href={`mailto:${EMAIL}`} className="flex items-start gap-4 group">
              <div className="p-3.5 bg-[#1a1a1a] rounded-2xl text-cyan-400 flex-shrink-0">
                <FaEnvelope size={20} />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-0.5">Email</p>
                <p className="text-gray-200 font-medium text-sm break-all group-hover:text-cyan-400 transition-colors">
                  {EMAIL}
                </p>
              </div>
            </a>

            <a href={`tel:${PHONE}`} className="flex items-center gap-4">
              <div className="p-3.5 bg-[#1a1a1a] rounded-2xl text-emerald-400 flex-shrink-0">
                <FaPhoneAlt size={20} />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-0.5">Phone</p>
                <p className="text-gray-200 font-medium text-sm hover:text-emerald-400 transition-colors">{PHONE}</p>
              </div>
            </a>

            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
              <div className="p-3.5 bg-[#1a1a1a] rounded-2xl text-emerald-400 flex-shrink-0">
                <FaSquareWhatsapp size={20} />
              </div>
              <div >
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-0.5">WhatsApp</p>
                <p className="text-sm font-medium  text-gray-200 hover:text-blue-400 hover:underline transition-all duration-300 flex items-center gap-1">{PHONE}</p>
              </div>
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group"
            >
              <div className="p-3.5 bg-[#1a1a1a] rounded-2xl text-purple-400 flex-shrink-0">
                <FaMapMarkerAlt size={20} />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-0.5">Location</p>
                <p className="text-gray-200 font-medium text-sm group-hover:text-purple-400 transition-colors">{ADDRESS}</p>
              </div>
            </a>
          </div>
        </div>

        {/* Social Icons */}
        <div className="mt-10 pt-6 border-t border-gray-800">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-4">Follow Me</p>
          <SocialLinks size={"md"} />
        </div>

      </RevealOnScroll>
    </div>
  );
};

export default LeftSideInfo;