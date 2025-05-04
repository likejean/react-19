
export interface Calibration {
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

export interface Sensor {
	_id: string;
	EID: string;
	calibratedBy: string;
	calibrationFrequency: string;
	calibrationPriority: string;
	calibrations: [Calibration];
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