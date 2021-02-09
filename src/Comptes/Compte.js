import React, { Component } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import InputAdornment from '@material-ui/core/InputAdornment';
import CompteSummary from'./CompteSummary'


class Compte extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            Compte: {
                codeCompte: '',
                dateCreation: '',
                solde: '',
                client: '',
                employe:''
            },
            Comptes:[],
            CompteRecherche:{
                codeCompte:''
            }

        }
    }
    
    componentDidMount() {
        fetch("http://ec2-3-86-149-107.compute-1.amazonaws.com:80/comptes")
            .then(res => res.json()
            )
            .then(data => {
                this.setState({
                    Comptes: data
                })
            }).catch(err => {
                this.setState({
                    isError: true,
                    error: err.message
                })
            })
            console.log(this.state.Comptes)
    }

    handleChercher = (e) => {
        alert('Chercher : ' + this.state.Compte.code);
        e.preventDefault();
    }

    handleCompteChange(newPartialInput) {
        this.setState(state => ({
            ...state,
            Compte: {
                ...state.Compte,
                ...newPartialInput
            }
        }))
    }

    handleCompteRechercheChange(newPartialInput) {
        this.setState(state => ({
            ...state,
            CompteRecherche: {
                ...state.CompteRecherche,
                ...newPartialInput
            }
        }))
    }



    onSubmit = (e) => {
        e.preventDefault();
        let newCompte = { ...this.state.Compte };
        fetch("http://ec2-3-86-149-107.compute-1.amazonaws.com:80/comptes/add", {
            method: "POST",
            body: JSON.stringify(newCompte)
        }).then(res => {
            if (res.ok) {
                res.json()
            } else {
                throw new Error('la reponse est erronée')
            }
        }).then(json => {
            this.setState({
                ...this.state,
                Comptes: [...this.state.Comptes, json]
            })

        }).catch(err => {
            this.setState({
                isError: true,
                error: err.message
            })
        })
    }
    handleErrors = (value) => {
        this.setState({
            isError: true,
            error: value
        })

    }
    dynamicSearch = () => {
        let aucunCompte = [{ codeCompte: 'Aucun Compte',dateCreation:'',solde: null,client:'', employe:'' }]
        let codeSearch = this.state.CompteRecherche.codeCompte;
        if (codeSearch.length > 0) {
            let Comptes = this.state.Comptes.filter((Compte) =>
                Compte.codeCompte.toLowerCase().startsWith(codeSearch.toLowerCase())
            )

            return (Comptes.length !== 0) ? Comptes : aucunCompte
        } else {
            return this.state.Comptes
        }
    }
    render(){
        const Compte =this.state.Compte;
        const CompteRecherche=this.state.CompteRecherche;

    return(
       
        <div className = "Compte" >
           
            <Grid container direction="row" justify="space-around" alignItems="stretch">

                <Grid item sm>
                    <fieldset>
                        <legend >Insertion d'un Compte</legend>
                        <form onSubmit={this.onSubmit} noValidate autoComplete="off">
                            <TextField type="text" margin="normal" fullWidth label="Code" variant="outlined" value={Compte.codeCompte} onChange={e => this.handleCompteChange({ code: e.target.value })} /><br />
                            <TextField type="text" margin="normal" fullWidth label="Date de création" variant="outlined" value={Compte.dateCreation} onChange={e => this.handleCompteChange({ dateCreation: e.target.value })} /><br />
                            <TextField type="text"
                                margin="normal" fullWidth label="Solde" variant="outlined" value={Compte.solde} onChange={e => this.handleCompteChange({ solde: e.target.value })} /><br />
                                 <TextField type="text"
                                margin="normal" fullWidth label="Client" variant="outlined" value={Compte.client} onChange={e => this.handleCompteChange({ client: e.target.value })} /><br />
                                 <TextField type="text"
                                margin="normal" fullWidth label="Employé" variant="outlined" value={Compte.employe} onChange={e => this.handleCompteChange({ employe: e.target.value })} /><br />
                           
                            <div className="center">
                                <Button type="submit"  variant="contained">Ajouter</Button>
                            </div>
                        </form>
                    </fieldset>
                </Grid>
                <Grid item sm>
                    <fieldset>
                        <legend align="top">Recherche d'un Compte</legend>
                        <form noValidate autoComplete="off">
                            <TextField margin="normal" fullWidth id="outlined-basic" label="Code" variant="outlined" value={CompteRecherche.codeCompte} onChange={e => this.handleCompteRechercheChange({ codeCompte: e.target.value })}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end"><SearchRoundedIcon /></InputAdornment>
                                }} /><br />
                            
                        </form>
                    </fieldset>
                </Grid>
            </Grid>
            <fieldset>
                <legend align="top">Liste des Comptes</legend>
                <CompteSummary Comptes={this.dynamicSearch()}/>
            </fieldset>
        </div>
    );
    }
}
export default Compte;

