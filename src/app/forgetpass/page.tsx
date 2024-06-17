'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation'

import { Staatliches as Staat } from "next/font/google";
import { Inter } from "next/font/google";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { z } from "zod"

import { Button } from "@/components/ui/button"
import { FormEvent } from 'react';
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils"

const f = Staat({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: '400',
})

const fm = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
})


export default function Login() {
  const router = useRouter()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
 
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
 
    if (response.ok) {
      router.push('/profile')
    } else {
      // Handle errors
    }
  }

  return (
    <Card className='mx-auto px-16 py-3 bg-background border border-0 w-96'>
      <CardHeader className="foreground">
        <CardTitle className={cn(f.variable, "font-sans text-amber-400 text-center text-5xl")}>
          FORGET PASSWORD
        </CardTitle>
      </CardHeader>
      <CardContent>
          <form className="grid justify-center" onSubmit={handleSubmit}>
            <input className="rounded-md focus:ring-0 px-3 py-3 mb-5 w-full text-sm" type="email" name="email" placeholder="Please enter your email" required />
            <button className="rounded-md bg-amber-400 text-black text-center just-center px-2 py-3 border border-black mb-5" type="submit">Submit</button>
            <a href='' className="text-white text-center">Back to Login</a>
          </form>
      </CardContent>
    </Card>
  );
}