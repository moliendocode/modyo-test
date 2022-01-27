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
                {pokemon.map(({ url, name, types, sprite, abilities, id }) => {
                    return (
                        <li key={id}>
                            <Link href={`/pokemon/${id}`}>
                                <div>
                                    <h2>{name.toLocaleUpperCase()}</h2>
                                    <img
                                        src={sprite}
                                        alt={name}
                                        width={200}
                                        height={200}
                                    />
                                    <ul>
                                        Type:{" "}
                                        {types.map((type) => {
                                            return <li key={url}>{type}</li>;
                                        })}
                                    </ul>
                                    <ul>
                                        Abilities:{" "}
                                        {abilities.map((ability) => {
                                            return <li key={url}>{ability}</li>;
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
            `http://localhost:3333/pokemon?q=${context.query.q}&limit=12`
        );
        pokemon = await res.json();
    }
    return {
        props: { q: context.query.q ?? "", pokemon },
    };
}

export default Index;
