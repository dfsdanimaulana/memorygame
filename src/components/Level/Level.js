import './Level.css'

export default function Level() {
    return (
        <div className='level-grid'>
            <div className='level-card'>
                <img src='/img/cover.jpg' alt='level' />
                <h5>Level 1</h5>
            </div>
            <div className='level-card'>
                <img src='/img/cover.jpg' alt='level' />
                <h5>Level 2</h5>
            </div>
            <div className='level-card'>
                <img src='/img/cover.jpg' alt='level' />
                <h5>Level 3</h5>
            </div>
        </div>
    )
}
