import { useEffect, useState } from "react"
import "../styles/Main.css"

export default function Main({ score, resetGame, highScore, setScore, setHighScore, setReset }) {
    const [cards, setCards] = useState([]);

    // Generate 10 cards with api images
    // useEffect shuffles them on start and everytime you click on one (score change?)
    // If clicked on card with clicked=true, game over, set high score, reset score
    // Else score++ and shuffle

    const fetchItem = async (id) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const {name, sprites} = await res.json();
        const sprite = sprites.front_default;
        const clicked = false;
        return { id, name, sprite, clicked }
    }

    const fetchAll = async (count) => {
        const pokemons = [];
        const idBuffer = [];
        let i = 0;
        let randomId = 0;
        while (i < count) {
            randomId = Math.floor(Math.random() * 1001);
            if (!idBuffer.includes(randomId)) {
                idBuffer.push(randomId);
                pokemons.push(randomId);
                i++;
            }
        }
        return await Promise.all(pokemons.map(fetchItem)); // crazy stuff
    }

    const onCardClick = (id) => {
        const item = cards.find(item => item.id == id);
        if (item.clicked) {
            if (highScore < score)
                setHighScore(score);
            setReset(!resetGame)
            setScore(0);
        }
        else {
            item.clicked = true;
            setScore(score => score + 1);
        }
    }

    useEffect(() => {
        fetchAll(10)
        .then(res => setCards(res));
    }, [resetGame])

    useEffect(() => {
        const temp = [...cards];
        for (let i = temp.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [temp[i], temp[j]] = [temp[j], temp[i]];
        }
        setCards(temp);
        if (score == 10) {
            setHighScore(10);
            setReset(!resetGame)
            setScore(0);
        }
    }, [score])

    return <>
        <main>
            <div className="card-grid">
                {
                    cards.map((item) => {
                        return <div className="card" key={item.id} onClick={() => onCardClick(item.id)}>
                            <img src={item.sprite} alt={item.name} />
                            <h2>{item.name.split("-")[0]}</h2>
                        </div>
                    })
                }
            </div>
        </main>
        <footer>
            <p>
                Tips: <br></br>To win the game, you need to click on each card once. <br></br>If you click on something twice - you loose, and game restarts. <br></br>Cards are shuffled after each click!
            </p>
        </footer>
    </>
}