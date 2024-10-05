import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { LogInForm } from "../LogInForm/LogInForm"
import { Button, Form } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom";
import { LoggedInContext } from "../../../App";


export interface Inputs {
    username: string
    password: string
}

//named differently because of some internal NavBar error with Bootstrap
export const Login = () => {
   /* const [loggedIn, changeLoggedIn] = useState(()=>{
        const savedState = isLoggedIn() //Need to return bool and not string  
        return savedState;      
    })*/

    const {loggedIn, setLoggedIn} = useOutletContext<LoggedInContext>();

    useEffect(()=> {
        sessionStorage.setItem("isLoggedInKey", loggedIn.state.toString());
    }, [loggedIn])
    
    const [uname, setUName] = useState<string>('')
    const methods = useForm<Inputs>({
        defaultValues: {
            username: '',
            password: '',
        }
    })

    const {handleSubmit, reset} = methods

    const login: SubmitHandler<Inputs> = (data) => {
       // username: data.username
       // password: data.password
        setLoggedIn({state: true});
        setUName(data.username);
        reset();
    }

    const logout = () => {
        setLoggedIn({state:false})
        setUName("")
    }
    

    return(
        <>
            <FormProvider {...methods}>
                <Form onSubmit={handleSubmit(login)}>
                    {!loggedIn.state && (<LogInForm/>)}
                    <p> hello {uname}</p>
                </Form>
                {loggedIn.state && (
                    <Button
                        variant="primary"
                        type = "submit"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            logout();
                        }}>
                        Logout
                    </Button>
                )}
            </FormProvider>
        </>
    )
}