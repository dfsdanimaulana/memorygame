import './SingleCards.css'

export default function SingleCards({ card, handleChoice, flipped, disabled }) {
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return (
        <div className='card'>
            <div className={flipped ? 'flipped' : ''}>
                <img src={card.src} alt='front' className='front' />
                <img
                    src='/img/cover.jpg'
                    onClick={handleClick}
                    alt='back'
                    className='back'
                />
            </div>
        </div>
    )
}
