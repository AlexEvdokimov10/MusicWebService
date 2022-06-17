function Header() {
    return (
        <header className="d-flex justify-between align-center p-40">
            <div className="headerLeft">
                <img width={100}  height={60} src="img/musiclab_logo.jpg"/>
                <div>
                    <h3 className="text-uppercase">
                        React music
                    </h3>
                    <p>
                        Best music service
                    </p>
                </div>
            </div>
            <ul className="d-flex">
                <li className="mr-30">
                    <img width={30} height={30} src="img/users.svg"/>
                </li>
                <li>
                    <a>Upload</a>
                </li>
            </ul>
        </header>
    )
}

export default Header