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
				const response = await fetch('https://express-srv.onrender.com/api/sensors',
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + localStorage.getItem('token'),
						}
					}
				);
				
				const sensors = await response.json();
				setSensors(sensors.payload);
			} catch (error) {
				console.error('Error fetching sensors:', error);
			}
		};

		fetchSensors();
	}, []);	

	
	return (
		<div className='container mt-5'>
			<div className="row justify-content-center">
				<h1 className='text-center w-100'>Sensors</h1>
				<table className="table table-striped">
					<thead>
						<tr>
							<th>No.</th>
							<th>EID</th>
							<th>Description</th>
							<th>Model</th>
							<th>Type</th>
							<th>Location</th>
							<th>Calibration Priority</th>
							<th>Manufacturer</th>
						</tr>
					</thead>
					<tbody>
						{localStorage.getItem('token') && sensors.map((sensor, idx) => (
							<tr key={sensor.EID}>
								<td>{idx + 1}</td>
								<td>{sensor.EID}</td>
								<td>{sensor.description}</td>
								<td>{sensor.model}</td>
								<td>{sensor.type}</td>
								<td>{sensor.location}</td>
								<td>{sensor.calibrationPriority}</td>
								<td>{sensor.manufacturer}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
				
		</div>
	)
}

export default Sensors
