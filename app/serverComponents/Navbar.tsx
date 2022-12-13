import Link from "next/link";
import SignInOrOutButton from "../clientComponents/SignInOrOutButton";

const Navbar: React.FC = () => {
    return (
        <div className="flex py-2 items-center">
            <div className="flex-1">
                <h1 className="text-2xl font-bold">Get Social</h1>
            </div>
            <nav>
                <ul className="flex gap-2">
                    <li><SignInOrOutButton /></li>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/about">About</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;