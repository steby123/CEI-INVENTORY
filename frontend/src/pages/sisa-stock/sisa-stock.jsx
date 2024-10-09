import FormSisaStock from '../../component/UI/sisa-stock/form-sisa-stock/form-sisa-stock';
import TableSisaStock from '../../component/UI/sisa-stock/table-sisa-stock/table-sisa-stock';
import './sisa-stock.css';

const SisaStock = () => {
    return(
        <div className="containers">
            <div className="containers-text">
                <FormSisaStock />
                <TableSisaStock />
            </div>
        </div>
    )
}

export default SisaStock;