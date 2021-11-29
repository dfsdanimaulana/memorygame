import { useState, useEffect } from 'react'
import axios from 'axios'

export const useFetch = (url, trigger) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        const fetchData = async () => {
            setIsPending(true)

            try {
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
    }, [url, trigger])

    return { data, isPending, error }
}
