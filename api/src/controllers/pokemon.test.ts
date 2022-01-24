import { getList, getPokemon } from "./pokemon";
import { pokeListMock } from "../mock/pokeList";
import axios from "axios";
import { Request, Response } from "express";
/*
global.fetch = jest.fn(() => {
    json: () => Promise.resolve({ data: { results: [{ name: "bulbasaur" }] } });
});

beforeEach(() => {
    jest.clearAllMocks();
});

it("Get the list of pokemons", async () => {
    const res = await getList;
    expect(res.data.results.length).toBeGreaterThan(0);
});

it("handles exception with null", async () => {
    fetch.mockImplementationOnce(() => Promise.reject("API FAILURE"));

    const res = await getList;

    expect(res).toEqual(null);
    expect(fetch).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/pokemon?limit=0"
    );
});
 */

describe("Get the list of pokemons", () => {
    test("Returns with Pokemons", async () => {
        const req = {};
        const res = {};

        await getList(req as Request, res as Response);

        expect(res).toContain(pokeListMock);
    });
});
