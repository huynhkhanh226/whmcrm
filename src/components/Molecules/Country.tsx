import React, { ReactElement } from 'react'
import { Label } from 'reactstrap';
import { ICountry } from '../../actions';

interface IProps {
    countries: ICountry[],
    handleValueChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Country: React.FC<IProps> = ({countries, handleValueChange}: IProps) => {
    return (
        <>
            <select className="form-control margin-right-15" name={"country"} onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>handleValueChange(e)}>
                {
                    countries.map((country: ICountry)=>{
                        return (
                            <option key={country.Slug} value={country.Slug}>{country.Country}</option>
                        )
                    })
                }
            </select>
        </>
    );
}

export default Country
