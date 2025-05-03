import React from 'react'
import { useLocation } from 'react-router-dom';
import { FaCertificate } from 'react-icons/fa6';

const Sensor = () => {
	const location = useLocation();
	const sensor = location.state.sensor; // Get the sensor data from the location state
	console.log(sensor.calibrations); // Log the sensor data to the console for debugging
	const token = localStorage.getItem("token");
	return (
		<div className="container mt-5 w-50">
			<h1 className='text-center'>Sensor</h1>
			<p className='text-center'>This is a detailed view of the sensor.</p>
			{!token && <p className='text-center'>Please login to view the sensor details.</p>}
			{token && <p className='text-center'>You are logged in.</p>}
			
			<div className="row justify-content-center">
				<div className="card text-left">
					<div className="card-body">
						<h5 className="card-title">Sensor Details</h5>
						<p className="card-text">This is a detailed view of the sensor.</p>
						<p className="card-text">Sensor EID: <span className='sensor-info-span'>{sensor.EID}</span></p>	
						<p className="card-text">Sensor Description: <span className='sensor-info-span'>{sensor.description}</span></p>
						<p className="card-text">Sensor Model: <span className='sensor-info-span'>{sensor.model}</span></p>	
						<p className="card-text">Sensor Type: <span className='sensor-info-span'>{sensor.type}</span></p>
						<p className="card-text">Sensor Location: <span className='sensor-info-span'>{sensor.location}</span></p>
						<p className="card-text">Sensor Calibration Priority: <span className='sensor-info-span'>{sensor.calibrationPriority}</span></p>
						<p className="card-text">Sensor Manufacturer: <span className='sensor-info-span'>{sensor.manufacturer}</span></p>
						<h5 className="card-text mt-5">Sensor Calibrations</h5>
						<p className="card-text">This is a list of calibrations for the sensor.</p>
						
						<ul className="list-group list-group-flush"></ul>
							{sensor.calibrations.map((calibration, index: string) => (
								<div className='row align-content-center my-2 cal-list-item' key={index}>
									<FaCertificate className='col-1 certificate-icon'/>
									<span className='col-11'>{calibration.calibrationName}</span>
								</div>
									
							))}
						<a href="/" className="btn btn-primary my-2">Main Page</a>
					</div>
				</div>
			</div>
			

		</div>
	)
}

export default Sensor