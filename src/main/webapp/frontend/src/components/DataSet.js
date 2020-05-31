import React, {useState, useEffect} from 'react';
import {useTable, useSortBy} from "react-table";

const DataSet = () => {

const [customers, setCustomers]=useState([]);
const [isLoading, setIsLoading]=useState(true);

  const columns = [
        {
            Header: "Id",
            accessor: "id"
          },
        {
          Header: "Name",
          accessor: "name"
        },

        {
          Header: "Month ",
          accessor: "month"
        },
        {
            Header: "Earned this Month ",
            accessor: "amount"
          },
          {
            Header: "3 Month Total",
            accessor: "total"
          }
  ];



  const Table = ({ columns, data }) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow
    } = useTable({
        columns,
        data
      },
      useSortBy
    );
  
  
    return (
      <table {...getTableProps()}>
        <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    </th>
                ))}
                </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

useEffect(()=>{
    getCustomers();
}, []);

const getCustomers = async () =>{
    fetch('/customers', {
        method: "GET"
    })
    .then(res => res.json())
    .then((data) => {
        setCustomers(sortData(data));
        setIsLoading(false);
    })
    .catch(console.log("Error Fetching Customers"));
}

const sortData = ((data)=>{
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let perCustomer = {};
    let totalPointsByCustomer = {};

    data.map(data => {
        let {id, name} = data;
        let month=new Date(data.date).getMonth();
        let amount=calculatePoints(data.amount);

        if (!perCustomer[id]) perCustomer[id] = [];         

        if (totalPointsByCustomer[name]==undefined) totalPointsByCustomer[name] = amount;
        else totalPointsByCustomer[name] += amount;

        //organizes data as 2d array
        if (perCustomer[id][month]) {
            perCustomer[id][month].amount += amount;
            perCustomer[id][month].monthNumber = month;
            perCustomer[id][month].numTransactions++;      
        }
        else {
            perCustomer[id][month] = {
                id,
                name,
                monthNumber:month,
                month: months[month],       
                amount
            }
        }    
      });

      let finalResult = combineData(perCustomer, totalPointsByCustomer);
      return finalResult;
})

const combineData=(perCustomer, totalPointsByCustomer)=>{
    //breaks 2d array into regular array
    let finalResult = [];
    for (var x in perCustomer) {    
        debugger;
        perCustomer[x].map(y=> {
        finalResult.push(y);
    });    
    }

      //appends total value for each customer
    for(var x in totalPointsByCustomer){
    finalResult.map(y=>{
        if(x===y.name){
            y["total"]=totalPointsByCustomer[x];
        }
    })          
    }
    return finalResult
}

const calculatePoints=(amount)=>{
    if(amount>=50 && amount<100) return amount-50;
    else if(amount >100) return (amount-100)*2 +50;
    return 0;
}

if(isLoading) return <div>Loading</div>

return (
      <div>
        <Table
        data={customers}
        columns={columns}
        />
    </div>  
);

}
export default DataSet;