'use client'
import Link from 'next/link'
import React from 'react'
import classnames from 'classnames'
import {usePathname} from 'next/navigation'
import { SiTask } from "react-icons/si";

const NavBar = () => {
    const links = [
        {label: 'Dashboard', href: '/'},
        {label: 'Tasks', href: '/tasks'}
    ]

    const currentPath = usePathname();
  return (
    <nav className="flex space-x-6 border-b mr-5 mb-5 px-5 h-14 items-center ">
        <Link href="/" className=" flex items-center size-10"><SiTask /></Link>
        <ul className="flex space-x-6">
            {links.map(link =>
                <Link
                key={link.href}
                href={link.href}
                className={classnames({
                    'text-zinc-900': link.href === currentPath,
                    'text-zinc-500': link.href !== currentPath,
                    'hover:text-zinc-800 transition-colors': true
                })}
                >
                {link.label}
                </Link>
            )}
        </ul>
    </nav>
  )
}

export default NavBar