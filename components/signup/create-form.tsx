'use client'
import { useFormState } from 'react-dom'
import { register } from '@/app/lib/action'
import type { State } from '@/app/lib/action'
import { useState } from 'react'

const CreateForm = () => {
  const initialState: State = { errors: {}, message: '', data: {} }
  const [state, dispatch] = useFormState(register, initialState)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState)
  }
  return (
    <form className="space-y-4" action={dispatch}>
      <div>
        <label className="label" htmlFor="fullName">
          <span className="text-base label-text">Họ tên</span>
        </label>
        <div className="relative">
          <input
            name="fullName"
            id="fullName"
            type="text"
            defaultValue={state.data?.fullName || ''}
            aria-describedby="fullName-error"
            placeholder="Nhập họ tên"
            className="w-full input input-bordered "
          />
        </div>
        <div id="fullName-error" aria-live="polite" aria-atomic="true">
          {state.errors?.fullName && <p className="text-sm text-red-500">{state.errors.fullName}</p>}
        </div>
      </div>

      <div>
        <label className="label">
          <span className="text-base label-text">Ngày tháng năm sinh</span>
        </label>
        <div className="relative">
          <input
            name="dateOfBirth"
            id="dateOfBirth"
            defaultValue={state.data?.dateOfBirth || ''}
            aria-describedby="dateOfBirth-error"
            type="text"
            onFocus={(e) => (e.currentTarget.type = 'date')}
            onBlur={(e) => (e.currentTarget.type = 'text')}
            placeholder="Nhập ngày tháng năm sinh"
            className="w-full input input-bordered "
          />
        </div>
        <div id="dateOfBirth-error" aria-live="polite" aria-atomic="true">
          {state.errors?.dateOfBirth && <p className="text-sm text-red-500">{state.errors.dateOfBirth}</p>}
        </div>
      </div>
      <div>
        <label className="label">
          <span className="text-base label-text">Email</span>
        </label>
        <div className="relative">
          <input
            name="email"
            id="email"
            type="text"
            defaultValue={state.data?.email || ''}
            placeholder="Nhập email"
            className="w-full input input-bordered "
            aria-describedby="email-error"
          />
        </div>
        <div id="email-error" aria-live="polite" aria-atomic="true">
          {state.errors?.email && <p className="text-sm text-red-500">{state.errors.email}</p>}
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex-1">
          <label className="label">
            <span className="text-base label-text">Số điện thoại</span>
          </label>
          <div className="relative">
            <input
              name="phone"
              type="text"
              defaultValue={state.data?.phone || ''}
              id="phone"
              aria-describedby="phone-error"
              placeholder="Nhập số điện thoại"
              className="w-full input input-bordered "
            />
          </div>
          <div id="phone-error" aria-live="polite" aria-atomic="true">
            {state.errors?.phone && <p className="text-sm text-red-500">{state.errors.phone}</p>}
          </div>
        </div>
        <div className="flex-1">
          <label className="label">
            <span className="text-base label-text">Giới tính</span>
          </label>
          <div className="relative">
            <select
              name="gender"
              id="gender"
              aria-describedby="gender-error"
              className="select select-bordered w-full"
              defaultValue={state.data?.gender || ''}
            >
              <option value="MALE">Nam</option>
              <option value="FEMALE">Nữ</option>
              <option value="OTHER">Khác</option>
            </select>
          </div>
          <div id="gender-error" aria-live="polite" aria-atomic="true">
            {state.errors?.gender && <p className="text-sm text-red-500">{state.errors.gender} </p>}
          </div>
        </div>
      </div>
      <div>
        <label className="label">
          <span className="text-base label-text">Mật khẩu</span>
        </label>
        <div className="relative">
          <input
            name="password"
            id="password"
            defaultValue={state.data?.password || ''}
            aria-describedby="password-error"
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="Nhập mật khẩu"
            className="w-full input input-bordered "
          />
          <button
            className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
            onClick={togglePasswordVisibility}
            type="button"
          >
            {isPasswordVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        </div>

        <div id="password-error" aria-live="polite" aria-atomic="true">
          {state.errors?.password && <p className="text-sm text-red-500">{state.errors.password}</p>}
        </div>
      </div>
      <div>
        <label className="label">
          <span className="text-base label-text">Xác nhận mật khẩu</span>
        </label>
        <div className="relative">
          <input
            name="confirmPassword"
            type="password"
            defaultValue={state.data?.confirmPassword || ''}
            id="confirmPassword"
            aria-describedby="confirmPassword-error"
            placeholder="Xác nhận mật khẩu"
            className="w-full input input-bordered "
          />
        </div>
        <div id="confirmPassword-error" aria-live="polite" aria-atomic="true">
          {state.errors?.confirmPassword && <p className="text-sm text-red-500">{state.errors.confirmPassword}</p>}
        </div>
      </div>
      <div>
        <button type="submit" className="btn btn-block bg-primary">
          Đăng ký
        </button>
      </div>
      {state.message && <p>{state.message}</p>}
    </form>
  )
}
export default CreateForm
