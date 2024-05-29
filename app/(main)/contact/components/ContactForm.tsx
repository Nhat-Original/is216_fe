'use client'
import React, { useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { useSessionStore } from '@/stores/useSessionStore'
import { toast } from 'react-toastify'

const ContactForm = () => {
  const user = useSessionStore((state) => state.user)

  const form = useRef(null)
  useEffect(() => {
    emailjs.init({
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    })
  }, [])
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID &&
      form.current &&
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    ) {
      emailjs
        .sendForm(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, form.current)
        .then(
          (result) => {
            if (result.status === 200) {
              toast.success('Gửi email thành công')
              document.getElementById('message')?.setAttribute('value', '')
            }
          },
          (error) => {
            toast.error('Gửi email thất bại: ' + error.text)
          },
        )
    }
  }

  return (
    <div className="card w-[500px] bg-secondary  p-4 mx-auto">
      <h1 className="font-bold text-xl">Liên lạc với chúng tôi</h1>

      <form ref={form} className="space-y-5 mt-2 " onSubmit={sendEmail}>
        <input
          hidden
          type="text"
          name="userId"
          value={user.id}
          readOnly
          className="input input-bordered bg-gray"
          id="userId"
        />
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input type="text" className="grow" placeholder="Email" name="userEmail" id="userEmail" />
        </label>
        <label className="form-control w-full ">
          <textarea
            id="message"
            name="message"
            placeholder="Nội dung liên hệ của bạn..."
            className="textarea textarea-bordered"
            required
            minLength={10}
            rows={8}
          ></textarea>
          <div className="text-sm text-red-500 "></div>
        </label>

        <button type="submit" className="btn btn-md bg-primary">
          Gửi
        </button>
      </form>
    </div>
  )
}

export default ContactForm
