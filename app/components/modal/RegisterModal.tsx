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



const RegisterModal = () => {
    const router = useRouter()
    const registerModal = useRegister()
    const loginModal = useLogin()
    const [isLoading , setIsLoading] = useState(false)

    const {
        register , handleSubmit , formState: {errors}
    } = useForm<FieldValues>({
        defaultValues: {
            name : '',
             email: "",
             password: ""
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async(
        data
    ) => {
        setIsLoading(true)
        try {
            await axios.post('/api/register' , data)

            
            registerModal.onClose()
            toast.success("Account created successfully")
            loginModal.onOpen()
            // router.push('/login')
        } catch (error) {
            console.log('the reror is ' , error)
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
            id='name'
            label='Name'
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
            
            />
            <div className="text-neutral-500
            text-center mt-4 font-light
            ">
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div>
                        Already Have an Account?
                    </div>
                    <div
                    className='cursor-pointer text-neutral-800 
                    hover:underline'
                    onClick={()=>{
                        registerModal.onClose()
                        loginModal.onOpen()
                    }}                    >
                        Login
                    </div>
                </div>
            </div>
        </div>

    )
  return (
   <Modal
   disabled={isLoading}
   isOpen={registerModal.isOpen}
   title='Register'
   actionLabel='Continue'
   onClose={registerModal.onClose}
   onSubmit={handleSubmit(onSubmit)}
   body={bodyContent}
   footer={footerContent}
   />
  )
}

export default RegisterModal
