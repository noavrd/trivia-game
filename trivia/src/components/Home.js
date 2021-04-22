import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [userName, setUserName] = useState("");
    return (
        <div className="home">
            <h1 className="homeHeadline">
            World Trivia
            </h1>
            <form>
                {/* <label>User Name</label><br/> */}
                <input placeholder="Enter user name"></input><br/>
                <Link
                to= {{pathname: '/game'}}>
                    <button className="start-btn">START</button>
                </Link> 
            </form>
            <Link
            to= {{pathname: '/leaderboard'}}>
                <button className="leaderboard-btn">Leader Board</button>
            </Link>
        </div>
    )
}