import React, { useCallback, useContext, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { PokemonDetails, PokeList } from "../util/pokemon";
import Image from "next/image";
import Link from "next/link";

const Index = ({
    q,
    pokemon: initialPokemon,
}: {
    q: string;
    pokemon: PokeList[];
}) => {
    const [search, setSearch] = useState(q);
    const [pokemon, setPokemon] = useState<PokeList[]>(initialPokemon);

    console.log(pokemon);
    useEffect(() => {
        fetch(`http://localhost:3333/pokemon?q=${search}`)
            .then((res) => res.json())
            .then((data) => {
                setPokemon(data);
            });
    }, [search]);

    const onSetSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value);
        },
        []
    );

    return (
        <div className={styles.container}>
            <input value={search} onChange={onSetSearch} />
            <ul>
                {pokemon.map(({ url, name, types, sprites, id }) => {
                    return (
                        <li key={url}>
                            <Link href={`/pokemon/${id}`}>
                                <div>
                                    <h2>{name}</h2>
                                    <Image
                                        src={sprites.other.home.front_default}
                                        alt={name}
                                        width={100}
                                        height={100}
                                    />
                                    <ul>
                                        {types.map(({ type }) => {
                                            return (
                                                <li key={type.name}>
                                                    {type.name}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export async function getServerSideProps(context: any) {
    let pokemon = [];
    if (context.query.q) {
        const res = await fetch(
            `http://localhost:3333/pokemon?q=${context.query.q}`
        );
        pokemon = await res.json();
    }
    return {
        props: { q: context.query.q ?? "", pokemon },
    };
}

export default Index;
