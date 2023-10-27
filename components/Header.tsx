import Link from 'next/link'
import Container from './ui/container'
import { Button } from '@/components/ui/button'
import { Moon, ShoppingCart, Sun } from 'lucide-react'
import ProfileButton from './ui/ProfileButton'
import ModeToggle from './ModeToggle'

const Header = () => {
    return (
        <header className="sm:flex sm:justify-between py-3 px-4 border-b">
            <Container>
                <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
                    <div className="flex items-center">
                        <Link href="/" className="ml-4 lg:ml-0">
                            <h1 className="text-xl font-bold">
                                STORE NAME
                            </h1>
                        </Link>
                    </div>
                    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block ">
                        <Button asChild variant="ghost">
                            <Link
                                href={'/'}
                                // key={key}
                                className="text-sm font-medium transition-colors"
                            >
                                X
                            </Link>
                        </Button>
                    </nav>
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="mr-2"
                            aria-label="Shopping Cart"
                        >
                            <ShoppingCart className="h-6 w-6" />
                            <span className="sr-only">Shopping Cart</span>
                        </Button>

                        <ModeToggle />
                        <ProfileButton />
                    </div>

                </div>
            </Container>
        </header>
    )
}

export default Header