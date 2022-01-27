import axios from "axios";
import { Request, Response } from "express";
import { Pokemon, PokemonList } from "../models/pokemon";
import redis from "../utils/redis";

export const apiCalls = async ({
    id,
    limit,
    offset,
}: {
    id?: number;
    limit?: number;
    offset?: number;
}) => {
    if (id) {
        return await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    }

    if (limit || offset) {
        return await axios.get(
            `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
    }
};

export const getList = async (req: Request, res: Response) => {
    let inCache: any = await redis.get(`pokemon:list`);

    try {
        if (inCache) {
            const page = req.query.page || 1;
            const limit = req.query.limit || inCache.length;

            const startIndex = (+page - 1) * +limit;
            const endIndex = +page * +limit;
            inCache = JSON.parse(inCache);

            const resultPages = (input: any) => {
                if (endIndex < input.length) {
                    input.next = {
                        page: +page + 1,
                        limit: limit,
                    };
                }
                if (startIndex > 0) {
                    input.previous = {
                        page: +page - 1,
                        limit: limit,
                    };
                }
                input.results = input.slice(startIndex, endIndex);
                return input.slice(startIndex, endIndex);
            };

            const result = { ...inCache, source: "cache" };

            const filterable = result.results;
            if (req.query.q) {
                let filtered = filterable.filter(({ name }: any) =>
                    name.includes((req.query.q as string) ?? "")
                );
                return res.status(200).json(filtered);
            } else {
                return res.status(200).json(resultPages(result.results));
            }
        } else {
            const checkTotal = await axios.get(
                "https://pokeapi.co/api/v2/pokemon?limit=1"
            );
            const total = checkTotal.data.count - 500;
            let pokemonList = await apiCalls({ limit: total });

            await pokemonList?.data.results.forEach((value: any) => {
                value.url = value.url.replace(
                    "https://pokeapi.co/api/v2/pokemon",
                    "http://localhost:3333/pokemon"
                );
            });

            await pokemonList?.data.results.forEach((value: any) => {
                value.sprite = "";
                value.types = [];
                value.weight = "";
                value.abilities = [];
                value.id = "";
            });

            await pokemonList?.data.results.forEach(async (value: any) => {
                const { data } = await axios.get(value.url);

                value.sprite = data.sprites.front_default;

                value.types = data.types.map(({ type }: any) => type.name);

                value.weight = data.weight;
                value.id = +data.id;

                value.abilities = data.abilities.map(
                    ({ ability }: any) => ability.name
                );

                redis.set(
                    `pokemon:list`,
                    JSON.stringify(pokemonList?.data),
                    "EX",
                    3600 * 24 * 7
                );
            });

            let modified: any = await redis.get(`pokemon:list`);

            modified = await JSON.parse(modified);

            const result = { ...modified, source: "API" };

            const filterable = result.results;
            if (req.query.q) {
                let filtered = filterable.filter(({ name }: any) =>
                    name.includes((req.query.q as string) ?? "")
                );
                return res.status(200).json(filtered);
            } else {
                return res.status(200).json(pokemonList?.data.results);
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
            const response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${id}`
            );
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
