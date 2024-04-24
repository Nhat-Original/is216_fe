'use client'
import { useFormState } from 'react-dom'
import { register } from '@/app/lib/action'
import type { State } from '@/app/lib/action'

const CreateForm = () => {
  const initialState: State = { errors: {}, message: '', data: {} }
  const [state, dispatch] = useFormState(register, initialState)
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
            type="date"
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
      <div>
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
      <div>
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
            type="password"
            placeholder="Nhập mật khẩu"
            className="w-full input input-bordered "
          />
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
