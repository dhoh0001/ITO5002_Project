import FarmModal from "./Modal/FarmModal";
import AlertModal from "./Modal/AlertModal";
import SensorModal from "./Modal/SensorModal";
import LogModal from "./Modal/LogModal";
import LogDataModal from "./Modal/LogDataModal";
import AlertConfigModal from "./Modal/AlertConfigModal";
import FarmConfigModal from "./Modal/FarmConfigModal";
import LogConfigModal from "./Modal/LogConfigModal";
import SensorConfigModal from "./Modal/SensorConfigModal";
import UserConfigModal from "./Modal/UserConfigModal";
import Link from 'next/link';

function Sidebar(props) {

    const { userId } = props;
    
    return (
        <div>        
            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto secondary-colour">
                    <ul className="space-y-2 font-medium">
                        {/* <li>
                            <FarmModal userId={userId}/>
                        </li>
                        <li>
                            <AlertModal userId={userId}/>
                        </li>
                        <li>
                            <SensorModal userId={userId}/>  
                        </li>
                        <li>
                            <LogModal userId={userId}/>
                        </li>
                        <li>
                            <LogDataModal userId={userId}/>
                        </li> */}
                        <li>
                            <AlertConfigModal userId={userId}/>
                        </li>
                        <li>
                            <FarmConfigModal userId={userId}/>
                        </li>
                        <li>
                            <LogConfigModal userId={userId}/>
                        </li>
                        <li>
                            <SensorConfigModal userId={userId}/>
                        </li>
                        <li>
                            <UserConfigModal userId={userId}/>
                        </li>
                        {/* <li>
                            <Link href="trend" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                                <span className="flex-1 ml-3">Trends</span>
                            </Link>
                        </li>         */}
                    </ul>
                </div>
            </aside>    
        </div>
    );
}

export default Sidebar;
