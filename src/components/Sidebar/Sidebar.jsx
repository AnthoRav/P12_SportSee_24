import { Link } from 'react-router-dom';
import MediIcon from '../../assets/side-icon-medi.png';
import SwimIcon from '../../assets/side-icon-swim.png';
import BikeIcon from '../../assets/side-icon-bike.png';
import DumIcon from '../../assets/side-icon-dum.png';
/**
 * Sidebar of app
 * @component lateral bar with links for diferent activities
 */

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar_nav">
        <Link to="/meditation" className="sidebar_nav-link">
          <img src={MediIcon} alt="Icon of yoga" />
        </Link>
        <Link to="/swimming" className="sidebar_nav-link">
          <img src={SwimIcon} alt="Icon of swimming" />
        </Link>
        <Link to="/biking" className="sidebar_nav-link">
          <img src={BikeIcon} alt="Icon of cycling" />
        </Link>
        <Link to="/musculation" className="sidebar_nav-link">
          <img src={DumIcon} alt="Icon of gym" />
        </Link>
      </div>
        <div className='sidebar_right'>
          <p> Copiryght, SportSee 2024 </p>
        </div>
    </div>
  );
}

export default Sidebar