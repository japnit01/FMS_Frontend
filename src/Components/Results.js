import React, { useState, useContext, useEffect } from 'react'
import eventContext from '../Context/event/eventContext'
import { useParams } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import "../css/Results.css"

// const rows = [
//     createData("Japnit Singh","1"),
//     createData("Sarthak","2"),
//     createData("Gurtej Singh","3"),
//     createData("Leroy Keebler","4"),
//     createData("Marion Kris","5"),
// ]

export default function Results() {

    const context = useContext(eventContext);
    const {FinishEvent,update,setupdate} = context;
    let {festname,eventid} = useParams();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows,setrows] = useState([])

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setupdate(true)
            FinishEvent(festname,eventid).then((results) => {
                let copyresult = [];
                results.result.map((result,index)=>{
                    copyresult.push({"name":result.name,"rank":index+1})
                })
                setrows(copyresult)
            });
            return () => (setupdate(false));
        }
    }, []);

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rank', label: 'Rank',minWidth: 70}
    ];
    
    function createData(name, rank) {
         console.log({name,rank})
        return { name, rank};
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
        <div className="app">
            <div className="resultapp">
            <Paper sx={{ width: '60%', overflow: 'hidden',margin:"auto"}}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.rank}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            </div>
            </div>
        </>
    )
}
