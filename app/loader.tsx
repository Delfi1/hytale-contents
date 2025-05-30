'use client'

export default function Loader({loading}: {loading: boolean}) {

    if (loading) {
        return (<span className="loader"></span>)
    } else {
        return (<></>)
    }
}