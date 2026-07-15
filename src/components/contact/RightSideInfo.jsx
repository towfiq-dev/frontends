import { AlertCircle, CheckCircle } from 'lucide-react';
import React from 'react';
import { IoSend } from 'react-icons/io5';
import RevealOnScroll from '../shared/revealOnScroll/RevealOnScroll';

const RightSideInfo = ({status, formData, handleChange, handleSubmit}) => {
  return (
  <div className="lg:col-span-8 bg-[#0d0d0d] border border-gray-800 p-6 sm:p-8 md:p-10 rounded-3xl">
    <RevealOnScroll>
            <div className="mb-7">
              <h3 className="text-xl sm:text-2xl font-semibold mb-1.5">Send a Message</h3>
              <p className="text-gray-500 text-sm">I'll get back to you as soon as possible</p>
            </div>

            {/* Success Alert */}
            {status === "success" && (
              <div role="status" aria-live="polite" className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3.5 rounded-xl mb-6 text-sm font-medium">
                <CheckCircle size={18} className="flex-shrink-0" />
                Message sent successfully! I'll get back to you soon.
              </div>
            )}

            {/* Error Alert */}
            {status === "error" && (
              <div role="alert" aria-live="assertive" className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3.5 rounded-xl mb-6 text-sm font-medium">
                <AlertCircle size={18} className="flex-shrink-0" />
                Something went wrong. Please try again or email directly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-medium text-gray-400 block">Your Name</label>
                  <input
                    id="contact-name"
                    type="text" name="name" value={formData.name} onChange={handleChange}
                    placeholder="John Doe" required
                    className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3.5 focus:outline-none focus:border-cyan-500 transition-all text-gray-200 text-sm placeholder-gray-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-medium text-gray-400 block">Your Email</label>
                  <input
                    id="contact-email"
                    type="email" name="email" value={formData.email} onChange={handleChange}
                    placeholder="john@example.com" required
                    className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3.5 focus:outline-none focus:border-cyan-500 transition-all text-gray-200 text-sm placeholder-gray-600"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="text-xs font-medium text-gray-400 block">Subject</label>
                <input
                  id="contact-subject"
                  type="text" name="subject" value={formData.subject} onChange={handleChange}
                  placeholder="Project discussion" required
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3.5 focus:outline-none focus:border-cyan-500 transition-all text-gray-200 text-sm placeholder-gray-600"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-medium text-gray-400 block">Message</label>
                <textarea
                  id="contact-message"
                  name="message" value={formData.message} onChange={handleChange}
                  rows="5" placeholder="Tell me about your project..." required
                  className="w-full bg-[#141414] border border-gray-800 rounded-xl px-4 py-3.5 focus:outline-none focus:border-cyan-500 transition-all text-gray-200 text-sm resize-none placeholder-gray-600"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="flex cursor-pointer items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed px-7 py-3.5 rounded-xl font-bold text-white transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-purple-500/20 text-sm"
              >
                {status === "sending" ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <IoSend size={16} />
                  </>
                )}
              </button>
            </form>
            </RevealOnScroll>
          </div>
  );
};

export default RightSideInfo;