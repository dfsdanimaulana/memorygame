import './SingleCards.css'

export default function SingleCards({ card, handleChoice }) {
    const handleClick = () => {
        handleChoice(card)
    }
    return (
        <div className='card'>
            <img src={card.src} alt='front' className='front' />
            <img
                src='/img/cover.png'
                onClick={handleClick}
                alt='back'
                className='back'
            />
        </div>
    )
}
