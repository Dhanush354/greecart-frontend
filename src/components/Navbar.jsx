import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from '../assets/assets.js';
import { useAppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";

const Navbar = () => {
    
    const [open, setOpen] = React.useState(false)
    const { user, setUser, setShowUserLogin, navigate,setSearchQuery,searchQuery,getCartCount,axios } = useAppContext();


    const logout = async () => {

        try{
            const {data}= await axios.get('/api/user/logout')
            if(data.success){
                toast.success(data.message)
                setUser(null);
                navigate('/');    
            }else{
                toast.error(data.message)
            }
        }catch(error){
             toast.error(data.message)
        }
        
    }

    useEffect(() => {
        if(searchQuery.length > 0) {
            navigate('/products');
        }
    }, [searchQuery]);



    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">


            <NavLink to='/' onClick={() => setOpen(false)} >
                <img className="h-9" src={assets.logo} alt="logo" />

            </NavLink>


            {/* Desktop Menu */}

            <div className="hidden sm:flex items-center gap-8">

                <h2 onClick={()=>navigate('/seller')} className="text-primary  font-bold cursor-pointer hover:text-primary-dull">Seller</h2>

                <NavLink to='/'>Home</NavLink>
                <NavLink to='/products'>All product</NavLink>
                <NavLink to='/' onClick={()=>{
                    window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: 'smooth',
                    });
                }}>Contact us</NavLink>


                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">

                    <input onChange={(e)=>setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />

                    <img src={assets.search_icon} alt="search" className="w-4 h-4" />

                </div>


                <div onClick={()=>navigate('/cart')} className="relative cursor-pointer">

                    <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />

                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>

                </div>


                { !user? (<button onClick={() => setShowUserLogin(true)}
                className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                    Login
                </button>) : (
                    <div className="relative group">
                        <img src={assets.profile_icon} className="w-10" alt="" />
                    <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2 w-30 text-sm rounded-md z-40">
                        <li onClick={()=>navigate("my-orders")} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">My Orders</li>
                        <li onClick={logout} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">Logout</li>
                    </ul>
                    </div>
                )
                }

            </div>

            <div className="flex items-center gap-4 sm:hidden">
                <button onClick={()=>navigate('/seller')} className="cursor-pointer px-3 max-[400px]:px-1.5 py-2 mt-1 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm  max-[400px]:text-xs max-[400px]:rounded-md">Seller</button>
                <div onClick={()=>navigate('/cart')} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>

                </div>

                <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="">
                    {/* Menu Icon SVG */}
                    <img src={assets.menu_icon} alt="menu" />
                </button>
            </div>




            {/* Mobile Menu */}

            { open && (
                <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] right-4 mt-2 px-5 py-2 flex-col items-end gap-2 bg-white/70 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 rounded-xl shadow-lg backdrop-blur-md text-sm md:hidden z-10`}>


                    <NavLink to='/' onClick={() => setOpen(false)}>Home</NavLink>
                    <NavLink to='/products' onClick={() => setOpen(false)}>All product</NavLink>

                    {user &&
                        <NavLink to='/my-orders' onClick={() => setOpen(false)}>My Orders</NavLink>
                    }
                    <NavLink to='/' onClick={() => setOpen(false)}>Contact</NavLink>

                    {!user ? (
                        <button onClick={() => {
                            setOpen(false);
                            setShowUserLogin(true);
                        }}
                            className="cursor-pointer px-6 py-2 mt-1 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                            Login
                        </button>
                    ) : (
                        <button onClick={logout}
                            className="cursor-pointer px-6 py-2 mt-1 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                            Logout
                        </button>
                    )
                    }

                </div> )
            }


        </nav>


    )
}

export default Navbar;
