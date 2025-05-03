import React, { useEffect, useState } from 'react'
import { CiSettings } from "react-icons/ci";
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';


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
	_id: string;
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

const token = localStorage.getItem("token");

const Sensors = () => {

	const [sensors, setSensors] = useState<Sensor[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState(null);

	
	const [isValidToken, setIsValidToken] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		
		
		const fetchSensors = async () => {

			setIsLoading(true);

			try {
				const response = await fetch('https://express-srv.onrender.com/api/sensors',
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token,
						}
					}
				);
				if (!response.ok) {
					if (response.status === 401 || response.statusText === "Unauthorized") {
						setIsLoading(false);
						setIsValidToken(false);
					}
					throw new Error('Failed to fetch sensors. Please try again later.');					
				}
				
				const sensors = await response.json();
				setIsValidToken(true);
				setSensors(sensors.payload);
			} 
			catch (err) {
				setError(err);
				console.error('Error fetching sensors:', error);
			} 
			finally {
				setIsLoading(false);
			}
		};

		if(token) fetchSensors();

	}, []);	

	
	const viewCalibrations = (sensorId: string) => {
		
		const sensor = sensors.find(sensor => sensor._id === sensorId);	
		navigate("/sensor", { state: { sensor } });
	}

	
	if (isLoading) {
		return <div className="row justify-content-center">
			<div className="container text-center my-2">
			<div>
				<CircularProgress className="mx-2" color="secondary" />
				<CircularProgress className="mx-2" color="success" />
				<CircularProgress className="mx-2" color="inherit" />
			</div>
			<div className="row justify-content-center">
				<div className="container text-center my-2">
					<a href="/login?reload=true" className="btn btn-primary">User Page</a>
				</div>
			</div>
		</div>
	</div>;
	}

	if (error) {
		return (
			<div className='container mt-5'>
				<div className="row justify-content-center">
					<h2 className='text-center w-100 login-session-expired'>Login Session Expired</h2>
					<p className='text-center w-100'>Please login again to view the sensors.</p>					
				</div>
				<div className="row justify-content-center">
					<div className="container text-center my-2">
						<a href="/login?reload=true" className="btn btn-primary">User Page</a>
					</div>
				</div>
			</div>
		)
	}
	
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
								<th>Calibrations</th>
							</tr>
						</thead>
						<tbody>
							{token && isValidToken && sensors.map((sensor, idx) => (
								<tr key={sensor.EID}>
									<td>{idx + 1}</td>
									<td>{sensor.EID}</td>
									<td>{sensor.description}</td>
									<td>{sensor.model}</td>
									<td>{sensor.type}</td>
									<td>{sensor.location}</td>
									<td>{sensor.calibrationPriority}</td>
									<td>{sensor.manufacturer}</td>
									<td><CiSettings className="calibrations-icon" onClick={() => viewCalibrations(sensor._id)}></CiSettings></td>
								</tr>
							))}
						</tbody>
					</table>
					
				</div>
				<div className="row justify-content-center">
					<div className="container text-center my-2">
						<a href="/login?reload=true" className="btn btn-primary">User Page</a>
					</div>
				</div>
			
			</div>
	)

	
}

export default Sensors
