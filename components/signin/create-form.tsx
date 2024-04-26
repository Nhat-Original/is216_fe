'use client'
import { useFormState } from 'react-dom'
import { State, login } from '@/app/lib/action'
import { useTokenStore, userSessionStore } from '@/app/lib/store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useStore } from 'zustand'

const CreateForm = () => {
  const initialState: State = { errors: {}, message: '', data: {} }
  const router = useRouter()
  const [state, dispatch] = useFormState(login, initialState)
  const store: any = useStore(useTokenStore, (s) => s)
  const UserSessionStore: any = useStore(userSessionStore, (s) => s)
  useEffect(() => {
    if ('access_token' in state.data) {
      store.setToken(state.data.access_token)
      UserSessionStore.login(state.data.access_token)
      setTimeout(() => {
        router.push('/')
      }, 10)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.data])

  return (
    <form className="space-y-4" action={dispatch}>
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
          {'email' in state.errors && <p className="text-sm text-red-500">{state.errors.email}</p>}
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
            autoComplete="on"
            defaultValue={state.data?.password || ''}
            aria-describedby="password-error"
            type="password"
            placeholder="Nhập mật khẩu"
            className="w-full input input-bordered "
          />
        </div>

        <div id="password-error" aria-live="polite" aria-atomic="true">
          {'password' in state.errors && <p className="text-sm text-red-500">{state.errors.password}</p>}
        </div>
      </div>

      <div>
        <button type="submit" className="btn btn-block bg-primary">
          Đăng nhập
        </button>
      </div>
      {state.message && <p>{state.message}</p>}
    </form>
  )
}
export default CreateForm
