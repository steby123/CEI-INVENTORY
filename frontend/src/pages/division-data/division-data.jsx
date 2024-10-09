import FormDivision from '../../component/UI/divisionData/formDivision/formDivision';
import TableDivision from '../../component/UI/divisionData/tableDivision/tableDivision';
import './divison-data.css';

const DivisionData = () => {

    return(
        <div className="containers">
            <div className="containers-text">
                <FormDivision />
                <TableDivision />
            </div>
        </div>
    )
}

export default DivisionData;
