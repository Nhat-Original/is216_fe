type MenuItemOptionProps = {
  id: string
  price: number
  size: string
}

type MenuItemProps = {
  id: string
  name: string
  description: string
  imageUrl: string
  menuItemOptions: MenuItemOptionProps[]
}
const menuItem = ({ data }: { data: MenuItemProps }) => {
  return (
    <div className="flex justify-between  bg-red-200 items-center p-4">
      <div className="avatar">
        <div className="w-24 rounded">
          <img src={data.imageUrl} alt={data.name} />
        </div>
      </div>
      <h2>{data.name}</h2>
      <p>{data.description}</p>

      <ul>
        {data.menuItemOptions.map((option) => (
          <li key={option.id}>
            {option.size} - {option.price} VND
          </li>
        ))}
      </ul>
    </div>
  )
}
export default menuItem
