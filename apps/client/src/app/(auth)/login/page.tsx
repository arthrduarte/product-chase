"use client"
import { LogIn } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { permanentRedirect } from 'next/navigation'
import useToken from '@/hooks/useToken'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setToken } = useToken()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()
    if (data) {
      if (data.error) return alert(data.error)
      setToken(data.accessToken)
    }

  }
  return (
    <div className='flex justify-center'>
      <div className=''>
        <div>
          <LogIn />
          <h1>Log in to 🏹 Product Chase</h1>
        </div>
        <div>
          <form action="post" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" name="email" placeholder="Email" required onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
    </div>
  )
}