import Formmaster from '../../component/UI/formMaster/form-master-data/form-master';
import TableMasterData from '../../component/UI/formMaster/table-master-data/table-master-data';
import './master.css';

const MasterData = () => {

    return (
        <div className="containers">
            <div className="containers-text">
                <Formmaster />
                <TableMasterData />
            </div>      
        </div>
    );
};

export default MasterData;
