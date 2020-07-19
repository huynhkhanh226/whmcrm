import React, { Component } from 'react'
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { IStoreState } from '../../reducers';
import { IPackage, getPackages } from '../../actions';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
export interface IParam {

}

interface IProps extends RouteComponentProps<IParam> {

}

const mapStateToProps = (state: IStoreState): { packages: IPackage[] } => {
    return {
        packages: state.packages,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<IStoreState, void, Action>) => ({
    ...{
        getPackages: () => dispatch(getPackages()),
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

class Home extends Component<MergedProps, IState> {
    state = {}

    componentDidMount() {
        this.props.getPackages();
    }
    render() {
        const { packages } = this.props;
        return (
            <div className={'package-container'}>
                <h1>Hosting Linux</h1>
                <div className={'package-list'}>
                    {packages && packages.map((item) => (
                        <div className={"card-item-container fade-in"} key={item.packageName}>
                            <Card key={item.packageName}>
                                <CardBody>
                                    {/* packageName: data[i].name,
                                bandwidth: data[i].BWLIMIT,
                                diskQuota: data[i].QUOTA,
                                maxAddon: data[i].MAXADDON,
                                maxSub: data[i].MAXSUB,
                                maxFTP: data[i].MAXFTP,
                                maxPark: data[i].MAXPARK,
                                maxSQL: data[i].MAXSQL, */}
                                    <CardTitle>Package Name : <strong className={"text-primary"}>{item.packageName}</strong></CardTitle>
                                    <CardText>Bandwidth : <strong>{item.bandwidth}</strong></CardText>
                                    <CardText>Disk Quota : <strong className={"text-primary"}>{item.diskQuota} MB</strong></CardText>
                                    <CardText>Addon Domain : <strong>{item.maxAddon}</strong></CardText>
                                    <CardText>Sub Domain : <strong>{item.maxSub}</strong></CardText>
                                    <CardText>Max FTP Account : <strong>{item.maxFTP}</strong></CardText>
                                    <CardText>Max Parked Domain : <strong>{item.maxPark}</strong></CardText>
                                    <CardText>Max SQL : <strong>{item.maxSQL}</strong></CardText>
                                    <Button className={'margin-right-15 bg-primary'}>Đăng ký</Button>
                                    <Button className={'bg-warning'}>Chi tiết</Button>
                                </CardBody>

                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)