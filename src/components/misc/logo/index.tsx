import Link from "next/link";

const Logo = () => {
    return (
        <Link href={"/"}>
            <h1 className="font-space font-semibold cursor-pointer text-center font-secondary text-3xl md:text-4xl">aufdecken.</h1>
        </Link>
    )
}

export default Logo;