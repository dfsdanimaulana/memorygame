import { useState, useEffect } from 'react'
import axios from 'axios'

export const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        const fetchData = async () => {
            setIsPending(true)

            try {
                // const res = await fetch(url, { signal: controller.signal })
                // if (!res.ok) {
                //     throw new Error(res.statusText)
                // }
                // const data = await res.json()

                const res = await axios.get(url, { signal: controller.signal })

                console.log(res)

                setIsPending(false)
                setData(res.data)
                setError(null)
            } catch (err) {
                if (err.name === 'AbortError') {
                    console.log('the fetch was aborted')
                } else {
                    setIsPending(false)
                    setError('Could not fetch the data')
                }
            }
        }

        fetchData()

        return () => {
            controller.abort()
        }
    }, [url])

    return { data, isPending, error }
}
