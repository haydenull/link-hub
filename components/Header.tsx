import AddLinkButton from './AddLinkButton'
import Search from './Search'
import { Button } from './ui/button'

const Header = () => {
  return (
    <div className="flex justify-end gap-2 border-b px-4 py-2">
      <Search />
      <AddLinkButton />
    </div>
  )
}

export default Header
