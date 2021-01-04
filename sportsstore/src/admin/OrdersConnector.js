import { compose, graphql } from 'react-apollo'
import { order } from '../../serverQueriesResolver';
import  { ordersSummaryQuery } from "./ClientQueries";
import { OrdersTable } from "./OrdersTable";

const vars = {
    onlyShipped: false, page: 1, pageSize: 10, sort: "id"
}

export const OrdersConnector = graphql(ordersSummaryQuery, 
    {
        options: (props) => ({variables: vars}),
        props: ({data: { loading, orders, refetch }}) => ({
            totalSize: loading ? 0 : order.totalSize,
            orders: loading ? []: orders.orders,
            currentPage: vars.page,
            pageCount: loading ? 0 : Math.ceil(orders.totalSize / vars.pageSize),
            navigateToPage: (page) => { vars.page = Number(page); refetch(vars)},
            pageSize: vars.pageSize,
            setPageSize: (size) => { vars.pageSize = Number(page); refetch(vars)},
            sortKey: vars.sort,
            setSortProperty: (key) => { vars.sort = key; refetch(vars)}
        })
    }
)(OrdersTable);1