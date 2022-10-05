import {useState} from 'react'

export default function useSwitchModal(initialState = false) {
    const [isModalShowed, setIsModalShowed] = useState(initialState)
    const openModal = () => setIsModalShowed(true)
    const closeModal = () => setIsModalShowed(false)
    return [isModalShowed, openModal, closeModal]
}