import MenuItem from './menuItem'
interface Props {
  data: any[]
}

const EateryContainer = ({ data }: Props) => {
  return (
    <div className="flex gap-2 flex-col mt-4">
      {data.map((item: any) => (
        <MenuItem data={item} key={item.id} id={item.id} />
      ))}
    </div>
  )
}

export default EateryContainer
