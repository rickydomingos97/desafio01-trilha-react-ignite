import '../styles/header.scss'
//import logo from '../../public/logo.svg'
// <img src={ logo } alt="to.do"/>
import logo from '../../logo.svg'

export function Header() {
  return (
    <header className="header">
      <div>
       
        <img src="/logo.svg" alt="to.do"/>
      </div>
    </header>
  )
}