import React,{} from 'react';
import {useLocation} from 'react-router-dom';
import AffidavitForMarriage from '../AffidavitStructure/AffidavitForMarriage';


function Format({formName}) {
    const location = useLocation();
    const forms = location.state.formName;
    console.log(forms)
    // const [affid, setAffid]=  useState(location.state.formName);
    return (
        <div>
      
           {
                forms === 'birth certificate' && <AffidavitForMarriage/>
           }

        </div>
    )
}

export default Format;
