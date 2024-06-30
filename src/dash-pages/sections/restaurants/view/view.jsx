import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from '../../../../components/iconify/iconify';
import Scrollbar from '../../../../components/scrollbar';

import TableNoData from '../table-no-data';
import TableRow from '../user-table-row';
import TableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import TableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import RestaurantFormDialog from './AddEdit';
import { toast } from 'react-toastify';
// import { fetchRestaurants, updateRestaurant ,deleteRestaurant} from '../api';


// ----------------------------------------------------------------------

export default function RestaurantPage() {
  const [dataFiltered, setDataFiltered] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRow, setSelectedRow] = useState(null);
  const [addRow, setAddRow] = useState(false);

  // ** call API for get Restaurant list

  /* useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      const data = await fetchRestaurants(page, rowsPerPage, filterName);
      setDataFiltered(data);
    } catch (e) {
      console.log(`error:c ${e}`);
    }
    
  }; */

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = dataFiltered.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  useEffect(() => {
    const dataFiltered = applyFilter({
      inputData: users,
      comparator: getComparator(order, orderBy),
      filterName,
    });
    setDataFiltered(dataFiltered)
  }, [order, orderBy, filterName])

  const onSave = (resto) => {
    setDataFiltered((prevData) => {
      const index = prevData.findIndex(({ id }) => id === resto.id);
      return index !== -1 ? prevData.map((item, i) => i === index ? resto : item) : [resto, ...prevData];
    });
    toast.success(selectedRow ? "Restaurant details updated!" : "Add new details successfully!");
  }

  const onEdit = (resto) => {
    setSelectedRow(resto)
    setAddRow(true)
  }

  const onDelete = (id) => {
    // ** call API for delete Restaurant details ( first make this function to async function )
    // try{
    // await deleteRestaurant(id);
    // } catch (e) {
    //     console.log(`error:c ${e}`);
    // }
    setDataFiltered((pre) => pre.filter(i => i.id !== id))
    toast.success("Restaurant details deleted successfully!");
  }

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Restaurants</Typography>

        <Button variant="contained" color="inherit" onClick={() => setAddRow(true)} startIcon={<Iconify icon="eva:plus-fill" />}>
          New Restaurant
        </Button>
      </Stack>

      <Card>
        <TableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table >
              <TableHead
                order={order}
                orderBy={orderBy}
                rowCount={dataFiltered.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'location', label: 'Location' },
                  { id: 'description', label: 'Description' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.id}
                      data={row}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      onDelete={onDelete}
                      onEdit={onEdit}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, dataFiltered.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={dataFiltered.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      {addRow && <RestaurantFormDialog restaurant={selectedRow} onClose={() => { setAddRow(false); setSelectedRow(null) }} open={addRow} onSave={onSave} />}
    </Container>
  );
}


export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.person.fullName(),
  description: faker.lorem.paragraph(),
  location: faker.location.streetAddress(),
  // isVerified: faker.datatype.boolean(),
  // status: sample(['active', 'banned']),
  // role: sample([
  //   'Leader',
  //   'Hr Manager',
  //   'UI Designer',
  //   'UX Designer',
  //   'UI/UX Designer',
  //   'Project Manager',
  //   'Backend Developer',
  //   'Full Stack Designer',
  //   'Front End Developer',
  //   'Full Stack Developer',
  // ]),
}));
