'use server'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { api } from '@/api'

const FormLoginSchema = z.object({
  email: z
    .string({
      message: 'Email is required',
    })
    .email(),
  password: z
    .string({
      message: 'Password is required',
    })
    .min(6, {
      message: 'Password must be at least 6 characters',
    }),
})

const FormRegisterSchema = FormLoginSchema.extend({
  confirmPassword: z.string({
    message: 'Confirm password is required',
  }),
  fullName: z.string({
    message: 'Full name is required',
  }),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  dateOfBirth: z.string().date(),
  phone: z.string().min(10).max(15),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password and confirm password must be the same',
  path: ['confirmPassword'],
})

export type State = {
  errors: Record<string, any>
  message: string
  data: Record<string, any>
}

export async function login(state: State, formData: FormData) {
  const validatedField = FormLoginSchema.safeParse(Object.fromEntries(formData))
  if (!validatedField.success) {
    return {
      errors: validatedField.error.flatten().fieldErrors,
      message: 'login failed',
      data: {
        ...state.data,
        ...Object.fromEntries(formData),
      },
    }
  }
  try {
    const response = await api.post('/auth/login', JSON.stringify(validatedField.data))
    if ((response.statusText = 'OK')) {
      return {
        errors: {},
        message: 'login success',
        data: response.data,
      }
    } else {
      return {
        errors: {},
        message: 'login failed',
        data: {
          ...state.data,
          ...Object.fromEntries(formData),
        },
      }
    }
  } catch (error: any) {
    return {
      errors: {},
      message: error.message,
      data: {
        ...state.data,
        ...Object.fromEntries(formData),
      },
    }
  }
}
export async function register(prevState: State, formData: FormData) {
  const validatedField = FormRegisterSchema.safeParse(Object.fromEntries(formData))
  if (!validatedField.success) {
    return {
      errors: validatedField.error.flatten().fieldErrors,
      message: 'register failed',
      data: {
        ...prevState.data,
        ...Object.fromEntries(formData),
      },
    }
  }
  try {
    const response = await api.post('/auth/register', JSON.stringify(validatedField.data))
    if ((response.statusText = 'OK')) {
      redirect('/login')
    } else {
      return {
        errors: {},
        message: 'register failed',
        data: {
          ...prevState.data,
          ...Object.fromEntries(formData),
        },
      }
    }
  } catch (error: any) {
    return {
      errors: {},
      message: error.message,
      data: {
        ...prevState.data,
        ...Object.fromEntries(formData),
      },
    }
  }
}
