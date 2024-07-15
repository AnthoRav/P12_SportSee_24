import { USE_MOCK_DATA } from './config';
import * as DataService from './DataService';
import * as MockDataService from './MockDataService';

const dataService = USE_MOCK_DATA ? MockDataService : DataService;

export default dataService;