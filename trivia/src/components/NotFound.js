import { Link } from "react-router-dom";
import home from "./home.png"
export default function NotFound() {
    return (
        <div>
            <h1 className="homeHeadline">World Trivia</h1>
            <h3> Page doesn't exists </h3>
            <div>
                <i className="fa fa-arrow-right fa-2x" aria-hidden="true"></i>
                <Link
                to={{ pathname: '/' }}>
                <img src={home}></img><br/></Link>
            </div>
            
        </div>
    )
}