import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import moment from 'moment';

const unixTimestamp = moment().unix();

const Calibration = () => {

	const location = useLocation();
    const data = location.state;
	console.log(data);
	return (
		<div className="container mt-5 w-50">
			<h1 className='text-center'>Calibration</h1>
			<p className='text-center'>This is a detailed view of the calibration event.</p>
			<div className="row justify-content-center">
				<div className="card text-center">
					<div className="card-body">
						<h3>{data.calibration.calibrationName}</h3>
						<p>Last Calibration Date: <span className='fw-bold'>{moment.utc(data.calibration.lastCalibrationDate).format('dddd, MM/DD/YYYY')}</span></p>
						<p>Due Calibration Date: <span className='fw-bold'>{moment.utc(data.calibration.dueCalibrationDate).format('dddd, MM/DD/YYYY')}</span></p>
						<p className='cal-note'>{data.calibration.comment}</p>
					</div>
				</div>
			</div>
			<div className="d-grid gap-2 col-2 mx-auto">
				<a href={`/sensors`} className="btn btn-outline-info my-2">Main Page</a>
			</div>
		</div>
		
	)
}

export default Calibration
