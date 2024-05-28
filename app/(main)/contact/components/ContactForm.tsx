'use client'
import React, { useRef } from 'react'
import emailjs from '@emailjs/browser'
import { useSessionStore } from '@/stores/useSessionStore'
import { toast } from 'react-toastify'

const ContactForm = () => {
  const user = useSessionStore((state) => state.user)

  const form = useRef(null)

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID && process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID && form.current) {
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          form.current,
          {
            publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
          },
        )
        .then(
          (result) => {
            if (result.status === 200) {
              toast.success('Gửi email thành công')
              document.getElementById('message')?.setAttribute('value', '')
            }
          },
          (error) => {
            toast.error('Gửi email thất bại: ', error.text)
          },
        )
    }
  }

  return (
    <div className="card w-96 bg-secondary  p-4 mx-auto">
      <h1 className="font-bold text-xl">Liên lạc với chúng tôi</h1>

      <form ref={form} className="space-y-4" onSubmit={sendEmail}>
        <input hidden type="text" name="userId" value={user.id} readOnly className="input input-bordered bg-gray" />

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Nội dung</span>
          </div>
          <textarea
            id="message"
            name="message"
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
