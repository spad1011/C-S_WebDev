import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { LogInFormmm } from "./LogInForm/LogInForm"
import { Form } from "react-bootstrap"
import { useEffect, useState } from "react"

export interface Inputs {
    username: string
    password: string
}

export const LogInnn = () => {
    const [state, changeState] = useState(()=>{
        const savedState = sessionStorage.getItem("savedValueKey")
        return savedState === 'true' //Need to return bool and not string    
    })

    useEffect(()=> {
        sessionStorage.setItem("savedValueKey", state.toString());
    }, [state])
    
    const [uname, setUName] = useState<string>('')
    const methods = useForm<Inputs>({
        defaultValues: {
            username: '',
            password: '',
        }
    })

    const {handleSubmit} = methods

    const login: SubmitHandler<Inputs> = (data) => {
       // username: data.username
       // password: data.password
        changeState(true)
        setUName(data.username)
    }

    return(
        <>
            <FormProvider {...methods}>
                <Form onSubmit={handleSubmit(login)}>
                    {!state && (<LogInFormmm/>)}
                    <p> hello {uname}</p>
                </Form>
            </FormProvider>
        </>
    )
}