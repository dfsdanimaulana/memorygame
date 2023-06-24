import './Modal.css'

export default function Modal({ children, handleModal }) {
    return (
        <div className="modal-backdrop">
            <div className="modal">
                <button className="close-modal" onClick={handleModal}>
                    x
                </button>
                {children}
            </div>
        </div>
    )
}
