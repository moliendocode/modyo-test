import axios from "axios";
import { apiCalls } from "./pokemon";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.get.mockResolvedValue({
    data: { results: [{ name: "bulbasaur" }, { name: "ivysaur" }] },
});

describe("Pokemon Controller", () => {
    afterEach(jest.clearAllMocks);
    afterEach((done) => {
        done();
    });

    test("Should return a list of pokemons", async () => {
        const result = await apiCalls({ limit: 1 });
        expect(result!.data.results[0].name).toBe("bulbasaur");
        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });
});
