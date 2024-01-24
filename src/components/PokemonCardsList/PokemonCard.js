const PokemonCard = ({
                         name,
                         pokeapiURL
                     }) => {
    const handleCardClick = () => {
        console.log(2)
    }

    return (
        <div
            className="card_container"
            tabIndex={1}
            onClick={handleCardClick}
        >
            <img src="#" alt="Pokemon sprite" className="card_image"/>
            <h2 className="card_title">{name}</h2>
            <div className="types_container">
                <div className="type_badge">
                    <div className="type"><span>type 1</span></div>
                </div>
                <div className="type_badge">
                    <div className="type"><span>type 2</span></div>
                </div>
            </div>
        </div>
    );
}

export default PokemonCard;