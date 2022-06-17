import Header from "../header/Header";
import Card from "../card/Card";
import "./Body.scss"

function Body(){
    return(
        <div className="body wrapper clear">
            <Header/>
            <div className="content p40">
                <div className="d-flex align-center mb-40">
                    <h1>All Music</h1>
                    <div className="search-block ml-30 d-flex">
                        <img width={20} height={20} src="img/union.svg" alt="Search"/>
                        <input placeholder="Search"/>
                    </div>
                </div>
                <h1>Group Skillet</h1>
                <div className="d-flex">
                    <Card />
                </div>
            </div>
        </div>
    );
}

export default Body