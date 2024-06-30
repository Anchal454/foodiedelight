// import React, { useState, useEffect } from 'react';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import { faker } from '@faker-js/faker';
// // import { addRestaurant, updateRestaurant } from '../api';

// const RestaurantFormDialog = ({ open, onClose, restaurant = {}, onSave }) => {
//     const [formData, setFormData] = useState({
//         id: faker.string.uuid(),
//         name: '',
//         description: '',
//         location: '',
//         operatingHours: '',
//         phone: '',
//         email: ''
//     });
//     console.log(restaurant, 'restaurant');
//     useEffect(() => {
//         if (restaurant) {
//             setFormData({
//                 id: restaurant?.id || faker.string.uuid(),
//                 name: restaurant?.name || '',
//                 description: restaurant?.description || '',
//                 location: restaurant?.location || '',
//                 operatingHours: restaurant?.operatingHours || '',
//                 phone: restaurant?.phone || '',
//                 email: restaurant?.email || '',
//             });
//         }
//     }, [restaurant]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = (e) => {

//         e.preventDefault();

//         // ** call API for add or update Restaurant details ( first make this function to async function )

//         // try {
//         //     if (restaurant.id) {
//         //       await updateRestaurant({ ...restaurant, ...formData });
//         //     } else {
//         //       await addRestaurant(formData);
//         //     }
//         // } catch (e) {
//         //     console.log(`error:c ${e}`);
//         // }

//         //**  call function for add or delete details
//         onSave(formData);
//         onClose();
//     };

//     return (
//         <Dialog open={open} onClose={onClose}>
//             <DialogTitle>{restaurant?.id ? 'Edit Restaurant' : 'Add Restaurant'}</DialogTitle>
//             <DialogContent>
//                 <form onSubmit={handleSubmit}>
//                     <TextField
//                         autoFocus
//                         margin="normal"
//                         label="Restaurant Name"
//                         name="name"
//                         type="text"
//                         fullWidth
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                     />
//                     <TextField
//                         rows={4}
//                         multiline
//                         margin="normal"
//                         label="Restaurant Description"
//                         name="description"
//                         type="text"
//                         fullWidth
//                         value={formData.description}
//                         onChange={handleChange}
//                         required
//                     />
//                     <TextField
//                         margin="normal"
//                         label="Restaurant Location"
//                         name="location"
//                         type="text"
//                         fullWidth
//                         value={formData.location}
//                         onChange={handleChange}
//                         required
//                     />
//                 </form>
//             </DialogContent>
//             <DialogActions>
//                 <Button variant="outlined" color="inherit" onClick={onClose}>Cancel</Button>
//                 <Button disabled={!formData.name?.trim() || !formData.location?.trim() || !formData.description?.trim()} variant="contained" color="inherit" onClick={handleSubmit} type="submit">{restaurant?.name ? 'Update' : 'Save'}</Button>
//             </DialogActions>
//         </Dialog>
//     );
// };

// export default RestaurantFormDialog;

import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { faker } from '@faker-js/faker';
import { InputAdornment } from '@mui/material';
// import { addRestaurant, updateRestaurant } from '../api';

const RestaurantFormDialog = ({ open, onClose, restaurant = {}, onSave }) => {
    const [formData, setFormData] = useState({
        id: faker.string.uuid(),
        name: '',
        description: '',
        location: '',
        operatingHours: '',
        phone: '',
        email: ''
    });

    useEffect(() => {
        if (restaurant) {
            setFormData({
                id: restaurant?.id || faker.string.uuid(),
                name: restaurant?.name || '',
                description: restaurant?.description || '',
                location: restaurant?.location || '',
                operatingHours: restaurant?.operatingHours || '',
                phone: restaurant?.phone || '',
                email: restaurant?.email || '',
            });
        }
    }, [restaurant]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    const validateEmail = (email) => {
        // Regex for basic email validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhone = (phone) => {
        // Regex for basic phone number validation (digits and optional dashes)
        const re = /^\d{10}$/;
        return re.test(phone);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{restaurant?.id ? 'Edit Restaurant' : 'Add Restaurant'}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        autoFocus
                        margin="normal"
                        label="Restaurant Name"
                        name="name"
                        type="text"
                        fullWidth
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        rows={4}
                        multiline
                        margin="normal"
                        label="Restaurant Description"
                        name="description"
                        type="text"
                        fullWidth
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="normal"
                        label="Contact Details"
                        name="phone"
                        type="text"
                        fullWidth
                        value={formData.phone}
                        onChange={handleChange}
                        error={formData.phone && !validatePhone(formData.phone)}
                        helperText={formData.phone && !validatePhone(formData.phone) && "Invalid phone number"}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                +91
                              </InputAdornment>
                            ),
                          }}
                    />
                    <TextField
                        margin="normal"
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        value={formData.email}
                        onChange={handleChange}
                        error={formData.email && !validateEmail(formData.email)}
                        helperText={formData.email && !validateEmail(formData.email) && "Invalid email address"}
                    />
                    <TextField
                        margin="normal"
                        label="Restaurant Location"
                        name="location"
                        type="text"
                        fullWidth
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="normal"
                        label="Operating Hours"
                        name="operatingHours"
                        type="text"
                        fullWidth
                        value={formData.operatingHours}
                        onChange={handleChange}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="inherit" onClick={onClose}>Cancel</Button>
                <Button
                    disabled={!formData.name?.trim() || !formData.location?.trim() || !formData.description?.trim() || !validatePhone(formData.phone) || !validateEmail(formData.email)}
                    variant="contained"
                    color="inherit"
                    onClick={handleSubmit}
                    type="submit"
                >
                    {restaurant?.name ? 'Update' : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RestaurantFormDialog;

