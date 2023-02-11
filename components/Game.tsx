import {useEffect, useState} from "react";
import emojis from "../lib/emoji";
import {randomElementFromArray} from "../lib/arrayUtils";
import funkyEmojis from "../lib/funkyEmojis";

const FunkyButton = ({label, color, onClick}: {label: string, color: string, onClick: any}) => {
    return <button onClick={onClick} style={{backgroundColor: color, padding: "1rem", border: "none", margin: "1rem", cursor: "pointer"}}>{label}</button>
}

const FunkyScore = ({score, color}: {score: number, color: string}) => {
    return <div style={{width: "4rem", height: "4rem", backgroundColor: color, margin: "1rem", display: "flex", justifyContent: "center", alignItems: "center"}}><h1>{score}</h1></div>
}

const FunkyEmoji = ({custom, emoji}: {custom: boolean, emoji: string}) => {
    if (custom) {
        return <img src={emoji} alt={"custom emoji failed :((((("}/>
    }
    return <p style={{fontSize: 200, margin: 0}}>{emoji}</p>

}

function Game() {
    const [points, setPoints] = useState(0)
    const [skips, setSkips] = useState(0)
    const [currentEmoji, setCurrentEmoji] = useState({});
    const [currentFunky, setCurrentFunky] = useState({});
    const [isFunky, setIsFunky] = useState(true);
    const [random, setRandom] = useState(0.3);

    const reset = () => {
        setPoints(0);
        setSkips(0);
        setCurrentEmoji("")
    }

    const loadNextEmoji = () => {
        setIsFunky(Math.random() < random);
        setCurrentEmoji(randomElementFromArray(emojis))
        setCurrentFunky(randomElementFromArray(funkyEmojis))
    }
    useEffect(() => {
        loadNextEmoji()
    }, [])

    return <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
        <div style={{display: "flex"}}>
            <FunkyScore score={skips} color={"red"}/>
            <FunkyScore score={points} color={"green"}/>
        </div>
        <FunkyEmoji custom={isFunky} emoji={isFunky ? currentFunky.emoji : currentEmoji.emoji}/>
        <h1>{isFunky ? currentFunky.description : currentEmoji.description}</h1>
        <div style={{position: "absolute", bottom: 10}}>
            <div style={{display: "flex", flexDirection: "column"}}>
                <span>% Custom emojis</span>
                <input onChange={(e) => {
                    e.preventDefault()
                    setRandom(Number(e.target.value));
                }
                } type="text"
                       placeholder="0=none, 0.4=40%, 1=all"
                       style={{padding: ".3rem"}}
                />
            </div>
            <FunkyButton onClick={() => {
                reset()
            }
            }
                         color="orange"
                         label="Reset"
            />
            <FunkyButton onClick={() => {
                loadNextEmoji()
                setSkips(skips + 1)
            }
            }
                         color="red"
                         label="Skip"
            />
            <FunkyButton onClick={() => {
                loadNextEmoji()
                setPoints(points + 1)
            }
            }
                         color="green"
                         label="Success"

            />
        </div>
    </div>
}

export default Game;
