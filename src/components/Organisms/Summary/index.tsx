import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { ISummary, getSummary, getCountries, ICountry, ISummaryCountry } from '../../../actions';
import { IStoreState } from '../../../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { connect } from 'react-redux';
import { Table, Button, Badge, InputGroup, InputGroupAddon, InputGroupText, Input, Label } from 'reactstrap';
import styled from 'styled-components';
import { Common } from '../../../helpers/';
import Pagination from 'react-js-pagination';
import { TableContainer } from '../../styled';


export interface IParam {

}

interface IProps extends RouteComponentProps<IParam> {

}

const mapStateToProps = (state: IStoreState): { summary: ISummary, countries: ICountry[] } => {
    return {
        summary: state.summary,
        countries: state.countries
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<IStoreState, void, Action>) => ({
    ...{
        getSummary: () => dispatch(getSummary()),
        getCountries: () => dispatch(getCountries()),
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

interface IState {

}

const SummaryWrapper = styled.div`
    >div button{
        margin-right: 10px;
    }
`;

const ItemContainer = styled.div`
    margin-top: 25px;
`;

class Summary extends Component<MergedProps, IState> {
    state = {}

    componentDidMount() {
        this.props.getSummary();
    }

    render() {
        const { summary, countries } = this.props;
        const activePage = 1;
        //const countriesPaging = summary.countries && summary.countries.length > 0 ? summary.countries.slice((activePage - 1) * 5, ((activePage - 1) * 5) + 5) : [];
        const countriesPaging = summary.countries;
        const { match: { params } } = this.props;
        return (
            <div>
                <h3>Global Summary</h3>
                {summary.global &&
                    <SummaryWrapper className={"summary"}>
                        <div className={"left"}>
                            <Button color="primary" outline>
                                NewConfirmed <Badge color="primary">{summary.global.NewConfirmed}</Badge>
                            </Button>
                            <Button color="primary" outline>
                                NewDeaths <Badge color="danger">{summary.global.NewDeaths}</Badge>
                            </Button>
                            <Button color="primary" outline>
                                TotalDeaths <Badge color="danger">{summary.global.TotalDeaths}</Badge>
                            </Button>
                            <Button color="primary" outline>
                                NewRecovered <Badge color="info">{summary.global.NewRecovered}</Badge>
                            </Button>
                            <Button color="primary" outline>
                                TotalConfirmed <Badge color="primary">{summary.global.TotalConfirmed}</Badge>
                            </Button>
                        </div>
                        <div className={"right"}>

                        </div>
                    </SummaryWrapper>
                }

                <ItemContainer>
                    <div className={"filter-toolbar"}>
                        <div className={"left"}>
                            <h3>Summary by Country</h3>
                        </div>
                        <div className={"right"}>
                            <InputGroup className={"margin-right-15"}>
                                <Input placeholder="search" />
                                <InputGroupAddon addonType="append" className={"hide"}>
                                    <InputGroupText className={"primary"}>x</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                            <Pagination
                                activePage={0}
                                itemsCountPerPage={5}
                                totalItemsCount={1000}
                                pageRangeDisplayed={5}
                                onChange={() => { }}
                                activeClass={"active"}
                            />
                        </div>
                    </div>
                </ItemContainer>
                {countriesPaging && (
                    <TableContainer height={window.innerHeight - 250}>
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>CountryCode</th>
                                    <th>CountryName</th>
                                    <th>NewConfirmed</th>
                                    <th>TotalConfirmed</th>
                                    <th>NewDeaths</th>
                                    <th>TotalDeaths</th>
                                    <th>NewRecovered</th>
                                    <th>TotalRecovered</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {countriesPaging && countriesPaging.map((country: ISummaryCountry, idx: number) => {
                                    return (
                                        <tr key={idx}>
                                            <td scope="row">{idx}</td>
                                            <td>{country.CountryCode}</td>
                                            <td><Badge color="primary">{country.Slug}</Badge></td>
                                            <td>{country.NewConfirmed}</td>
                                            <td>{country.TotalConfirmed}</td>
                                            <td><Label className="danger">{country.NewDeaths}</Label></td>
                                            <td><Label className="danger">{country.TotalDeaths}</Label></td>
                                            <td>{country.NewRecovered}</td>
                                            <td>{country.TotalRecovered}</td>
                                            <td>{Common.formatDate(country.Date)}</td>
                                        </tr>
                                    )
                                })

                                }
                            </tbody>
                            <tfoot>
                                <tr key={'footer'}>
                                    <td colSpan={10} scope="row">{countriesPaging.length} rows</td>
                                    
                                </tr>
                            </tfoot>
                        </Table>
                    </TableContainer>
                )}

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary)