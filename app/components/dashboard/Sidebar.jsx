import FarmModal from "./Modal/FarmModal";
import AlertModal from "./Modal/AlertModal";
import SensorModal from "./Modal/SensorModal";
import LogModal from "./Modal/LogModal";

function Sidebar() {
    return (
        <div>        
            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto secondary-colour">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <FarmModal />
                        </li>
                        <li>
                            <AlertModal />
                        </li>
                        <li>
                            <SensorModal />  
                        </li>
                        <li>
                            <LogModal />
                        </li>
                    </ul>
                </div>
            </aside>    
        </div>
    );
}

export default Sidebar;