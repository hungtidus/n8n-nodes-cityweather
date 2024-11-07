import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class CityWeather implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'City Weather',
		name: 'CityWeather',
		icon: 'file:openweather.svg',
		group: ['transform'],
		version: 1,
		subtitle: 'Get City Weather',
		description: 'Get data from OpenWeatherMap API',
		defaults: {
				name: 'City Weather default',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
				{
						name: 'CityWeatherApi',
						required: true,
				},
		],
		requestDefaults: {
				baseURL: 'https://api.openweathermap.org/data/2.5/weather',
				headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
				},
		},

		// Required fields
		properties: [
			{
				displayName: 'City',
				name: 'cityName',
				type: 'string',
				default: '',
				placeholder: 'Honolulu',
				required: true,
				description: 'The name of the city to return the weather of',
				routing: {
					request: {
						// method: 'GET',
						// url: '=?q={{$value}}',
						qs: {
							q: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Format',
				name: 'format',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Imperial',
						value: 'imperial',
						description: 'Fahrenheit | miles/hour',
					},
					{
						name: 'Metric',
						value: 'metric',
						description: 'Celsius | meter/sec',
					},
					{
						name: 'Scientific',
						value: 'standard',
						description: 'Kelvin | meter/sec',
					},
				],
				default: 'metric',
				description: 'The format in which format the data should be returned',
				routing: {
					request: {
						qs: {
							units: '={{$value}}',
						},
					},
				},
			},

			// Optional/additional fields
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				default: {},
				placeholder: 'Add Field',
				options: [
					{
						displayName: 'Language',
						name: 'language',
						type: 'string',
						default: '',
						placeholder: 'en',
						description: 'The two letter language code to get your output in (eg. en, de, ...).',
						routing: {
							request: {
								qs: {
									lang: '={{$value}}',
								},
							},
						},
					},
				],
			},
		],
	};
}
