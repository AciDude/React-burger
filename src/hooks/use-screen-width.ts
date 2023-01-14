import { useState, useEffect } from 'react'
import { isMobile } from '../utils'

export function useScreenDetails () {
    const [ state, setState] = useState({width: window.screen.width, isMobile: false})
    useEffect(() => {
        const resize = (e: Event) => {
            setState(prev => ({...prev, width:(e.target as Window).screen.width}))
        }
        setState({...state, isMobile: Boolean(isMobile.any())})
        window.addEventListener('resize', resize)
        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [])
    return state
}