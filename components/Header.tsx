import { ThemeToggle } from '@/app/components/ThemeToggle'

import AddLinkButton from './AddLinkButton'
import Search from './Search'

const Header = () => {
  return (
    <div className="flex justify-end gap-2 border-b px-4 py-2">
      <Search />
      <AddLinkButton />
      <ThemeToggle />
    </div>
  )
}

export default Header
