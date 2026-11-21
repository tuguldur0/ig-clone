"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabaseClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const Signup = () => {
    const supabase = supabaseClient();
    const [info, setInfo] = useState({email: '', password: '', username: ''});
    const router = useRouter();

    const handleUserInfo = (event, type) => {
        if(type === 'email'){
            setInfo({...info, email: event.target.value})
        }
        if(type === 'password'){
            setInfo({...info, password: event.target.value})
        }
        if(type === 'username'){
            setInfo({...info, username: event.target.value})
        }
    }
    
    const Handlesignup = async () => {
        const {data, error} = await supabase.auth.signUp({
            email: info.email,
            password: info.password,
        });
        console.log("data", data);
        console.log("error", error);

        const userid = results.data.user.id;

        const {error : profileError} = await supabase.from("profile").insert({
            id: data.user.id,
            username: info.username,
        })
        console.log("profileError: ", profileError);

    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
            <div className="w-full max-w-sm rounded-xl border bg-background p-8 shadow-sm">
                <div className="mb-6 space-y-1.5 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Create an account
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email and a password to get started.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium leading-none">
                            Email
                        </label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            onChange={(e) => handleUserInfo(e, "email")}
                            value={info.email}
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium leading-none">
                            Password
                        </label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            onChange={(e) => handleUserInfo(e, "password")}
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="username" className="text-sm font-medium leading-none">
                            Username
                        </label>
                        <Input
                            id="username"
                            name="username"
                            type="username"
                            autoComplete="username"
                            onChange={(e) => handleUserInfo(e, 'username')}
                            value={info.username}
                            placeholder="@username"
                        />
                    </div>

                    <Button onClick={Handlesignup} className="w-full">
                        Sign up
                    </Button>
                </div>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Button variant="link" className="h-auto p-0 font-medium" onClick={() => router.push("/login")}>
                        Log in
                    </Button>
                </p>
            </div>
        </div>
    )
}

export default Signup;