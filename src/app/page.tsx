
import NavBar from '@/src/components/NavBar';
import MyFooter from '../components/MyFooter';
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
                <div className="flex flex-row justify-center items-center">
                    <Link href="https://github.com/axait/">
                        <span
                        className="
                        flex items-center
                        bg-transparent 
                        border-2 border-white 
                        rounded-md
                        px-6 py-2 
                        "
                        >
                            <Image src="/github-brands-solid-full.svg" alt="avatar" 
                            width={30} height={30} 
                            className='mr-2'
                            />
                            Go to Github
                        </span>
                    </Link>
                    <Link href="/todo" className='flex h-[50px] '>
                        <span 
                        className="
                        bg-purple-500 hover:bg-purple-700 
                        text-white 
                        rounded-md
                        h-[52px]
                        px-6 py-2 
                        ml-5
                         ">Go to Todo Page</span>
                    </Link>
                </div>
            </div>
            <MyFooter/>
        </>
    )

}

export default Page

