import axios from "axios";
import { Request, Response } from "express";
import { Pokemon, PokemonList } from "../models/pokemon";
import redis from "../utils/redis";

const pokemonEndpoint = (id: any) => `https://pokeapi.co/api/v2/pokemon/${id}`;

export const getList = async (req: Request, res: Response) => {
    //  await redis.del(`pokemon:list`);
    // await redis.del(`pokemon:*`);
    let inCache: any = await redis.get(`pokemon:list`);
    try {
        if (inCache) {
            inCache = JSON.parse(inCache);
            const result = { ...inCache, source: "cache" };

            const filterable = result.results;
            if (req.query.q) {
                let filtered = filterable.filter(({ name }: any) =>
                    name.includes((req.query.q as string) ?? "")
                );
                return res.status(200).json(filtered);
            } else {
                return res.status(200).json(result.results);
            }
        } else {
            const checkTotal = await axios.get(
                "https://pokeapi.co/api/v2/pokemon?limit=1"
            );
            const total = checkTotal.data.count;
            let pokemonList = await axios.get(
                `https://pokeapi.co/api/v2/pokemon?limit=${total - 1}`
            );
            pokemonList.data.results.forEach((value: any) => {
                value.url = value.url.replace(
                    "https://pokeapi.co/api/v2/pokemon",
                    "http://localhost:3333/pokemon"
                );
            });

            for (let i = 0; i < total - 1; i++) {
                setTimeout(function () {}, 500);
                let detailsInCache: any = await redis.get(`pokemon:${i + 1}`);
                if (detailsInCache) {
                    Object.assign(pokemonList.data[i], detailsInCache.data);
                } else {
                    let mergeInfo = await axios.get(pokemonEndpoint(i + 1));
                    mergeInfo = Object.assign(
                        pokemonList.data.results[i],
                        mergeInfo.data
                    );

                    redis.set(
                        `pokemon:${i + 1}`,
                        mergeInfo.data,
                        "EX",
                        3600 * 24 * 7
                    );
                }
            }

            redis.set(
                `pokemon:list`,
                JSON.stringify(pokemonList.data),
                "EX",
                3600 * 24 * 7
            );

            const result = {
                ...pokemonList.data,
                source: "API",
            };
            const filterable = result.results;
            if (req.query.q) {
                let filtered = filterable.filter(({ name }: any) =>
                    name.includes((req.query.q as string) ?? "")
                );
                return res.status(200).json(filtered);
            } else {
                return res.status(200).json(result.results);
            }
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
};

export const getPokemon = async (req: Request, res: Response) => {
    const id = req.params.id;
    const name = req.params.name;
    try {
        let inCache: any = await redis.get(`pokemon:${id || name}`);
        if (inCache) {
            inCache = JSON.parse(inCache);
            const result = { ...inCache, source: "cache" };

            return res.status(200).json(result);
        } else {
            const response = await axios.get(pokemonEndpoint(id || name));
            const evoRes = await axios.get(
                `https://pokeapi.co/api/v2/pokemon-species/${id}`
            );
            const result = {
                ...response.data,
                ...evoRes.data,
                source: "API",
            };
            redis.set(
                `pokemon:${id}`,
                JSON.stringify(result),
                "EX",
                3600 * 24 * 7
            );

            return res.status(200).json(result);
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
};
