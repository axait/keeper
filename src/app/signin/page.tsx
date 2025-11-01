



// ⁡⁢⁣⁢​‌‌‍𝗖𝗢𝗠𝗟𝗣𝗘𝗧𝗘 𝗠​‌‌‍𝗘​​⁡

// "use client";

// import React, { useState } from 'react'
// import axios from 'axios'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useRouter } from 'next/router'

// const Signin = () => {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const router = useRouter()

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         try {
//             const res = await axios.post('/api/user/signin', JSON.stringify({ email, password }))
//             const data = res.data
//             const sessionId = data.sessionId
//             const res2 = await axios.post('/api/user/verifyemail', JSON.stringify({ sessionId }))
//             const data2 = res2.data
//             if (data2.verified) {
//                 router.push('/')
//             } else {
//                 console.log("User is not verified")
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const handleCreateAccountSubmit = async (e) => {
//         e.preventDefault()
//         try {
//             const name = e.currentTarget.name.value
//             const email = e.currentTarget.email.value
//             const password = e.currentTarget.password.value
//             const res = await axios.post('/api/user/create', JSON.stringify({ name, email, password }))
//             const data = res.data
//             const sessionId = data.sessionId
//             const res2 = await axios.post('/api/user/verifyemail', JSON.stringify({ sessionId }))
//             const data2 = res2.data
//             if (data2.verified) {
//                 router.push('/')
//             } else {
//                 console.log("User is not verified")
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     return (
//         <div className="signin-container">
//             <form onSubmit={handleSubmit}>
//                 <h1>Sign In</h1>
//                 <label>Email</label>
//                 <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                 <label>Password</label>
//                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                 <button type="submit">Sign In</button>
//             </form>
//             <hr />
//             <form onSubmit={handleCreateAccountSubmit}>
//                 <h1>Create Account</h1>
//                 <label>Name</label>
//                 <input type="text" name="name" />
//                 <label>Email</label>
//                 <input type="email" name="email" />
//                 <label>Password</label>
//                 <input type="password" name="password" />
//                 <button type="submit">Create Account</button>
//             </form>
//         </div>
//     )
// }

// export default Signin

