import { useState, useCallback } from 'react'

export default function useModalControl(initialState = false) {
  const [modalState, setModalState] = useState({
    isOpen: initialState,
    children: '',
    title: ''
  })

  const openModal = useCallback((children = '', title = '') => {
    setModalState({ isOpen: true, children, title })
  }, [])
  const closeModal = useCallback(() => {
    setModalState({ isOpen: false, children: '', title: '' })
  }, [])
  return [modalState, openModal, closeModal]
}
