'use client'

import React, { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignInModal } from '@/components/auth/sign-in-modal'
import { AuthActions } from '@/components/navigation/auth-actions'
import { MobileNavigation } from '@/components/navigation/mobile-navigation'
import { NavigationLinks } from '@/components/navigation/navigation-links'

export function Navbar() {
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('blockestate-theme')
    const shouldUseLight = savedTheme === 'light'

    setIsLight(shouldUseLight)

    document.documentElement.classList.toggle('light', shouldUseLight)
  }, [])

  function toggleTheme() {
    const nextIsLight = !isLight

    setIsLight(nextIsLight)

    document.documentElement.classList.toggle('light', nextIsLight)

    window.localStorage.setItem(
      'blockestate-theme',
      nextIsLight ? 'light' : 'dark'
    )
  }

  function openSignIn() {
    setIsSignInOpen(true)
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-surface-base/55 backdrop-blur-xl">
      <div className="mx-auto max-w-[92rem] px-6 sm:px-10 lg:px-14 xl:px-20">
        <div className="flex h-[68px] items-center justify-between md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <Link
            href="/"
            aria-label="BlockEstate home"
            className="text-[22px] font-semibold tracking-tight text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
          >
            Block<span className="font-display italic font-medium text-brand">Estate</span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            <NavigationLinks pathname={pathname} />
          </div>

          
        <div className="hidden items-center gap-3 justify-self-end md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isLight ? 'Switch to dark mode' : 'Switch to light mode'
            }
            title={
              isLight ? 'Switch to dark mode' : 'Switch to light mode'
            }
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            {isLight ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </button>

          <AuthActions onSignIn={openSignIn} />
        </div>



        <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            isLight ? 'Switch to dark mode' : 'Switch to light mode'
          }
          title={
            isLight ? 'Switch to dark mode' : 'Switch to light mode'
          }
          className="ml-auto mr-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:hidden"
        >
          {isLight ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </button>


          <MobileNavigation
            isOpen={isMobileMenuOpen}
            onClose={closeMobileMenu}
            onOpenChange={setIsMobileMenuOpen}
            onSignIn={openSignIn}
            pathname={pathname}
          />
        </div>
      </div>

      <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
    </nav>
  )
}
