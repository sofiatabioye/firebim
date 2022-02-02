import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div className="mfs-auto">
        <span className="mr-1">@</span>
        <a href="#" rel="noopener noreferrer" className="text-dark">Fire BIM 2022</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
