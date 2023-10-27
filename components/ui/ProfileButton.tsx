import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const ProfileButton = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage
                        src="https://avatars.githubusercontent.com/u/13905276?v=4"
                        alt="Avatar"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem className="cursor-pointer">
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                    Billing
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                    Subscription
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProfileButton;