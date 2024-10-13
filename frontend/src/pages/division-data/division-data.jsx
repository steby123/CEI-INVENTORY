import FormDivision from '../../component/UI/divisionData/formDivision/formDivision';
import TableDivision from '../../component/UI/divisionData/tableDivision/tableDivision';
import { DivisionDataHook } from '../../hook/division-data/Division-data';
import './divison-data.css';

const DivisionData = () => {
    const divisionData = DivisionDataHook();

    return(
        <div className="containers">
            <div className="containers-text">
                <FormDivision divisionData= {divisionData}/>
                <TableDivision divisionData= {divisionData}/>
            </div>
        </div>
    )
}

export default DivisionData;
