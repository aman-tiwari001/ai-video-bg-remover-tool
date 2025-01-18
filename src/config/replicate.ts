export const submitVideoToReplicate = async (
	inputVideoUrl: string,
	outputType: string
) => {
  console.log('inputVideoUrl-> ', inputVideoUrl, 'outputType-> ', outputType);
	const response = await fetch('https://api.replicate.com/v1/predictions', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
			'Content-Type': 'application/json',
			Prefer: 'wait',
		},
		body: JSON.stringify({
			version:
				'73d2128a371922d5d1abf0712a1d974be0e4e2358cc1218e4e34714767232bac',
			input: {
				input_video: inputVideoUrl,
			},
			// output_type: outputType,
			webhook:
				'https://ai-video-bg-remover-tool.vercel.app/api/webhooks/replicate',
			webhook_events_filter: ['completed'],
		}),
	});
	const data = await response.json();
	return data;
};
