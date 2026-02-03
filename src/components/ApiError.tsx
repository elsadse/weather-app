import type { JSX } from "react"
import ErrorIcon from "@/assets/images/icon-error.svg"
import RetryIcon from "@/assets/images/icon-retry.svg"
import { useGlobalStore } from "@/hooks/useGlobalStore"
import { useShallow } from "zustand/react/shallow"

export function ApiError(): JSX.Element {
    const { setError } = useGlobalStore(
        useShallow((store) => ({
            setError: store.setError,
        }))
    )

    function retry() {
        setError(null)
    }

    return (
        <div className="flex flex-col gap-y-6 pt-10 justify-center items-center">
            <img src={ErrorIcon} alt="Error Icon" className="w-10.5 h-auto" />
            <p className="text-preset-2 text-center">Something went wrong!</p>
            <p className="text-preset-5 md:w-138.5 text-center">We couldn't connect to the server (API Error). Please try again in a few minutes.</p>
            <button onClick={retry} className="flex flex-row w-24.5 h-10.75 gap-x-2.5 px-4 py-3 bg-neutral-800 rounded-6 cursor-pointer">
                <img src={RetryIcon} alt="Retry Icon" className="w-6 h-auto" />
                <p className="text-preset-7 md:text-preset-6">Retry</p>
            </button>
        </div>
    )
}