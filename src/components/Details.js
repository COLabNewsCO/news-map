import DataTable from 'react-data-table-component';
import { formatNumber } from './utils';

const sortReach = (rowA, rowB) => {
  const a = rowA['REACH (if available)'];
  const b = rowB['REACH (if available)'];

  // https://stackoverflow.com/questions/30528541/javascript-sort-array-of-mixed-data-type
  if (isNaN(a)) {
    if (isNaN(b)) {  // a and b are strings
      return a.localeCompare(b);
    } else {         // a string and b number
        return 1;  // a > b
      }
  } else {
      if (isNaN(b)) {  // a number and b string
        return -1;  // a < b
      } else {         // a and b are numbers
        return parseInt(a) - parseInt(b);
      }
  }
};

function createMarkup(m) {
  return {__html: m };
}

const MissionComponent = ({ data }) => {
   if (data.MISSION.length) {
    return(
      <div className='expanded'>
        <p className='expanded__mission'>{ data.MISSION }</p>
        <p className='expanded__mission' 
          dangerouslySetInnerHTML={ createMarkup(data.Description) } />
      </div>
    )
   }
   return null;
};

const isCredentialed = (row) => {
  const creds = [ row.CPA, row.CBA, row.COLab ];
  
  if (creds.some(el => el.length)) {
    return (
      <div>
        <a target='_parent' className='outlet__link' href={row['WEB']}>{ row['OUTLET'] }</a>
        <span className="outlet__cred"></span>
      </div>
    )
  }
  return <a target='_parent' className='outlet__link' href={row['WEB']}>{ row['OUTLET'] }</a>;
};

function Details(props) {
  if (props.mainstream.data.length) {
    const { data, header } = props.mainstream;

    const tableDataItems = data.map(item => {
      let disabled = item.MISSION.length > 0 ? false : true;
      return { ...item, disabled };
    });

    const columns = [
      {
        name: 'Outlet',
        selector: row => row.OUTLET,
        cell: row => isCredentialed(row)
      },
      {
        name: 'County',
        selector: row => row.COUNTY,
        sortable: true,
      },
      {
        name: 'Sector',
        selector: row => row.SECTOR,
        sortable: true,
      },
      {
        name: 'Language',
        selector: row => row['NON-ENGLISH/ BIPOC-SERVING'],
        sortable: true,
      },
      {
        name: 'Owner',
        selector: row => row.OWNER,
        sortable: true,
      },
      {
        name: 'Ownership',
        selector: row => row.OWTYPE,
        sortable: true,
      },
      {
        name: 'Reach',
        selector: row => formatNumber(row['REACH (if available)']),
        sortable: true,
        sortFunction: sortReach
      },
    ];

    return (
      <div className='details'>
        <h4 className='details__hed'>{ header }</h4>
        <DataTable 
          className='rdt_Table' 
          columns={ columns } 
          data={ tableDataItems } 
          pagination
          paginationPerPage={25}
          paginationRowsPerPageOptions = {[5, 10, 15, 20, 25, 30]}
          expandableRows 
          expandableRowsComponent={ MissionComponent }
          expandableRowDisabled={ row => row.disabled }
        />

        <p className="details__note">
          <span className="details__cred outlet__cred"></span> Indicates source is a member of the Colorado Press Association and or a COLab partner.
        </p>
      </div>
    );
  } else {
    return <h4>This county has no news sources.</h4>;
  }
}

export default Details;