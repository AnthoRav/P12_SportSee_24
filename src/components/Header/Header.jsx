import logoSportSee from '../../assets/logo-SportSee.png';
import { Link } from 'react-router-dom';
/**
 * Navbar of app
 * @component top navbar with links for Homepage, Profile page, Réglage, Comunity.
 */

const Header = () => {
  return (
    <header className='header'>
      <Link to="/">
        <img className='header_logo' src={logoSportSee} alt='logo' />
      </Link>
      <nav className='header_nav'>
        <Link className="header_nav-link" to="/">
          Accueil
        </Link>
        <Link className="header_nav-link" to="/profil">
          Profil
        </Link>
        <Link className="header_nav-link" to="/reglage">
          Réglages
        </Link>
        <Link className="header_nav-link" to="/communite">
          Communauté
        </Link>
      </nav>
    </header>
  )
}

export default Header