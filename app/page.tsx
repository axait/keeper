
import NavBar from '@/components/NavBar';
import Link from 'next/link';
import Image from 'next/image';

const Page = () => {

    // redirect('/todo'); // Temporary redirect (307)

    return (
        <>
            <NavBar />
            <div className="flex flex-col items-center justify-center mt-[30vh]">
                <h1 className="text-4xl font-bold">Home Page</h1>
                <br />
                <div className="flex flex-row justify-center items">
                    <Link href="https://github.com/axait/">
                        <span className="bg-transparent border-2 border-white px-6 py-2  rounded-md">
                            <Image src="/github-brands-solid-full.svg" alt="avatar" width={30} height={30} />
                            Go to Github
                        </span>
                    </Link>
                    <Link href="/todo">
                        <span className="bg-purple-500 hover:bg-purple-700 text-white px-6 py-2 rounded-md ml-5">Go to Todo Page</span>
                    </Link>
                </div>
            </div>
        </>
    )

}

export default Page

