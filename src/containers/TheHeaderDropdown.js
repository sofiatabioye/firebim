import React, { useEffect } from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import {cilSad, cilLockLocked, cilAccountLogout, cilApplicationsSettings} from "@coreui/icons";
import CIcon from '@coreui/icons-react'
import avatar from '../views/images/user.png';

const TheHeaderDropdown = props => {

  const { handleLogout, user, ...rest } = props;

  // useEffect(())
 
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={user && user.image ? "data:image/png;base64, " + user.image : avatar}
            className="c-avatar-img"
            shape={"rounded-circle"}
            thumbnail={true}
            // alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Account</strong>
          <div>{user ? user.email: null}</div>
          <div> Role: <i>{user ? (user.role): null}</i></div>
        </CDropdownItem>
        <CDropdownItem to={"/userprofile"}>
          <CIcon name="cil-bell" className="mfe-2" />
          Profile
        </CDropdownItem>
     
        <CDropdownItem to={"/change-password"}>
         <CIcon name="cil-settings" className="mfe-2" />
          Change Password

        </CDropdownItem>

        <CDropdownItem divider />
        <CDropdownItem onClick={handleLogout}>
          <CIcon name="cil-x" className="mfe-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
