import TableRow from '@material-ui/core/TableRow';
import Input from "@material-ui/core/Input";
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';

import Paper from '@material-ui/core/Paper';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useEffect, useState, useRef } from "react";
const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: "blue",
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);
const CustomTableCell = ({ row, name, onChange }) => {
    const { isEditMode } = row;
    return (
        <StyledTableCell align="left" >
            {isEditMode ? (
                <Input
                    value={row[name]}
                    name={name}
                    onChange={e => onChange(e, row)}
                />
            ) : (
                    row[name]
                )}
        </StyledTableCell>
    );
};

export default function CompteSummary({ Comptes}) {
    let [tousComptes, setTousComptes] = useState(Comptes);
    const [previous, setPrevious] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        setTousComptes(Comptes);
    }, [Comptes])

    return (
        <div>
            < TableContainer component={Paper} >
                <Table size="small" aria-label="simple table">
                    <TableHead >
                        <TableRow>
                            <StyledTableCell>Code</StyledTableCell>
                            <StyledTableCell>Date de Création</StyledTableCell>
                            <StyledTableCell>Solde</StyledTableCell>
                            <StyledTableCell>Client</StyledTableCell>
                            <StyledTableCell>Employe</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tousComptes && tousComptes.map(row => {
                            return (
                                <StyledTableRow key={row.codeCompte} >
                                    <StyledTableCell>{row.codeCompte}</StyledTableCell>
                                    <StyledTableCell>{row.dateCreation}</StyledTableCell>
                                    <StyledTableCell>{row.solde}</StyledTableCell>
                                    <StyledTableCell>{""}</StyledTableCell>
                                    <StyledTableCell>{""}</StyledTableCell>
                                </StyledTableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer >
        </div>

    )
}