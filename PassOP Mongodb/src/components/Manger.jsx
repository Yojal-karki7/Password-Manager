import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manger = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async()=>{
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
            setPasswordArray(passwords)
            console.log(passwords);
            
    }

    useEffect(() => {
        getPasswords()
        

    }, [])

    const copyText = (text) => {
        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png";
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/eyecross.png";
            passwordRef.current.type = "text"
        }
    }
    const savePassword = async() => {
        if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3){
            // if any such id exists in the db, delete it
            await fetch("http://localhost:3000/", { method: "DELETE", headers: {"content-type": "application/json"}, body: JSON.stringify({id: form.id }) })

            setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
            await fetch("http://localhost:3000/", { method: "POST", headers: {"content-type": "application/json"},body: JSON.stringify({...form, id: uuidv4()})})
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
            setform({ site: "", username: "", password: "" })
            toast('Password has been saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }else{
            toast('Invalid requirements!')
        }
    }
    const deletePassword = async(id) => {
        let c = confirm("Are u sure?")
        if(c){
            setPasswordArray(passwordArray.filter(item=>item.id!==id))
            let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: {"content-type": "application/json"}, body: JSON.stringify({ id }) })
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
            toast('Password delted successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        
    }
    const editPassword = (id) => {
        setform({...passwordArray.filter(item=>item.id===id)[0], id: id})
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
            <div className="p-2 md:p-0 md:mycontainer min-h-[88.2vh]">
                <h1 className='text-4xl font-bold text-center'><span className='text-green-500'> &lt;</span>
                    <span>Pass</span>
                    <span className='text-green-500'>OP/ &gt;</span></h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>
                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input value={form.site} onChange={handleChange} className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="site" id="site" placeholder='Enter website URL' />
                    <div className="flex flex-col md:flex-row w-full gap-4 justify-between">
                        <input value={form.username} onChange={handleChange} className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="username" id="username" placeholder='Enter Username' />
                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleChange} className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name="password" id="password" placeholder='Enter Password' />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer ' onClick={showPassword}><img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="" /></span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center gap-2 items-center border-2 border-green-900 hover:bg-green-500 bg-green-400 rounded-full px-8 py-2 w-fit'>
                        <lord-icon
                            src="https://cdn.lordicon.com/hqymfzvj.json"
                            trigger="hover">
                        </lord-icon>
                        Save</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to Show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden ">
                            <thead className='bg-green-800 text-white mb-10'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='py-2 border border-white text-center '>
                                            <div className='flex justify-center items-center gap-1'>
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <div className='lorciconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={25} height={25} color={"#000000"} fill={"none"}>
                                                        <path d="M14.5563 13.2183C13.514 14.2606 11.8241 14.2606 10.7817 13.2183C9.73942 12.1759 9.73942 10.486 10.7817 9.44364L13.1409 7.0845C14.1357 6.08961 15.7206 6.04433 16.7692 6.94866M16.4437 3.78175C17.486 2.73942 19.1759 2.73942 20.2183 3.78175C21.2606 4.82408 21.2606 6.51403 20.2183 7.55636L17.8591 9.9155C16.8643 10.9104 15.2794 10.9557 14.2308 10.0513" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M10.4999 3C7.21257 3 5.56889 3 4.46256 3.9079C4.25998 4.07414 4.07423 4.25989 3.90798 4.46247C3.00007 5.56879 3.00006 7.21247 3.00002 10.4998L3 12.9999C2.99996 16.7712 2.99995 18.6568 4.17152 19.8284C5.3431 21 7.22873 21 11 21H13.4999C16.7874 21 18.4311 21 19.5375 20.092C19.74 19.9258 19.9257 19.7401 20.092 19.5376C20.9999 18.4312 20.9999 16.7875 20.9999 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </td >
                                        <td className='py-2 border border-white text-center '>
                                            <div className='flex justify-center items-center gap-1'>
                                                <span>{item.username}</span>
                                                <div className='lorciconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={25} height={25} color={"#000000"} fill={"none"}>
                                                        <path d="M14.5563 13.2183C13.514 14.2606 11.8241 14.2606 10.7817 13.2183C9.73942 12.1759 9.73942 10.486 10.7817 9.44364L13.1409 7.0845C14.1357 6.08961 15.7206 6.04433 16.7692 6.94866M16.4437 3.78175C17.486 2.73942 19.1759 2.73942 20.2183 3.78175C21.2606 4.82408 21.2606 6.51403 20.2183 7.55636L17.8591 9.9155C16.8643 10.9104 15.2794 10.9557 14.2308 10.0513" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M10.4999 3C7.21257 3 5.56889 3 4.46256 3.9079C4.25998 4.07414 4.07423 4.25989 3.90798 4.46247C3.00007 5.56879 3.00006 7.21247 3.00002 10.4998L3 12.9999C2.99996 16.7712 2.99995 18.6568 4.17152 19.8284C5.3431 21 7.22873 21 11 21H13.4999C16.7874 21 18.4311 21 19.5375 20.092C19.74 19.9258 19.9257 19.7401 20.092 19.5376C20.9999 18.4312 20.9999 16.7875 20.9999 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </td >
                                        <td className='py-2 border border-white text-center '>
                                            <div className='flex justify-center items-center gap-1'>
                                                <span>{"*".repeat(item.password.length)}</span>
                                                <div className='lorciconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={25} height={25} color={"#000000"} fill={"none"}>
                                                        <path d="M14.5563 13.2183C13.514 14.2606 11.8241 14.2606 10.7817 13.2183C9.73942 12.1759 9.73942 10.486 10.7817 9.44364L13.1409 7.0845C14.1357 6.08961 15.7206 6.04433 16.7692 6.94866M16.4437 3.78175C17.486 2.73942 19.1759 2.73942 20.2183 3.78175C21.2606 4.82408 21.2606 6.51403 20.2183 7.55636L17.8591 9.9155C16.8643 10.9104 15.2794 10.9557 14.2308 10.0513" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M10.4999 3C7.21257 3 5.56889 3 4.46256 3.9079C4.25998 4.07414 4.07423 4.25989 3.90798 4.46247C3.00007 5.56879 3.00006 7.21247 3.00002 10.4998L3 12.9999C2.99996 16.7712 2.99995 18.6568 4.17152 19.8284C5.3431 21 7.22873 21 11 21H13.4999C16.7874 21 18.4311 21 19.5375 20.092C19.74 19.9258 19.9257 19.7401 20.092 19.5376C20.9999 18.4312 20.9999 16.7875 20.9999 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </td >
                                        <td className='py-2 border border-white text-center'>
                                            <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}><lord-icon
                                                src="https://cdn.lordicon.com/igljtrxq.json"
                                                trigger="hover"
                                                colors="primary:#000000,secondary:#000000"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-1' onClick={()=>{deletePassword(item.id)}}><lord-icon
                                               src="https://cdn.lordicon.com/crxdwbpm.json"
                                               colors="primary:#000000,secondary:#000000"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manger
