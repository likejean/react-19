import React, { useEffect, useState } from 'react'
import Hooks from './Hooks';

interface Calibation {
	_id: number;
	adjustmentsMade: string;
	calibrationExtended: boolean;
	calibrationName: string;
	calibrationRangePecent: number;
	comment: string;
	createdAt: string;
	dueCalibrationDate: string;
	lastCalibrationDate: string;
	maxCalibrationExtension: string;
	proceudreId: string;
	sensorId: string;
}
interface Sensor {
	_id: number;
	EID: string;
	calibratedBy: string;
	calibrationFrequency: string;
	calibrationPriority: string;
	calibrations: [Calibation];
	capacityRange: string;
	comment: string;
	createdAt: string;
	description: string;
	location: string;
	model: string;
	manufacturer: string;
	type: string;
	request: {
		type: string;
		url: string;
	}
}

const Sensors = () => {
	
	const [sensors, setSensors] = useState<Sensor[]>([]);

	useEffect(() => {
		const fetchSensors = async () => {
			try {
				const response = await fetch('https://express-srv.onrender.com/api/datasets');
				//setSensors(response.data);
				const sensors = await response.json();
				console.log(sensors);
			} catch (error) {
				console.error('Error fetching sensors:', error);
			}
		};

		fetchSensors();
	}, []);	

	
	return (
		<div>
			<h1>Sensors</h1>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Type</th>
						<th>Location</th>
						<th>Status</th>
						<th>Last Updated</th>
					</tr>
				</thead>
				<tbody>
					{sensors.map((sensor) => (
						<tr key={sensor.id}>
							<td>{sensor.id}</td>
							<td>{sensor.name}</td>
							<td>{sensor.type}</td>
							<td>{sensor.location}</td>
							<td>{sensor.status}</td>
							<td>{sensor.lastUpdated}</td>
						</tr>
					))}
				</tbody>
			</table>	
		</div>
	)
}

export default Sensors
