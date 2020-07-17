import React, { Component } from 'react'
import { ThunkDispatch } from 'redux-thunk';
import { IStoreState } from '../../../reducers';
import { Action } from 'redux';
import { RouteComponentProps } from 'react-router-dom';
import { getCountries, ICountry, IParamByCountry, getByCountry, IByCountry } from '../../../actions';
import Country from '../../Molecules/Country';
import Status from '../../Molecules/Status';
import { connect } from 'react-redux';
import styled from 'styled-components';
import queryString from 'query-string';
import { Table, Badge } from 'reactstrap';
import { Common } from '../../../helpers';
import DatePicker from "react-datepicker";
import TableCell, { CELL_TYPE } from '../../Molecules/TableCell';
import { TableContainer } from '../../styled/index';

export interface IParam {

}

interface IProps extends RouteComponentProps<IParam> {

}

const mapStateToProps = (state: IStoreState): { countries: ICountry[], byCountries: IByCountry[] } => {
    return {
        countries: state.countries,
        byCountries: state.byCountries,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<IStoreState, void, Action>) => ({
    ...{
        getCountries: () => dispatch(getCountries()),
        getByCountry: (params: IParamByCountry, callback?: () => void) => dispatch(getByCountry(params, callback)),
    }

});

const mergeProps = (
    stateProps: ReturnType<typeof mapStateToProps>,
    dispatchProps: ReturnType<typeof mapDispatchToProps>,
    ownProps: IProps,
) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
});

type MergedProps = ReturnType<typeof mergeProps>;

interface IState extends IParamByCountry {

}

const FilterWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const ItemContainer = styled.div`
    margin-top: 25px;
`;

class ByCountry extends Component<MergedProps, IState> {
    state = {
        country: "",
        status: "",
        from: new Date(),
        to: new Date()
    }

    componentDidMount() {
        this.props.getCountries();
        //const query = queryString.stringify(this.state);
    }

    handleFilter = () => {
        //const query = queryString.stringify(this.state);
        this.props.getByCountry({
            country: this.state.country,
            status: this.state.status,
            from: this.state.from.toISOString().slice(0, 10) + "T00:00:00Z",
            to: this.state.to.toISOString().slice(0, 10) + "T00:00:00Z",
        }, () => {
            console.log("Error occurs");
        });
    }

    componentDidUpdate(prevProps: MergedProps) {
        if (prevProps.countries.length != this.props.countries.length) {
            this.setState({
                ...this.state,
                country: this.props.countries[0].Country
            }, () => {
                //SetTimeout because API is free and limited by postman
                setTimeout(()=>{
                    this.handleFilter();
                }, 1000);
            });
        }
    }

    handleValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        }, () => {
            this.handleFilter();
        });
    }

    handleValueChangeDateFrom = (date: Date) => {
        this.setState({
            ...this.state,
            from: date
        }, () => {
            this.handleFilter();
        });
    }

    handleValueChangeDateTo = (date: Date) => {
        this.setState({
            ...this.state,
            to: date
        }, () => {
            this.handleFilter();
        });
    }

    handleChangeSelect = (val: any) => {
        console.log(val);
    }

    render() {
        const { countries, byCountries } = this.props;
        return (
            <div>
                <h3>Filter</h3>
                <FilterWrapper className={"filter-panel"}>
                    {countries && <Country countries={countries} handleValueChange={this.handleValueChange} />}
                    <Status handleValueChange={this.handleValueChange} />
                    <div className={"margin-right-15"}>
                        <DatePicker
                            selected={this.state.from}
                            onChange={this.handleValueChangeDateFrom}
                            dateFormat="dd/MM/yyyy"
                            maxDate={new Date()}
                        />
                    </div>
                    <div className={"margin-right-15"}>
                        <DatePicker
                            selected={this.state.to}
                            onChange={this.handleValueChangeDateTo}
                            dateFormat="dd/MM/yyyy"
                            maxDate={new Date()}
                        />
                    </div>
                </FilterWrapper>

                <ItemContainer>
                    {byCountries && (
                        <TableContainer>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Country</th>
                                        <th>CountryCode</th>
                                        <th>Lat</th>
                                        <th>Lon</th>
                                        <th>Cases</th>
                                        <TableCell type={CELL_TYPE.HEADER} isShow={this.state.status !== ""}>Status</TableCell>
                                        <TableCell type={CELL_TYPE.HEADER} isShow={this.state.status === ""}>Confirmed</TableCell>
                                        <TableCell type={CELL_TYPE.HEADER} isShow={this.state.status === ""}>Deaths</TableCell>
                                        <TableCell type={CELL_TYPE.HEADER} isShow={this.state.status === ""}>Recovered</TableCell>
                                        <th>Date (dd/MM/yyyy)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {byCountries && byCountries.map((byCountry: IByCountry, idx: number) => {
                                        return (
                                            <tr key={idx}>
                                                <td scope="row">{idx}</td>
                                                <td>{byCountry.Country}</td>
                                                <td>{byCountry.CountryCode}</td>
                                                <td>{byCountry.Lat}</td>
                                                <td>{byCountry.Lon}</td>
                                                <td>{byCountry.Cases}</td>
                                                <TableCell type={CELL_TYPE.BODY} isShow={this.state.status !== ""}>{byCountry.Status}</TableCell>
                                                <TableCell type={CELL_TYPE.BODY} isShow={this.state.status === ""}>{byCountry.Confirmed}</TableCell>
                                                <TableCell type={CELL_TYPE.BODY} isShow={this.state.status === ""}>{byCountry.Deaths}</TableCell>
                                                <TableCell type={CELL_TYPE.BODY} isShow={this.state.status === ""}>{byCountry.Recovered}</TableCell>
                                                <td><Badge color="danger">{Common.formatDate(byCountry.Date)}</Badge></td>
                                            </tr>
                                        )
                                    })

                                    }

                                    {byCountries.length == 0 && (
                                        <tr>
                                            <TableCell colSpan={9} type={CELL_TYPE.BODY} isShow={this.state.status !== ""}>No data</TableCell>
                                        </tr>
                                    )}
                                </tbody>
                                {
                                    byCountries.length > 0 && (
                                        <tfoot>
                                            <tr>
                                                <td colSpan={10}>{byCountries.length} rows</td>
                                            </tr>
                                        </tfoot>
                                    )
                                }
                            </Table>
                        </TableContainer>
                    )}
                </ItemContainer>

            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ByCountry)
