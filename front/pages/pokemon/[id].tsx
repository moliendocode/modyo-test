import axios from "axios";
import Image from "next/image";

const getPokemon = async (id: any, name: any) => {
    const { data } = await axios.get(`http://localhost:3333/pokemon/${id}`);
    console.log(data);
    return data;
};

const Details = ({ data }: { data: any }) => {
    return (
        <div>
            <h1>{data.name}</h1>
            <Image
                src={data.sprites.other.home.front_default}
                width={320}
                height={320}
                alt={data.name}
            />
            <ul>
                {data.types.map(({ type }: { type: any }) => {
                    return <li key={type.name}>{type.name}</li>;
                })}
            </ul>
            <p>{data.weight / 10}kg</p>
            <ul>
                {data.abilities.map(({ ability }: { ability: any }) => {
                    return <li key={ability.name}>{ability.name}</li>;
                })}
            </ul>
            <ul>
                {data.evolves_from_species && (
                    <li>
                        <p>Evolves from:</p>
                        <p>{data.evolves_from_species.name}</p>
                    </li>
                )}
            </ul>
        </div>
    );
};

export async function getServerSideProps(context: any) {
    const data = await getPokemon(context.params.id, null);
    return {
        props: {
            data: data,
        },
    };
}

export default Details;
