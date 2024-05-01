'use client'

import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'

export default function Home() {
    const [text, setText] = useState('')

    const [isClient, setClient] = useState(false)

    useEffect(() => {
        setClient(true)
    }, [])

    useEffect(() => {
        async function getWordFromBackend() {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE}/world`,
                {
                    cache: 'no-store',
                    credentials: 'include',
                }
            )

            const text = await response.text()
            setText(text)
        }
        getWordFromBackend()
    }, [])

    return (
        <div className="flex items-center justify-center gap-5">
            <h1 className="text-6xl text-center">Hello</h1>
            <h1 className="text-6xl text-center">{text}</h1>
            <h1 className="text-6xl text-center">
                {isClient && getCookie('token')}
            </h1>
        </div>
    )
}
