import { ABILITY_SCORE_INDICES, API_URL_START } from "./consts";

export interface SkillJSON {
	index: string;
	name: string;
	url: string;
}

export interface AbilityScoreJSON {
	index: string;
	name: string;
	full_name: string;
	desc: string[];
	skills: SkillJSON[];
	url: string;
}

export async function getAbilityScores() {
	let jsonResults:AbilityScoreJSON[] = [];
	await Promise.all(ABILITY_SCORE_INDICES.map(async index => {
		const dataSource = `${API_URL_START}/ability-scores/${index}`;
		return await (await fetch(dataSource)).json();
	})).then(data =>
		// make sure they are displayed in the correct order
		data.map((datum:AbilityScoreJSON) => jsonResults.push(datum)));
	return jsonResults;
}