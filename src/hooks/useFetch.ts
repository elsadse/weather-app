import type { Nullable, Result } from "@/types"
import { type Dispatch, type SetStateAction, useEffect, useState } from "react"

export function useFetch<T, U>(
    apiCallFunction: (fetchParameter: T, signal: AbortSignal) => Promise<Result<U>>
): {
    fetchedData: Nullable<U>,
    setFetchedData: Dispatch<SetStateAction<Nullable<U>>>,
    isLoading: boolean,
    error: Nullable<Error>,
    setError: Dispatch<SetStateAction<Nullable<Error>>>
    fetchParameter: Nullable<T>,
    setFetchParameter: Dispatch<SetStateAction<Nullable<T>>>
} {
    const [fetchParameter, setFetchParameter] = useState<Nullable<T>>(null)
    const [fetchedData, setFetchedData] = useState<Nullable<U>>(null)
    const [error, setError] = useState<Nullable<Error>>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if (fetchParameter === null) return

        const abortController = new AbortController()
        const signal = abortController.signal

        const timer = setTimeout(() => {
            setIsLoading(true)

            apiCallFunction(fetchParameter, signal)
                .then((result: Result<U>): void => {
                    if (!signal.aborted && result.success) setFetchedData(result.data)
                    if (!signal.aborted && !result.success) setError(result.error)
                })
                .catch((error) => {
                    if (!signal.aborted) setError(error)
                })
                .finally(() => {
                    if (!signal.aborted) setIsLoading(false)
                })
        }, 500)

        return () => {
            abortController.abort()
            clearTimeout(timer)
        }
    }, [apiCallFunction, fetchParameter])

    return { fetchedData, setFetchedData, isLoading, error, setError, fetchParameter, setFetchParameter }
}