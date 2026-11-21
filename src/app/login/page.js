"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabaseClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
    const supabase = supabaseClient();
    const router = useRouter();
    const [info, setInfo] = useState({email: '', password: ''});

    const handleUserInfo = (event, type) => {
        if(type === 'email'){
            setInfo({...info, email: event.target.value})
        }
        if(type === 'password'){
            setInfo({...info, password: event.target.value})
        }
    }

    const Handlesignup = async () => {
        const results = await supabase.auth.signInWithPassword({
            email: info.email,
            password: info.password,
        })
        if(results.data){
            router.push('/home');
        }
        console.log("results: ", results)
    }
    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
            <div className="w-full max-w-sm rounded-xl border bg-background p-8 shadow-sm">
                <div className="mb-6 space-y-1.5 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Welcome back
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email and password to log in.
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
                            autoComplete="current-password"
                            onChange={(e) => handleUserInfo(e, "password")}
                            placeholder="••••••••"
                        />
                    </div>

                    <Button onClick={() => Handlesignup()} className="w-full">
                        Log in
                    </Button>
                </div>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Button
                        onClick={() => router.push('/signup')}
                        variant="link"
                        className="h-auto p-0 font-medium"
                    >
                        Create account
                    </Button>
                </p>
            </div>
        </div>
    )
}
export default Page;