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
                    </ul>
                </div>
            </aside>    
        </div>
    );
}

export default Sidebar;
