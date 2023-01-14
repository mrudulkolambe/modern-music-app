import React from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const Layout = ({ children, sidebar, topbar, hideSearchResult=false }) => {
	return (
		<>
			{sidebar && <Sidebar />}
			{topbar && <Topbar hideSearchResult={hideSearchResult} />}
			<div className={topbar ? 'h-[87vh] w-[80vw] top-[13vh] fixed left-[20vw] overflow-auto pb-10' : 'h-[100vh] w-[80vw] top-[0vh] fixed left-[20vw] overflow-auto'}>
				{children}
			</div>
		</>
	)
}

export default Layout
