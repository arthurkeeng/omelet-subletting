'use client'

import  axios from 'axios'
import {  useState } from 'react'
import {FieldValues , SubmitHandler , useForm} from 'react-hook-form'
import useRegister from '@/app/hooks/useRegister'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import toast from 'react-hot-toast'
import Button from '../Button'
import { FcGoogle } from 'react-icons/fc'
import {useRouter } from 'next/navigation'
import useLogin from '@/app/hooks/useLogin'
import { useAuthentication } from '@/app/actions/authContext'



const LoginModal = () => {
    const router = useRouter()
    const registerModal = useRegister()
    const loginModal = useLogin()
    const [isLoading , setIsLoading] = useState(false)
    const {setIsAuthenticated} = useAuthentication()

    const {
        register , handleSubmit , formState: {errors}
    } = useForm<FieldValues>({
        defaultValues: {
             email: "",
             password: ""
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async(
        data
    ) => {
        setIsLoading(true)
        try {
        
            await axios.post('/api/login' , data)

            loginModal.onClose()
            toast.success("Login Successful")
            setIsAuthenticated(true)
            router.push('/')
        } catch (error) {
            toast.error("Something Went Wrong")
        }
        finally{
            setIsLoading(false)
        }
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
            title='Welcome to Omeenee Realty'
            subtitle='Create An Account'
            />
            <Input
            id='email'
            label='Email'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            />
            
            <Input
            id='password'
            label='Password'
            type='password'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            />
            
        </div>
    )

    const footerContent =(
        <div className='flex flex-col gap-4 mt-3'>
            <hr/>
            <Button
            outline
            label='Continue with Google'
            icon={FcGoogle}
            onClick={()=>{}}
            href={true}
            
            />
            <div className="text-neutral-500
            text-center mt-4 font-light
            ">
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div>
                        Don&#39;t Have an Account?
                    </div>
                    <div
                    className='cursor-pointer text-neutral-800 
                    hover:underline'
                    onClick={()=>{
                        registerModal.onOpen()
                        loginModal.onClose()
                    }}
                    >
                        Register
                    </div>
                </div>
            </div>
        </div>

    )
  return (
   <Modal
   disabled={isLoading}
   isOpen={loginModal.isOpen}
   title='Login'
   actionLabel='Continue'
   onClose={loginModal.onClose}
   onSubmit={handleSubmit(onSubmit)}
   body={bodyContent}
   footer={footerContent}
   />
  )
}

export default LoginModal
