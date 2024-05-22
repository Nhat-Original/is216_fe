'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/api'
import { queryClient } from '@/components/Providers/QueryProvider'
type MenuItemOptionProps = {
  price: number
  size: string
  [key: string]: string | number
}

type MenuItemProps = {
  name: string
  description: string
  imageUrl: string
  menuItemOptions: MenuItemOptionProps[]
  menu_id: string
}

const Form = ({ menu_id }: { menu_id: string }) => {
  const [menuItem, setMenuItem] = useState<MenuItemProps>({
    name: '',
    description: '',
    imageUrl: '',
    menuItemOptions: [],
    menu_id: menu_id,
  })
  const mutation = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eatery'] })
    },
    mutationFn: () => api.post('/menu-item', menuItem),
  })
  const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setMenuItem({
      ...menuItem,
      [event.target.name]: event.target.value,
    })
  }

  const handleOptionChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'price' && isNaN(Number(event.target.value))) return
    if (event.target.name === 'size' && !['S', 'M', 'L'].includes(event.target.value)) return
    if (event.target.name === 'price' && Number(event.target.value) <= 0) {
      alert('Giá tiền không được bé hơn 0')
      return
    }
    const options = [...menuItem.menuItemOptions]
    options[index][event.target.name as keyof MenuItemOptionProps] = event.target.value
    setMenuItem({
      ...menuItem,
      menuItemOptions: options,
    })
  }

  const addOption = () => {
    if (menuItem.menuItemOptions.length < 3) {
      const size = prompt('Nhập size (S, M, L):')
      if (size === 'S' || size === 'M' || size === 'L') {
        const isSizeExist = menuItem.menuItemOptions.some((option) => option.size === size)
        if (!isSizeExist) {
          setMenuItem({
            ...menuItem,
            menuItemOptions: [...menuItem.menuItemOptions, { price: 0, size: size }],
          })
        } else {
          alert('Size đã tồn tại. Vui lòng chọn size khác')
        }
      } else {
        alert('Size không hợp lệ. Vui lòng chọn S, M hoặc L')
      }
    } else {
      alert('Tối đa 3 size cho mỗi món ăn')
    }
  }
  const deleteOption = (index: number) => {
    const options = [...menuItem.menuItemOptions]
    options.splice(index, 1)
    setMenuItem({
      ...menuItem,
      menuItemOptions: options,
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    menuItem['menu_id'] = menu_id
    menuItem.menuItemOptions = menuItem.menuItemOptions.map((option) => {
      return { ...option, price: Number(option.price) }
    })
    mutation.mutate()
  }

  return (
    <>
      <form onSubmit={handleSubmit} className=" grid grid-cols-2 w-full gap-5">
        <label className="form-control ">
          <div className="label">
            <span className="label-text">Nhập tên sản phẩm</span>
          </div>
          <input
            name="name"
            value={menuItem.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="input-bordered input"
          />
        </label>

        <label className="form-control col-start-1">
          <div className="label">
            <span className="label-text">Nhập link ảnh</span>
          </div>
          <input
            name="imageUrl"
            value={menuItem.imageUrl}
            onChange={handleInputChange}
            placeholder="Image URL"
            className="input-bordered input"
          />
        </label>

        <label className=" col-start-1 form-control">
          <div className="label">
            <span className="label-text">Nhập size và giá tiền tương ứng</span>
          </div>
          <button type="button" className="btn w-1/2" onClick={addOption}>
            Thêm size
          </button>
        </label>
        {menuItem.menuItemOptions.map((option, index) => (
          <label key={index} className={`form-control col-start-1`}>
            <div className="flex flex-col">
              <div>Size: {option.size}</div>
              <div className="flex gap-5">
                <input
                  name="price"
                  type="number"
                  className="input-bordered input w-1/2"
                  value={option.price.toString()}
                  onChange={(event) => handleOptionChange(index, event)}
                  placeholder="Giá tiền"
                />
                <button type="button" className="btn  btn-error" onClick={() => deleteOption(index)}>
                  Xóa size
                </button>
              </div>
            </div>
          </label>
        ))}
        <label className="form-control col-start-2 row-start-1">
          <div className="label">
            <span className="label-text">Nhập mô tả</span>
          </div>

          <textarea
            className="textarea textarea-bordered"
            placeholder="Mô tả"
            name="description"
            value={menuItem.description}
            onChange={handleInputChange}
          ></textarea>
        </label>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </>
  )
}

export default Form
