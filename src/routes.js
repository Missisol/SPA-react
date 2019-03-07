import InvoicesListContainer from 'components/InvoicesListContainer';
import InvoiceCreateContainer from 'components/InvoiceCreateContainer';
import ProductsListContainer from 'components/ProductsListContainer';
import CustomersListContainer from 'components/CustomersListContainer';
import InvoiceEditContainer from 'components/InvoiceEditContainer';


export default [
    {path: '/', exact: true, component: InvoicesListContainer},
    {path: '/invoice/create', exact: true, component: InvoiceCreateContainer},
    {path: '/invoices/:id', exact: true, component: InvoiceEditContainer},
    {path: '/products', exact: true, component: ProductsListContainer},
    {path: '/customers', exact: true, component: CustomersListContainer},
]
