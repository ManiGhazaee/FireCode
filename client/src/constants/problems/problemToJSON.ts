import { DescriptionData } from "../../components/ProblemDescription";

export async function getProblem(fileName: string) {
    try {
        const data = await fetch(`${fileName}.json`);
        const res = await data.json();
        return res;
    } catch (e) {
        console.error(e);
    }
}
