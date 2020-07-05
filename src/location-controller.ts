import {
	setTruthValues,
	getDefaultValues,
	prepareValuesForLocation,
	normalizeValues
} from './values-controller';
import { parseQuery, stringifyQuery } from './query-parser';

export const calculateLocationPath = (location: any, history: any) => {
	const queryValues = parseQuery(location.search);
	const defaultValues = getDefaultValues();

	const truth = joinValues(defaultValues, queryValues);
	history.replace(
		`${location.pathname}?${stringifyQuery(normalizeValues(truth))}`
	);

	setTruthValues(truth);
};

export const setQueryField = (
	location: any,
	history: any,
	field: string,
	value: any
) => {
	const values = parseQuery(location.search);
	values[field] = value;
	const query = stringifyQuery(values);
	history.replace(`?${query}`);
};

const joinValues = (defaultValues: object, locationQuery: any) => {
	const result = { ...defaultValues };
	Object.keys(locationQuery).forEach((key) => {
		const value = result[key];
		if (value) {
			result[key] = locationQuery[key];
		}
	});

	return prepareValuesForLocation(result, defaultValues);
};