function Card() {
    return (
    <div className="card ml-10 ">
        <div>
            <div>
            <span>
                Monster
            </span>
            </div>
            <div className="card-background br-radius">
                <button className="mt-30">
                    <img className="br-radius m-5" width={142} height={142} src="img/monster.jpg" alt=""/>
                </button>
                <div className="unliked">
                    <img width={20} height={20} src="/img/unliked.svg" alt="unliked"/>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Card;