import "../styles/Header.css"

export default function Header({ score, highScore }) {
    return <header>
        <h1>Memory Cards w/ Pokemon API</h1>
        <div>
            <h2>Score: {score}/10</h2>
            <h2>High Score: {highScore}/10</h2>
        </div>
    </header>
}