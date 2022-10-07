import { useState, useCallback } from 'react'

export default function useModalControl(initialState = false) {
    const [modalState, setmodalState] =
        useState({ isOpen: initialState, children: '', title: '' })

    const openModal = useCallback((children = '', title = '') => {
        setmodalState({ isOpen: true, children, title })
    }, [])
    const closeModal = useCallback(() => {
        setmodalState({ isOpen: false, children: '', title: '' })
    }, [])
    return [modalState, openModal, closeModal]
}