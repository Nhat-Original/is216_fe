import React from 'react'

import Table from './components/Table'
import CreateModal from './components/CreateModal'

const UserAdressesPage = () => {
  return (
    <div className="w-full flex flex-col py-4 px-4 md:px-10 gap-4">
      <CreateModal />
      <Table />
    </div>
  )
}

export default UserAdressesPage
