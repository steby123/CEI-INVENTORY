import Formmaster from '../../component/UI/formMaster/form-master-data/form-master';
import TableMasterData from '../../component/UI/formMaster/table-master-data/table-master-data';
import { MasterDataHook } from '../../hook/master-data/Master-data';
import './master.css';

const MasterData = () => {
    const masterDataHook = MasterDataHook();

    return (
        <div className="containers">
            <div className="containers-text">
                <Formmaster masterDataHook={masterDataHook}/>
                <TableMasterData masterDataHook={masterDataHook}/>
            </div>      
        </div>
    );
};

export default MasterData;
